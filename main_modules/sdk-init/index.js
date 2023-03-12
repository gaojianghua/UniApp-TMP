import permision from "@/js_sdk/wa-permission/permission.js";

//获取定位
export const checkOpenPermission = async (e) => {
	//ios 权限
	if (uni.getSystemInfoSync().platform == 'ios') {
		var cllocationManger = plus.ios.import("CLLocationManager");
		var enable = cllocationManger.locationServicesEnabled();
		var status = cllocationManger.authorizationStatus();
		if (enable && status != 2) {
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: (res) => {
					e.location.longitude = res.longitude
					e.location.latitude = res.latitude
					e.address = res.address
				}
			})
		} else {
			plus.nativeUI.confirm("定位权限没有开启，是否去开启？", function(e) {
				if (e.index == 0) {
					var UIApplication = plus.ios.import("UIApplication");
					var application2 = UIApplication.sharedApplication();
					var NSURL2 = plus.ios.import("NSURL");
					var setting2 = NSURL2.URLWithString("app-settings:");
					application2.openURL(setting2);
					plus.ios.deleteObject(setting2);
					plus.ios.deleteObject(NSURL2);
					plus.ios.deleteObject(application2);
				}
			}, {
				"buttons": ["Yes", "No"],
				"verticalAlign": "center"
			});
		}
		plus.ios.deleteObject(cllocationManger);
	} else {
		let result = await permision.requestAndroidPermission('android.permission.ACCESS_FINE_LOCATION');
		if (result == 1) {
			uni.getLocation({
				type: 'gcj02',
				geocode: true,
				success: (res) => {
					e.location.longitude = res.longitude
					e.location.latitude = res.latitude
					e.address = res.address
					console.log(res, getApp().globalData)
				},
				fail: (res) => {
					console.log(res)
				}
			});
		} else {
			uni.showModal({
				title: '提示',
				content: '请开启位置信息权限',
				showCancel: false,
				success() {
					permision.gotoAppPermissionSetting(); // 打开权限设置界面
				}
			});
		}
	}
}
export const checkOpenService = () => {
	let result = permision.checkSystemEnableLocation();
	if (!result) {
		uni.showModal({
			title: '提示',
			content: '请打开定位服务功能',
			showCancel: false,
			success() {
				var main = plus.android.runtimeMainActivity();
				var Intent = plus.android.importClass('android.content.Intent');
				var Settings = plus.android.importClass('android.provider.Settings');
				var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
				main.startActivity(intent); // 打开系统设置GPS服务页面
			}
		});
	} else {
		console.log('已开启定位服务功能');
	}
}

export const TUIkitLogin = async () => {
	let userInfo = uni.getStorageSync('userInfo')
	if (userInfo) {
		getUserSig().then((res) => {
			console.log(res)
			uni.$TUIKit.login({
				userID: `${userInfo.userId}`,
				userSig: res.data
			}).then((imResponse) => {
				if (imResponse.data.repeatLogin === true) {
					// 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
					console.log(imResponse.data.errorInfo);
				}
			}).catch((imError) => {
				console.warn('login error:', imError); // 登录失败的相关信息
			});
		})
	} else {
		return
	}
}