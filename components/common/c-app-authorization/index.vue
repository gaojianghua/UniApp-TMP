<template>
	<view v-if="showPopup" class="uni-popup" :style="{top: isNativeHead ? '': `${$store.state.statusHeight}px`}">
		<view :class="[type, ani, animation ? 'ani' : '']" class="uni-custom uni-popup__wrapper px-2"
		 :style="{paddingTop: `${$store.state.statusHeight}px`}"
		 @click="close(true)">
			<view class="uni-popup__wrapper-box">
				<view class="title">{{authList[permissionID].title}}</view>
				<view class="content">{{authList[permissionID].content}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 开启动画
			animation: {
				type: Boolean,
				default: true
			},
			type: {
				type: String,
				default: 'top'
			},
			show: {
				type: Boolean,
				default: true
			},
			//是否是原生头部
			isNativeHead: {
				type: Boolean,
				default: true
			},
			permissionID: {
				type: [String, Number],
				default: ''
			}
		},
		data() {
			return {
				ani: '',
				showPopup: false,
				refuseNum: '', //拒绝次数，
				authList: {
					'WRITE_EXTERNAL_STORAGE': {
						title: this.$store.state.appSystemInfo.appName + "对存储空间/照片权限申请说明",
						content: "便于您使用该功能上传您的照片/图片/视频及用于更换头像、意见反馈、保存相册、发布商品/分享、下载与客服沟通等场景中读取和写入相册和文件内容。"
					},
					'ACCESS_FINE_LOCATION': {
						title: this.$store.state.appSystemInfo.appName + "对地理位置权限申请说明",
						content: "便于应用程序可以提供基于位置的服务、定位导航、附近搜索等功能。"
					},
					'CAMERA': {
						title: this.$store.state.appSystemInfo.appName + "对相机/摄像头权限申请说明",
						content: "便于您使用该功能拍照上传您的照片/视频及用于更换头像、意见反馈、保存相册、发布商品/动态、下载与客服沟通等场景中使用"
					},
					'RECORD_AUDIO': {
						title: this.$store.state.appSystemInfo.appName + "对麦克风权限申请说明",
						content: "便于您使用该功能进行录音、语音通话、发布语音、与客服语音沟通等场景中使用"
					},
					'CALL_PHONE': {
						title: this.$store.state.appSystemInfo.appName + "对拨打/管理电话权限申请说明",
						content: "便于您使用该功能联系买家、骑手或者客服、业务经理与联系等场景下使用"
					}
				}
			}
		},
		methods: {
			open() {
				this.requestPermissions(this.permissionID);
			},
			close(type) {
				this.ani = '';
				this.$nextTick(() => {
					setTimeout(() => {
						this.showPopup = false;
					}, 300)
				})
			},
			//权限检测
			requestPermissions(permissionID) {
				// #ifdef APP-PLUS
				//判断安卓与ios设备
				if (plus.os.name == 'Android') {
					let _permissionID = 'android.permission.' + permissionID;
					plus.android.checkPermission(_permissionID,
						granted => {
							if (granted.checkResult == -1) {
								//还未授权当前查询的权限，打开权限申请目的自定义弹框
								this.showPopup = true;
								this.$nextTick(() => {
									setTimeout(() => {
										this.ani = 'uni-' + this.type
									}, 30)
								})
							}
						},
						error => {
							console.log(error.message);
						}
					);
					plus.android.requestPermissions([_permissionID],
						(e) => {
							//关闭权限申请目的自定义弹框
							this.ani = '';
							this.$nextTick(() => {
								setTimeout(() => {
									this.showPopup = false
								}, 0)
							})
							if (e.granted.length > 0) {
								//当前查询权限已授权，此时可以通知页面执行接下来的操作
								this.$emit('changeAuth');
							}
							if (e.deniedAlways.length > 0) {
								//当前查询权限已被永久禁用，此时需要引导用户跳转手机系统设置去开启
								uni.showModal({
									title: this.$t('温馨提示'),
									content: this.$t('还没有该权限，立即去设置开启？'),
									cancelText: this.$t("取消"),
									confirmText: this.$t("去设置"),
									showCancel: true,
									confirmColor: '#000',
									cancelColor: '#666',
									success: (res) => {
										if (res.confirm) {
											this.$multiportApi.app.openSystemSettings()
										}
									}
								})
							}
						})
				} else {
					//IOS不需要添加自定义弹框来描述权限目的，因为在配置文件的隐私信息访问的许可描述里可添加
					//正常可以直接调用uni的API调起权限询问弹框使用各种权限，下面的判断使用场景主要是在IOS禁用某权限后，这个可以判断有无权限，进而引导用户跳转设置开启，仅列出了位置、相册、通讯录、相机、录音等权限，其他IOS权限可具体参考 https://ext.dcloud.net.cn/plugin?id=15787
					let result = 0;
					if (permissionID == 'ACCESS_FINE_LOCATION') {
						//IOS检测位置权限
						let cLLocationManager = plus.ios.importClass("CLLocationManager"),
							authStatus = cLLocationManager.authorizationStatus(),
							enable = cLLocationManager.locationServicesEnabled();
						if (enable && authStatus != 2) {
							result = 1;
						} else {
							result = 0;
						}
						plus.ios.deleteObject(cLLocationManager);
					} else if (permissionID == 'WRITE_EXTERNAL_STORAGE') {
						//IOS检测相册权限
						let PHPhotoLibrary = plus.ios.importClass("PHPhotoLibrary"),
							authStatus = PHPhotoLibrary.authorizationStatus();
						if (authStatus === 3) {
							result = 1;
						} else {
							result = 0;
						}
						plus.ios.deleteObject(PHPhotoLibrary);
					} else if (permissionID == 'CAMERA') {
						//IOS检测相机/摄像头权限
						const avCaptureDevice = plus.ios.importClass('AVCaptureDevice')
						// 拉起授权弹窗
						avCaptureDevice.requestAccessForMediaTypecompletionHandler('vide')
						// 这里再判断权限
						const authStatus = avCaptureDevice.authorizationStatusForMediaType('vide')
						// 0-还没决定 1-受限制 2-拒绝 3-已授
						if (authStatus === 3) {
							result = 1;
						} else {
							result = 0;
						}
						plus.ios.deleteObject(avCaptureDevice);
					} else if (permissionID == 'CALL_PHONE') {
						//IOS检测通讯录权限
						let contactStore = plus.ios.importClass("CNContactStore"),
							authStatus = contactStore.authorizationStatusForEntityType(0);
						if (authStatus === 3) {
							result = 1;
						} else {
							result = 0;
						}
						plus.ios.deleteObject(contactStore);
					} else if (permissionID == 'RECORD_AUDIO') {
						//IOS检测麦克风权限
						let aVAudioSession = plus.ios.importClass("AVAudioSession"),
							aVAudio = aVAudioSession.sharedInstance(),
							authStatus = aVAudio.recordPermission();
						if ([1684369017, 1970168948].includes(authStatus)) {
							result = 0;
						} else {
							result = 1;
						}
						plus.ios.deleteObject(aVAudioSession);
					}
					if (result) {
						//当前查询权限已授权，此时可以通知页面执行接下来的操作
						this.$emit('changeAuth')
					} else {
						//当前查询的权限已禁用,引导用户跳转手机系统设置去开启
						uni.showModal({
							title: this.$t('温馨提示'),
							content: this.$t('还没有该权限，立即去设置开启？'),
							cancelText: this.$t("取消"),
							confirmText: this.$t("去设置"),
							showCancel: true,
							confirmColor: '#000',
							cancelColor: '#666',
							success: (res) => {
								if (res.confirm) {
									this.$multiportApi.app.openSystemSettings()
								}
							}
						})
					}
				}
				// #endif
			}
		}
	}
