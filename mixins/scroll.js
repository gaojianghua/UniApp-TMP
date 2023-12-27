export default {
	data() {
		return {
			scrollTop: 0,
			newScrollTop: 0
		}
	},
	methods: {
		// 滚动事件
		scroll(i) {
			this.newScrollTop = i
		},
		// 点击返回顶部
		backTop() {
			this.scrollTop == 0 ? this.scrollTop = 0.1 : this.scrollTop = 0
		}
	}
}