export default {
	statusHeight: 0,
	// #ifdef APP-PLUS
	tabbarHeight: 0,
	// #endif
	// #ifndef APP-PLUS
	tabbarHeight: 50,
	// #endif
	userinfo: uni.getStorageSync('userinfo') || {},
	sysConfig: uni.getStorageSync('config') || {},
	lang: uni.getStorageSync('lang') || 'en',
	userBill: uni.getStorageSync('userBill') || {},
	phoneHeight: uni.getStorageSync('phoneHeight') || {},
}
