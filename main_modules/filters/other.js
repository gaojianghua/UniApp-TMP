import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import rTime from 'dayjs/plugin/relativeTime'
import config from '../request/config.js'
dayjs.extend(rTime)


class Other {
	/**
	 * @description 将时间戳处理为相对时间
	 * @param val 时间戳
	 */
	static relativeTime = (val) => {
		let lang = uni.getStorageSync('lang')
		lang == 'zh-Hans' ? dayjs.locale('zh-cn') : dayjs.locale('en')
		return dayjs().to(dayjs(parseInt(val)))
	}

	/**
	 * @description 银行卡脱敏处理
	 * @param account 银行卡号
	 */
	static dealAccountNo = (account) => {
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
	static numberFormat = (number, unit = 'w') => {
		return unit == 'w' ? (number >= 10000 ? (number.slice(-4, -3) == 0 ? number.slice(0, -4) + "w" : number
				.slice(0,
					-4) + '.' +
				number.slice(-4, -3) + "w") :
			number) : (unit == 'k' ? (number >= 1000 ? (number.slice(-3, -2) == 0 ? number.slice(0, -3) + "k" :
				number.slice(0, -3) + '.' +
				number.slice(-3, -2) + "k") :
			number) : number)
	}

	/**
	 * @description 手机号脱敏
	 * @param number 手机号
	 */
	static phoneDesensitization = (number) => {
		return number.slice(0, 3) + '****' + number.slice(number.length - 4, number.length)
	}

	/**
	 * @description 媒体链接地址处理
	 * @param string URL地址
	 */
	static mediaUrlDeal = (data) => {
		return data.indexOf(config.baseUrl) == -1 ? (config.baseUrl + data) : data
	}

	/**
	 * @description 数值金额转中文大写
	 * @param number 数值金额
	 */
	static upDigit = (n) => {
		var fraction = ['角', '分', '厘'];
		var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
		var unit = [
			['元', '万', '亿'],
			['', '拾', '佰', '仟']
		];
		var head = n < 0 ? '欠人民币' : '人民币';
		n = Math.abs(n);
		var s = '';
		for (var i = 0; i < fraction.length; i++) {
			s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
		}
		s = s || '整';
		n = Math.floor(n);
		for (var i = 0; i < unit[0].length && n > 0; i++) {
			var p = '';
			for (var j = 0; j < unit[1].length && n > 0; j++) {
				p = digit[n % 10] + unit[1][j] + p;
				n = Math.floor(n / 10);
			}
			s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
			//s = p + unit[0][i] + s;
		}
		return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
	}
}

export default Other