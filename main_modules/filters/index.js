import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import rTime from 'dayjs/plugin/relativeTime'
dayjs.extend(rTime)

// 将时间戳处理为相对时间
export const relativeTime = (val) => {
	let lang = uni.getStorageSync('lang')
	lang == 'zh-Hans' ? dayjs.locale('zh-cn') : dayjs.locale('en')
	return dayjs().to(dayjs(parseInt(val)))
}

// 银行卡脱敏处理
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

// 数值格式化w为单位
export const numberFormat = (number) => {
	return number >= 10000 ? (number.slice(-4, -3) == 0 ? number.slice(0, -4) + "w" : number.slice(0, -4) + '.' +
			number.slice(-4, -3) + "w") :
		number
}

// 手机号脱敏
export const phoneDesensitization = (number) => {
	return number.slice(0, 3) + '****' + number.slice(number.length - 4, number.length)
}
