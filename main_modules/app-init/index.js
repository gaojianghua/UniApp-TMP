import store from '@/store/index.js'
//获取胶囊位置
export const getTabbarCapsule = () => {
	let tabbarCapsule = uni.getMenuButtonBoundingClientRect()
	uni.setStorageSync('tabbarCapsule', tabbarCapsule)
}
//获取APP状态栏高度
export const getAppStatusHeight = () => {
	let statusHeight = plus.navigator.getStatusbarHeight() // * plus.screen.scale;
	uni.setStorageSync('statusHeight', statusHeight)
	store.commit('updateStatusHeight', statusHeight)
}
//获取手机屏幕高度
export const getPhoneHeight = () => {
	uni.getSystemInfo({
		success: (res) => {
			uni.setStorageSync('phoneHeight', res.windowHeight)
			store.commit('updatePhoneHeight', res.windowHeight)
		}
	})
}