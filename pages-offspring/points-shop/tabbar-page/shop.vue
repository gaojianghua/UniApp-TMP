<template>
	<view class="main" :style="scrollStyle">
		<view :class="screen == 0 ? 'top-active' : (screen == 1 ? 'top-default' : '')" class="main-top">
			<m-scroll :isLoading="couponIsLoading" :scrollStyle="{height: `calc(100% - 50rpx)`}" :load="couponLoad"
				@loadmore="couponLoadmore" bgColor="transparent" @onRefresh="couponOnRefresh">
				<u-empty v-if="load != 0 && couponList.length == 0" mode="list" :text="$t('暂无数据')"
					icon="http://cdn.uviewui.com/uview/empty/list.png">
				</u-empty>
				<view class="px-2">


					<view v-if="couponList.length != 0" class="coupon-item d-flex a-center pl-3 pr-2 mt-2"
						v-for="(item, i) in couponList" :key="i">
						<view class="info d-flex flex-column">
							<view class="info-price d-flex a-base j-center">
								<span class="price-icon text-danger font-weight line-h">￥</span>
								<span class="price-value text-danger font-weight line-h">{{item.price}}</span>
							</view>
							<view class="info-desc">
								{{item.desc}}
							</view>
						</view>
						<view class="point d-flex a-base">
							{{$t('需要积分')}}: <span class="point-v main-text-color font-weight ml-1">{{item.point}}</span>
						</view>
						<view class="btns text-white ml-auto">
							{{$t('立即兑换')}}
						</view>
					</view>
				</view>
			</m-scroll>
			<view v-if="screen != 1" class="arrow bg-white flex-column d-flex a-center j-center" @click="screenClick(0)">
				<u-icon v-if="screen != 0" name="arrow-downward" size="22" color="#f27299"></u-icon>
				<u-icon v-else name="arrow-upward" size="22" color="#f27299"></u-icon>
				<u-gap class="w-100 mt-auto" height="2rpx" bgColor="#999"></u-gap>
			</view>
		</view>
		<view :class="screen == 1 ? 'bot-active' : (screen == 0 ? 'bot-default' : '')" class="main-bot">
			<view v-if="screen != 0" class="arrow bg-white flex-column d-flex a-center" @click="screenClick(1)">
				<u-gap class="w-100" height="2rpx" bgColor="#999"></u-gap>
				<u-icon class="mt-auto" v-if="screen != 1" name="arrow-upward" size="22" color="#f27299"></u-icon>
				<u-icon class="mt-auto" v-else name="arrow-downward" size="22" color="#f27299"></u-icon>
			</view>
			<m-scroll :isLoading="isLoading" :scrollStyle="{height: `calc(100% - 50rpx)`}" :load="load"
				@loadmore="loadmore" bgColor="transparent" @onRefresh="onRefresh">
				<u-empty v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
					icon="http://cdn.uviewui.com/uview/empty/list.png">
				</u-empty>
				<view class="px-2">
					<view v-if="list.length != 0" class="item bg-white rounded-1 d-flex a-center p-2 mt-2"
						v-for="(item, i) in list" :key="i">
						<u-image radius="6" width="160rpx" height="160rpx" :src="item.img"></u-image>
						<view class="item-info ml-2 d-flex flex-column">
							<view class="title">
								{{item.title}}
							</view>
							<view class="desc">
								{{item.ex}}{{$t('人已兑换')}}
							</view>
							<view class="point d-flex a-base mt-auto">
								{{$t('需要积分')}}: <span
									class="point-v main-text-color font-weight ml-1">{{item.point}}</span>
							</view>
						</view>
						<view class="btns text-white ml-auto">
							{{$t('立即兑换')}}
						</view>
					</view>
				</view>
			</m-scroll>
		</view>
	</view>
</template>

