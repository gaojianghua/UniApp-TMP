import store from '@/store/index.js'
// 请求响应错误过滤
const errorMessage = (res) => {
	let isSuccess = true
	const {
		data
	} = res
	if (data.code && data.code != 200) {
		isSuccess = false
		let str = ''
		if (data.msg) {
			str = data.msg
		} else {
			str = '呀! 接口开小差啦; 贵客! 骚等哦!'
		}
		uni.showToast({
			title: str,
			icon: 'none',
			duration: 2000,
			success: () => {
				switch (data.code) {
					case 300400:
					case 300401:
					case 300402:
					case 300403:
					case 300404:
					case 300405:
					case 300406:
						uni.clearStorageSync()
						store.commit('updateUserBill', {})
						store.commit('updateUserinfo', {})
						store.commit('updateToken', '')
						uni.navigateTo({
							url: '/pages/login/index'
						})
						break;
				}
			}
		})
	}
	return isSuccess
}
// 判断上一个请求是否与当前请求相同并校验时间区间
const checkRequestIsEqual = (config, time = 1000) => {
	return lastRequest.request === JSON.stringify(config) && (Date.now() - lastRequest.timestamp <= time)
}
// 记录上一个请求的内容跟时间戳，用于判断是否与当前请求相同并校验时间区间
const lastRequest = {
	request: null,
	timestamp: null
}
// 频繁请求被拦截后返回的内容
const data = {
	code: 888,
	msg: '请勿频繁点击！'
}


module.exports = {
	errorMessage,
	checkRequestIsEqual,
	lastRequest,
	data
}