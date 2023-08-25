class WebWorker {
	/**
	 * 创建 Web Worker 实例
	 * @param {string} workerPath - Web Worker 文件路径
	 */
	constructor(workerPath) {
		this.worker = uni.createWorker(workerPath);
		this.listeners = {};
		this.errorHandler = null;
		this.init();
	}

	/**
	 * 初始化消息和错误处理函数
	 */
	init() {
		// 监听 Web Worker 发送的消息
		this.worker.onMessage((res) => {
			const {
				messageId,
				data
			} = res;
			if (this.listeners[messageId]) {
				this.listeners[messageId](data);
				delete this.listeners[messageId];
			}
		});

		// 监听 Web Worker 错误
		this.worker.onError((err) => {
			if (this.errorHandler) {
				this.errorHandler(err);
			}
		});
	}

	/**
	 * 向 Web Worker 发送消息并获取返回结果
	 * @param {any} message - 要发送的消息
	 * @returns {Promise<any>} - 返回 Promise 对象以异步获取结果
	 */
	postMessage(message) {
		const messageId = `${Date.now()}_${Math.random()}`;
		return new Promise((resolve, reject) => {
			this.listeners[messageId] = resolve;
			this.worker.postMessage({
				messageId,
				data: message,
			});
		});
	}

	/**
	 * 注册接收 Web Worker 消息的回调函数
	 * @param {Function} handler - 消息处理函数
	 */
	onMessage(handler) {
		this.listener = handler;
	}

	/**
	 * 注册错误处理函数
	 * @param {Function} handler - 错误处理函数
	 */
	onError(handler) {
		this.errorHandler = handler;
	}

	/**
	 * 终止 Web Worker
	 */
	terminate() {
		this.worker.terminate();
	}
}

export default WebWorker