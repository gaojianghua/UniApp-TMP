import {
	getSysConfig,
	getUserInfo
} from '@/main_modules/request/api/get.js'


export default {
	// 获取系统配置
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
	}
}
