class MNumber{
	/**
	 * @description 处理小数精度问题
	 * @param value 值
	 * @param precision 保留小数位数
	 */
	static roundToPrecision(value, precision) {
	  const multiplier = Math.pow(10, precision);
	  return Math.round(value * multiplier) / multiplier;
	}
}

export default MNumber