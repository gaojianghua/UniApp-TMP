const {
	http
} = uni.$u


/**
 * get请求
 */
// 获取加密公钥
export const getPublicKey = (params, config = {}) => http.get('/api/user/public/key', {
	params
}, config)