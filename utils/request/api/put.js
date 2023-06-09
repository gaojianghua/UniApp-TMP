const {
	http
} = uni.$u

/**
 * put请求
 */
// 获取APP版本号
export const getVersion = (params, config = {}) => http.put('/api/Version/getVersionInfo', params, config)
