<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" isTab isSlot>
			<view class="w-100 search px-2" :style="{
			width: `calc(100vw - ${miniProgramCapsule.width}px)`,
			marginRight: `${miniProgramCapsule.width}px`}">
				<!-- 搜索框 -->
				<u-search :placeholder="$t('请输入关键词')" height="60rpx" disabled :showAction="false"
					@click="openSearch"></u-search>
			</view>
		</m-navbar>
		<!-- 分类区域 -->
		<view class="kind d-flex" :style="scrollStyle">
			<!-- 左边一级分类 -->
			<view class="kind-left h-100">
				<m-scroll :isCustomRefresh="false" :isLoading="false" bgColor="transparent" :scrollStyle="scrollStyle"
					mainColor="#fb7290">
					<view v-if="tabs.length != 0" class="one-list">
						<view :class="oneCurrent == i ? 'active' : 'normal'"
							class="list-item d-flex a-center j-center px-1" v-for="(item, i) in tabs" :key="i"
							@click="switchOneTabs(item, i)">
							{{item.mallCategoryName}}
						</view>
					</view>
				</m-scroll>
			</view>
			<!-- 右边二级分类以及商品列表 -->
			<view class="kind-right h-100">
				<view v-if="tabs[oneCurrent]" class="two-list d-flex a-center position-relative">
					<m-tabs :chooseIndex="twoCurrent" @changeTab="changeTab"
						:scrollStyle="{width: `calc(100% - 88rpx)`}" chooseBgColor="#fb7299"
						:chooseTextStyle="{color: '#fff'}" :slideNum="1" scrollHeight="88rpx"
						:tabs="tabs[oneCurrent].bxMallSubDto" keyName="mallSubName">
					</m-tabs>
					<view class="position-absolute bg-dark top-0 right-0 d-flex a-center j-center"
						style="height: 88rpx; width: 88rpx;">
						<u-icon v-if="direction == 'Y'" name="list-dot" color="#fff" size="50rpx"
							@click="direction = 'X'"></u-icon>
						<u-icon v-if="direction == 'X'" name="grid" color="#fff" size="50rpx"
							@click="direction = 'Y'"></u-icon>
					</view>
				</view>
				<view class="kind-content" :style="{height: `calc(100% - 88rpx)`}">
					<m-scroll bgColor="transparent" :isLoading="isLoading" :scrollStyle="{height: '100%'}"
						:load="load" @loadmore="loadmore" @onRefresh="onRefresh" mainColor="#fb7290">
						<u-empty v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无商品')"
							icon="http://cdn.uviewui.com/uview/empty/list.png">
						</u-empty>
						<view v-if="list.length != 0" class="goods-list px-2"
							:class="direction == 'Y' ? 'd-flex flex-wrap j-sb' : ''">
							<view class="goods-item" :style="{width: direction == 'Y' ? '48%' : '100%'}"
								v-for="(item, i) in list" :key="i" @click.stop="openDetail(item)">
								<m-goods-card @addCart="addCart" :item="item" :direction="direction" imageWidth="200rpx"
									:imageHeight="direction == 'Y' ? '300rpx' : '200rpx'" isSales
									isDesc isOldPrice isOver isVIP isCartBtn></m-goods-card>
							</view>
						</view>
					</m-scroll>
				</view>
			</view>
		</view>
		<!-- 底部导航栏 -->
		<m-tabbar pagePath="pages/tabbar/kind/index" i18n></m-tabbar>
	</view>
</template>

<script>
	import MTabbar from '@/main_modules/main-ui/m-tabbar/index.vue'
	import MScroll from '@/main_modules/main-ui/m-scroll/index.vue'
	import MTabs from '@/main_modules/main-ui/m-tabs/index.vue'
	import MGoodsCard from '@/main_modules/main-ui/m-goods-card/index.vue'
	import MListSwiper from '@/main_modules/main-ui/m-list-swiper/index.vue'
	import tabbarInit from '@/mixins/tabbar-init.js'
	import capsuleInit from '@/mixins/capsule-init.js'
	import data from './data.json'
	import goods from './goods.json'
	export default {
		mixins: [tabbarInit, capsuleInit],
		components: {
			MTabbar,
			MScroll,
			MListSwiper,
			MTabs,
			MGoodsCard
		},
		data() {
			return {
				tabs: [],
				oneCurrent: 0,
				twoCurrent: 0,
				istrig: true,
				isLock: false,
				query: {
					page: 1,
					limit: 20,
					type: ''
				},
				list: [],
				load: 0,
				isLoading: true,
				direction: 'Y',
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.getCategoryData()
			},
			// 获取分类数据
			async getCategoryData() {
				this.tabs = await data.data
				this.getData()
			},
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
				data.list = goods.data
				data.total = data.list.length
				if (code == 200) {
					if (e) { // 加载更多
						this.list = this.list.concat(data.list)
					} else {
						this.list = data.list
						this.total = data.total
					}
					if (this.page * this.query.limit >= this.total) {
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
				this.page++
				this.istrig = false
				let time = setTimeout(() => {
					this.getData('S')
					this.istrig = true
					clearTimeout(time)
				}, 500)
			},
			// 进入搜索界面
			openSearch() {
				this.$tools.Navigate.navigateTo('/pages-next/common/search/index')
			},
			// 点击切换tabs
			changeTab(i) {
				this.isLock = true
				this.twoCurrent = i.index
				this.resetData()
			},
			// 滑动切换tabs
			changeSwiper(i) {
				if (this.isLock) return
				this.twoCurrent = i
				this.resetData()
			},
			// 重置数据
			resetData() {
				this.list = []
				this.load = 0
				if (this.list.length == 0) {
					this.isLoading = true
					this.page = 1
					let time = setTimeout(() => {
						this.getData()
						this.isLock = false
						clearTimeout(time)
					}, 500)
				}
			},
			// 点击一级分类
			switchOneTabs(item, i) {
				this.oneCurrent = i
				this.twoCurrent = 0
				this.resetData()
			},
			// 点击二级分类
			switchTwoTabs(item, i) {
				this.twoCurrent = i
				this.resetData()
			},
			// 进入商品详情页
			openDetail(i) {
				this.$tools.Navigate.navigateTo('/pages-next/common/goods-detail/index', i)
			},
			// 加入购物车
			addCart(i) {
				
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.tabbarHeight}px - ${this.$store.state.statusHeight}px)`
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page {
		.kind {
			.kind-left {
				width: 20%;
				background-color: #fff;

				.one-list {
					.list-item {
						height: 88rpx;
					}

					.normal {
						color: #333;
						background-color: #fff;
					}

					.active {
						color: #fff;
						background-color: #fb7299;
					}
				}
			}

			.kind-right {
				width: 80%;

				.two-list {
					height: 88rpx;
				}

				.kind-content {
					.goods-list {
						.goods-item {}
					}
				}
			}
		}

	}
</style>