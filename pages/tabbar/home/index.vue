<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar isLang bgColor="#fff" isTab isSlot>
			<view class="w-100 d-flex a-center search pl-2 pr-9" :style="{
			width: `calc(100vw - ${miniProgramCapsule.width}px)`,
			marginRight: `${miniProgramCapsule.width}px`}">
				<!-- 定位城市 -->
				<view class="d-flex a-center mr-2" @click="$tools.Navigate.navigateTo('/pages-next/home/select-city/index')">
					<u-image height="50rpx" width="50rpx" src="/static/img/home/location.png"></u-image>
					<text class="ml-1">{{ liveCity }}</text>
				</view>
				<!-- 搜索框 -->
				<u-search placeholder="请输入关键词" height="60rpx" disabled :showAction="false"
					@click="openSearch"></u-search>
			</view>
		</m-navbar>
		<!-- 内容区域 -->
		<m-scroll :isLoading="isLoading" :scrollStyle="scrollStyle" :load="load" bgColor="transparent"
			@loadmore="loadmore" @onRefresh="onRefresh">
			<view class="content pt-2 px-2 bg-white">
				<u-swiper height="320rpx" :list="banner" keyName="image" indicator />
				<view class="menu-list mt-1 d-flex flex-wrap">
					<view class="menu-item mt-2 d-flex flex-column j-center a-center" v-for="(item, i) in menus" :key="i">
						<u-image height="88rpx" width="88rpx" :src="item.src"></u-image>
						<view class="">
							{{item.name}}
						</view>
					</view>
				</view>
				<view class="d-flex a-center mt-3">
					<view class="font-weight" style="font-size: 32rpx;">
						热门推荐
					</view>
					<view class="bg-dark ml-auto d-flex a-center j-center"
						style="height: 44rpx; width: 44rpx;">
						<u-icon v-if="direction == 'Y'" name="list-dot" color="#fff" size="28rpx"
							@click="direction = 'X'"></u-icon>
						<u-icon v-if="direction == 'X'" name="grid" color="#fff" size="28rpx"
							@click="direction = 'Y'"></u-icon>
					</view>
				</view>
				<u-empty v-if="load != 0 && list.length == 0" mode="list" text="暂无商品"
					icon="http://cdn.uviewui.com/uview/empty/list.png">
				</u-empty>
				<view v-if="list.length != 0" class="goods-list"
					:class="direction == 'Y' ? 'd-flex flex-wrap j-sb' : ''">
					<view class="goods-item" :style="{width: direction == 'Y' ? '48.8%' : '100%'}"
						v-for="(item, i) in list" :key="i" @click.stop="openDetail(item)">
						<m-goods-card @addCart.stop="addCart" :item="item" :direction="direction" imageWidth="200rpx"
							:imageHeight="direction == 'Y' ? '300rpx' : '200rpx'" isSales
							isDesc isOldPrice isOver isVIP isCartBtn></m-goods-card>
					</view>
				</view>
			</view>
		</m-scroll>
		<!-- 底部导航栏 -->
		<m-tabbar pagePath="pages/tabbar/home/index" i18n></m-tabbar>
	</view>
</template>

<script>
	import MTabbar from '@/main_modules/main-ui/m-tabbar/index.vue'
	import MScroll from '@/main_modules/main-ui/m-scroll/index.vue'
	import MGoodsCard from '@/main_modules/main-ui/m-goods-card/index.vue'
	import tabbarInit from '@/mixins/tabbar-init.js'
	import capsuleInit from '@/mixins/capsule-init.js'
	import shareInit from '@/mixins/share-init.js'
	import {
		banner,
		menus
	} from './data.js'
	import goods from '../kind/goods.json'
	export default {
		mixins: [tabbarInit, capsuleInit, shareInit],
		components: {
			MTabbar,
			MScroll,
			MGoodsCard
		},
		data() {
			return {
				banner,
				menus,
				isLoading: true,
				load: 0,
				query: {
					page: 1,
					limit: 10
				},
				list: [],
				total: 0,
				istrig: true,
				direction: 'Y',
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
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
					if (this.query.page * this.query.limit >= this.total) {
						return this.load = 1
					} else {
						return this.load = 2
					}
					this.isLoading = false
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
			// 进入搜索界面
			openSearch() {
				this.$tools.Navigate.navigateTo('/pages-next/common/search/index')
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
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - 2rpx - env(safe-area-inset-bottom) - ${this.$store.state.tabbarHeight}px - ${this.$store.state.statusHeight}px)`
				}
			},
			liveCity() {
				return this.$store.state.liveCity
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page {
		.content {
			.menu-list{
				.menu-item{
					width: 20%;
				}
			}
		}
	}
</style>