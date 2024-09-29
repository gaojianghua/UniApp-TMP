module.exports = {
	minSpeed: { //画笔最小速度
		type: Number,
		default: 1.5
	},
	minWidth: { //线条最小粗度
		type: Number,
		default: 3,
	},
	maxWidth: { //线条最大粗度
		type: Number,
		default: 10
	},
	openSmooth: { //开启平滑线条（笔锋）
		type: Boolean,
		default: true
	},
	maxHistoryLength: { //历史最大长度
		type: Number,
		default: 20
	},
	maxWidthDiffRate: { //最大差异率
		type: Number,
		default: 20
	},
	bgColor: { //背景色
		type: String,
		default: ''
	}
}