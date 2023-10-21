module.exports = {
	item: {
		type: Object,
		default: () => {
			return {}
		}
	},
	textCenter: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	itemStyle: {
		type: Object,
		default: () => {
			return {}
		}
	},
	BBColor: {
		type: String,
		default: () => {
			return '#eee'
		}
	},
	i18n: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	imgWidth: {
		type: String,
		default: () => {
			return '41rpx'
		}
	},
	imgHeight: {
		type: String,
		default: () => {
			return '41rpx'
		}
	},
	mode: {
		type: String,
		default: () => {
			return 'aspectFit'
		}
	},
	isIcon: {
		type: Boolean,
		default: () => {
			return true
		}
	},
	isActive: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	isShowR: {
		type: Boolean,
		default: () => {
			return true
		}
	},
	isShowL: {
		type: Boolean,
		default: () => {
			return true
		}
	},
	radius: {
		type: [String, Number],
		default: () => {
			return 2
		}
	},
	color: {
		type: String,
		default: () => {
			return '#333'
		}
	},
	iconColor: {
		type: String,
		default: () => {
			return '#999'
		}
	}
}