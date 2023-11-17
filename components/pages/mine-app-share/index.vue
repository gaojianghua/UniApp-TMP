<template>
	<u-overlay :show="posterShow" @click="closePoster">
		<view class="share flex flex-column justify-center align-center" @click.stop>
			<image :src="path" mode="widthFix" show-menu-by-longpress></image>
			<view v-if="path" class="close" @click="closePoster">
				<image src="/static/img/mine/exit.png" mode="">
				</image>
			</view>
			<l-painter :after-delay="1000" :board="poster" :isCanvasToTempFilePath="canvasSwitch"
				@success="openSuccess" custom-style="position: fixed; left: 200%" />
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
						//this.path = this.oldPath
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
								height: "1068rpx"
							}
						},
						{
							src: "https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/GongYueLogo.png",
							type: "image",
							css: {
								objectFit: "cover",
								width: "35rpx",
								height: "35rpx",
								position: "absolute",
								left: "25rpx",
								top: "25rpx"
							}
						},
						{
							text: this.$t('宫悦商城'),
							type: "text",
							css: {
								height: "35rpx",
								position: "absolute",
								left: "75rpx",
								top: "25rpx",
								lineHeight: "35rpx",
								fontSize: "24rpx"
							}
						},
						{
							css: {
								width: "323rpx",
								height: "400rpx",
								position: "absolute",
								left: "138.5rpx",
								bottom: "32rpx",
								// position: "relative"
							},
							views: [{
									src: "/static/img/mine/share-bc.png",
									type: "image",
									css: {
										objectFit: "cover",
										width: "323rpx",
										height: "400rpx"
									}
								},
								{
									src: `${this.$store.state.userinfo.avatar}`,
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
									text: `${this.$store.state.userinfo.name}`,
									type: "text",
									css: {
										objectFit: "cover",
										height: "55rpx",
										width: "200rpx",
										position: "absolute",
										left: "99rpx",
										top: "22rpx",
										lineHeight: "55rpx",
										lineClamp: "1"
									}
								},
								{
									src: `${this.item.erwm}`,
									type: "image",
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
										top: "265rpx",
										fontSize: "24rpx",
										fontWeight: "500",
										color: "#000000"
									}
								},
								{
									css: {
										width: "230rpx",
										height: "52rpx",
										position: "absolute",
										left: "46rpx",
										bottom: "30rpx",
										border: "4rpx solid #111111",
										borderRadius: "26rpx",
										boxSizing: "border-box",
										textAlign: "center"
									},
									views: [{
										text: `${this.$store.state.userinfo.inviteCode}`,
										type: "text",
										css: {
											fontSize: "25rpx",
											fontWeight: "bold",
											color: "#000000",
											width: "230rpx",
											height: "52rpx",
											boxSizing: "border-box",
											textAlign: "center",
											lineHeight: "52rpx"
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
			//下载成功
			openSuccess(e) {
				//console.log(e)
				uni.hideLoading()
				this.path = e
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
