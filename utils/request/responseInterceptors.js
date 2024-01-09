import {
	errorMessage
} from '@/main_modules/request/config.js'
/**
 * 响应拦截
 * @param {Object} http 
 */
module.exports = (vm) => {
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		errorMessage(response)
		/* 返回成功数据 */
		return response.data || {}
	}, (response) => {
		/*  对响应错误做点什么 */
		errorMessage(response)
		/* 返回错误数据 */
		return Promise.reject(response)
	})
}
