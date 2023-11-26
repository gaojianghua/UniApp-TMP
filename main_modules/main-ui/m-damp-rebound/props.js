module.exports = {
	isLoad: {
		type: Boolean,
		default: () => {
			return true
		}
	},
	mainColor: {
		type: String,
		default: () => {
			return '#151521'
		}
	},
	refresherDefaultText: {
		type: String,
		default: () => {
			return '亲~ 下拉可以刷新哦'
		}
	},
	refresherRefreshText: {
		type: String,
		default: () => {
			return "亲~ 可以松手了哦"
		}
	},
	refresherLoadingText: {
		type: String,
		default: () => {
			return "亲~ 正在加载中哦"
		}
	},
	isLoading: {
		type: Boolean,
		default: () => {
			return true
		}
	},
	isCustomRefresh: {
		type: Boolean,
		default: () => {
			return true
		}
	},
}