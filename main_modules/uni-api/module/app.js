import store from "@/store"
import i18n from '@/main.js'
import Navigate from '../../tools/navigate.js'
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
	// 打开手机系统设置
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
	// 打开手机通知栏设置
	openSystemMsgSettings() {
		if (plus.os.name === 'iOS') {
			//苹果打开对应的通知栏
			uni.showModal({
				title: i18n.$t('通知权限开启提醒'),
				content: i18n.$t('您还没有开启通知权限，无法接受到消息通知，请前往设置！'),
				showCancel: false,
				confirmText: i18n.$t('去设置'),
				success: res => {
					if (res.confirm) {
						let app = plus.ios.invoke('UIApplication', 'sharedApplication');
						let setting = plus.ios.invoke('NSURL', 'URLWithString:', 'app-settings:');
						plus.ios.invoke(app, 'openURL:', setting);
						plus.ios.deleteObject(setting);
						plus.ios.deleteObject(app);
					}
				}
			});
		} else {
			//android打开对应的通知栏
			let main = plus.android.runtimeMainActivity();
			let pkName = main.getPackageName();
			let uid = main.getApplicationInfo().plusGetAttribute("uid");
			uni.showModal({
				title: i18n.$t('通知权限开启提醒'),
				content: i18n.$t('您还没有开启通知权限，无法接受到消息通知，请前往设置！'),
				showCancel: false,
				confirmText: i18n.$t('去设置'),
				success: res => {
					if (res.confirm) {
						let Intent = plus.android.importClass('android.content.Intent');
						let Build = plus.android.importClass("android.os.Build");
						//android 8.0引导  
						if (Build.VERSION.SDK_INT >= 26) {
							let intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
							intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
						} else if (Build.VERSION.SDK_INT >= 21) { //android 5.0-7.0  
							let intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
							intent.putExtra("app_package", pkName);
							intent.putExtra("app_uid", uid);
						} else { //(<21)其他--跳转到该应用管理的详情页  
							intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
							let uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
							intent.setData(uri);
						}
						// 跳转到该应用的系统通知设置页  
						main.startActivity(intent);
					}
				}
			});
		}
	},
	// 计算缓存大小
	computeCacheSize() {
	    return new Promise((resolve, reject) => {
	        plus.cache.calculate(size => {
	            try {
	                let sizeCache = parseInt(size);
	                let cacheSizeStr = '';
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
	                resolve(cacheSizeStr);
	            } catch (error) {
	                reject(error);
	            }
	        });
	    });
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
	},
	// 极光推送：获取设备注册ID
	getRegistrationID(JG) { //获取registerID
		JG.getRegistrationID(result => {
			let registerID = result.registerID
			uni.setStorageSync("registerID", registerID)
			store.commit('updateRegisterID', registerID)
		})
	},
	// 极光推送：判断消息通知权限是否打开
	getNotificationEnabled(JG) {
		if (uni.getSystemInfoSync().platform == "ios") {
			JG.requestNotificationAuthorization((result) => {
				let status = result.status
				if (status < 2) {
					this.openSystemMsgSettings()
				}
			})
		} else {
			JG.isNotificationEnabled((result) => { //判断android是否打开权限
				if (result.code == 0) { //如果为0则表示 未打开通知权限 
					this.openSystemMsgSettings()
				}
			})
		}
	},
	// 极光推送：初始化
	initJG(JG, alias) {
		// #ifdef APP-PLUS
		JG.initJPushService(); // 初始化推送服务
		JG.setLoggerEnable(true); // 是否开启debug模式
		// 设置别名
		JG.setAlias({
			'alias': alias + '',
			'sequence': 1
		})
		// 判断权限
		this.getNotificationEnabled(JG);
		// 连接状态的回调
		JG.addConnectEventListener(result => {
			let connectEnable = result.connectEnable
			uni.$emit('connectStatusChange', connectEnable)
		});
		// 通知事件的回调
		JG.addNotificationListener(result => { //极光推送的消息通知回调
			JG.setBadge(0);
			plus.runtime.setBadgeNumber(0);
			let notificationEventType = result.notificationEventType
			let orderId = result.extras && result.extras.orderId;
			console.log("通知", result)
			// 点击事件
			if (notificationEventType == 'notificationOpened') {
				// this.$tools.Navigate.navigateTo('/pages/details/index', {id: orderId})
			}
		});
		uni.$on('connectStatusChange', (connectStatus) => {
			let connectStr = ''
			if (connectStatus == true) {
				connectStr = '已连接'
				// this.getRegistrationID()
			} else {
				connectStr = '未连接'
			}
			console.log('监听到了连接状态变化 --- ', connectStr)
		})
		JG.isPushStopped(res => {
			// code   0已停止推送  1未停止推送
			const {
				code
			} = res
			console.log(res, '安卓连接状态');
		})
		//#endif
	},
}