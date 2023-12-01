module.exports = {
	current: {
		type: [Number, String],
		default: () => {
			return 0
		}
	},
	tabs: {
		type: Array,
		default: () => {
			return []
		}
	},
	iconWidth: {
		type: String,
		default: () => {
			return '48rpx'
		}
	},
	iconHeight: {
		type: String,
		default: () => {
			return '48rpx'
		}
	},
	size: {
		type: String,
		default: () => {
			return '26rpx'
		}
	},
	selectColor: {
		type: String,
		default: () => {
			return '#f27299'
		}
	},
	color: {
		type: String,
		default: () => {
			return '#999'
		}
	},
	borderColor: {
		type: String,
		default: () => {
			return '#999'
		}
	},
	bgColor: {
		type: String,
		default: () => {
			return '#fff'
		}
	},
	i18n: {
		type: Boolean,
		default: () => {
			return false
		}
	}
}