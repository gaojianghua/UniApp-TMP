class Common {
	/**
	 * @description 获取指定大小区间的随机数
	 */
	static getRandomNum = (min, max) => {
		return Math.floor(Math.random() * (max - min)) + min
	}
	/**
	 * @description 数据格式转换 (指定相同的Key为一个数组单元)
	 */
	static groupArrayByKey = (arr = [], key) => {
		return arr.reduce((t, v) => (!t[v[key]] && (t[v[key]] = []), t[v[key]].push(v), t), {})
	}
	/**
	 * @description 动态加载js文件
	 */
	static dynamicLoadJS = (files, callback) => {
		const head = document.getElementsByTagName('head')[0];
		Promise.all(files.map(file => {
			return new Promise(resolve => {
				const s = document.createElement('script');
				s.type = "text/javascript";
				s.async = true;
				s.src = file;
				s.addEventListener('load', (e) => resolve(), false);
				head.appendChild(s);
			});
		})).then(callback);
	}
}




export default Common