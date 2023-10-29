module.exports = {
	item: {
		type: Object,
		default: () => {
			return {}
		}
	},
	direction: {
		type: String,
		default: () => {
			return 'Y'
		}
	},
	imageWidth: {
		type: String,
		default: () => {
			return '100%'
		}
	},
	imageHeight: {
		type: String,
		default: () => {
			return '300rpx'
		}
	},
	priceRight: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	isVIP: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	isOver: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	isSales: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	isDesc: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	isRowSlot: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	isOldPrice: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	isCartBtn: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	isChecked: {
		type: Boolean,
		default: () => {
			return false
		}
	},
}