class MArray {
	/**
	 * @description 数组去重
	 * @param arr 数组
	 */
	static unique = arr => [...new Set(arr)]
	/**
	 * @description 数组扁平化
	 * @param arr 数组
	 */
	static flatten(arr) {
		while (arr.some(item => Array.isArray(item))) {
			arr = [].concat(...arr);
		}
		return arr;
	}
}

export default MArray