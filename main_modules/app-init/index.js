import store from '@/store'
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
// 获取手机屏幕高度
export const getPhoneHeight = () => {
	uni.getSystemInfo({
		success: (res) => {
			uni.setStorageSync('phoneHeight', res.windowHeight)
			store.commit('updatePhoneHeight', res.windowHeight)
		}
	})
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

// 获取版本号
export const getAppVersion = () => {
	let appSystemInfo = uni.getSystemInfoSync()
	uni.setStorageSync('appSystemInfo', appSystemInfo)
	store.commit('updateAppSystemInfo', appSystemInfo)
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
			title: 'Tips',
			content: 'Please go to System Settings to turn on address book permissions',
			confirmText: 'Go to Settings',
			cancelText: 'Exit',
			success: (res) => {
				if (res.confirm) {
					// 用户点击了“去设置”按钮，跳转到系统设置页面
					multiportApi.app.openSystemSettings()
					multiportApi.app.exitApp()
				}
				if (res.cancel) {
					multiportApi.app.exitApp()
				}
			}
		});
	});
	// #endif
}