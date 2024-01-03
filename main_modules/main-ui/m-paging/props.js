module.exports = {
	totalPageNum: {	// 总页数
		type: Number,
		default: () => {
			return 0
		}
	},
	defaultColor: {
		type: String,
		default: () => {
			return '#111'
		}
	},
	activeColor: {
		type: String,
		default: () => {
			return '#f27299'
		}
	}
}