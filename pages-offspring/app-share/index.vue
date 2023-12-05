<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="transparent" value="page.APP分享" i18n></m-navbar>
		<!-- 内容区域 -->
		<!-- #ifndef MP -->
		<view class="share" :style="scrollStyle">
			<swiper circular :current="current" previous-margin="105rpx" next-margin="105rpx" @change="openSweiper"
				:style="{height: '73.3%'}">
			<!-- #endif -->
				<!-- #ifdef MP -->
				<view class="share" :style="[scrollStyle]">
					<swiper circular :current="current" previous-margin="105rpx" next-margin="105rpx"
						@change="openSweiper" :style="[{height: '73.3%'}]">
					<!-- #endif -->
						<swiper-item class="share-item h-100 d-flex a-center" v-for="item in list" :key="item.id">
							<view class="swiper-item w-100 h-100 hidden position-relative"
								:class="current === item.id?'active':''"
								:style="{'background-image': `url(${item.src})`}">
								<view class="logo d-inline-block">
									<view class="d-flex a-center">
										<u-image width="35rpx" height="35rpx"
											src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/GongYueLogo.png"
											mode=""></u-image>
										<view class="ml-1 line-h logo-text font-weight">
											{{$t('宫悦商城')}}
										</view>
									</view>
								</view>
								<view class="share-code">
									<view class="share-user d-flex a-center">
										<u-image class="mr-1 rounded-circle hidden" width="60rpx" height="60rpx"
											:src="userinfo.avatar" mode=""></u-image>
										<view class="user-name font-weight text-ellipsis1">
											{{userinfo.name}}
										</view>
									</view>
									<view class="code mb-4 d-flex j-center">
										<u-image width="150rpx" height="150rpx" :src="item.erwm" mode=""></u-image>
									</view>
									<view class="invite d-flex j-center flex-column a-center">
										<view class="invite-name font-weight line-h">
											{{$t('邀请码')}}
										</view>
										<view class="invite-code font-weight d-flex j-center a-center">
											{{userinfo.inviteCode}}
										</view>
									</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
					<view class="share-btn d-flex j-sb a-center">
						<!-- #ifdef MP -->
						<button class="btons d-flex j-center a-center" hover-class="none" open-type="share">
							{{$t('分享邀请链接')}}
						</button>
						<!-- #endif -->
						<!-- #ifdef H5 -->
						<view class="btons d-flex j-center a-center" @click="show = true">
							{{$t('分享邀请链接')}}
						</view>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS -->
						<view class="btons d-flex j-center a-center" @click="uniAppShare">
							{{$t('更多分享方式')}}
						</view>
						<!-- #endif -->
						<view class="btons d-flex j-center a-center" @click="sharePosters">
							{{$t('分享专属海报')}}
						</view>
					</view>
				</view>
				<!-- 海报生成组件 -->
				<mine-app-share @closePoster="closePoster" @success="success" :posterShow="posterShow"
					:poster="poster"/>
				<!-- 弹框 -->
				<m-modal :show="show" i18n title="温馨提示" :isCancel="false" btnName="复制链接" @cancel="show = false"
					@confirm="urlCopy">
					<view class="d-flex a-center j-center flex-column">
						<view class="d-flex a-center j-center flex-column main-text-color letter-1">
							<span>{{$t('亲~ 快复制下方链接分享给您的好友吧!')}}</span>
							<u-icon name="arrow-downward" size="18" color="#f27299"></u-icon>
						</view>
						<view
							class="mt-1 text-center text-success border-2 border-success px-2 py-1 rounded-1 initial text-break">
							{{shareUrl}}
						</view>
					</view>
				</m-modal>
				<u-toast ref="uToast"></u-toast>
		</view>
</template>

