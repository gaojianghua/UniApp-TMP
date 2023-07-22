export default {
	// 退出 APP
	exitApp() {
		let platform = uni.getSystemInfoSync().platform
		if (platform == 'ios'){
		    plus.ios.import("UIApplication").sharedApplication().performSelector("exit")
		} else if (platform == 'android'){
		    plus.runtime.quit();
		}
	},
	// 前往系统设置
	openSystemSettings() {
		if (plus.os.name === 'iOS') {
			plus.runtime.openURL("app-settings://");
		} else {
			let Intent = plus.android.importClass("android.content.Intent");
			let Settings = plus.android.importClass("android.provider.Settings");
			let Uri = plus.android.importClass("android.net.Uri");
			let mainActivity = plus.android.runtimeMainActivity();
			let intent = new Intent();
			intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
			let uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
			intent.setData(uri);
			mainActivity.startActivity(intent);
		}
	}
}