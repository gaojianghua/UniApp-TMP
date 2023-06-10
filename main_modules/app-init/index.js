import store from '@/store/index.js'
// 获取胶囊位置
export const getTabbarCapsule = () => {
	let miniProgramCapsule = uni.getMenuButtonBoundingClientRect()
	uni.setStorageSync('miniProgramCapsule', miniProgramCapsule)
	store.commit('updateMiniProgramCapsule', miniProgramCapsule)
}
// 获取手机状态栏高度
export const getAppStatusHeight = () => {
	let statusHeight = uni.getSystemInfoSync().statusBarHeight // * plus.screen.scale;
	uni.setStorageSync('statusHeight', statusHeight)
	store.commit('updateStatusHeight', statusHeight)
}
// 获取手机屏幕高度
export const getPhoneHeight = () => {
	uni.getSystemInfo({
		success: (res) => {
			uni.setStorageSync('phoneHeight', res.windowHeight)
			store.commit('updatePhoneHeight', res.windowHeight)
		}
	})
}
// 设置自定义 Navbar 高度
export const setNavbarHeight = () => {
	// #ifdef MP
	let navbarHeight = (this.$store.state.miniProgramCapsule.top - this.$store.state.statusHeight) * 2 + this
		.$store.state.miniProgramCapsule.height
	// #endif
	// #ifndef MP
	let navbarHeight = 44
	// #endif
	uni.setStorageSync('navbarHeight', navbarHeight)
	store.commit('updateNavbarHeight', navbarHeight)
}