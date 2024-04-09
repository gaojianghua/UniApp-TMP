<template>
	<view class="page" :style="scrollStyle">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="transparent" textColor="#fff" value="page.个人信息" i18n></m-navbar>
		<!-- 内容区域 -->
		<view class="content d-flex a-center j-center flex-column pt-5 px-3">
			<view class="avatar d-flex a-center j-center rounded-circle hidden border-4 border-white">
				<u-upload :maxCount="1" :disabled="false" width="160rpx" height="160rpx" :fileList="fileList"
					@afterRead="afterRead" :previewFullImage="false" :deletable="false" name="file"></u-upload>
			</view>
			<view class="userinfo w-100 mt-5 px-3 py-1">
				<view class="userinfo-item d-flex a-center j-sb" v-for="(item, i) in userinfo" :key="i"
					@click="openModel(i)">
					<view class="userinfo-item-key line-h">
						{{item.key}}
					</view>
					<view class="userinfo-item-value d-flex a-center">
						<span class="line-h">{{item.value}}</span>
						<view v-if="i == 2" class="ml-2 line-h copy bg-success text-white rounded"
							@click="copyInviteCode(item.value)">
							{{$t('复制')}}
						</view>
						<u-icon v-if="i == 0" name="arrow-right" color="#111" size="16"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<!-- 弹框 -->
		<c-app-authorization ref="authpup" type="top" @changeAuth="changeAuth"
			permissionID="CAMERA"></c-app-authorization>
		<m-modal :show="show" i18n title="修改用户名" @cancel="show = false" @confirm="confirmChangeUsername">
			<view id="info" class="d-flex a-center j-center">
				<u-input type="text"
					:placeholder="$t('请输入用户名')" v-model="query.username">
					<view slot="prefix" class="area d-flex a-center mr-1">
						<u-icon name="account-fill" color="#f27299" size="24"></u-icon>
					</view>
				</u-input>
			</view>
		</m-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import CAppAuthorization from '@/components/common/c-app-authorization/index.vue'
	export default {
		components: {
			CAppAuthorization
		},
		data() {
			return {
				show: false,
				fileList: [{
					url: this.$store.state.userinfo.avatar || 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/default-avatar.png',
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
				],
				query: {
					username: ''
				}
			}
		},
		methods: {
			// 调起自定义权限目的弹框
			openAuth() {
				this.$refs['authpup'].open()
			},
			//用户授权权限后的回调
			changeAuth() {
				//这里是权限通过后执行自己的代码逻辑
				console.log('权限已授权，可执行自己的代码逻辑了');
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
			// 复制邀请码
			copyInviteCode(data) {
				uni.setClipboardData({
					data,
					showToast: false,
					success: () => {
						this.$refs.uToast.show({
							message: this.$t('复制成功'),
							type: 'success',
							duration: 1200
						})
					}
				})
			},
			// 打开弹出框
			openModel(i) {
				if (i != 0) return
				this.show = true
			},
			// 修改用户名
			confirmChangeUsername() {
				this.show = false
				this.$refs.uToast.show({
					message: this.$t('修改成功'),
					type: 'success',
					duration: 1200
				})
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.browserFitHeight}px - env(safe-area-inset-bottom))`
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page {
		background: url('https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/login-bg.jpg') no-repeat;
		background-size: 100% 100%;
		/deep/ .u-border{
			border-width: 2rpx !important;
			height: 80rpx;
			caret-color: #f27299;
			border-color: #f27299 !important; 
		}
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

		.bottom {
			width: 600rpx;
			background-color: #f1f1f1;
			border-radius: 25rpx;
			padding: 0 30rpx;
		}
	}
</style>