class Day {
	/**
	 * @description 获取当前是周几
	 */  
	static getWeekDate = () => {
		let now = new Date();
		let day = now.getDay();
		let weeks = new Array({
			id: 0,
			name: "星期日",
		}, {
			id: 1,
			name: "星期一",
		}, {
			id: 2,
			name: "星期二",
		}, {
			id: 3,
			name: "星期三",
		}, {
			id: 4,
			name: "星期四",
		}, {
			id: 5,
			name: "星期五",
		}, {
			id: 6,
			name: "星期六",
		}, );
		return weeks[day];
	}
}


export default Day