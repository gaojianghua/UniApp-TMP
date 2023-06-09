const {
	http
} = uni.$u


/**
 * delete请求
 */
// 注销账号
export const cancellation = (params, config = {}) => http.delete('/', {
	params
}, config)