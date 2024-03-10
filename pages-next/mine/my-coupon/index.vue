<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.我的优惠券" i18n></m-navbar>
		<!-- 标签栏 -->
		<view class="tabs w-100">
			<u-tabs class="w-100" :scrollable="false" :current="current" :list="tabs" lineColor="#fb7299"
				@click="switchTabs"></u-tabs>
		</view>
		<!-- 列表栏 -->
		<!-- #ifdef MP-WEIXIN -->
		<swiper :current="current" :style="[scrollStyle]" @change="changeSwiper">
		<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<swiper :current="current" :style="scrollStyle" @change="changeSwiper">
			<!-- #endif -->
				<swiper-item v-for="(item, i) in tabs" :key="i">
					<!-- 列表区域 -->
					<view class="w-100 h-100 px-2">
						<m-scroll-y :isLoading="item.isLoading" i18n :scrollStyle="scrollStyle" :load="item.load"
							@loadmore="loadmore" bgColor="transparent" @onRefresh="onRefresh">
							<u-empty v-if="item.load != 0 && item.list.length == 0" mode="list" :text="$t('暂无优惠券')"
								icon="http://cdn.uviewui.com/uview/empty/list.png">
							</u-empty>
							<template v-if="item.list && item.list.length != 0">
								<view :class="item.type != 1 ? 'filter-gc' : ''" class="coupon-item d-flex a-center pl-3 pr-2 mt-2" v-for="(item, i) in item.list"
									:key="i">
									<view class="info-price d-flex a-base j-center">
										<span class="price-icon text-danger font-weight line-h">￥</span>
										<span class="price-value text-danger font-weight line-h">{{item.price}}</span>
									</view>
									<view class="info d-flex flex-column">
										<view class="info-desc">
											{{item.desc}}
										</view>
										<view class="point d-flex a-base">
											{{item.time}} {{$t('到期')}}
										</view>
									</view>
									<view v-if="item.type == 1" class="btns line-h-sm text-center text-white ml-auto" @click="openModel">
										{{$t('立即使用')}}
									</view>
									<view v-else class="expired rounded-circle d-flex a-center j-center ml-auto p-1">
										<view class="expired-item w-100 h-100 rounded-circle d-flex a-center j-center">
											{{item.type == 2 ? $t('已使用') : $t('已过期')}}
										</view>
									</view>
								</view>
							</template>
						</m-scroll-y>
					</view>
				</swiper-item>
			</swiper>
	</view>
</template>

<script>
	import {
		tabs
	} from './data.js'
	export default {
		data() {
			return {
				tabs,
				current: 0,
				istrig: true,
				isLock: false,
				query: {
					page: 1,
					limit: 20,
					type: 0
				},
			}
		},
		onLoad(args) {
			this.current = args.item || 0
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.tabs.forEach((item) => {
					item.name = this.$t(item.name)
				})
				this.getData()
			},
			// 获取数据
			async getData(e) {
				this.query.type = this.current + 1
				this.query.page = this.tabs[this.current].page
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
						price: '100',
						desc: '满800可用',
						time: '2024-02-21 12:08:56',
						type: this.query.type
					})
				}
				data.total = data.list.length
				if (code == 200) {
					if (e) { // 加载更多
						this.tabs[this.current].list = this.tabs[this.current].list.concat(data.list)
					} else {
						this.tabs[this.current].list = data.list
						this.tabs[this.current].total = data.total
					}
					if (this.tabs[this.current].page * this.query.limit >= this.tabs[this.current].total) {
						return this.tabs[this.current].load = 1
					} else {
						return this.tabs[this.current].load = 2
					}
				}
			},
			// 下拉刷新
			onRefresh() {
				this.tabs[this.current].page = 1
				this.getData()
			},
			// 加载更多
			loadmore() {
				if (this.tabs[this.current].load == 1 || this.tabs[this.current].istrig == false) return;
				this.tabs[this.current].load = 0
				this.tabs[this.current].page++
				this.tabs[this.current].istrig = false
				let time = setTimeout(() => {
					this.getData('S')
					this.tabs[this.current].istrig = true
					clearTimeout(time)
				}, 1000)
			},
			// 点击切换tabs
			switchTabs(i) {
				this.isLock = true
				this.current = i.index
				if (this.tabs[this.current].list.length == 0) {
					this.tabs[this.current].isLoading = true
					this.tabs[this.current].page = 1
					let time = setTimeout(() => {
						this.getData()
						this.isLock = false
						clearTimeout(time)
					}, 1000)
				}
			},
			// 滑动切换tabs
			changeSwiper(i) {
				if (this.isLock) return
				this.current = i.detail.current
				if (this.tabs[this.current].list.length == 0) {
					this.tabs[this.current].isLoading = true
					this.tabs[this.current].page = 1
					let time = setTimeout(() => {
						this.getData()
						clearTimeout(time)
					}, 1000)
				}
			},
			// 去使用
			openModel() {
				this.$tools.Navigate.switchTab('/pages/tabbar/kind/index')
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.browserFitHeight}px - ${this.$store.state.navbarHeight}px - 44px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page {
		.tabs {
			background-color: #fff;
		}

		.coupon-item {
			height: 170rpx;
			background: url('https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/coupon.png') no-repeat;
			background-size: 100% 100%;
			border-radius: 16rpx;

			.info-price {
				.price-icon {
					font-size: 24rpx;
				}

				.price-value {
					font-size: 50rpx;
				}
			}

			.info {
				margin-left: 60rpx;

				.info-desc {
					color: #333;
					font-size: 26rpx;
				}

				.point {
					font-size: 24rpx;
					color: #666;
					
				}
			}



			.btns {
				padding: 12rpx 35rpx;
				background: linear-gradient(135deg, #FFBC3A, #FF9416);
				border-radius: 30rpx;
			}
			.expired{
				width: 120rpx;
				height: 120rpx;
				border: 2rpx solid #999;
				.expired-item{
					border: 2rpx solid #999;
					font-size: 26rpx;
					color: #999;
				}
			}
		}

		.item {
			border-radius: 8rpx;
			background-color: #fff;

			.left {
				height: 180rpx;
			}
		}
	}
</style>