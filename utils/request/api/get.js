const {
	http
} = uni.$u


/**
 * get请求
 */
// 获取首页数据
export const getHomeData = (params, config = {}) => http.get('/api/home/data', {
	params
}, config)