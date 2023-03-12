//获取Token
export const getToken = () => {
	try {
		const value = uni.getStorageSync('token');
		return value ? value : '';
	} catch (e) {
		throw new Error(e)
	}
}


