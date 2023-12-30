module.exports = {
	isTab: {
		type: Boolean,
		default: false
	},
	newScrollTop: {
		type: Number,
		default: 0
	},
	showBackTopValue: {
		type: [Number, String],
		default: 600
	},
	zIndex: {
		type: Number,
		default: 100
	},
	customStyle: {
		type: Object,
		default: () => {
			return {}
		}
	},
	imageWidth: {
		type: String,
		default: '60rpx'
	},
	imageHeight: {
		type: String,
		default: '60rpx'
	},
	bottom: {
		type: String,
		default: '60rpx'
	},
	right: {
		type: String,
		default: '30rpx'
	},
	url: {
		type: String,
		default: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/backTop.svg'
	}
}