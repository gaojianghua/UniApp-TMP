import {
	getSysConfig,
	getUserInfo,
	getUserBill
} from '@/main_modules/request/api/get.js'


export default {
	async getSysConfig({
		commit
	}) {
		let {
			data,
			code
		} = await getSysConfig()
		if (code == 200) {
			commit('updateSysConfig', data)
			uni.setStorageSync('config', data)
		}
	},
	// 获取用户信息
	async getUserinfo({
		commit
	}) {
		let {
			data,
			code
		} = await getUserInfo()
		if (code == 200) {
			commit('updateUserinfo', data)
			uni.setStorageSync('userinfo', data)
		}
	},
	// 获取用户账单
	async getUserBill({
		commit
	}) {
		let {
			data,
			code
		} = await getUserBill()
		if (code == 200) {
			commit('updateUserBill', data)
			uni.setStorageSync('userBill', data)
		}
	},
}
