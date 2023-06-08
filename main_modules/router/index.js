import Check from '../check/index.js'

class MinRouter {
	constructor(args) {
		if (Check.isObject(args)) {
			this.routes = args.routes
		}
	}

	_push({
		type,
		path,
		paramsStr
	}) {
		return new Promise((resolve, reject) => {
			uni[type]({
				url: `/${path}?params=${paramsStr}`,
				success: resolve,
				fail: reject
			})
		})
	}

	_next(args) {
		return new Promise((resolve) => {
			if (Check.isFunction(this._beforeEach)) {
				const routers = getCurrentPages()
				let route
				if (routers.length > 0) {
					const router = routers[routers.length - 1]
					route = router.route
				}
				this._beforeEach(args.path, route, resolve)
			} else {
				resolve(args)
			}
		})
	}

	push(args) {
		let name;
		let params = {};
		let paramsStr = null;
		let path;
		let type;
		let isPage = false
		switch (true) {
			case Check.isObject(args):
				({
					name,
					params = {}
				} = args)
				break
			case Check.isString(args):
				name = args
				break
			default:
				throw new Error('参数必须是对象或者字符串')
		}

		if (Check.isObject(params)) {
			paramsStr = JSON.stringify(params)
		} else {
			throw new Error('params数据必须是Object')
		}

		this.routes.forEach(item => {
			if (item.name === name) {
				path = item.path
				type = item.type || 'navigateTo'
				isPage = true
			}
		})

		if (!isPage) {
			throw new Error(`没有${name}页面`)
		}

		if (!['navigateTo', 'switchTab', 'reLaunch', 'redirectTo'].includes(type)) {
			throw new Error(`name:${name}里面的type必须是以下的值['navigateTo', 'switchTab', 'reLaunch', 'redirectTo']`)
		}

		const arg = {
			type,
			path,
			paramsStr
		}

		this._next(arg).then(res => {
			switch (true) {
				case Check.isUndefined(res):
					this._push(arg)
					break
				case Check.isFalse(res):
					break
				default:
					this._push(res)
					break
			}
		})
	}

	back(delta = 1) {
		uni.navigateBack({
			delta
		})
	}

	beforeEach(func) {
		this._beforeEach = func
	}
}

function parseURL() {
	const query = this.$root.$mp.query.params
	if (query) {
		return JSON.parse(query)
	} else {
		return {}
	}
}

MinRouter._beforeEach = null
MinRouter.install = function(Vue) {
	Vue.mixin({
		beforeCreate: function() {
			if (!Check.isUndefined(this.$options.minRouter)) {
				Vue._minRouter = this.$options.minRouter
			}
		}
	})
	Object.defineProperty(Vue.prototype, '$minRouter', {
		get: function() {
			return Vue._minRouter
		}
	})
	Object.defineProperty(Vue.prototype, '$parseURL', {
		get: function() {
			return parseURL
		}
	})
}

const routes = []
const pageFiles = require.context('@/pages', true, /\.vue$/)
pageFiles.keys().forEach(path => {
	const pagepath = path.replace(/^\.\/(.*)\.vue$/, 'pages/$1')
	const pageName = path.replace(/^\.\/(.*)\/index\.vue$/, '$1')
	const pageContent = pageFiles(path).default

	const arr = pageContent.navigate

	if (Check.isArray(arr)) {
		arr.forEach(type => {
			if (!['navigateTo', 'switchTab', 'reLaunch', 'redirectTo'].includes(type)) {
				throw new Error(
					'navigate: 页面里面的navigate必须是以下的值[\'navigateTo\', \'switchTab\', \'reLaunch\', \'redirectTo\']'
				)
			}
			switch (type) {
				case 'navigateTo':
					routes.push({
						path: pagepath,
						name: pageName,
						type
					})
					break
				case 'switchTab':
					routes.push({
						path: pagepath,
						name: `sw${pageName}`,
						type
					})
					break
				case 'reLaunch':
					routes.push({
						path: pagepath,
						name: `rel${pageName}`,
						type
					})
					break
				case 'redirectTo':
					routes.push({
						path: pagepath,
						name: `red${pageName}`,
						type
					})
					break
			}
		})
	}
})

const router = new MinRouter({
	routes
})

export {
	router
}

export default MinRouter
