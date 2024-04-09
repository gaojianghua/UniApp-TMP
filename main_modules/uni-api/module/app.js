import store from "@/store"
export default {
	// 退出 APP
	exitApp() {
		let platform = uni.getSystemInfoSync().platform
		if (platform == 'ios') {
			plus.ios.import("UIApplication").sharedApplication().performSelector("exit")
		} else if (platform == 'android') {
			plus.runtime.quit();
		}
	},
	// 前往系统设置
	openSystemSettings() {
		if (plus.os.name === 'iOS') {
			let UIApplication = plus.ios.import("UIApplication");
			let application2 = UIApplication.sharedApplication();
			let NSURL2 = plus.ios.import("NSURL");
			let setting2 = NSURL2.URLWithString("app-settings:");
			application2.openURL(setting2);
			plus.ios.deleteObject(setting2);
			plus.ios.deleteObject(NSURL2);
			plus.ios.deleteObject(application2);
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
	},
	// 计算缓存大小
	computeCacheSize() {
		let cacheSizeStr = ''
		plus.cache.calculate(size => {
			let sizeCache = parseInt(size);
			if (sizeCache == 0) {
				cacheSizeStr = "0B";
			} else if (sizeCache < 1024) {
				cacheSizeStr = sizeCache + "B";
			} else if (sizeCache < 1048576) {
				cacheSizeStr = (sizeCache / 1024).toFixed(2) + "KB";
			} else if (sizeCache < 1073741824) {
				cacheSizeStr = (sizeCache / 1048576).toFixed(2) + "MB";
			} else {
				cacheSizeStr = (sizeCache / 1073741824).toFixed(2) + "GB";
			}
		});
		return cacheSizeStr
	},
	// 清除缓存
	clearCache(callback) {
		let os = plus.os.name;
		if (os == 'Android') {
			let main = plus.android.runtimeMainActivity();
			let sdRoot = main.getCacheDir();
			let files = plus.android.invoke(sdRoot, "listFiles");
			let len = files.length;
			for (let i = 0; i < len; i++) {
				let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
				plus.io.resolveLocalFileSystemURL(filePath, (entry) => {
					if (entry.isDirectory) {
						entry.removeRecursively((entry) => { //递归删除其下的所有文件及子目录  
							callback()
						}, (e) => {
							console.log(e.message)
						});
					} else {
						entry.remove();
					}
				}, (e) => {
					console.log('文件路径读取失败')
				});
			}
		} else { // ios  
			plus.cache.clear(() => {
				callback()
			});
		}
	},
	// 获取电量
	getBatteryLevel() {
		let battery = {
			batteryState: '',
			batteryLevel: ''
		}
		if (store.state.appSystemInfo.platform === 'ios') {
			// 获取ios电量
			let UIDevice = plus.ios.import("UIDevice")
			let dev = UIDevice.currentDevice()
			if (!dev.isBatteryMonitoringEnabled()) {  
			    dev.setBatteryMonitoringEnabled(true) 
			}
			battery.batteryState = dev.batteryState()
			battery.batteryLevel = dev.batteryLevel() * 100
		}
		else {
			// 获取安卓电量
			let main = plus.android.runtimeMainActivity();
			let Intent = plus.android.importClass('android.content.Intent');  
			let recevier = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {  
			    onReceive: (context, intent) => {  
			        let action = intent.getAction();  
			        if (action == Intent.ACTION_BATTERY_CHANGED) {  
			            battery.batteryState = intent.getIntExtra("status", 0); //电池状态  
						battery.batteryLevel = intent.getIntExtra("level", 0); //电量
			        }  
			    }  
			 });  
			let IntentFilter = plus.android.importClass('android.content.IntentFilter');  
			let filter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);  
			main.registerReceiver(recevier, filter); 
		}
		return battery
	},
	/**
	 * @description 配置APP被唤醒至指定页面
	 * @param eleChar(string) 对象属性分隔符
	 * @param keyValueCahr(string) 键值对分隔符
	 * @param goodsId(string) 同一页面的商品id唯一标识名
	 */
	openAppPage(eleChar, keyValueCahr, goodsId) {
		const pages = getCurrentPages();
		const currentPage = pages[pages.length - 1];
		const route = currentPage && currentPage.route != undefined ? '/' + currentPage.route : ''
		let args = plus.runtime.arguments;
		let argsStr = args.split('//')[1];
		if (argsStr) {
			let argsObj = MString.convertStringToObject(argsStr, eleChar, keyValueCahr)
			if (route == argsObj.url && currentPage.$vm[goodsId] == argsObj[goodsId]) {
				return
			}else {
				let url = argsObj.url
				delete argsObj.url
				Navigate.navigateTo(url, argsObj, true)
			}
		}
	}
}