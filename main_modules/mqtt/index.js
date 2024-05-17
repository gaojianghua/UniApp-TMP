import {
	v4 as uuidv4
} from 'uuid';
import mqtt from 'mqtt/dist/mqtt.js';
import {
	MQTT_CONFIG
} from './config';

class MQTTService {
	constructor() {
		this.client = null;
		this.topic = MQTT_CONFIG.TOPIC; // 要订阅的主题
	}

	async connect() {
		let status = await uni.getNetworkType();
		if (status.networkType === "none") {
			uni.showToast({
				title: "请检查网络连接是否正常",
				icon: "none"
			});
			return;
		}

		uni.showLoading({
			title: 'Loading...'
		});

		// 更新clientId和认证信息
		MQTT_CONFIG.OPTIONS.clientId = uuidv4();
		MQTT_CONFIG.OPTIONS.username = MQTT_CONFIG.USERNAME;
		MQTT_CONFIG.OPTIONS.password = MQTT_CONFIG.PASSWORD;

		const protocol = (process.env.VUE_APP_PLATFORM === 'h5') ? 'ws://' : 'wx://';
		this.client = mqtt.connect(protocol + MQTT_CONFIG.IP, MQTT_CONFIG.OPTIONS);

		this.client.on('connect', () => {
			uni.showToast({
				title: "连接成功",
				icon: "none"
			});
			console.log('连接成功');
			uni.hideLoading();
			this.subscribe();
		});

		this.client.on('error', (error) => {
			console.log('连接失败...', error);
			uni.showToast({
				title: "连接失败...",
				icon: "none"
			});
			uni.hideLoading();
		});

		this.client.on('message', (topic, message) => {
			console.log('接收推送信息：', message.toString());
		});
	}

	publish(message) {
		if (this.client && this.client.connected) {
			this.client.publish(this.topic, message, {}, (err) => {
				if (!err) {
					console.log('发送成功');
					uni.showToast({
						title: "发送成功",
						icon: "none"
					});
				}
			});
		} else {
			uni.showToast({
				title: "请连接",
				icon: "none"
			});
		}
	}

	subscribe() {
		if (this.client && this.client.connected) {
			this.client.subscribe(this.topic, (err) => {
				if (!err) {
					console.log('订阅成功');
					uni.showToast({
						title: "订阅成功",
						icon: "none"
					});
				}
			});
		} else {
			uni.showToast({
				title: "请连接",
				icon: "none"
			});
		}
	}

	unsubscribe() {
		if (this.client && this.client.connected) {
			this.client.unsubscribe(this.topic, (err) => {
				if (!err) {
					console.log('取消订阅成功');
					uni.showToast({
						title: "取消订阅成功",
						icon: "none"
					});
				}
			});
		} else {
			uni.showToast({
				title: "请连接",
				icon: "none"
			});
		}
	}

	disconnect() {
		if (this.client) {
			this.client.end(true, (err) => {
				if (!err) {
					console.log('断开成功');
				}
			});
		}
	}
}

export default MQTTService;