export default {
	// 退出 APP
	exitApp() {
		let platform = uni.getSystemInfoSync().platform
		if (platform == 'ios'){
		    plus.ios.import("UIApplication").sharedApplication().performSelector("exit")
		} else if (platform == 'android'){
		    plus.runtime.quit();
		}
	}
}