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
	bgColor: {
		type: String,
		default: () => {
			return 'transparent'
		}
	},
	loadHeight: {
		type: [String, Number],
		default: () => {
			return '100rpx'
		}
	},
	loadWidth: {
		type: [String, Number],
		default: () => {
			return '60rpx'
		}
	},
	refresherDefaultText: {
		type: String,
		default: () => {
			return '右拉刷新'
		}
	},
	refresherRefreshText: {
		type: String,
		default: () => {
			return "松手刷新"
		}
	},
	refresherLoadingText: {
		type: String,
		default: () => {
			return "加载中哦"
		}
	},
	textCenter: {
		type: String,
		default: () => {
			return '加载中哦'
		}
	},
	textStart: {
		type: String,
		default: () => {
			return "加载更多"
		}
	},
	textEnd: {
		type: String,
		default: () => {
			return "到底了哦"
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
	}
}