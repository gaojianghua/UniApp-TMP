export default {
	data() {
		return {
			scrollTop: 0,
		}
	},
	methods: {
		// 滚动事件
		scroll(i) {
			this.scrollTop = i
		},
		// 点击返回顶部
		backTop() {
			this.scrollTop = 0
		}
	}
}