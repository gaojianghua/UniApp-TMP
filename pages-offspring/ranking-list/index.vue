<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" :value="value" i18n></m-navbar>
		<!-- 前三名 -->
		<view class="d-flex j-center bg-white pt-3">
			<view class="d-flex flex-column a-center  pt-8">
				<u-image width="72rpx" height="57rpx" src="/static/img/mine/two.png"></u-image>
				<u-image radius="6" lazyLoad class="mt-2" width="158rpx" height="200rpx"
					:src="ranks[rankCurrent].list[1] && ranks[rankCurrent].list[1].img">
					<view slot="loading">
						...
					</view>
				</u-image>
			</view>
			<view class="d-flex flex-column a-center  mx-3">
				<u-image width="75rpx" height="60rpx" src="/static/img/mine/one.png"></u-image>
				<u-image radius="6" lazyLoad class="mt-2" width="158rpx" height="200rpx"
					:src="ranks[rankCurrent].list[0] && ranks[rankCurrent].list[0].img">
					<view slot="loading">
						...
					</view>
				</u-image>
			</view>
			<view class="d-flex flex-column a-center  pt-8">
				<u-image width="72rpx" height="60rpx" src="/static/img/mine/three.png"></u-image>
				<u-image radius="6" lazyLoad class="mt-2" width="158rpx" height="200rpx"
					:src="ranks[rankCurrent].list[2] && ranks[rankCurrent].list[2].img">
					<view slot="loading">
						...
					</view>
				</u-image>
			</view>
		</view>
		<!-- 排名列表 -->
		<view class="rank bg-white px-3 pt-2">
			<view class="d-flex a-center w-100">
				<m-tabs :chooseIndex="rankCurrent" @changeTab="switchRankTabs" chooseBgColor="transparent"
					bgColor="transparent" :chooseTextStyle="{color: '#111', fontWeight: 'bold', fontSize: '34rpx'}"
					:slideNum="1" :itemStyle="{color: '#666', padding: '0', width: '25%'}" :tabs="ranks" keyName="name">
					<view class="rank-line main-bg-color rounded-1 mt-1"></view>
				</m-tabs>
			</view>
			<view class="tabs mt-2 p-1 rounded-1 noTabsFixed">
				<m-tabs :chooseIndex="ranks[rankCurrent].typeCurrent" @changeTab="typeChangeTab"
					:scrollStyle="{borderRadius: '16rpx'}" chooseBgColor="#fff" bgColor="transparent"
					:chooseTextStyle="{color: '#111'}" :slideNum="1" scrollHeight="50rpx"
					:itemStyle="{borderRadius: '8rpx', color: '#666', padding: '0 20rpx', marginRight: '20rpx'}"
					:tabs="tabs" keyName="name">
				</m-tabs>
			</view>
			<!-- 列表栏 -->
			<!-- #ifdef MP-WEIXIN -->
			<swiper :current="rankCurrent" :style="[scrollStyle]" @change="changeSwiper">
			<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<swiper :current="rankCurrent" :style="scrollStyle" @change="changeSwiper">
				<!-- #endif -->
					<swiper-item v-for="(item, i) in ranks" :key="i">
						<!-- 列表区域 -->
						<view class="w-100 h-100">
							<m-scroll-y :isLoading="ranks[rankCurrent].isLoading" i18n :scrollStyle="scrollStyle"
								:load="ranks[rankCurrent].load" @loadmore="loadmore" bgColor="transparent"
								@onRefresh="onRefresh">
								<u-empty textSize="12" width="70" height="70"
									v-if="!ranks[rankCurrent].isLoading && ranks[rankCurrent].list.length == 0"
									mode="list" :text="$t('暂无排行榜内容')"
									icon="http://cdn.uviewui.com/uview/empty/list.png">
								</u-empty>
								<view v-if="ranks[rankCurrent].list.length != 0">
									<view class="winnow-item mt-2 d-flex"
										v-for="(item, s) in ranks[rankCurrent].list.slice(3, ranks[rankCurrent].list.length)"
										:key="s"
										@click="$tools.Navigate.navigateTo('/pages-offspring/read-novel/index', item)">
										<u-image radius="6" width="145rpx" height="188rpx" :src="item.img"></u-image>
										<view class="d-flex j-sb flex-1 flex-column">
											<view class="d-flex">
												<view :style="{color: s == 0 || s == 1 ? '#FA9C3E' : '#333'}"
													class="item-name-rank font-weight line-h">
													{{s + 4}}
												</view>												<view class="d-flex flex-column j-sb flex-1 py-1" style="height: 188rpx;">
													<view class="d-flex a-center flex-row j-sb ">
														<view class="d-inline-block item-name text-ellipsis1 line-h">
															{{item.name}}
														</view>
														<view v-if="rankCurrent == 0" class="item-info line-h d-inline-block">
															{{$t('推荐指数')}} {{item.recommend}}
														</view>
														<view v-if="rankCurrent == 2" class="item-info line-h d-inline-block">
															{{item.popular | numberFormat('w', 'cn', true)}}{{$t('人气')}}
														</view>
														<view v-if="rankCurrent == 1 || rankCurrent == 3"
															class="item-info line-h d-inline-block">
															{{item.mark}}{{$t('分')}}
														</view>
													</view>
													<view class="item-intro text-ellipsis2">
														{{item.intro}}
													</view>
													<view class="d-flex a-center">
														<view class="item-school line-h">
															{{item.school | numberFormat('w', 'cn', true)}}{{$t('书友在读')}}
														</view>
														<view class="ml-2 item-type line-h">
															{{item.type}} · {{item.state == 1 ? $t('连载中') : $t('已完结')}}
														</view>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</m-scroll-y>
						</view>
					</swiper-item>
				</swiper>
		</view>
	</view>
