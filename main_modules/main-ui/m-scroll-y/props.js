module.exports = {
	scrollStyle: {
		type: Object,
		default: () => {
			return null
		}
	},
	mainColor: {
		type: String,
		default: () => {
			return '#fb7299'
		}
	},
	load: {
		type: [String, Number],
		default: () => {
			return 2
		}
	},
	scrollTop: {
		type: [String, Number],
		default: () => {
			return 0
		}
	},
	bgColor: {
		type: String,
		default: () => {
			return '#151521'
		}
	},
	loadHeight: {
		type: [String, Number],
		default: () => {
			return 100
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
	i18n: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	placeHeight: {
		type: String,
		default: () => {
			return "0"
		}
	}
}