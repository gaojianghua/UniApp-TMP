<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.意见反馈" i18n></m-navbar>
		<!-- 内容区域 -->
		<view class="content mt-1 p-3 bg-white">
			<view class="bottom d-flex a-center py-3">
				<u-textarea height="100"
					:customStyle="{caretColor: '#f27299', padding: '0', backgroundColor: '#f1f1f1'}" border="none"
					v-model="query.info" :placeholder="$t('描述您的问题，我们会尽快为您处理！')">
				</u-textarea>
				<view class="pl-2 py-2" @click="show = true">
					<u-icon name="mic" size="22" :color="show ? '#888' : '#f27299'"></u-icon>
				</view>
			</view>
		</view>
		<!-- 图片上传 -->
		<view class="content mt-1 p-3 bg-white">
			<u-upload :maxCount="6" width="80" height="80" :fileList="fileList" @afterRead="afterRead"
				@delete="deletePic" name="file" multiple></u-upload>
		</view>
		<!-- 反馈记录按钮 -->
		<view class="notice mt-4 text-center" @click="$tools.Navigate.navigateTo('/pages-offspring/feedback-record/index')">
			{{$t('page.反馈记录')}} ->
		</view>
		<!-- 提交按钮 -->
		<view class="position-fixed bottom-0 left-0 p-3 bg-white w-100">
			<view @click="switchFeedback" class="btons d-flex a-center j-center text-white letter-2">
				{{$t('提交反馈')}}
			</view>
		</view>
		<!-- 语音识别弹框 -->
		<c-app-speech-recognition @speechEnd="speechEnd" :show="show" @close="show = false"></c-app-speech-recognition>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import CAppSpeechRecognition from '@/components/common/c-app-speech-recognition/index.vue'
	export default {
		components: {
			CAppSpeechRecognition
		},
		data() {
			return {
				query: {
					info: '',
					reasonPicture: ''
				},
				fileList: [],
				show: false
			}
		},
		methods: {
			// 关闭语音识别
			speechEnd(i) {
				this.query.info = i
			},
			// 提交反馈
			switchFeedback() {
				this.query.info = ''
				this.query.reasonPicture = ''
				this.fileList = []
				this.$refs.uToast.show({
					message: this.$t('您的反馈已提交，我们会尽快为您处理！'),
					type: 'success',
					duration: 1500
				})
			},
			//上传图片事件
			afterRead(e) {
				uni.uploadFile({
					url: uni.uniEnv.baseURL + '/oss/addPhoto',
					filePath: e.file[0].url,
					name: 'file',
					header: {
						'token': this.$store.state.token || ''
					},
					success: (res) => {
						let srcObj = {
							url: JSON.parse(res.data).data
						}
						this.fileList.push(srcObj)
						if (this.fileList.length > 1) {
							let arr = []
							this.fileList.forEach((v, i) => {
								arr.push(v.url)
							})
							this.query.reasonPicture = arr.join(',')
						} else {
							this.query.reasonPicture = this.fileList[0].url
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			//删除图片事件
			deletePic(e) {
				this.fileList.splice(e.index, 1)
				let arr = []
				this.fileList.forEach((v, i) => {
					arr.push(v.url)
				})
				this.query.reasonPicture = arr.join(',')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.content {
			.bottom {
				background-color: #f1f1f1;
				border-radius: 50rpx;
				padding: 0 30rpx;
			}
		}
		
		.notice{
			font-size: 24rpx;
			color: #666;
			text-decoration: underline;
		}

		.btons {
			font-size: 30rpx;
			border-radius: 50rpx;
			height: 88rpx;
			width: 690rpx;
			margin: 0 auto;
			background: linear-gradient(to right, #85B6CA, #F9A4A0);
		}

		.btons:active {
			background: linear-gradient(to right, #85B6CA80, #F9A4A080);
		}
	}
</style>