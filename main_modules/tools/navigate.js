
class Navigate {
	//封装跳转页面函数
	static switchTab = (url, data = null) => {
		uni.switchTab({
			url: data ? (url + '?item=' + encodeURIComponent(JSON.stringify(data))) : url
		})
	}
	static navigateTo = (url, data = null) => {
		uni.navigateTo({
			url: data ? (url + '?item=' + encodeURIComponent(JSON.stringify(data))) : url
		})
	}
	static redirectTo = (url, data = null) => {
		uni.redirectTo({
			url: data ? (url + '?item=' + encodeURIComponent(JSON.stringify(data))) : url
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
	static receivePageData = (data) => {
		return JSON.parse(decodeURIComponent(data))
	}
}


export default Navigate