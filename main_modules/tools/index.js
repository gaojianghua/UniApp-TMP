// 获取当前是周几
export const getWeekDate = () => {
	let now = new Date();
	let day = now.getDay();
	let weeks = new Array({
		id: 0,
		name: "星期日",
	}, {
		id: 1,
		name: "星期一",
	}, {
		id: 2,
		name: "星期二",
	}, {
		id: 3,
		name: "星期三",
	}, {
		id: 4,
		name: "星期四",
	}, {
		id: 5,
		name: "星期五",
	}, {
		id: 6,
		name: "星期六",
	}, );
	return weeks[day];
}

//获取指定大小区间的随机数
export const getRandomNum = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min
}

//封装跳转页面函数
export const switchTab = (url, data = null) => {
	uni.switchTab({
		url: data ? (url + '?item=' + encodeURIComponent(JSON.stringify(data))) : url
	})
}
export const navigateTo = (url, data = null) => {
	uni.navigateTo({
		url: data ? (url + '?item=' + encodeURIComponent(JSON.stringify(data))) : url
	})
}
export const redirectTo = (url, data = null) => {
	uni.redirectTo({
		url: data ? (url + '?item=' + encodeURIComponent(JSON.stringify(data))) : url
	})
}
export const navigateBack = (delta = 1) => {
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
export const receivePageData = (data) => {
	return JSON.parse(decodeURIComponent(data))
}
