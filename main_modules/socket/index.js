import {
	interval,
	maxReconnectMaxTime,
	baseURL
} from './config.js'

class WS {
	constructor(options) {
		// 配置
		this.options = options
		// WS实例
		this.socketTask = null
		// 正常关闭
		this.normalCloseFlag = false
		// 重新连接次数
		this.reconnectTime = 1
		// 重新连接Timer
		this.reconnectTimer = null
		// 心跳Timer
		this.heartTimer = null

		// 发起连接
		this.initWS()

		// 关闭WS
		this.close = () => {
			// 正常关闭状态
			this.normalCloseFlag = true
			// 关闭websocket
			this.socketTask.close()
			// 关闭心跳定时器
			clearInterval(this.heartTimer)
			// 关闭重连定时器
			clearTimeout(this.reconnectTimer)
		}
	}
	/**
	 * @description 初始化
	 */
	initWS() {
		// this.options.data 连接websocket所需参数
		const url = 'wss://' + baseURL + this.options.data.userId
		this.socketTask = uni.connectSocket({
			url,
			success() {}
		})
		// 监听WS
		this.watchWS()
	}
	/**
	 * @description 监听连接打开
	 */
	watchWS() {
		// 监听 WebSocket 连接打开事件
		this.socketTask.onOpen(() => {
			console('websocket连接成功！')
			// 连接成功
			this.options.onConnected()
			// 重置连接次数
			this.reconnectTime = 1
			// 发送心跳
			this.onHeartBeat()
			// 监听消息
			this.onMessage()
			// 关闭Toast
			uni.hideLoading()
		})

		// 监听websocket 错误
		this.socketTask.onError(() => {
			// 关闭并重连
			this.socketTask.close()
		})

		// 监听 WebSocket 连接关闭事件
		this.socketTask.onClose((res) => {
			// 连接错误，发起重连接
			if (!this.normalCloseFlag) {
				this.onDisconnected(res)
			}
		})
	}
	/**
	 * @description 监听消息
	 */
	onMessage() {
		// 监听websocket 收到消息
		this.socketTask.onMessage((res) => {
			//收到消息
			if (res.data) {
				this.options.onMessage(JSON.parse(res.data))
			} else {
				console('未监听到消息：原因：', JSON.stringify(res))
			}
		})
	}
	/**
	 * @description 断开连接
	 */
	onDisconnected(res) {
		console('websocket断开连接，原因：', JSON.stringify(res))
		// 关闭心跳
		clearInterval(this.heartTimer)
		// 全局Toast提示，防止用户继续发送
		uni.showLoading({
			title: '消息收取中…'
		})
		// 尝试重新连接
		this.onReconnect()
	}
	/**
	 * @description 断线重连
	 */
	onReconnect() {
		clearTimeout(this.reconnectTimer)
		if (this.reconnectTime < maxReconnectMaxTime) {
			this.reconnectTimer = setTimeout(() => {
				console.log(`第【${this.reconnectTime}】次重新连接中……`)
				this.initWS()
				this.reconnectTime++
			}, interval)
		} else {
			uni.showModal({
				title: '温馨提示',
				content: '服务器开小差啦~请返回聊天列表重试',
				showCancel: false,
				confirmText: '我知道了',
				success: () => {
					uni.navigateBack()
				}
			})
		}
	}
	/**
	 * @description 心跳
	 */
	onHeartBeat() {
		this.heartTimer = setInterval(() => {
			this.socketTask.send({
				data: `heart：${this.options.data.userId}`,
				success() {
					console.log('心跳发送成功！')
				}
			})
		}, interval)
	}
}

export default WS