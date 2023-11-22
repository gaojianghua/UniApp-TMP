module.exports = {
	tabs: {
		type: Array,
		default: () => {
			return []
		}
	},
	tabsStyle: {
		type: Object,
		default: () => {
			return {}
		}
	},
	switchBtnStyle: {
		type: Object,
		default: () => {
			return {
				fontSize: '28rpx',
				color: '#FFD300'
			}
		}
	},
	tabsItemStyle: {
		type: Object,
		default: () => {
			return {
				fontSize: '28rpx'
			}
		}
	},
	activeTabsItemStyle: {
		type: Object,
		default: () => {
			return {
				color: '#ffd300'
			}
		}
	},
	unfoldImage: {
		type: String,
		default: () => {
			return ''
		}
	},
	onUnfoldImage: {
		type: String,
		default: () => {
			return ''
		}
	},
	imageWidth: {
		type: String,
		default: () => {
			return '40rpx'
		}
	},
	imageHeight: {
		type: String,
		default: () => {
			return '40rpx'
		}
	},
	packUpNum: {
		type: Number,
		default: () => {
			return 14
		}
	},
	i18n: {
		type: Boolean,
		default: () => {
			return false
		}
	}
}