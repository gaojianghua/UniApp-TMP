const {
	http
} = uni.$u

/**
 * post请求
 */
// 获取加密公钥
export const getPublicKey = (params, config = {}) => http.post('/api/user/public/key', {
	params
}, config)

// 获取APP版本号
export const getVersion = (params, config = {}) => http.post('/api/Version/getVersionInfo', params, config)

