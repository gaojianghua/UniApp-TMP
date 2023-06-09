const {
	http
} = uni.$u


/**
 * get请求
 */
// 注销账号
export const cancellation = (params, config = {}) => http.get('/', {
	params
}, config)