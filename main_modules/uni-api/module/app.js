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
	}
}