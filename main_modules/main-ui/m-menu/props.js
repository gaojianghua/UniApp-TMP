const props = {
	typeList: {
		type: Array,
		default: () => {
			return []
		}
	},
	height: {
		type: String,
		default: () => {
			return '100vh'
		}
	},
	width: {
		type: String,
		default: () => {
			return '200rpx'
		}
	},
	bgColor: {
		type: String,
		default: () => {
			return '#151521'
		}
	},
	scrollStyle: {
		type: Object,
		default: () => {
			return {}
		}
	},
	oneHeight: {
		type: String,
		default: () => {
			return '88rpx'
		}
	},
	oneWidth: {
		type: String,
		default: () => {
			return '200rpx'
		}
	},
	oneBgColor: {
		type: String,
		default: () => {
			return '#FA6849'
		}
	},
	twoHeight: {
		type: String,
		default: () => {
			return '88rpx'
		}
	},
	twoWidth: {
		type: String,
		default: () => {
			return '200rpx'
		}
	},
	twoBgColor: {
		type: String,
		default: () => {
			return '#FFB315'
		}
	},
	threeHeight: {
		type: String,
		default: () => {
			return '88rpx'
		}
	},
	threeWidth: {
		type: String,
		default: () => {
			return '200rpx'
		}
	},
	threeBgColor: {
		type: String,
		default: () => {
			return '#2CAFFE'
		}
	},
	chooseColor: {
		type: String,
		default: () => {
			return '#3CB87B'
		}
	},
	isAll: {
		type: Boolean,
		default: () => {
			return true
		}
	},
	oneStyle: {
		type: Object,
		default: () => {
			return {}
		}
	},
	twoStyle: {
		type: Object,
		default: () => {
			return {}
		}
	},
	threeStyle: {
		type: Object,
		default: () => {
			return {}
		}
	},
	isAccordion: {
		type: Boolean,
		default: () => {
			return true
		}
	}
}

module.exports = props
