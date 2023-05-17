import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import rTime from 'dayjs/plugin/relativeTime'
dayjs.extend(rTime)

/**
 * @description 将时间戳处理为相对时间
 * @param val 时间戳
 */
export const relativeTime = (val) => {
	let lang = uni.getStorageSync('lang')
	lang == 'zh-Hans' ? dayjs.locale('zh-cn') : dayjs.locale('en')
	return dayjs().to(dayjs(parseInt(val)))
}

/**
 * @description 银行卡脱敏处理
 * @param account 银行卡号
 */
export const dealAccountNo = (account) => {
	if (account.startsWith('1')) {
		if (account.length >= 17) {
			account = account.substring(0, 4) + " **** **** " + account.substring(account.length - 4);
		}
	}
	if (account.startsWith('6')) {
		if (account.length >= 16) {
			account = account.substring(0, 4) + " **** **** " + account.substring(account.length - 4);
		}
	}
	return account
}

/**
 * @description 数值格式化w或k为单位
 * @param number 数值
 * @param unit 后缀单位
 */
export const numberFormat = (number, unit = 'w') => {
	return unit == 'w' ? (number >= 10000 ? (number.slice(-4, -3) == 0 ? number.slice(0, -4) + "w" : number.slice(0, -4) + '.' +
			number.slice(-4, -3) + "w") :
		number) : (unit == 'k' ? (number >= 1000 ? (number.slice(-3, -2) == 0 ? number.slice(0, -3) + "k" : number.slice(0, -3) + '.' +
			number.slice(-3, -2) + "k") :
		number) : number)
}

/**
 * @description 手机号脱敏
 * @param number 手机号
 */
// 
export const phoneDesensitization = (number) => {
	return number.slice(0, 3) + '****' + number.slice(number.length - 4, number.length)
}