<script>
	import MScroll from '@/main_modules/main-ui/m-scroll/index.vue'
	export default {
		props: {
			current: {
				type: Number,
				default: 0
			}
		},
		components: {
			MScroll
		},
		data() {
			return {
				load: 0,
				isLoading: true,
				query: {
					page: 1,
					limit: 10
				},
				list: [],
				total: 0,
				istrig: true,
				couponLoad: 0,
				couponIsLoading: true,
				couponQuery: {
					page: 1,
					limit: 10
				},
				couponList: [],
				couponTotal: 0,
				couponIstrig: true,
				screen: 2
			}
		},
		methods: {
			// 获取数据
			async getData(e) {
				// let {
				// 	data,
				// 	code,
				// 	message
				// } = await prayData(this.query)
				let code = 200
				let data = {
					list: []
				}
				for (let i = 0; i < 10; i++) {
					data.list.push({
						img: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/141b53c86d1f6dc174982e6f122dcbfc.jpg',
						title: '曼哈顿啤酒',
						ex: 1780,
						point: 300
					})
				}
				data.total = data.list.length
				if (code == 200) {
					if (e) { // 加载更多
						this.list = this.list.concat(data.list)
					} else {
						this.list = data.list
						this.total = data.total
					}
					if (this.query.page * this.query.limit >= this.total) {
						return this.load = 1
					} else {
						return this.load = 2
					}
				}
			},
			// 下拉刷新
			onRefresh() {
				this.query.page = 1
				this.getData()
			},
			// 加载更多
			loadmore() {
				if (this.load == 1 || this.istrig == false) return;
				this.load = 0
				this.query.page++
				this.istrig = false
				let time = setTimeout(() => {
					this.getData('S')
					this.istrig = true
					clearTimeout(time)
				}, 1000)
			},
			// 获取数据
			async getCouponData(e) {
				// let {
				// 	data,
				// 	code,
				// 	message
				// } = await prayData(this.query)
				let code = 200
				let data = {
					list: []
				}
				for (let i = 0; i < 10; i++) {
					data.list.push({
						price: 20,
						point: 200,
						desc: '满100可用'
					})
				}
				data.total = data.list.length
				if (code == 200) {
					if (e) { // 加载更多
						this.couponList = this.couponList.concat(data.list)
					} else {
						this.couponList = data.list
						this.couponTotal = data.total
					}
					if (this.couponQuery.page * this.couponQuery.limit >= this.couponTotal) {
						return this.couponLoad = 1
					} else {
						return this.couponLoad = 2
					}
				}
			},
			// 下拉刷新
			couponOnRefresh() {
				this.couponQuery.page = 1
				this.getCouponData()
			},
			// 加载更多
			couponLoadmore() {
				if (this.couponLoad == 1 || this.couponIstrig == false) return;
				this.couponLoad = 0
				this.couponQuery.page++
				this.couponIstrig = false
				let time = setTimeout(() => {
					this.getCouponData('S')
					this.couponIstrig = true
					clearTimeout(time)
				}, 1000)
			},
			// 切换分屏
			screenClick(i) {
				if(this.screen == i) {
					i == 0 ? this.screen = 1 : this.screen = 0
				}else {
					this.screen = i
				}
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - 52px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		},
		watch: {
			current: {
				handler(nv, ov) {
					if (nv === 0) {
						this.list = []
						this.isLoading = true
						this.load = 0
						this.couponList = []
						this.couponIsLoading = true
						this.couponLoad = 0
						this.screen = 2
						let time = setTimeout(() => {
							this.getData()
							this.getCouponData()
							clearTimeout(time)
						}, 1200)
					}
				},
				immediate: true,
				deep: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		.main-top {
			height: 30%;
		}

		.main-bot {
			height: 70%;
		}

		.main-top,
		.main-bot {
			transition: all 0.3s linear;

			.arrow {
				height: 50rpx;
			}

			.coupon-item {
				height: 170rpx;
				background: url('/static/img/mine/coupon.png') no-repeat;
				background-size: cover;
				border-radius: 16rpx;

				.info {
					.info-price {
						.price-icon {
							font-size: 24rpx;
						}

						.price-value {
							font-size: 50rpx;
						}
					}

					.info-desc {
						color: #999;
						font-size: 26rpx;
					}
				}

				.point {
					margin-left: 60rpx;

					.point-v {
						font-size: 32rpx;
					}
				}

				.btns {
					padding: 6rpx 35rpx;
					background: linear-gradient(135deg, #FFBC3A, #FF9416);
					border-radius: 30rpx;
				}
			}

			.item {
				.item-info {
					height: 160rpx;

					.title {
						font-size: 30rpx;
					}

					.desc {
						font-size: 24rpx;
						color: #999;
					}

					.point {
						font-size: 26rpx;
						color: #333;

						.point-v {
							font-size: 28rpx;
						}
					}
				}

				.btns {
					padding: 6rpx 35rpx;
					background: linear-gradient(135deg, #FFBC3A, #FF9416);
					border-radius: 30rpx;
				}
			}
		}

		.top-active {
			height: 100%;
			transition: all 0.3s linear;
		}

		.top-default {
			height: 0;
			transition: all 0.3s linear;
		}

		.bot-active {
			height: 100%;
			transition: all 0.3s linear;
		}

		.bot-default {
			height: 0;
			transition: all 0.3s linear;
		}
	}
</style>