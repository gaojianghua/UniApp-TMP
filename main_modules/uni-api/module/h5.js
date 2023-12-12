import Check from '../../check/index.js'
import store from '@/store/index.js'

const recognition = new webkitSpeechRecognition();
export default {
	// 设置Safari浏览器多出的高度
	setSafariFitHeight() {
		if (Check.isSafari()) {
			const safariFitHeight = 80
			uni.setStorageSync('safariFitHeight', safariFitHeight)
			store.commit('updateSafariFitHeight', safariFitHeight)
		} else {
			console.log('当前不是 Safari 浏览器');
		}
	},
	/**
	 * @description H5唤醒APP或者前往下载地址
	 * @param schema(String) APP的schema标识
	 * @param appName(String) APP的包名(id)
	 * @param argsObj(Object) 唤醒APP携带的参数
	 * @param eleChar(string) 对象属性分隔符
	 * @param keyValueCahr(string) 键值对分隔符
	 */
	openAppPages(schema, argsObj, eleChar, keyValueCahr) {
		let str = ''
		Object.keys(argsObj).forEach((item, i) => {
			if (i == 0) {
				str += `${item}${eleChar}${argsObj[item]}` 
			}else {
				str += `${keyValueCahr}${item}${eleChar}${argsObj[item]}` 
			}
		})
		location.href = `${schema}://${str}`
		let time = setTimeout(() => {
			if (store.state.appSystemInfo.platform == 'ios') {
				location.href = `https://apps.apple.com/app/${$store.state.iosAppName}`
			}else if (store.state.appSystemInfo.platform == 'android') {
				location.href = `https://play.google.com/store/apps/details?id=${$store.state.androidAppName}`
			}
			clearTimeout(time)
		}, 300)
	}
}