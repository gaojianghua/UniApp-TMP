import check from '../check/index.js'

class Navigate {
	// 设置明文参数
	static setPlaintext = (data) => {
		if (check.isString(data) || check.isNumber(data) || check.isBoolean(data)) {
			return data
		}else if (check.isObject(data) || check.isMap(data)) {
			let str = ''
			Object.keys(data).forEach((item, i) => {
				i == 0 ? (str = `?${item}=${data[item]}`) : (str = str + `&${item}=${data[item]}`)
			})
			return str
		}else {
			throw new Error('参数不合法')
		}
	}
	//封装跳转页面函数
	static switchTab = (url, data = null, plaintext = false) => {
		uni.switchTab({
			url: data ? (url + (plaintext ? this.setPlaintext(data) : ('?item=' + encodeURIComponent(JSON.stringify(data))))) : url
		})
	}
	static navigateTo = (url, data = null, plaintext = false) => {
		uni.navigateTo({
			url: data ? (url + (plaintext ? this.setPlaintext(data) : ('?item=' + encodeURIComponent(JSON.stringify(data))))) : url
		})
	}
	static redirectTo = (url, data = null, plaintext = false) => {
		uni.redirectTo({
			url: data ? (url + (plaintext ? this.setPlaintext(data) : ('?item=' + encodeURIComponent(JSON.stringify(data))))) : url
		})
	}
	static reLaunch = (url, data = null, plaintext = false) => {
		uni.reLaunch({
			url: data ? (url + (plaintext ? this.setPlaintext(data) : ('?item=' + encodeURIComponent(JSON.stringify(data))))) : url
		})
	}
	static navigateBack = (delta = 1) => {
		// #ifndef H5
		uni.navigateBack({
			delta
		})
		// #endif
		// #ifdef H5
		let canNavBack = getCurrentPages()
		if (canNavBack && canNavBack.length > 1) {
			uni.navigateBack({
				delta
			})
		} else {
			history.back();
		}
		// #endif
	}
	// 页面接收参数封装
	static receivePageData = (data, plaintext = false) => {
		return !plaintext ? JSON.parse(decodeURIComponent(data.item)) : data
	}
}


export default Navigate