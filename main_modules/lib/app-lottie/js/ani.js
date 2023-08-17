function each(object, callback) {
	Object.keys(object).forEach((key) => {
		callback(object[key], key);
	});
}
const EASINGS = {
	linear: (t) => t,

	inQuad: (t) => t * t,
	outQuad: (t) => t * (2 - t),
	inOutQuad: (t) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,

	inCubic: (t) => t * t * t,
	outCubic: (t) => (--t) * t * t + 1,
	inOutCubic: (t) => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

	inQuart: (t) => t * t * t * t,
	outQuart: (t) => 1 - (--t) * t * t * t,
	inOutQuart: (t) => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,

	inQuint: (t) => t * t * t * t * t,
	outQuint: (t) => 1 + (--t) * t * t * t * t,
	inOutQuint: (t) => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,

	inSine: (t) => 1 - Math.cos(t * (Math.PI / 2)),
	outSine: (t) => Math.sin(t * (Math.PI / 2)),
	inOutSine: (t) => .5 - .5 * Math.cos(Math.PI * t),

	inExpo: (t) => Math.pow(2, 10 * (t - 1)),
	outExpo: (t) => 1 - Math.pow(2, -10 * t),
	inOutExpo: (t) => (t = t * 2 - 1) < 0 ? .5 * Math.pow(2, 10 * t) : 1 - .5 * Math.pow(2, -10 * t),

	inCirc: (t) => 1 - Math.sqrt(1 - t * t),
	outCirc: (t) => Math.sqrt(1 - (t - 1) * (t - 1)),
	inOutCirc: (t) => (t *= 2) < 1 ? .5 - .5 * Math.sqrt(1 - t * t) : .5 + .5 * Math.sqrt(1 - (t -= 2) * t)
};


/**
 * @summary Interpolation helper for animations
 * @memberOf PSV
 * @description
 * Implements the Promise API with an additional "cancel" and "finally" methods.
 * The promise is resolved when the animation is complete and rejected if the animation is cancelled.
 * @example
 * new Animation({
 *     properties: {
 *         width: {start: 100, end: 200}
 *     },
 *     duration: 5000,
 *     onTick: (properties) => element.style.width = `${properties.width}px`;
 * })
 */
export default class Animation {
	constructor(options) {
		this.__cancelled = false;
		this.__resolved = false;

		this.__promise = new Promise((resolve, reject) => {
			this.__resolve = resolve;
			this.__reject = reject;
		});

		if (options) {
			if (!options.easing || typeof options.easing === 'string') {
				options.easing = EASINGS[options.easing || 'linear'];
			}
			this.__start = null;
			this.options = options;

			if (options.delay) {
				this.__delayTimeout = setTimeout(() => {
					this.__delayTimeout = null;
					window.requestAnimationFrame(t => this.__run(t));
				}, options.delay);
			} else {
				window.requestAnimationFrame(t => this.__run(t));
			}
		}
	}

	/**
	 * @summary Main loop for the animation
	 * @param {number} timestamp
	 * @private
	 */
	__run(timestamp) {
		// the animation has been cancelled
		if (this.__cancelled) {
			return;
		}

		// first iteration
		if (this.__start === null) {
			this.__start = timestamp;
		}

		// compute progress
		const progress = (timestamp - this.__start) / this.options.duration;
		const current = {};

		if (progress < 1.0) {
			// interpolate properties
			each(this.options.properties, (prop, name) => {
				if (prop) {
					current[name] = prop.start + (prop.end - prop.start) * this.options.easing(progress);
				}
			});

			this.options.onTick(current, progress);

			window.requestAnimationFrame(t => this.__run(t));
		} else {
			// call onTick one last time with final values
			each(this.options.properties, (prop, name) => {
				if (prop) {
					current[name] = prop.end;
				}
			});

			this.options.onTick(current, 1.0);

			window.requestAnimationFrame(() => {
				this.__resolved = true;
				this.__resolve();
			});
		}
	}

	/**
	 * @summary Animation chaining
	 * @param {Function} [onFulfilled] - Called when the animation is complete, can return a new animation
	 * @param {Function} [onRejected] - Called when the animation is cancelled
	 * @returns {PSV.Animation}
	 */
	then(onFulfilled = null, onRejected = null) {
		const p = new Animation();

		// Allow cancellation to climb up the promise chain
		p.__promise.then(null, () => this.cancel());

		this.__promise.then(
			() => p.__resolve(onFulfilled ? onFulfilled() : undefined),
			() => p.__reject(onRejected ? onRejected() : undefined)
		);

		return p;
	}

	/**
	 * @summary Alias to `.then(null, onRejected)`
	 * @param {Function} onRejected - Called when the animation has been cancelled
	 * @returns {PSV.Animation}
	 */
	catch (onRejected) {
		return this.then(undefined, onRejected);
	}

	/**
	 * @summary Alias to `.then(onFinally, onFinally)`
	 * @param {Function} onFinally - Called when the animation is either complete or cancelled
	 * @returns {PSV.Animation}
	 */
	finally(onFinally) {
		return this.then(onFinally, onFinally);
	}

	/**
	 * @summary Cancels the animation
	 */
	cancel() {
		if (!this.__cancelled && !this.__resolved) {
			this.__cancelled = true;
			this.__reject();

			if (this.__delayTimeout) {
				window.cancelAnimationFrame(this.__delayTimeout);
				this.__delayTimeout = null;
			}
		}
	}

	/**
	 * @summary Returns a resolved animation promise
	 * @returns {PSV.Animation}
	 */
	static resolve() {
		const p = Promise.resolve();
		p.cancel = () => {};
		p.finally = (onFinally) => {
			return p.then(onFinally, onFinally);
		};
		return p;
	}

}
