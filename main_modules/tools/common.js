import lottie from '../lib/h5-lottie/lottie-web.min.js';
import Check from '../check/index.js'
import QRCode from 'qrcode'
class Common {
	constructor() {
		this.lock = false
	}
	/**
	 * @description 获取指定大小区间的随机数
	 */
	static getRandomNum = (min, max) => {
		return Math.floor(Math.random() * (max - min)) + min
	}
	/**
	 * @description 数据格式转换 (指定相同的Key为一个数组单元)
	 */
	static groupArrayByKey = (arr = [], key) => {
		return arr.reduce((t, v) => (!t[v[key]] && (t[v[key]] = []), t[v[key]].push(v), t), {})
	}
	/**
	 * @description 动态加载js文件
	 */
	static dynamicLoadJS = (files, callback) => {
		const head = document.getElementsByTagName('head')[0];
		Promise.all(files.map(file => {
			return new Promise(resolve => {
				const s = document.createElement('script');
				s.type = "text/javascript";
				s.async = true;
				s.src = file;
				s.addEventListener('load', (e) => resolve(), false);
				head.appendChild(s);
			});
		})).then(callback);
	}
	/**
	 * @description async await 捕获错误
	 */
	static asyncTryCatch = (promise, errorExt) => {
		return promise.then(data => [null, data]).catch(err => {
			if (errorExt) {
				const parsedError = Object.assign({}, err, errorExt)
				return [parsedError, undefined]
			}
			return [err, undefined]
		})
	}
	/**
	 * @description 深拷贝
	 */
	static deepClone(target, map = new WeakMap()) {
		if (map.get(target)) {
			return target;
		}
		// 获取当前值的构造函数：获取它的类型
		let constructor = target.constructor;
		// 检测当前对象target是否与正则、日期格式对象匹配
		if (/^(RegExp|Date)$/i.test(constructor.name)) {
			// 创建一个新的特殊对象(正则类/日期类)的实例
			return new constructor(target);
		}
		if (isObject(target)) {
			map.set(target, true); // 为循环引用的对象做标记
			const cloneTarget = Array.isArray(target) ? [] : {};
			for (let prop in target) {
				if (target.hasOwnProperty(prop)) {
					cloneTarget[prop] = deepClone(target[prop], map);
				}
			}
			return cloneTarget;
		} else {
			return target;
		}
	}
	/**
	 * @description 解析URL参数为对象
	 */
	static parseParam(url) {
		const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
		const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
		let paramsObj = {};
		// 将 params 存到对象中
		paramsArr.forEach(param => {
			if (/=/.test(param)) { // 处理有 value 的参数
				let [key, val] = param.split('='); // 分割 key 和 value
				val = decodeURIComponent(val); // 解码
				val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

				if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
					paramsObj[key] = [].concat(paramsObj[key], val);
				} else { // 如果对象没有这个 key，创建 key 并设置值
					paramsObj[key] = val;
				}
			} else { // 处理没有 value 的参数
				paramsObj[param] = true;
			}
		})
		return paramsObj;
	}
	/**
	 * @description 字符串模板
	 */
	static render(template, data) {
		const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
		if (reg.test(template)) { // 判断模板里是否有模板字符串
			const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
			template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
			return render(template, data); // 递归的渲染并返回渲染后的结构
		}
		return template; // 如果模板没有模板字符串直接返回
	}
	/**
	 * @description 函数防抖
	 * @param func 函数
	 * @param wait 定时时间(s)
	 * @param immediate 是否立即执行
	 */
	static debounce(func, wait, immediate) {
		let timeout, result;

		let debounced = function() {
			let context = this;
			let args = arguments;

			if (timeout) clearTimeout(timeout);
			if (immediate) {
				// 如果已经执行过，不再执行
				let callNow = !timeout;
				timeout = setTimeout(() => {
					timeout = null;
				}, wait)
				if (callNow) result = func.apply(context, args)
			} else {
				timeout = setTimeout(() => {
					func.apply(context, args)
				}, wait);
			}
			return result;
		};

		debounced.cancel = () => {
			clearTimeout(timeout);
			timeout = null;
		};

		return debounced;
	}
	/**
	 * @description 函数防抖
	 * @param func 函数
	 * @param wait 定时时间(s)
	 * @param options {leading: 是否立即执行一次，trailing: 结束调用后是否还要执行一次}
	 */
	static throttle(func, wait, options) {
		let timeout, context, args, result;
		let previous = 0;
		if (!options) options = {};

		let later = function() {
			previous = options.leading === false ? 0 : new Date().getTime();
			timeout = null;
			func.apply(context, args);
			if (!timeout) context = args = null;
		};

		let throttled = function() {
			let now = new Date().getTime();
			if (!previous && options.leading === false) previous = now;
			let remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				func.apply(context, args);
				if (!timeout) context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
		};

		throttled.cancel = function() {
			clearTimeout(timeout);
			previous = 0;
			timeout = null;
		}
		return throttled;
	}
	/**
	 * @description lottie动画渲染（H5端）
	 * @param el 元素id属性值
	 * @param data json数据文件
	 */
	static renderLottie(el, data) {
		const setEl = el.indexOf('#') == -1 ? '#' + el : el
		const container = document.getElementById(setEl);
		if (Check.isURL(data)) {
			lottie.loadAnimation({
				container: container,
				renderer: 'svg',
				loop: true,
				autoplay: true,
				path: data
			})
		} else {
			lottie.loadAnimation({
				container: container,
				renderer: 'svg',
				loop: true,
				autoplay: true,
				animationData: require(data)
			});
		}
	}
	/**
	 * @description 给点击事件加竞态锁
	 * @param fn 原函数
	 */
	static withLock(fn) {
		if (this.lock) return
		this.lock = true
		fn().then(() => {
			this.lock = false;
		}).catch(err => {
			throw err
		});
	};
	/**
	 * @description 生成二维码图片
	 * @param url 链接地址
	 */
	static async generateQRCode(url) {
		return await QRCode.toDataURL(url)
	};
}




export default Common