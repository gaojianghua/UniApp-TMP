export default {
	//验证是否授权
	getSetting() {
		uni.getSetting({
			success: (res) => {
				let setting = res.authSetting['scope.userInfo']
				uni.setStorageSync('setting', setting)
			}
		})
	},
	//登录获取code
	getCode() {
		uni.login({
			provider: 'weixin',
			success: (res) => {
				uni.setStorageSync('code', res.code)
			}
		})
	},
	// 小程序版本更新
	getVersionUpdate() {
		if (uni.canIUse("getUpdateManager")) {
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(res => {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					uni.showToast({
						icon: 'none',
						title: '小程序有新版本了哦！'
					})
				}
			});
			updateManager.onUpdateReady(res => {
				uni.showModal({
					title: "版本更新",
					content: "新版本已经准备好，确定重启应用？",
					showCancel: false,
					success: (res) => {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
			updateManager.onUpdateFailed(() => {
				// 新的版本下载失败
				uni.showModal({
					title: "已经有新版本了哟~",
					content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
				});
			});
		}
	},
	// 小程序显示原生菜单分享
	showShareMenu(share) {
		uni.showShareMenu(share)
	},
	// 打开微信客户端设置页面
	openSetting() {
		uni.openSetting({
			success: (res) => {
				if (res.authSetting['scope.bluetooth'] === true) {
					// 用户已经授权蓝牙权限
					uni.showToast({
						title: '已打开蓝牙设置',
						icon: 'none',
						duration: 1500
					})
				} else {
					// 用户未授权蓝牙权限
					uni.showToast({
						title: '请授权蓝牙权限',
						icon: 'none',
						duration: 1500
					})
				}
			}
		})
	},
	// 打开手机系统设置的蓝牙页面
	openBluetoothAdapter(success, fail) {
		uni.openBluetoothAdapter({
			success: (res) => success(res),
			fail: (err) => fail(err)
		})
	},
	/**
	 * @description 获取小程序元素信息
	 * @param ele(String) 元素id名或者类名，如：#tab .tabß
	 */
	getElementInfo(ele) {
		let info = null
		uni.createSelectorQuery().select(ele).boundingClientRect(item => {
			info = item
		}).exec()
		return info
	}
}