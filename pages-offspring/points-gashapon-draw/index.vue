<template>
	<view class="page position-relative">
		<u-image height="auto" width="100%" src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/keepbg.png" mode="widthFix"></u-image>
		<view class="position-absolute top-0 bottom-0 left-0 right-0">
			<!-- 顶部导航栏 -->
			<m-navbar bgColor="transparent" textColor="#fff" value="page.扭蛋机抽奖" i18n>
				<view slot="right" class="notice top-half tf-half-y" @click="ruleShow = true">
					T&C
				</view>
			</m-navbar>
			<m-scroll-y :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
				<view class="position-relative">
					<view v-if="!luckyDrawSwitch" class="is-coming">
						{{$('幸运大抽奖，敬请期待。。。')}}
					</view>
					<view v-else class="content d-flex a-center j-center flex-column pb-3">
						<u-image width="690rpx" height="96rpx" src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/text.png"></u-image>
						<MGashaponPrizedraw />
						<view class="title-btn d-flex a-center j-center mt-3 px-5">
							{{$t('剩余积分')}}：{{userinfo.points}}
						</view>
						<view class="open-old text-center text-white" @click="openRecord">
							{{$t('查看抽奖记录')}}
						</view>
						<view class="title-broadcast d-flex a-center position-relative">
							<view class="broadcast d-flex position-absolute top-0 left-0">
								<view class="img-box d-flex a-center">
									<u-icon name="volume" size="28" color="#fff"></u-icon>
								</view>
								<view class="" style="height: 100%;width: 100%; overflow: hidden;">
									<view class="boro-record">
										<view class="d-flex a-center" style="height: 60rpx;width: 100%;"
											v-for="(item,i) in records" :key="i">
											<view style="height: 100%;width: 100%;">
												<view class="prize d-flex a-center">
													<view class="prize-l text-ellipsis1">
														{{item.nickname}}
													</view>
													<view class="prize-r d-flex a-center">
														<view></view>
														<view class="d-flex a-center ml-auto">
															<u-image width="50rpx" height="50rpx"
																:src="item.image"></u-image>
															<view class="text-ellipsis1 ml-2">
																{{item.name}}
															</view>
														</view>
													</view>
												</view>
											</view>
										</view>
										<block v-for="(item,i) in records" :key="i">
											<view class="d-flex a-center" style="height: 60rpx;width: 100%;">
												<view style="height: 100%;width: 100%;">
													<view class="prize d-flex j-sb a-center">
														<view class="prize-l text-ellipsis1">
															{{item.nickname}}
														</view>
														<view class="prize-r d-flex a-center">
															<view></view>
															<view class="d-flex a-center ml-auto">
																<u-image width="50rpx" height="50rpx"
																	:src="item.image"></u-image>
																<view class="text-ellipsis1 ml-2">
																	{{item.name}}
																</view>
															</view>
														</view>
													</view>
												</view>
											</view>
										</block>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</m-scroll-y>
		</view>
		<m-modal :show="show" i18n title="恭喜中奖" :isCancel="false" @cancel="show = false" @confirm="show = false">
			<view class="d-flex a-center j-center flex-column">
				<u-image width="160rpx" height="160rpx" :src="item.image"></u-image>
				<view class="mt-1 text-center">
					{{$t('恭喜您抽中奖品')}}: {{item.name}}
				</view>
			</view>
		</m-modal>
		<m-modal :show="ruleShow" i18n title="抽奖规则" :isCancel="false" @cancel="ruleShow = false"
			@confirm="ruleShow = false">
			<view class="d-flex a-center j-center flex-column" v-html="ruleContent">
			</view>
		</m-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import MGashaponPrizedraw from '@/main_modules/main-ui/m-gashapon-prizedraw/index.vue'
	import goods from './goods.json'
	import records from './records.json'
	export default {
		components: {
			MGashaponPrizedraw
		},
		data() {
			return {
				show: false,
				ruleShow: false,
				prizeSrc: '',
				prizeName: '',
				luckyDrawSwitch: true,
				list: [],
				item: {},
				ruleContent: '',
				records: []
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.list = []
				this.records = []
				this.list = goods.data
				if (this.list.length == 8) {
					this.list.splice(4, 0, {name: ''});
				}
				this.records = records.data
				this.item = {
					"image": "http://images.baixingliangfan.cn/compressedPic/20180712181330_9746.jpg",
					"oriPrice": 2.50,
					"presentPrice": 1.90,
					"sales": 1688,
					"goodsDesc": "酒香浓郁，精美品质",
					"name": "雪花啤酒",
					"id": "87013c4315e54927a97e51d0645ece76",
					"check": false
				}
			},
			// 前往抽奖记录
			openRecord() {
				this.$tools.Navigate.navigateTo('/pages-offspring/points-draw-record/index')
			},
			// 抽奖结束
			endLuckyDraw() {
				this.show = true
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
		},
	}
</script>

<style lang="scss" scoped>
	.page {

		.is-coming {
			text-align: center;
			font-size: 28rpx;
			color: #f1f1f1;
			padding: 50rpx 0;
		}

		.content {

			.title-text {
				font-size: 40rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FBDD5B;
				line-height: 1;
				padding-top: 56rpx;
			}

			.title-desc {
				font-size: 31rpx;
				font-family: PingFang SC;
				font-weight: 300;
				color: #FFFFFF;
				line-height: 1;
				padding: 24rpx 0 42rpx;
			}

			.title-draw {
				font-size: 41rpx;
				font-family: PingFang SC;
				font-weight: 300;
				color: #FFFFFF;
				line-height: 1;
				margin: 37rpx 0 21rpx;
			}

			.title-broadcast {
				width: 690rpx;
				height: 340rpx;
				margin-top: 50rpx;
				border-radius: 10rpx;

				.broadcast {
					width: 690rpx;
					height: 340rpx;
					padding: 20rpx;
					border-radius: 10rpx;
					background: radial-gradient(circle at center, transparent, #361D7A);
					border: 4rpx solid #6F6DBD;

					.img-box {
						height: 60rpx;

						.img {
							width: 40rpx;
							height: 36rpx;
						}
					}

					.boro-record {
						animation: scroll 20s linear infinite;

						@keyframes scroll {
							0% {
								transform: translateY(0rpx);
							}

							10% {
								transform: translateY(-120rpx);
							}

							20% {
								transform: translateY(-240rpx);
							}

							30% {
								transform: translateY(-360rpx);
							}

							40% {
								transform: translateY(-480rpx);
							}

							50% {
								transform: translateY(-600rpx);
							}

							60% {
								transform: translateY(-720rpx);
							}

							70% {
								transform: translateY(-840rpx);
							}

							80% {
								transform: translateY(-960rpx);
							}

							90% {
								transform: translateY(-1080rpx);
							}

							100% {
								transform: translateY(-1200rpx);
							}
						}

						.prize {
							height: 100%;
							color: #FFFFFF;
							margin-left: 18rpx;

							.prize-l,
							.prize-r {
								width: 50%;
							}

							view {
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 400;
							}
						}
					}
				}
			}


			.title-btn {
				height: 60rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				border-radius: 50rpx;
				color: #FFFFFF;
				background-color: #888;
			}

			.open-old {
				margin-top: 20rpx;
				text-decoration: underline;
			}

			.tc {
				padding: 30rpx;
				margin-top: 30rpx;
				background-color: #888888;
				color: #fff;

				.tc-title {
					font-weight: 500;
					font-size: 28rpx;
				}

				span {
					font-size: 26rpx;
				}
			}
		}

		.notice {
			position: absolute;
			right: 20rpx;
			color: #fff;
			z-index: 9;
			padding: 4rpx 30rpx;
			border-radius: 30rpx;
			background-color: #555;
		}
	}
</style>