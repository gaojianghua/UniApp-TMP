<template>
	<view class="views">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" isSlot i18n>
			<view class="w-100 d-flex a-center search pl-10 pr-2" :style="{
			width: `calc(100vw - ${miniProgramCapsule.width}px)`,
			marginRight: `${miniProgramCapsule.width}px`}">
				<!-- 搜索框 -->
				<view class="position-relative flex-1">
					<view class="position-absolute top-0 right-0 left-0 bottom-0 index-5"
						@click="$tools.Navigate.navigateTo('/pages-offspring/all-search/index')"></view>
					<u-search :placeholder="$t('请输入关键词')" height="60rpx" disabled :showAction="false"></u-search>
				</view>
			</view>
		</m-navbar>
		<!-- 内容区域 -->
		<m-scroll-y :isLoading="isLoading" :scrollTop="scrollTop" @scroll="scroll" i18n :scrollStyle="scrollStyle"
			:load="load" @loadmore="loadmore" bgColor="transparent" @onRefresh="onRefresh">
			<view class="content px-2 pt-2">
				<!-- 书架 -->
				<view class="book-shelf p-3 bg-white d-flex a-center j-center">
					<m-loading v-if="loadBookshelf"></m-loading>
					<u-empty textSize="12" width="70" height="70" v-if="!loadBookshelf && bookshelfList.length == 0"
						mode="list" :text="$t('书架是空的')" icon="http://cdn.uviewui.com/uview/empty/list.png">
					</u-empty>
					<view v-if="bookshelfList.length != 0" class="d-flex flex-wrap flex-1">
						<view class="item d-flex flex-column mt-3" v-for="(item, i) in bookshelfList" :key="i"
							@click="$tools.Navigate.navigateTo('/pages-offspring/read-novel/index', item)">
							<view class="item-image w-100 position-relative hidden">
								<u-image width="100%" height="200rpx" :src="item.img"></u-image>
								<view v-if="item.isChange" class="change text-white position-absolute line-h">
									{{$t('更新')}}
								</view>
								<view
									class="item-name text-white w-100 line-h mt-1 text-ellipsis1 position-absolute bottom-0 left-0">
									{{item.name}}
								</view>
							</view>
						</view>
						<view class="item update flex-shrink d-flex flex-column j-center a-center mt-3"
							@click="$tools.Navigate.navigateTo('/pages-offspring/book-shelf/index')">
							<view class="update-text line-h">
								{{$t('书架')}}
							</view>
							<u-icon class="mt-1" name="arrow-rightward" size="15" color="#111"></u-icon>
						</view>
					</view>
				</view>
				<!-- 每日精选 -->
				<u-gap height="10" bgColor="tansparent"></u-gap>
				<view class="winnow p-3">
					<view class="d-flex a-center">
						<view class="winnow-title line-h font-weight">
							{{$t('每日精选')}} 12 {{$t('本')}}
						</view>
						<view class="winnow-in ml-auto" @click="openChange">
							{{$t('换一换')}} {{inNum == 1 ? 3 : inNum == 2 ? 6 : inNum == 3 ? 9 : 12}}/12
						</view>
					</view>
					<view v-if="loadWinnow" class="d-flex a-center h-100 j-center">
						<m-loading></m-loading>
					</view>
					<u-empty textSize="12" width="70" height="70" v-if="!loadWinnow && winnowList.length == 0"
						mode="list" :text="$t('暂无精选内容')" icon="http://cdn.uviewui.com/uview/empty/list.png">
					</u-empty>
					<view v-if="winnowList.length != 0" class="d-flex flex-wrap flex-1">
						<view class="winnow-item mt-3 d-flex"
							v-for="(item, i) in winnowList.slice((inNum - 1)*3, inNum*3)" :key="i"
							@click="$tools.Navigate.navigateTo('/pages-offspring/read-novel/index', item)">
							<u-image class="mr-2" radius="6" width="158rpx" height="200rpx" :src="item.img"></u-image>
							<view class="d-flex j-sb flex-1 flex-column">
								<view class="d-flex a-center">
									<view class="item-name line-h text-ellipsis1">
										{{item.name}}
									</view>
									<view class="item-mark ml-auto font-weight">
										{{item.mark}}{{$t('分')}}
									</view>
								</view>
								<view class="item-intro text-ellipsis2">
									{{item.intro}}
								</view>
								<view class="d-flex a-center">
									<view class="item-school">
										{{item.school | numberFormat('w', 'cn', true)}}{{$t('书友在读')}}
									</view>
									<view class="ml-2 item-type">
										{{item.type}} · {{item.state == 1 ? $t('连载中') : $t('已完结')}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 排行榜 -->
				<u-gap height="10" bgColor="tansparent"></u-gap>
				<view class="rank bg-white p-3">
					<view class="d-flex a-center noTabsFixed">
						<m-tabs :chooseIndex="rankCurrent" @changeTab="switchRankTabs" chooseBgColor="transparent"
							bgColor="transparent"
							:chooseTextStyle="{color: '#111', fontWeight: 'bold', fontSize: '34rpx'}" :slideNum="1"
							:itemStyle="{color: '#666', padding: '0', marginRight: '40rpx'}" :tabs="ranks"
							keyName="name">
							<view class="rank-line main-bg-color rounded-1 mt-1"></view>
						</m-tabs>
						<view class="winnow-in ml-auto flex-shrink d-flex a-center"
							@click="$tools.Navigate.navigateTo('/pages-offspring/ranking-list/index', 2)">
							{{$t('全部')}}
							<u-icon name="arrow-right" size="16" color="#333"></u-icon>
						</view>
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
					<swiper :current="rankCurrent" :style="[{height: '640rpx'}]" @change="changeSwiper">
					<!-- #endif -->
						<!-- #ifndef MP-WEIXIN -->
						<swiper :current="rankCurrent" :style="{height: '640rpx'}" @change="changeSwiper">
						<!-- #endif -->
							<swiper-item v-for="(item, i) in ranks" :key="i">
								<!-- 列表区域 -->
								<view class="w-100 h-100">
									<view v-if="ranks[rankCurrent].isLoading" class="d-flex a-center h-100 j-center">
										<m-loading></m-loading>
									</view>
									<u-empty textSize="12" width="70" height="70"
										v-if="!ranks[rankCurrent].isLoading && ranks[rankCurrent].list.length == 0"
										mode="list" :text="$t('暂无排行榜内容')"
										icon="http://cdn.uviewui.com/uview/empty/list.png">
									</u-empty>
									<view v-if="ranks[rankCurrent].list.length != 0" class="d-flex flex-wrap flex-1">
										<!-- 排行第一 -->
										<view class="rank-one w-100 d-flex mt-2"
											@click="$tools.Navigate.navigateTo('/pages-offspring/read-novel/index', ranks[rankCurrent].list[0])">
											<u-image radius="6" width="118rpx" height="145rpx"
												:src="ranks[rankCurrent].list[0].img"></u-image>
											<view class="ml-2 py-1 d-flex flex-column j-sb" style="height: 145rpx;">
												<view class="rank-one-name line-h">
													{{ranks[rankCurrent].list[0].name}}
												</view>
												<view class="rank-one-info d-flex a-center line-h">
													{{ranks[rankCurrent].list[0].type}} ·
													{{ranks[rankCurrent].list[0].state == 1 ? $t('连载中') : $t('已完结')}}
													·
													<view v-if="rankCurrent == 0" class="rank-one-info">
														{{$t('推荐指数')}} {{ranks[rankCurrent].list[0].recommend}}
													</view>
													<view v-if="rankCurrent == 2" class="rank-one-info">
														{{ranks[rankCurrent].list[0].popular | numberFormat('w', 'cn', true)}}{{$t('人气')}}
													</view>
													<view v-if="rankCurrent == 1 || rankCurrent == 3"
														class="rank-one-info">
														{{ranks[rankCurrent].list[0].mark}}{{$t('分')}}
													</view>
												</view>
												<view class="rank-one-school line-h">
													{{ranks[rankCurrent].list[0].school | numberFormat('w', 'cn', true)}}{{$t('书友在读')}}
												</view>
											</view>
											<view class="ml-auto position-relative"
												style="height: 80rpx; width: 72rpx;">
												<u-image class="" width="72rpx" height="80rpx"
													src="/static/img/mine/mine-one.png"></u-image>
												<view class="one font-weight position-absolute top-half left-half">
													1
												</view>
											</view>
										</view>
										<!-- 其余六个排行 -->
										<view class="d-flex j-sb flex-wrap">
											<view class="winnow-item rank-row mt-3 d-flex"
												v-for="(item, i) in ranks[rankCurrent].list.slice(1, ranks[rankCurrent].list.length)"
												:key="i"
												@click="$tools.Navigate.navigateTo('/pages-offspring/read-novel/index', item)">
												<u-image radius="6" width="100rpx" height="128rpx"
													:src="item.img"></u-image>
												<view class="d-flex j-sb flex-1 flex-column">
													<view class="d-flex">
														<view :style="{color: i == 0 || i == 1 ? '#FA9C3E' : '#333'}"
															class="item-name-rank font-weight line-h">
															{{i + 2}}
														</view>
														<view class="d-flex flex-column py-1">
															<view class="item-name text-ellipsis2">
																{{item.name}}
															</view>
															<view v-if="rankCurrent == 0" class="item-info line-h mt-1">
																{{$t('推荐指数')}} {{item.recommend}}
															</view>
															<view v-if="rankCurrent == 2" class="item-info line-h mt-1">
																{{item.popular | numberFormat('w', 'cn', true)}}{{$t('人气')}}
															</view>
															<view v-if="rankCurrent == 1 || rankCurrent == 3"
																class="item-info line-h mt-1">
																{{item.mark}}{{$t('分')}}
															</view>
														</view>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
				</view>
				<!-- 猜你喜欢 -->
				<u-gap height="10" bgColor="tansparent"></u-gap>
				<view class="love bg-white p-3" :style="loveStyle">
					<view class="d-flex a-center">
						<view class="winnow-title line-h font-weight">
							{{$t('猜你喜欢')}}
						</view>
						<view class="winnow-in ml-auto d-flex a-center"
							@click="$tools.Navigate.navigateTo('/pages-offspring/novel-screen/index')">
							{{$t('分类筛选')}}
							<u-icon name="arrow-right" size="16" color="#333"></u-icon>
						</view>
					</view>
					<view class="love-title w-100 d-flex a-center"
						:class="isTabsFixed ? 'position-fixed left-0 index-5 ts-all-l' : 'mt-2 ts-all-l noTabsFixed'"
						:style="{top: isTabsFixed ? `calc(${$store.state.navbarHeight}px + ${$store.state.statusHeight}px - 1rpx)` : '0'
						}">
						<view class="tabs w-100 p-1 ts-all-l" :style="{
						borderRadius: isTabsFixed ? '0' : '12rpx',
						width: isTabsFixed ? '85%' : ''
						}">
							<m-tabs :chooseIndex="loveCurrent" @changeTab="changeTab"
								:scrollStyle="{borderRadius: '16rpx'}" chooseBgColor="#fff" bgColor="transparent"
								:chooseTextStyle="{color: '#111'}" :slideNum="1" scrollHeight="50rpx"
								:itemStyle="{borderRadius: '8rpx', color: '#666', padding: '0 20rpx', marginRight: '20rpx'}"
								:tabs="tabs" keyName="name">
							</m-tabs>
						</view>
						<view v-if="isTabsFixed" style="height: 70rpx; width: 15%;"
							class="love-title-more position-relative index-5 flex-shrink ts-all-l bg-white ml-auto flex-shrink d-flex j-center a-center"
							@click="$tools.Navigate.navigateTo('/pages-offspring/novel-screen/index')">
							{{$t('更多')}}
							<u-icon name="arrow-right" size="16" color="#333"></u-icon>
						</view>
					</view>
					<view v-if="isTempLoad" class="d-flex a-center j-center mt-3">
						<m-loading :load="0"></m-loading>
					</view>
					<u-empty v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
						icon="http://cdn.uviewui.com/uview/empty/list.png">
					</u-empty>
					<template v-if="list.length != 0">
						<view class="winnow-item mt-3 d-flex" v-for="(item, i) in list" :key="i"
							@click="$tools.Navigate.navigateTo('/pages-offspring/read-novel/index', item)">
							<u-image class="mr-2" radius="6" width="158rpx" height="200rpx" :src="item.img"></u-image>
							<view class="d-flex j-sb flex-1 flex-column">
								<view class="d-flex a-center">
									<view class="item-name line-h text-ellipsis1">
										{{item.name}}
									</view>
									<view class="item-mark ml-auto font-weight">
										{{item.mark}}{{$t('分')}}
									</view>
								</view>
								<view class="item-intro text-ellipsis2">
									{{item.intro}}
								</view>
								<view class="d-flex a-center">
									<view class="item-school">
										{{item.school | numberFormat('w', 'cn', true)}}{{$t('书友在读')}}
									</view>
									<view class="ml-2 item-type">
										{{item.type}} · {{item.state == 1 ? $t('连载中') : $t('已完结')}}
									</view>
								</view>
							</view>
						</view>
					</template>
				</view>
				<u-gap v-if="!isTabsFixed" height="10" bgColor="tansparent"></u-gap>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	import MTabs from '@/main_modules/main-ui/m-tabs/index.vue'
	import capsuleInit from '@/mixins/capsule-init.js'
	import result from './data.json'
	import {
		ranks
	} from './rank.js'
	export default {
		mixins: [capsuleInit],
		components: {
			MTabs
		},
		data() {
			return {
				istrig: true,
				isLock: false,
				ranks,
				query: {
					page: 1,
					limit: 10,
					type: 2
				},
				rankQuery: {
					page: 1,
					limit: 7
				},
				list: [],
				total: 0,
				load: 0,
				isLoading: true,
				loadBookshelf: true,
				loadWinnow: true,
				bookshelfList: [],
				winnowList: [],
				rankList: [],
				inNum: 1,
				loveCurrent: 0,
				rankCurrent: 0,
				typeCurrent: 0,
				tabs: [],
				isTabsFixed: false,
				isTempLoad: false,
				scrollTop: 0
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.getBookshelfList()
				this.getWinnowList()
				this.getRankList()
				this.tabs = result.data.tabs
				this.rankTabs = result.data.rankTabs
				this.getData()
			},
			// 获取书架数据
			getBookshelfList() {
				this.bookshelfList = result.data.bookshelfList
				this.loadBookshelf = false
			},
			// 获取精选数据
			getWinnowList() {
				this.winnowList = result.data.winnowList
				this.loadWinnow = false
			},
			// 获取排行榜数据
			getRankList() {
				this.ranks[this.rankCurrent].list = result.data.rankList
				this.ranks[this.rankCurrent].isLoading = false
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
						this.list = this.list.concat(data.list)
					} else {
						this.list = data.list
						this.total = data.total
					}
					this.isTempLoad = false
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
			// 换一换
			openChange() {
				if (this.inNum == 4) {
					return this.inNum = 1
				}
				this.inNum++
			},
			// 猜你喜欢tabs切换
			changeTab(e) {
				this.isTabsFixed = false
				this.isLoading = false
				this.isTempLoad = true
				this.load = 0
				this.scrollTop = 1350
				this.list = []
				let time = setTimeout(() => {
					this.onRefresh()
					this.isLoading = true
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
						this.getRankList()
						clearTimeout(time)
					}, 1000)
				}
				this.isLock = false
			},
			// 排行榜分类tabs切换
			typeChangeTab(i) {
				this.ranks[this.rankCurrent].typeCurrent = i.index
				this.query.type = this.tabs[i.index].id
				this.rankList = []
				this.ranks[this.rankCurrent].isLoading = true
				let time = setTimeout(() => {
					this.getRankList()
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
						this.getRankList()
						clearTimeout(time)
					}, 1000)
				}
			},
			// 滚动触发
			scroll(e) {
				if (this.isTabsFixed && e.scrollTop >= 1300) return
				e.scrollTop >= 1300 ? this.isTabsFixed = true : this.isTabsFixed = false
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			},
			loveStyle() {
				return {
					height: this.list.length == 0 ?
						`calc(100vh - 40rpx - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)` :
						'auto'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.views {
		background-color: #f5f5f5;

		.noTabsFixed {
			/deep/ .tabs-item:last-child {
				margin-right: 0 !important;
			}
		}

		.content {
			.book-shelf {
				height: 490rpx;
				border-radius: 15rpx;

				.item {
					width: 23.5%;
					margin-right: 2%;

					.item-image {
						border-radius: 12rpx;

						.change {
							padding: 8rpx 12rpx;
							right: 0;
							top: 0;
							border-radius: 0 0 0 12rpx;
							font-size: 20rpx;
							background-color: #FF0F30;
						}
					}

					.item-name {
						padding: 10rpx 15rpx;
						background-color: #11111160;
						font-size: 26rpx;
					}

					.update-text {
						font-size: 26rpx;
					}
				}

				.item:nth-child(-n+4) {
					margin-top: 0 !important;
				}

				.item:nth-child(4n) {
					margin-right: 0;
				}

				.update {
					border: 2rpx solid #999;
					border-radius: 12rpx;
					box-shadow: 0 0 2rpx 2rpx #ddd;
				}
			}

			.winnow {
				height: 796rpx;
				background: linear-gradient(-195deg, #E0EBF7 0%, #FFFFFF 55%);
			}

			.winnow,
			.love,
			.rank {
				border-radius: 15rpx;

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
						color: #999;
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

				.rank-row {
					width: 48%;
					margin-right: 2%;
				}

				.rank-row:nth-child(2n) {
					margin-right: 0 !important;
				}
			}
		}
	}
</style>