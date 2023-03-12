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
	//登录
	getCode() {
		uni.login({
			provider: 'weixin',
			success: (res) => {
				uni.setStorageSync('code', res.code)
			}
		})
	}
}