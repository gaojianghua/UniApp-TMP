import store from '@/store/index.js'

export default {
	/**
	 * @description H5唤醒APP或者前往下载地址
	 * @param schema(String) APP的schema标识
	 * @param appName(String) APP的包名(id)
	 * @param argsObj(Object) 唤醒APP携带的参数
	 * @param eleChar(string) 对象属性分隔符
	 * @param keyValueCahr(string) 键值对分隔符
	 */
	openAppPages(schema, argsObj, eleChar, keyValueCahr) {
		let str = ''
		Object.keys(argsObj).forEach((item, i) => {
			if (i == 0) {
				str += `${item}${eleChar}${argsObj[item]}`
			} else {
				str += `${keyValueCahr}${item}${eleChar}${argsObj[item]}`
			}
		})
		location.href = `${schema}://${str}`
		let time = setTimeout(() => {
			if (store.state.appSystemInfo.platform == 'ios') {
				location.href = `https://apps.apple.com/app/${$store.state.iosAppName}`
			} else if (store.state.appSystemInfo.platform == 'android') {
				location.href = `https://play.google.com/store/apps/details?id=${$store.state.androidAppName}`
			}
			clearTimeout(time)
		}, 300)
	},
	/**
	 * @description H5获取Cookie
	 * @param name(String) 名称
	 */
	getCookie(name) {
		let reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)")
		let val = document.cookie.match(reg)
		return val ? (val[2] ? unescape(val[2]) : "") : null;
	},
	/**
	 * @description H5设置Cookie
	 * @param name(String) 名称
	 * @param value(String) 值
	 * @param pexpire(Number) 过期时间
	 * @param ppath(String) 存储路径
	 * @param pdomain(String) 域名IP
	 * @param psecure(String) 安全
	 */
	setCookie(name, value, pexpire, ppath, pdomain, psecure) {
		let exp = new Date()
		let expires = arguments[2] || null
		let path = arguments[3] || "/"
		let domain = arguments[4] || null
		let secure = arguments[5] || false
		expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
		document.cookie = name + '=' + escape(value) +
			(expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ?
				';domain=' + domain :
				'') + (secure ? ';secure' :
				'')
	},
	/**
	 * @description H5删除Cookie
	 * @param name(String) 名称
	 * @param path(String) 存储路径
	 * @param domain(String) 域名IP
	 * @param secure(String) 安全
	 */
	removeCookie(name, path, domain, secure) {
		let value = this.getCookie(name);
		if (value !== null) {
			let exp = new Date();
			exp.setMinutes(exp.getMinutes() - 1000);
			path = path || "/";
			document.cookie = name +
				'=;expires=' + exp.toGMTString() + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') +
				(secure ?
					';secure' : '')
		}
	},
	// 禁用开发者工具(浏览器控制台)
	disableDeveloperTools() {
		// 禁用F12、Ctrl+Shift+I、Ctrl+Shift+J、Ctrl+U、Ctrl+Shift+C
		document.addEventListener('keydown', (event) => {
			if (
				event.key === 'F12' ||
				(event.ctrlKey && event.shiftKey && event.key === 'I') ||
				(event.ctrlKey && event.shiftKey && event.key === 'J') ||
				(event.ctrlKey && event.shiftKey && event.key === 'C') ||
				(event.ctrlKey && event.key === 'U')
			) {
				event.preventDefault();
			}
		});

		// 禁用鼠标右键
		document.addEventListener('contextmenu', (event) => {
			event.preventDefault();
		});

		// 检测是否打开控制台
		(function() {
			const devtools = /./;
			devtools.toString = function() {
				this.opened = true;
			};
			const check = function() {
				console.log('%c', devtools);
				if (devtools.opened) {
					alert('请不要打开开发者工具');
					window.close();
				}
			};
			setInterval(check, 1000);
		})();
	}
}