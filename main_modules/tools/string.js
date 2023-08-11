class MString {
	/**
	 * @description 根据下标位置的前面插入元素
	 * @param str 被插入的字符串
	 * @param index 下标位置
	 * @param element 要插入的字符串
	 */
	static insertAtIndex(str, index, element) {
		if (index < 0 || index > str.length) {
			return str; // 如果索引超出范围，则返回原始字符串
		}
		return str.slice(0, index) + element + str.slice(index);
	}
	/**
	 * @description 指定定字符串下标范围位置的替换子串
	 * @param str 原字符串
	 * @param start 开始的下标位置
	 * @param end 结束的下标位置
	 * @param replacement 要插入的子字符串
	 */
	static replaceSubstring(str, start, end, replacement) {
		return str.substring(0, start) + replacement + str.substring(end);
	}
	/**
	 * @description 指定定字符串下标范围位置的移除子串
	 * @param str 原字符串
	 * @param start 开始的下标位置
	 * @param end 结束的下标位置
	 */
	static removeSubstring(str, start, end) {
		return str.substring(0, start) + str.substring(end);
	}

}

export default MString