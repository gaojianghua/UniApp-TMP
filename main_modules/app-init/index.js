import store from '@/store'
import i18n from '@/main.js'
import multiportApi from "../uni-api/index.js"
// 获取胶囊位置
export const getTabbarCapsule = () => {
	let miniProgramCapsule = uni.getMenuButtonBoundingClientRect()
	uni.setStorageSync('miniProgramCapsule', miniProgramCapsule)
	store.commit('updateMiniProgramCapsule', miniProgramCapsule)
}
// 获取手机状态栏高度
export const getAppStatusHeight = () => {
	let statusHeight = uni.getSystemInfoSync().statusBarHeight // * plus.screen.scale;
	uni.setStorageSync('statusHeight', statusHeight)
	store.commit('updateStatusHeight', statusHeight)
}
// 设置自定义 Navbar 高度
export const setNavbarHeight = () => {
	// #ifdef MP
	let navbarHeight = (store.state.miniProgramCapsule.top - store.state.statusHeight) * 2 + store.state
		.miniProgramCapsule.height
	// #endif
	// #ifndef MP
	let navbarHeight = 44
	// #endif
	uni.setStorageSync('navbarHeight', navbarHeight)
	store.commit('updateNavbarHeight', navbarHeight)
}

// 获取设备信息并存储
export const getAppVersion = () => {
	let appSystemInfo = uni.getSystemInfoSync()
	uni.setStorageSync('appSystemInfo', appSystemInfo)
	store.commit('updateAppSystemInfo', appSystemInfo)
}

// 获取各浏览器多出的高度
export const getBrowserFitHeight = () => {
	// #ifdef H5
	const userAgent = navigator.userAgent.toLowerCase();
	// uni.showToast({
	// 	title: userAgent,
	// 	icon: 'none',
	// 	duration:10000
	// })
	let browserFitHeight = 0
	if (userAgent.includes('qq') || !userAgent.includes('mobile')) {
		// 当前在 QQ 浏览器或 PC端浏览器中运行
		uni.setStorageSync('browserFitHeight', browserFitHeight)
		store.commit('updateBrowserFitHeight', browserFitHeight)
		return
	}
	if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
		// 当前在 Safari 浏览器中运行
		browserFitHeight = 80
		uni.setStorageSync('browserFitHeight', browserFitHeight)
		store.commit('updateBrowserFitHeight', browserFitHeight)
		console.log('当前网址在 Safari 浏览器中运行');
	} else if (userAgent.includes('chrome')) {
		// 当前在 Google 浏览器中运行
		browserFitHeight = 54
		uni.setStorageSync('browserFitHeight', browserFitHeight)
		store.commit('updateBrowserFitHeight', browserFitHeight)
		console.log('当前是 Google 浏览器');
	} else {
		// 当前在其他浏览器中运行
		uni.setStorageSync('browserFitHeight', browserFitHeight)
		store.commit('updateBrowserFitHeight', browserFitHeight)
	}
	// #endif
}

// 获取手机通讯录
export const getContacts = (cb) => {
	// #ifdef H5
	if ('contacts' in navigator) {
		navigator.contacts.select(['displayName', 'phoneNumbers'], (contacts) => {
			console.log(contacts)
			// 处理通讯录数据
		}, (error) => {
			console.log('Failed to retrieve contacts:', error);
		});
	} else {
		console.log('Contacts API not supported');
	}
	// #endif
	// #ifdef APP-PLUS
	plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, (addressbook) => {
		addressbook.find(["displayName", "phoneNumbers"], (contacts) => {
			let array = []
			contacts.forEach((item) => {
				let obj = {}
				obj.name = item.displayName
				obj.phone = item.phoneNumbers[0].value
				if (item.phoneNumbers.length > 1) {
					let phoneStr = ''
					item.phoneNumbers.forEach((phone, i) => {
						if (i > 0) {
							phoneStr = phoneStr + ',' + phone
						} else {
							phoneStr = phone
						}
					})
				} else {
					obj.phone = item.phoneNumbers[0].value
				}
				array.push(obj)
			})
			cb && cb(array)
		}, () => {
			console.log("检索通讯录失败");
		});
	}, () => {
		console.log("获取通讯录失败");
		uni.showModal({
			title: i18n ? i18n.$t('提示') : '提示',
			content: i18n ? i18n.$t('请转到系统设置以打开地址簿权限') : '请转到系统设置以打开地址簿权限',
			confirmText: i18n ? i18n.$t('去设置') : '去设置',
			cancelText: i18n ? i18n.$t('退出') : "退出",
			success: (res) => {
				if (res.confirm) {
					// 用户点击了“去设置”按钮，跳转到系统设置页面
					multiportApi.app.openSystemSettings()
					// multiportApi.app.exitApp()
				}
				if (res.cancel) {
					// multiportApi.app.exitApp()
				}
			}
		});
	});
	// #endif
}