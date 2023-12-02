<template>
	<u-overlay :show="posterShow" @click="closePoster">
		<view class="share d-flex flex-column j-center a-center" @click.stop>
			<image :src="path" mode="widthFix" show-menu-by-longpress></image>
			<view v-if="path" class="close" @click="closePoster">
				<image src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/exit.png" mode="">
				</image>
			</view>
			<l-painter v-if="posterShow" useCORS :after-delay="1000" :board="poster" :isCanvasToTempFilePath="canvasSwitch"
				@success="openSuccess" @fail="openFail" custom-style="position: fixed; left: 200%" />
		</view>
	</u-overlay>
</template>

<script>
	export default {
		name: "myShare",
		props: {
			posterShow: {
				type: [String, Boolean],
				default: false
			},
			item: Object,
			userInfo: Object,
			current: Number
		},
		data() {
			return {
				path: '',
				oldPath: '',
				poster: {},
				canvasSwitch: false
			};
		},
		watch: {
			posterShow: {
				handler(newV, oldV) {
					if (newV) {
						this.posterShowClick()
					}
				},
				deep: true
			},
			current: {
				handler(newV, oldV) {
					if (newV != oldV && this.posterShow) {
						uni.showLoading()
					} else if (newV == oldV && this.posterShow) {
						uni.hideLoading()
					}
				},
				deep: true
			}
		},
		methods: {
			//初始化
			init() {
				this.poster = {
					css: {
						width: "600rpx",
						height: "1068rpx",
						borderRadius: "15rpx",
						position: "relative"
					},
					views: [{
							src: `${this.item.src}`,
							type: "image",
							css: {
								objectFit: "cover",
								width: "600rpx",
								height: "1068rpx",
								borderRadius: "15rpx"
							}
						},
						{
							views: [
								{
									src: "https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/GongYueLogo.png" ,
									type: "image",
									css: {
										objectFit: "cover",
										width: "35rpx",
										height: "35rpx",
										display: 'inline-block'
									}
								},
								{
									text: this.$t('宫悦商城'),
									type: "text",
									css: {
										height: "35rpx",
										lineHeight: "35rpx",
										fontSize: "24rpx",
										background: 'linear-gradient(to bottom, #FBB13B 0%, #F0422B 100%)',
										webkitBackgroundBlip: 'text',
										backgroundClip: 'text',
										color: 'transparent',
										marginLeft: '10rpx',
										display: 'inline-block'
									}
								}
							] ,
							type: 'view',
							css: {
								padding: '15rpx',
								position: "absolute",
								left: "0rpx",
								top: "0rpx",
								backgroundColor: 'rgba(0, 0, 0, .5)',
								borderRadius: "15rpx 0 15rpx 0"
							}
						},
						{
							css: {
								width: "323rpx",
								height: "400rpx",
								position: "absolute",
								left: "138.5rpx",
								bottom: "32rpx"
							},
							views: [{
									src: "https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/share-bc.png",
									type: "image",
									css: {
										objectFit: "cover",
										width: "323rpx",
										height: "400rpx"
									}
								},
								{
									src: `${this.userinfo.avatar}`,
									type: "image",
									css: {
										objectFit: "cover",
										width: "55rpx",
										height: "55rpx",
										position: "absolute",
										left: "28rpx",
										top: "22rpx",
										borderRadius: "50%",
									}
								},
								{
									text: `${this.userinfo.name}`,
									type: "text",
									css: {
										objectFit: "cover",
										height: "55rpx",
										width: "200rpx",
										position: "absolute",
										left: "99rpx",
										top: "22rpx",
										fontWeight: 'bold',
										lineHeight: "55rpx",
										lineClamp: "1"
									}
								},
								{
									text: `${this.item.shareUrl + '?item=' + this.userinfo.inviteCode}`,
									type: 'qrcode',
									css: {
										objectFit: "cover",
										width: "150rpx",
										height: "150rpx",
										position: "absolute",
										left: "86.5rpx",
										top: "95rpx"
									}
								},
								{
									text: this.$t('邀请码'),
									type: "text",
									css: {
										position: "absolute",
										left: "126rpx",
										top: "275rpx",
										fontSize: "24rpx",
										fontWeight: "bold",
										color: "#000000"
									}
								},
								{
									css: {
										width: "230rpx",
										height: "48rpx",
										position: "absolute",
										left: "46rpx",
										bottom: "30rpx",
										borderWidth: '4rpx',
										borderStyle: 'solid',
										borderColor: '#111111',
										borderRadius: "26rpx",
										textAlign: "center"
									},
									views: [{
										text: `${this.userinfo.inviteCode}`,
										type: "text",
										css: {
											fontSize: "25rpx",
											fontWeight: "bold",
											color: "#000000",
											width: "230rpx",
											height: "48rpx",
											boxSizing: "border-box",
											textAlign: "center",
											lineHeight: "48rpx"
										}
									}],
									type: 'view'
								}
							],
							type: 'view'
						},
					]
				}
			},
			//关闭
			closePoster() {
				this.canvasSwitch = false
				this.poster = {}
				this.path = ''
				this.$emit('closePoster')
			},
			//分享按钮
			posterShowClick() {
				this.init()
				this.canvasSwitch = true
			},
			//生成海报成功
			openSuccess(e) {
				this.$emit('success')
				uni.hideLoading()
				this.path = e
			},
			//生成海报失败
			openFail(e) {
				uni.$u.toast(e)
				uni.hideLoading()
			}
		},
		computed: {
			userinfo() {
				return this.$store.state.userinfo
			}
		}
	}
</script>

<style lang="scss">
	.share {
		width: 600rpx;
		border-radius: 20rpx;
		position: absolute;
		bottom: 50%;
		left: 75rpx;
		transform: translateY(50%);

		.close {
			width: 79rpx;
			height: 146rpx;
		}
	}
</style>
