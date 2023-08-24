import Check from '../../check/index.js'
export default {
	// 设置Safari浏览器多出的高度
	setSafariFitHeight() {
		if (Check.isSafari()) {
			console.log('当前是 Safari 浏览器');
			const safariFitHeight = 80
			uni.setStorageSync('safariFitHeight', safariFitHeight)
			store.commit('updateSafariFitHeight', safariFitHeight)
		} else {
			console.log('当前不是 Safari 浏览器');
		}
	}
}