</template>

<script>
	import MTabs from '@/main_modules/main-ui/m-tabs/index.vue'
	import result from './data.json'
	import {
		ranks
	} from './rank.js'
	export default {
		components: {
			MTabs
		},
		data() {
			return {
				value: '',
				pageId: 1,
				ranks,
				query: {
					page: 1,
					limit: 10,
					type: ''
				},
				tabs: [],
				rankCurrent: 0
			}
		},
		onLoad(options) {
			this.pageId = this.$tools.Navigate.receivePageData(options)
			this.pageId == 1 ? this.value = "page.漫画排行榜" : this.value = "page.小说排行榜"
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.tabs = result.data.tabs
				this.getData()
			},
			// 获取数据
			getData(e) {
				// let {
				// 	data,
				// 	code,
				// 	message
				// } = await prayData(this.query)
				let {
					data,
					code,
					message
				} = result
				if (code == 200) {
					if (e) { // 加载更多
						this.ranks[this.rankCurrent].list = this.ranks[this.rankCurrent].list.concat(data.rankList)
					} else {
						this.ranks[this.rankCurrent].list = data.rankList
						this.ranks[this.rankCurrent].total = data.total
					}
					if (this.ranks[this.rankCurrent].page * this.query.limit >= this.ranks[this.rankCurrent].total) {
						return this.ranks[this.rankCurrent].load = 1
					} else {
						return this.ranks[this.rankCurrent].load = 2
					}
				}
			},
			// 下拉刷新
			onRefresh() {
				this.ranks[this.rankCurrent].page = 1
				this.getData()
			},
			// 加载更多
			loadmore() {
				if (this.ranks[this.rankCurrent].load == 1 || this.istrig == false) return;
				this.ranks[this.rankCurrent].load = 0
				this.ranks[this.rankCurrent].page++
				this.istrig = false
				let time = setTimeout(() => {
					this.getData('S')
					this.istrig = true
					clearTimeout(time)
				}, 1000)
			},
			// 排行榜tabs切换
			switchRankTabs(i) {
				this.isLock = true
				this.rankCurrent = i.index
				if (this.ranks[this.rankCurrent].list.length == 0) {
					this.ranks[this.rankCurrent].isLoading = true
					let time = setTimeout(() => {
						this.getData()
						clearTimeout(time)
					}, 1000)
				}
				this.isLock = false
			},
			// 排行榜分类tabs切换
			typeChangeTab(i) {
				this.ranks[this.rankCurrent].typeCurrent = i.index
				this.query.type = this.tabs[i.index].id
				this.ranks[this.rankCurrent].list = []
				this.ranks[this.rankCurrent].page = 1
				this.ranks[this.rankCurrent].load = 0
				this.ranks[this.rankCurrent].isLoading = true
				let time = setTimeout(() => {
					this.getData()
					clearTimeout(time)
				}, 1000)
			},
			// 排行榜swiper滑动切换
			changeSwiper(i) {
				if (this.isLock) return
				this.rankCurrent = i.detail.current
				if (this.ranks[this.rankCurrent].list.length == 0) {
					this.ranks[this.rankCurrent].isLoading = true
					let time = setTimeout(() => {
						this.getData()
						clearTimeout(time)
					}, 1000)
				}
			},
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - 560rpx - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {

		.noTabsFixed{
			/deep/ .tabs-item:last-child{
				margin-right: 0 !important;
			}
		}
		.rank {

			.winnow-title {
				font-size: 36rpx;
			}

			.winnow-in {
				font-size: 28rpx;
			}

			.winnow-item {
				.item-name {
					font-size: 30rpx;
					font-weight: 400;
					line-height: 38rpx;
				}

				.item-mark {
					font-size: 32rpx;
					color: #FF9A23;
				}

				.item-intro,
				.item-type {
					color: #999;
					font-size: 24rpx;
				}

				.item-info {
					color: #FA9C3E;
					font-size: 28rpx;
				}

				.item-school {
					color: #0A57D0;
					font-size: 24rpx;
				}

				.item-name-rank {
					font-size: 32rpx;
					padding: 12rpx 12rpx 0 15rpx;
				}
			}

			.tabs {
				background-color: #ddd;
			}

			.love-title-more::after {
				content: '';
				position: absolute;
				left: -34rpx;
				top: 0;
				border-radius: 16rpx 0 0 16rpx;
				z-index: 100;
				width: 35rpx;
				height: 100%;
				background: linear-gradient(to right, #FFFFFF00 10%, #fff 70%);
			}

			.rank-line {
				width: 50rpx;
				height: 8rpx;
			}

			.rank-one {
				background: linear-gradient(to right, #E0EBF7, #F8FCFF);
				border-radius: 12rpx 0 12rpx 12rpx;

				.rank-one-name {
					font-size: 34rpx;
					font-weight: 400;
				}

				.rank-one-info {
					color: #999;
					font-size: 28rpx;
				}

				.rank-one-school {
					color: #0A57D0;
					font-size: 24rpx;
				}

				.one {
					color: #DFB122;
					font-size: 46rpx;
					transform: translate(-54%, -40%);
				}
			}
		}
	}
</style>