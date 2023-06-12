export default {
	data() {
		return {
			// #ifdef MP
			miniShare: {
				title: '自定义分享标题',
				path: '/pages/test/test?id=123'
			},
			// #endif
		}
	},
	// #ifdef MP
	onShareAppMessage(res) {
		if (res.from === 'button') { // 来自页面内分享按钮
			console.log(res.target)
		}
		return this.miniShare
	}
	// #endif
}