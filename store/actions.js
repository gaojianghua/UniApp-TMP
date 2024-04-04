import {
	getSysConfig,
	getUserInfo
} from '@/main_modules/request/api/get.js'


export default {
	// 获取系统配置
	async getSysConfig({
		commit
	}) {
		// let {
		// 	data,
		// 	code
		// } = await getSysConfig()
		let code = 200
		let data = {
			points: 10
		}
		if (code == 200) {
			commit('updateSysConfig', data)
			uni.setStorageSync('config', data)
		}
	},
	// 获取购物车数据
	async getCartList({
		commit
	}) {
		let {
			data,
			code
		} = await getCartList()
		if (code == 200) {
			commit('updateCartList', data.list)
			uni.setStorageSync('cartList', data.list)
		}
	},
	// 获取用户信息
	async getUserinfo({
		commit
	}) {
		// let {
		// 	data,
		// 	code
		// } = await getUserInfo()
		let code = 200
		let data = {
			name: '高江华',
			id: '86579236',
			points: 20808,
			phone: '15257184434',
			email: 'G598670138@163.com',
			avatar: 'https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/home/wolffy.png',
			inviteCode: '86E7B8',
			isVIP: true,
			VIPExpirationTime: '2025-12-12'
		}
		if (code == 200) {
			commit('updateUserinfo', data)
			uni.setStorageSync('userinfo', data)
		}
	},
	// 获取定位数据
	getLocation({
		commit
	}) {
		uni.getLocation({
			isHighAccuracy: true,
			geocode: true,
			success: (e) => {
				!e.address ? commit('updateLocation', {
					address: {
						city: '武汉'
					}
				}) :
				commit('updateLocation', e)
			},
			fail: (e) => {
				uni.showToast({
					title: '获取当前地址失败',
					icon: 'none'
				})
			}
		})
	}
}
