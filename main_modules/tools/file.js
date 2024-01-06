class File{
	/**
	 * @description 打开文件流文件
	 * @param stream 文件流数据
	 */
	static openStreamFile(stream) {
		const blob = new Blob([stream], { type: 'application/pdf' }); // 替换 MIME 类型和数据
		const fileUrl = URL.createObjectURL(blob);
		window.open(fileUrl);
	}
}

export default File
