<template>
	<m-popup :show="show" i18n @close="close" title="语音识别">
		<view class="mic p-3">
			<u-textarea disabled
				:customStyle="{caretColor: '#f27299', padding: '20rpx 20rpx', backgroundColor: '#f1f1f1'}" border="none"
				v-model="result" :placeholder="$t('语音识别内容')">
			</u-textarea>
			<!-- #ifndef H5 -->
			<view class="mt-3 d-flex a-center j-center flex-column">
				<view class="main-text-color font-weight">
					<text>{{$t(title)}}</text>
				</view>
				<view class="partial mt-3">
					<text>{{partialResult}}</text>
				</view>
				<view class="volume mt-3" :style="{width:valueWidth}"></view>
			</view>
			<view @touchstart="startRecognize" @touchend="endRecognize"
				class="mt-5 btons d-flex a-center j-center text-white">
				{{$t('按下开始') + ` &amp; ` + $t('松开结束')}}
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="mt-3 d-flex a-center j-center flex-column">
				<view class="main-text-color font-weight">
					<text>{{$t(title)}}</text>
				</view>
				<view :class="recognition ? 'ripple-start' : ''"
					class="mt-5 ripple main-bg-color position-relative rounded-circle">
				</view>
			</view>
			<view @click="onH5Start" class="mt-10 btons d-flex a-center j-center text-white">
				{{$t('开始')}}
			</view>
			<view @click="onH5End" class="mt-3 btons d-flex a-center j-center text-white">
				{{$t('结束')}}
			</view>
			<!-- #endif -->
		</view>
	</m-popup>
</template>

<script>
	import MPopup from '@/main_modules/main-ui/m-popup/index.vue'
	export default {
		props: {
			show: {
				type: Boolean,
				default: () => {
					return false
				}
			}
		},
		components: {
			MPopup
		},
		data() {
			return {
				title: '未开始',
				text: '',
				partialResult: '...',
				result: '',
				valueWidth: '0rpx',
				recognition: null,
				time: null
			}
		},
		mounted() {
			// #ifdef APP-PLUS
			// 监听语音识别事件
			plus.speech.addEventListener('start', this.onStart, false);
			plus.speech.addEventListener('volumeChange', this.onVolumeChange, false);
			plus.speech.addEventListener('recognizing', this.onRecognizing, false);
			plus.speech.addEventListener('recognition', this.onRecognition, false);
			plus.speech.addEventListener('end', this.onEnd, false);
			// #endif
		},
		methods: {
			// H5语音识别开始
			onH5Start() {
				if (this.recognition) {
					return this.$u.toast(this.$t('请勿频繁点击'))
				}
				if (!this.$check.isSpeechRecognitionBrowser()) {
					return this.$u.toast(this.$t('浏览器不支持语音识别功能'))
				}
				this.recognition = null
				this.recognition = new webkitSpeechRecognition();
				this.recognition.continuous = true;
				this.recognition.lang = this.$store.state.lang == 'en' ? 'en-US' : 'zh-CN';
				this.recognition.onerror = (e) => {
					if (e.error == 'network') {
						this.$u.toast(this.$t('您的网络不支持语音识别'))
					} else {
						this.$u.toast(this.$t('语音识别异常，请稍后再试'))
					}
					this.onH5End()
				}
				this.recognition.onresult = (event) => {
					this.time && clearTimeout(this.time)
					const resultIndex = event.resultIndex;
					this.text += event.results[resultIndex][0].transcript;
					this.result = this.text;
					this.time = setTimeout(() => {
						this.onH5End()
						this.$u.toast(this.$t('因长时间没有语音输入已帮你关闭语音识别'))
					}, 30 * 1000);
				}
				this.recognition.start()
				this.title = '...倾听中...'
				this.time = setTimeout(() => {
					if (!this.result) {
						this.onH5End()
						this.$u.toast(this.$t('因长时间没有语音输入已帮你关闭语音识别'))
					}
				}, 30 * 1000)
				if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
					navigator.mediaDevices.getUserMedia({
						audio: true
					}).then((stream) => {
						this.recognition.start()
						this.title = '...倾听中...'
						this.time = setTimeout(() => {
							if (!this.result) {
								this.onH5End()
								this.$u.toast(this.$t('因长时间没有语音输入已帮你关闭语音识别'))
							}
						}, 30 * 1000)
					}).catch((error) => {
						this.$u.toast(this.$t('用户拒绝使用麦克风或设备没有麦克风'))
					});
				} else {
					console.log('浏览器不支持语音识别');
				}
			},
			// H5语音识别结束
			onH5End() {
				if (this.recognition && this.recognition.stop) {
					this.recognition.stop()
					this.recognition = null
					this.time && clearTimeout(this.time)
					this.title = '未开始'
				}
			},
			// 关闭弹窗
			close() {
				if (this.result) {
					this.$emit('speechEnd', this.result)
					this.result = ''
				}
				// #ifdef H5
				this.onH5End()
				// #endif
				this.$emit('close')
			},
			// 监听语音识别开启
			onStart() {
				this.title = '...倾听中...';
				this.text = '';
			},
			// 监听语音音量变化
			onVolumeChange(e) {
				this.valueWidth = 1000 * e.volume + 'rpx';
			},
			// 监听语音识别中
			onRecognizing(e) {
				this.partialResult = e.partialResult;
			},
			// 监听语音识别结果
			onRecognition(e) {
				this.text += e.result;
				this.result = this.text;
				this.partialResult = e.result;
			},
			// 监听语音识别结束
			onEnd() {
				if (!this.text || this.text == '') {
					plus.nativeUI.toast(this.$t('没有识别到内容'));
				}
				this.result = this.text;
				this.title = '未开始';
				this.valueWidth = '0';
				this.partialResult = '...';
			},
			// 开始识别
			startRecognize() {
				// #ifdef APP-PLUS
				plus.speech.startRecognize({
					engine: 'baidu',
					lang: this.$store.state.lang == 'en' ? 'en-us' : 'zh-cn',
					'userInterface': false,
					'continue': true
				});
				// #endif
			},
			// 关闭识别
			endRecognize() {
				// #ifdef APP-PLUS
				plus.speech.stopRecognize();
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mic {
		.btons {
			font-size: 30rpx;
			border-radius: 50rpx;
			height: 80rpx;
			width: 400rpx;
			margin: 30rpx auto 0;
			background: linear-gradient(to right, #85B6CA, #F9A4A0);
		}

		.btons:active {
			background: linear-gradient(to right, #85B6CA80, #F9A4A080);
		}

		.ripple {
			width: 35rpx;
			height: 35rpx;
			box-shadow: 0 0rpx 4rpx 4rpx #F2729990;
		}

		.ripple-start::before {
			content: "";
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 0;
			height: 0;
			background-color: #F2729990;
			border-radius: 50%;
			opacity: 0;
			animation: expand 1s ease-out infinite;
		}

		@keyframes expand {
			0% {
				width: 0;
				height: 0;
				opacity: 1;
			}

			100% {
				width: 120rpx;
				height: 120rpx;
				opacity: 0;
			}
		}

		.partial {
			width: 100%;
			height: 80rpx;
			margin-top: 32rpx;
			font-size: 24rpx;
			color: #FFFFFF;
		}

		.volume {
			width: 50rpx;
			height: 30rpx;
			border-style: solid;
			border-width: 2rpx;
			border-color: #CCCCCC;
			border-radius: 50%;
			background-color: #00CC00;
			transition: all 0.3s linear;
		}
	}
</style>