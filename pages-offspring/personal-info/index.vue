<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="transparent" textColor="#fff" value="page.个人信息" i18n></m-navbar>
		<!-- 内容区域 -->
		<view class="content d-flex a-center j-center flex-column pt-5 px-3">
			<view class="avatar d-flex a-center j-center rounded-circle hidden border-4 border-white">
				<u-upload :maxCount="1" :disabled="false" width="160rpx" height="160rpx" :fileList="fileList"
					@afterRead="afterRead" :previewFullImage="false" :deletable="false" name="file"></u-upload>
			</view>
			<view class="userinfo w-100 mt-5 px-3 py-1">
				<view class="userinfo-item d-flex a-center j-sb" v-for="(item, i) in userinfo" :key="i">
					<view class="userinfo-item-key line-h">
						{{item.key}}
					</view>
					<view class="userinfo-item-value d-flex a-center">
						<span class="line-h">{{item.value}}</span>
						<view v-if="i == 2" class="ml-2 line-h copy bg-success text-white rounded">
							{{$t('复制')}}
						</view>
						<u-icon v-if="i == 0" name="arrow-right" color="#111" size="16"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList: [{
					url: this.$store.state.userinfo.avatar,
				}],
				userinfo: [{
						key: '用户名',
						value: this.$store.state.userinfo.name
					},
					{
						key: '用户ID',
						value: this.$store.state.userinfo.id
					},
					{
						key: '邀请码',
						value: this.$store.state.userinfo.inviteCode
					},
					{
						key: '手机号',
						value: this.$store.state.userinfo.phone
					}
				]
			}
		},
		methods: {
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
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background: url('/static/img/common/login-bg.jpg') no-repeat;
		background-size: cover;

		.content {
			.avatar {
				width: 160rpx;
				height: 160rpx;

				/deep/ .u-upload__wrap__preview {
					margin: 0;
				}
			}

			.userinfo {
				background-color: #ffffff80;
				border: 2rpx solid #fff;
				border-radius: 20rpx;

				.userinfo-item {
					height: 100rpx;
					border-top: 1rpx solid #fff;

					.userinfo-item-key {}

					.userinfo-item-value {
						.copy {
							font-size: 24rpx;
							padding: 12rpx 22rpx;
						}
					}
				}

				.userinfo-item:first-child {
					border-top: none;
				}
			}
		}
	}
</style>