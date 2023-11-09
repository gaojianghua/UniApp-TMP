<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="transparent" value="page.APP分享" i18n></m-navbar>
		<!-- 内容区域 -->
		<view class="share" :style="scrollStyle">
			<swiper circular :current="current" previous-margin="105rpx" next-margin="105rpx" @change="openSweiper"
				:style="{height: '73.3%'}">
				<swiper-item class="share-item d-flex a-center" v-for="item in list" :key="item.id">
					<view class="swiper-item w-100 h-100 hidden position-relative"
						:class="current === item.id?'active':''" :style="{'background-image': `url(${item.src})`}">
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
									:src="$store.state.userinfo.avatar" mode=""></u-image>
								<view class="user-name font-weight text-ellipsis1">
									{{$store.state.userinfo.name}}
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
									{{$store.state.userinfo.inviteCode}}
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="share-btn d-flex j-sb a-center">
				<button class="btons d-flex j-center a-center" hover-class="none" open-type="share">
					{{$t('分享邀请链接')}}
				</button>
				<view class="btons d-flex j-center a-center" @click="sharePosters">
					{{$t('分享专属海报')}}
				</view>
			</view>
		</view>
		<mine-app-share @closePoster="closePoster" :posterShow="posterShow" :item="list[current]" :current="current" />
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import MineAppShare from '@/components/pages/mine-app-share/index.vue'
	import {
		list
	} from './data.js'
	export default {
		components: {
			MineAppShare
		},
		data() {
			return {
				current: 0,
				posterShow: false,
				item: {},
				list
			}
		},
		onShareAppMessage() {
			return {
				title: '欢迎使用迦迦欢!',
				path: '/pages/index/index',
				bgImgUrl: `${this.list[this.current].src}`
			}
		},
		onLoad(option) {
			this.init()
		},
		methods: {
			//初始化
			init() {
				this.getData()
			},
			//分享海报
			sharePosters() {
				this.posterShow = true
				uni.showLoading()
			},
			//关闭弹框
			closePoster() {
				this.posterShow = false
			},
			//滑动事件
			openSweiper(e) {
				this.current = e.detail.current
			},
			//获取数据
			getData() {

			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background: url('/static/img/common/login-bg.jpg') no-repeat;
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
						background-image: url('https://jiajiahuan-2021.oss-cn-hangzhou.aliyuncs.com/all/share-er-bc.png');
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