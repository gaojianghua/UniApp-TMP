/**
 * 请求拦截
 * @param {Object} http
 */
import {
	checkRequestIsEqual,
	lastRequest,
	data
} from '@/main_modules/request/config.js'

module.exports = (vm) => {
	uni.$u.http.interceptors.request.use((config) => {
			let isEqual = checkRequestIsEqual(config)
			// 自定义返回值限流（不会发起请求）
			if (isEqual) return Promise.reject({data});
			// 使用Task限流 (会发起请求并取消)
			config.getTask = (task, options) => bool && task.abort()
			// 更新上一次请求的信息
			lastRequest.request = JSON.stringify(config);
			lastRequest.timestamp = Date.now();
			// 可使用async await 做异步操作
			// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
			config.data = config.data || {}
			let token = uni.getStorageSync('token') || ''
			let lang = uni.getStorageSync('lang') == 'zh-Hans' ? 'zh-cn' : 'en'
			
			// config.url = config.url + `?lang=${lang}`
			// config.header = {
			// 	token,
			// 	lang
			// }
			// console.log(config)
			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
			// console.log(vm.$store.state);
			return config
		}, (config) => // 可使用async await 做异步操作
		Promise.reject(config))
}