<script>
	import MineAppShare from '@/components/pages/mine-app-share/index.vue'
	import shareInit from '@/mixins/share-init.js'
	import {
		list
	} from './data.js'
	export default {
		mixins: [shareInit],
		components: {
			MineAppShare
		},
		data() {
			return {
				current: 0,
				posterShow: false,
				item: {},
				list: [],
				show: false,
				shareUrl: '',
				isSuccess: false,
				time: null,
				poster: {}
			}
		},
		// #ifdef MP
		onShareAppMessage() {
			return {
				title: this.$t('欢迎使用宫悦商城!'),
				path: '/pages/tabbar/home/index',
				bgImgUrl: ''
			}
		},
		// #endif
		onLoad(option) {
			this.init()
		},
		methods: {
			//初始化
			init() {
				this.shareUrl = 'https://gaojianghua.cn/pages/account/register/index?item=' + this.$store.state.userinfo
					.inviteCode
				this.getData()
				this.initPoster()
			},
			//初始化海报数据
			initPoster() {
				this.poster = {
					css: {
						width: "600rpx",
						height: "1068rpx",
						borderRadius: "15rpx",
						position: "relative"
					},
					views: [{
							src: `${this.list[this.current].src}`,
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
									text: `${this.list[this.current].shareUrl + '?item=' + this.userinfo.inviteCode}`,
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
			//分享海报
			sharePosters() {
				this.posterShow = true
				uni.showLoading()
				this.time = setTimeout(() => {
					if (this.isSuccess) {
						uni.$u.toast(this.$t('网络异常，请稍后重试'))
						uni.hideLoading();
					}
					clearTimeout(this.time)
				}, 6000);
			},
			//生成海报成功
			success() {
				this.isSuccess = true
				clearTimeout(this.time)
			},
			//关闭弹框
			closePoster() {
				this.isSuccess = false
				this.posterShow = false
			},
			//滑动事件
			openSweiper(e) {
				this.current = e.detail.current
				this.initPoster()
			},
			//获取数据
			getData() {
				// #ifndef MP
				list.forEach(async (item, i) => {
					item.erwm = await this.$tools.Common.generateQRCode(item.shareUrl)
				})
				// #endif
				this.list = list
			},
			// 拷贝URL
			urlCopy() {
				uni.setClipboardData({
					data: this.shareUrl,
					showToast: false,
					success: () => {
						this.show = false
						this.$refs.uToast.show({
							message: this.$t('复制成功'),
							type: 'success',
							duration: 1200
						})
					},
					fail: () => {
						this.show = false
						this.$refs.uToast.show({
							message: this.$t('复制失败'),
							type: 'warning',
							duration: 1200
						})
					}
				})
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			},
			userinfo() {
				return this.$store.state.userinfo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background: url('https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/login-bg.jpg') no-repeat;
		background-size: cover;

		.share {
			.share-item {
				.swiper-item {
					height: calc(100% - 160rpx) !important;
					transform: scale(0.85);
					background-repeat: no-repeat;
					background-size: cover;
					border-radius: 15rpx;
					transition: all 0.3s linear;

					.logo {
						padding: 15rpx;
						background-color: rgba(0, 0, 0, .5);
						border-radius: 0 0 15rpx 0;

						.logo-text {
							font-size: 24rpx;
							background: linear-gradient(to bottom, #FBB13B, #F0422B);
							-webkit-background-clip: text;
							background-clip: text;
							color: transparent;
						}
					}

					.share-code {
						width: 330rpx;
						height: 400rpx;
						background-image: url('https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/share-bc.png');
						background-repeat: no-repeat;
						background-size: cover;
						position: absolute;
						left: 50%;
						bottom: 32rpx;
						transform: translateX(-50%);

						.share-user {
							margin: 22rpx 0 18rpx 28rpx;
							height: 55rpx;

							.user-name {
								font-size: 26rpx;
							}
						}

						.invite {
							.invite-name {
								font-size: 24rpx;
							}

							.invite-code {
								width: 230rpx;
								height: 52rpx;
								border: 4rpx solid #111111;
								border-radius: 26rpx;
								margin-top: 16rpx;
								font-size: 25rpx;
							}
						}
					}
				}

				.active {
					transform: scale(1);
					transition: all 0.3s linear;
				}
			}

		}

		.share-btn {
			padding: 0 76rpx;

			.btons {
				border-radius: 16rpx;
				width: 254rpx;
				height: 80rpx;
				color: #fff;
				border: 2rpx solid #fff;
				background: #f27299;
			}

			.btons:active {
				border: 2rpx solid #f27299;
				background: #fff;
				color: #f27299;
			}
		}
	}
</style>