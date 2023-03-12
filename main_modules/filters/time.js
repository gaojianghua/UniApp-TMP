// 计算当前日期星座
const getHoroscope = (date) => {
	let c = ['摩羯', '水瓶', '双鱼', '白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯']
	date = new Date(date);
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let startMonth = month - (day - 14 < '865778999988'.charAt(month));
	return c[startMonth] + '座';
}
// 计算指定时间与当前的时间差
const sumAge = (data) => {
	let dateBegin = new Date(data.replace(/-/g, "/"));
	let dateEnd = new Date(); //获取当前时间
	let dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
	let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
	let leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
	let hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
	//计算相差分钟数
	let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
	let minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
	//计算相差秒数
	let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
	let seconds = Math.round(leave3 / 1000)
	return dayDiff + "天 " + hours + "小时 ";
}
// 获取聊天时间（相差300s内的信息不会显示时间）
const getChatTime = (v1, v2) => {
	v1 = v1.toString().length < 13 ? v1 * 1000 : v1;
	v2 = v2.toString().length < 13 ? v2 * 1000 : v2;
	if (((parseInt(v1) - parseInt(v2)) / 1000) > 300) {
		return gettime(v1);
	}
}
// 人性化时间格式
const gettime = (shorttime, key) => {
	shorttime = shorttime.toString().length < 13 ? shorttime * 1000 : shorttime;
	let now = (new Date()).getTime();
	let cha = (now - parseInt(shorttime)) / 1000;
	if (key == 1) {
		return dateFormat(new Date(shorttime), "{Y}-{MM}-{DD}");
	}
	if (cha < 43200) {
		// 当天
		return dateFormat(new Date(shorttime), "{A} {t}:{ii}");
	} else if (cha < 518400) {
		// 隔天 显示日期+时间
		return dateFormat(new Date(shorttime), "{Mon}月{DD}日 {A} {t}:{ii}");
	} else {
		// 隔年 显示完整日期+时间
		return dateFormat(new Date(shorttime), "{Y}-{MM}-{DD} {A} {t}:{ii}");
	}
}
// 小于10补0
const parseNumber = (num) => {
	return num < 10 ? "0" + num : num;
}
// 指定时间格式
const dateFormat = (date, formatStr) => {
	let dateObj = {},
		rStr = /\{([^}]+)\}/,
		mons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

	dateObj["Y"] = date.getFullYear();
	dateObj["M"] = date.getMonth() + 1;
	dateObj["MM"] = parseNumber(dateObj["M"]);
	dateObj["Mon"] = mons[dateObj['M'] - 1];
	dateObj["D"] = date.getDate();
	dateObj["DD"] = parseNumber(dateObj["D"]);
	dateObj["h"] = date.getHours();
	dateObj["hh"] = parseNumber(dateObj["h"]);
	dateObj["t"] = dateObj["h"] > 12 ? dateObj["h"] - 12 : dateObj["h"];
	dateObj["tt"] = parseNumber(dateObj["t"]);
	dateObj["A"] = dateObj["h"] > 12 ? '下午' : '上午';
	dateObj["i"] = date.getMinutes();
	dateObj["ii"] = parseNumber(dateObj["i"]);
	dateObj["s"] = date.getSeconds();
	dateObj["ss"] = parseNumber(dateObj["s"]);
	while (rStr.test(formatStr)) {
		formatStr = formatStr.replace(rStr, dateObj[RegExp.$1]);
	}
	return formatStr;
}
// 获取年龄
const getAgeByBirthday = (data) => {
	let birthday = new Date(data.replace(/-/g, "\/"));
	let d = new Date();
	return d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d.getMonth() ==
		birthday.getMonth() && d.getDate() < birthday.getDate()) ? 1 : 0);
}
module.exports = {
	getHoroscope,
	sumAge,
	getChatTime,
	gettime,
	parseNumber,
	dateFormat,
	getAgeByBirthday
}