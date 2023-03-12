import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)
import {
	getSysConfig,
	getUserInfo,
	getUserBill
} from '@/config/request/api/get.js'
export default new Vuex.Store({
	state: {
		statusHeight: 0,
		// #ifdef APP-PLUS
		tabbarHeight: 0,
		// #endif
		// #ifndef APP-PLUS
		tabbarHeight: 50,
		// #endif
		userinfo: uni.getStorageSync('userinfo') || {},
		sysConfig: uni.getStorageSync('config') || {},
		lang: uni.getStorageSync('lang') || 'en',
		userBill: uni.getStorageSync('userBill') || {}
	},
	mutations: {
		updateStatusHeight(state, e) {
			state.statusHeight = e
		},
		updateSysConfig(state, e) {
			state.sysConfig = e
		},
		updateUserinfo(state, e) {
			state.userinfo = e
		},
		updateLanguage(state, e) {
			state.lang = e
		},
		updateUserBill(state, e) {
			state.userBill = e
		},
	},
	actions: {
		async getSysConfig() {
			let {
				data,
				code
			} = await getSysConfig()
			if (code == 200) {
				this.commit('updateSysConfig', data)
				uni.setStorageSync('config', data)
			}
		},
		// 获取用户信息
		async getUserinfo() {
			let {
				data,
				code
			} = await getUserInfo()
			if (code == 200) {
				this.commit('updateUserinfo', data)
				uni.setStorageSync('userinfo', data)
			}
		},
		// 获取用户账单
		async getUserBill() {
			let {
				data,
				code
			} = await getUserBill()
			if (code == 200) {
				this.commit('updateUserBill', data)
				uni.setStorageSync('userBill', data)
			}
		},
	}
})
