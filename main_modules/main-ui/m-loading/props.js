module.exports = {
	load: {
		type: [String, Number],
		default: () => {
			return 0
		}
	},
	mainColor: {
		type: String,
		default: () => {
			return '#fb7299'
		}
	},
	bgColor: {
		type: String,
		default: () => {
			return 'transparent'
		}
	},
	image: {
		type: String,
		default: () => {
			return ''
		}
	},
	imageStyle: {
		type: Object,
		default: () => {
			return {}
		}
	},
	height: {
		type: String,
		default: () => {
			return '100rpx'
		}
	},
	width: {
		type: String,
		default: () => {
			return '100%'
		}
	},
	isLoadingIcon: {
		type: Boolean,
		default: () => {
			return true
		}
	},
	isColumn: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	textStart: {
		type: String,
		default: () => {
			return '上拉加载更多哦~'
		}
	},
	textCenter: {
		type: String,
		default: () => {
			return '正在加载中哦! 亲~'
		}
	},
	textEnd: {
		type: String,
		default: () => {
			return '亲~ 我是有底线的哦!'
		}
	},
	i18n: {
		type: Boolean,
		default: () => {
			return false
		}
	}
}