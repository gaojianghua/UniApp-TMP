const toString = Object.prototype.toString

class Check {
	/**
	 * @description 判断是否是Object类型
	 * @param value 任意参数
	 */
	static isObject(value) {
		return toString.call(value) === '[object Object]'
	}

	/**
	 * @description 判断是否是Array类型
	 * @param value 任意参数
	 */
	static isArray(value) {
		return toString.call(value) === '[object Array]'
	}

	/**
	 * @description 判断是否是Function类型
	 * @param value 任意参数
	 */
	static isFunction(value) {
		return toString.call(value) === '[object Function]'
	}

	/**
	 * @description 判断是否是String类型
	 * @param value 任意参数
	 */
	static isString(value) {
		return toString.call(value) === '[object String]'
	}

	/**
	 * @description 判断是否是Undefined类型
	 * @param value 任意参数
	 */
	static isUndefined(value) {
		return toString.call(value) === '[object Undefined]'
	}

	/**
	 * @description 判断是否是Boolean类型
	 * @param value 任意参数
	 */
	static isBoolean(value) {
		return toString.call(value) === '[object Boolean]'
	}

	/**
	 * @description 判断是否是Null类型
	 * @param value 任意参数
	 */
	static isNull(value) {
		return toString.call(value) === '[object Null]'
	}

	/**
	 * @description 判断是否是Number类型
	 * @param value 任意参数
	 */
	static isNumber(value) {
		return toString.call(value) === '[object Number]'
	}

	/**
	 * @description 判断是否是Error类型
	 * @param value 任意参数
	 */
	static isError(value) {
		return toString.call(value) === '[object Error]'
	}

	/**
	 * @description 判断是否是Date类型
	 * @param value 任意参数
	 */
	static isDate(value) {
		return toString.call(value) === '[object Date]'
	}

	/**
	 * @description 判断是否是RegExp类型
	 * @param value 任意参数
	 */
	static isRegExp(value) {
		return toString.call(value) === '[object RegExp]'
	}

	/**
	 * @description 判断是否是Math类型
	 * @param value 任意参数
	 */
	static isMath(value) {
		return toString.call(value) === '[object Math]'
	}

	/**
	 * @description 判断是否是Symbol类型
	 * @param value 任意参数
	 */
	static isSymbol(value) {
		return toString.call(value) === '[object Symbol]'
	}

	/**
	 * @description 判断是否是Map类型
	 * @param value 任意参数
	 */
	static isMap(value) {
		return toString.call(value) === '[object Map]'
	}

	/**
	 * @description 判断是否是Set类型
	 * @param value 任意参数
	 */
	static isSet(value) {
		return toString.call(value) === '[object Set]'
	}

	/**
	 * @description 判断是否是false
	 * @param value 任意参数
	 */
	static isFalse(value) {
		return value === false
	}

	/**
	 * @description 判断手机号格式是否是正确的
	 * @param value 手机号参数
	 */
	static isPhone(value) {
		return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
	}

	/**
	 * @description 判断邮箱格式是否是正确的
	 * @param value 邮箱参数
	 */
	static isEmail(value) {
		return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
	}

	/**
	 * @description 检验省会代码
	 * @param val 省会代码
	 */
	static _checkProv(val) {
		var pattern = /^[1-9][0-9]/;
		var provs = {
			11: "北京",
			12: "天津",
			13: "河北",
			14: "山西",
			15: "内蒙古",
			21: "辽宁",
			22: "吉林",
			23: "黑龙江 ",
			31: "上海",
			32: "江苏",
			33: "浙江",
			34: "安徽",
			35: "福建",
			36: "江西",
			37: "山东",
			41: "河南",
			42: "湖北 ",
			43: "湖南",
			44: "广东",
			45: "广西",
			46: "海南",
			50: "重庆",
			51: "四川",
			52: "贵州",
			53: "云南",
			54: "西藏 ",
			61: "陕西",
			62: "甘肃",
			63: "青海",
			64: "宁夏",
			65: "新疆",
			71: "台湾",
			81: "香港",
			82: "澳门"
		};
		if (pattern.test(val)) {
			if (provs[val]) {
				return true;
			}
		}
		return false;
	}
	
	/**
	 * @description 校验出生日期
	 * @param val 出生日期
	 */
	static _checkDate(val) {
		var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
		if (pattern.test(val)) {
			var year = val.substring(0, 4);
			var month = val.substring(4, 6);
			var date = val.substring(6, 8);
			var date2 = new Date(year + "-" + month + "-" + date);
			if (date2 && date2.getMonth() == (parseInt(month) - 1)) {
				return true;
			}
		}
		return false;
	}
	
	/**
	 * @description 检验检验码
	 * @param val 检验码
	 */
	static _checkCode(val) {
		var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
		var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
		var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
		var code = val.substring(17);
		if (p.test(val)) {
			var sum = 0;
			for (var i = 0; i < 17; i++) {
				sum += val[i] * factor[i];
			}
			if (parity[sum % 11] == code.toUpperCase()) {
				return true;
			}
		}
		return false;
	}
	
	/**
	 * @description 判断身份证格式是否是正确的
	 * @param val 身份证
	 */
	static isIdCard(val) {
		if (this._checkCode(val)) {
			var date = val.substring(6, 14);
			if (this._checkDate(date)) {
				if (this._checkProv(val.substring(0, 2))) {
					return true;
				}
			}
		}
		return false;
	}
	
	/**
	 * @description 判断银行卡格式是否是正确的
	 * @param val 银行卡
	 */
	static isBankCard(value) {
		return /^([1-9]{})(\d{14}|\d{18})$/.test(value)
	}
}

export default Check