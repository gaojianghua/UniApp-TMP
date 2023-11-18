<template>
	<m-popup :show="show" i18n @close="close" title="语音识别" i18n>
		<view class="mic p-3">
			<u-textarea :customStyle="{caretColor: '#f27299', padding: '20rpx 20rpx', backgroundColor: '#f1f1f1'}"
				border="none" v-model="result" :placeholder="$t('语音识别内容')">
			</u-textarea>
			<view class="mt-3 d-flex a-center j-center flex-column">
				<view class="main-text-color font-weight">
					<text>{{title}}</text>
				</view>
				<view class="partial mt-3">
					<text>{{partialResult}}</text>
				</view>
				<view class="volume mt-3" :style="{width:valueWidth}"></view>
			</view>
			<view @touchstart="startRecognize" @touchend="endRecognize" class="mt-5 btons d-flex a-center j-center text-white">
				{{$t('按下开始') + ` &amp; ` + $t('松开结束')}}
			</view>
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
				valueWidth: '0px'
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
			close() {
				this.$emit('close')
			},
			onStart() {
				this.title = '...倾听中...';
				this.text = '';
				console.log('Event: start');
			},
			onVolumeChange(e) {
				this.valueWidth = 100 * e.volume + 'px';
				console.log('Event: volumeChange ' + this.valueWidth);
			},
			onRecognizing(e) {
				this.partialResult = e.partialResult;
				console.log('Event: recognizing');
			},
			onRecognition(e) {
				this.text += e.result;
				this.text ? (this.text += '\n') : this.text = '';
				this.result = this.text;
				this.partialResult = e.result;
				console.log('Event: recognition');
			},
			onEnd() {
				if (!this.text || this.text == '') {
					plus.nativeUI.toast('没有识别到内容');
				}
				this.result = this.text;
				this.title = '未开始';
				this.valueWidth = '0px';
				this.partialResult = '...';
			},
			startRecognize() {
				// #ifdef APP-PLUS
				plus.speech.startRecognize({
					engine: 'baidu',
					lang: 'zh-cn',
					'userInterface': false,
					'continue': true
				});
				// #endif
			},
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
			margin: 0 auto;
			background: linear-gradient(to right, #85B6CA, #F9A4A0);
		}

		.btons:active {
			background: linear-gradient(to right, #85B6CA80, #F9A4A080);
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
</style>