// 请求响应错误过滤
const errorMessage = (res) => {
	const {
		data
	} = res
	if (data.code && data.code != 200) {
		let str = ''
		if (data.msg) {
			str = data.msg
		} else {
			str = '呀! 接口开小差啦; 贵客! 骚等哦!'
		}
		uni.showToast({
			title: str,
			icon: 'none',
			duration: 2000,
			success: () => {
				let zh = str.indexOf('token')
				let en = str.indexOf('Token')
				if (zh != -1 || en != -1) {
					uni.clearStorageSync()
					store.commit('updateUserBill', {})
					uni.navigateTo({
						url: '/pages/login/index'
					})
				}
			}
		})
	}
}