</script>
<style lang="scss">
	.uni-popup {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 99999;
		overflow: hidden;

		&__wrapper {
			position: absolute;
			z-index: 999;
			/* #ifndef APP-NVUE */
			box-sizing: border-box;

			/* #endif */
			&.ani {
				/* #ifndef APP-NVUE */
				transition: all 0.3s;
				/* #endif */
			}

			&.top {
				top: 0;
				/* #ifdef APP-NVUE */
				left: 20rpx;
				/* #endif */
				/* #ifndef APP-NVUE */
				left: 0;
				transform: translateY(-710rpx);
				/* #endif */
			}

			&-box {
				position: relative;
				/* #ifndef APP-NVUE */
				box-sizing: border-box;
				/* #endif */
			}

			&.uni-custom {
				& .uni-popup__wrapper-box {
					/* #ifndef APP-NVUE */
					margin: 0 auto;
					/* #endif */
					padding: 30rpx;
					background: #fff;
					border: solid 2rpx #ddd;
					/* #ifndef APP-NVUE */
					box-sizing: border-box;
					/* #endif */
					border-radius: 16rpx;

					.title {
						font-size: 32rpx;
						font-weight: bold;
					}

					.content {
						margin-top: 16rpx;
						line-height: 1.6;
					}
				}
			}

			&.uni-top {
				transform: translateY(0);
			}
		}
	}
</style>