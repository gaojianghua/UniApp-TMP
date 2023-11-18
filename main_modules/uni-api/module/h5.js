import Check from '../../check/index.js'

const recognition = new webkitSpeechRecognition();
export default {
	// 设置Safari浏览器多出的高度
	setSafariFitHeight() {
		if (Check.isSafari()) {
			console.log('当前是 Safari 浏览器');
			const safariFitHeight = 80
			uni.setStorageSync('safariFitHeight', safariFitHeight)
			store.commit('updateSafariFitHeight', safariFitHeight)
		} else {
			console.log('当前不是 Safari 浏览器');
		}
	},
	// 浏览器语音识别
	async speechRecognitionBrowser(bool, lang) {
		let res = {
			code: 200,
			data: '',
			msg: 'success'
		}
		if (!Check.isSpeechRecognitionBrowser()) {
			res.code = 500
			res.msg = '浏览器不支持语音识别功能'
			return res
		}
		if (bool) {
			recognition.lang = lang;
			recognition.onresult = (event) => {
				const resultIndex = event.resultIndex;
				res.data = event.results[resultIndex][0].transcript
			};
			await navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
				// 用户已授权使用麦克风, 在这里可以处理获取到的音频流
				recognition.start()
			}).catch((error) => {
				res.code = 500
				res.msg = '用户拒绝使用麦克风或设备没有麦克风'
			});
			return res
		} else {
			recognition.stop()
		}
	}
}