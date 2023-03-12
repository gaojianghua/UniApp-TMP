const toString = Object.prototype.toString

class Check {
	/**
	 * @description 判断是否是Object类型
	 */
	static isObject(value) {
		return toString.call(value) === '[object Object]'
	}

	/**
	 * @description 判断是否是Array类型
	 */
	static isArray(value) {
		return toString.call(value) === '[object Array]'
	}

	/**
	 * @description 判断是否是Function类型
	 */
	static isFunction(value) {
		return toString.call(value) === '[object Function]'
	}

	/**
	 * @description 判断是否是String类型
	 */
	static isString(value) {
		return toString.call(value) === '[object String]'
	}

	/**
	 * @description 判断是否是Undefined类型
	 */
	static isUndefined(value) {
		return toString.call(value) === '[object Undefined]'
	}

	/**
	 * @description 判断是否是Boolean类型
	 */
	static isBoolean(value) {
		return toString.call(value) === '[object Boolean]'
	}

	/**
	 * @description 判断是否是false
	 */
	static isFalse(value) {
		return value === false
	}
}

export default Check
