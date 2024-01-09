import config from '@/.env/index.js'
export default {
	intercept: {
		BASE_URL: config.baseURL,
		// 请求拦截器
		beforeRequest(options = {}) {
			return new Promise((resolve, reject) => {
				options.url = this.BASE_URL + options.url;
				options.method = options.method || 'GET';
				options.data = options.method === 'GET' || options.method === 'DELETE' ? options.data : JSON
					.stringify(options.data);
				// 封装自己的请求头
				let token = uni.getStorageSync('token') || ''
				let lang = uni.getStorageSync('lang') == 'zh-Hans' ? 'zh-cn' : 'en'
				options.header = {
					...options.header,
					token,
					lang
				}
				// 额外处理
				options.url = options.url + `?lang=${lang}`
				resolve(options)
			})
		},
		// 响应拦截器
		handleResponse(data) {
			return new Promise((resolve, reject) => {
				const [err, res] = data;
				// 处理错误
				if (res) {
					this.errorMessage(res)
				}
				if (err) {
					this.errorMessage(err)
					return reject(err);
				}
				return resolve(res)
			})
		}
	},
	// request 请求
	request(options = {}) {
		return this.intercept.beforeRequest(options).then(opt => {
			// 这里看不懂的可以看上面 uni.request 三种请求方式的第二种
			return uni.request(opt)
		}).then(res => this.intercept.handleResponse(res))
	}
}
