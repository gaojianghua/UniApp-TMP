/**
 * 有道翻译Api 用来机翻国际化语言文件
 */
const fetch = require('node-fetch');
const CryptoJS = require('crypto-js');
const fs = require('fs');
const path = require('path');

const app_id = '48013cb8c21ed176';	// 有道应用ID
const secret_key = 'H1AYEg1UylznWHRkeqZgqA2hLvYzZFcU'; // 有道应用秘钥
const from = 'zh-Hans';	// 指定源语言
const to = 'zh-CHT'; // 指定翻译后的语言
let ident = '.'	// 有前缀的话，填前缀间隔符
let prefix = ''	// 前缀
const prefixArr = [] // 有前缀的键名

const truncate = (q) => {
	const len = q.length;
	if (len <= 20) return q;
	return q.substring(0, 10) + len + q.substring(len - 10, len);
};

function getLangFile(lang) {
	const langFilePath = path.join(__dirname, "src/lang/locale", `${lang}.js`);

	if (!fs.existsSync(langFilePath)) {
		console.error(`File ${langFilePath} not found.`);
		process.exit(1);
	}

	const jsFileContent = fs.readFileSync(langFilePath, 'utf8');
	// 提取键名
	const pattern = /"([^"]+)"\s*:\s*(["'`])(?:\\.|[^\\])*?\2/gi;


	let match;
	let keys = [];

	// 迭代所有匹配项并获取键名
	while ((match = pattern.exec(jsFileContent)) !== null) {
		if (match[1].includes(ident)) {
			if (!prefix) {
				prefix = match[1].split(ident)[0] + ident
			}
			keys.push(match[1].replace(prefix, ''))
			prefixArr.push(match[1].replace(prefix, ''))
		} else {
			keys.push(match[1]);
		}
	}

	if (keys.length === 0) {
		console.error('No keys found.');
		return null;
	}
	return keys;
}

const genLangFile = (translatedData, lang) => {
	console.log('开始生成语言文件');
	const langFile = `./src/lang/locale/${lang}.js`;
	try {
		const langFileContent = `export default ${JSON.stringify(translatedData, null, 2)};`;
		fs.writeFileSync(langFile, langFileContent, 'utf8');
		console.log(`生成文件成功: ${langFile}`);
	} catch (error) {
		console.error('Error:', error);
		process.exit(1);
	}
}
const translateChineseArray = async (chineseArray, translatedArray = {}) => {
	try {
		// 如果已经翻译完所有数据，则直接返回总的翻译数据
		if (chineseArray.length === 0) {
			return translatedArray;
		}
		// 取出前100条数据进行翻译
		const chunk = chineseArray.slice(0, 100);
		const text = chunk.join('\n');

		const translatedData = await sendPostRequest(text);
		const translatedDataArrary = translatedData.split('\n');

		chunk.forEach((item, i) => {
			prefixArr.forEach(it => {
				if (item === it) {
					chunk[i] = prefix + item
				}
			})
		})
		// 将翻译结果加入总的翻译数据
		translatedDataArrary.forEach((val, index) => {
			let key = chunk[index]
			translatedArray[key] = val
		});
		// 递归调用自身，继续处理剩余数据
		const remainingData = chineseArray.slice(100);
		await new Promise(resolve => setTimeout(resolve, 2000));
		return translateChineseArray(remainingData, translatedArray);
	} catch (error) {
		throw new Error(`Error translating Chinese array: ${error.message}`);
	}
}

const sendPostRequest = async (q) => {
	const salt = new Date().getTime();
	const curtime = Math.round(new Date().getTime() / 1000);
	const str1 = app_id + truncate(q) + salt + curtime + secret_key;
	const sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);

	const apiUrl =
		`https://openapi.youdao.com/api?q=${encodeURIComponent(q)}&appKey=${app_id}&salt=${salt}&from=${from}&to=${to}&sign=${sign}&signType=v3&curtime=${curtime}`;

	try {
		const response = await fetch(apiUrl);

		if (!response.ok) {
			throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();
		if (data.error_code) {
			if (data.error_code === 31101) {
				return sendPostRequest(q);
			} else {
				console.error(data);
				throw new Error(`翻译失败: ${data.error_msg}`);
			}
		}

		if (!data.translation) {
			console.log(data);
		}
		return data.translation[0] || [];
	} catch (error) {
		throw new Error(`请求失败: ${error.message}`);
	}
}

async function main() {
	console.log('开始执行翻译任务');
	const chineseArray = getLangFile(from);
	const translatedData = await translateChineseArray(chineseArray);
	genLangFile(translatedData, to);
	console.log('翻译任务结束');
}

main();