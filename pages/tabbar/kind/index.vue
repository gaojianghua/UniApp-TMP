<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" isTab isSlot>
			<view class="w-100 search px-2" :style="{
			width: `calc(100vw - ${miniProgramCapsule.width}px)`,
			marginRight: `${miniProgramCapsule.width}px`}">
				<!-- 搜索框 -->
				<u-search placeholder="请输入关键词" height="60rpx" disabled :showAction="false"
					@click="openSearch"></u-search>
			</view>
		</m-navbar>
		<!-- 分类区域 -->
		<view class="kind d-flex" :style="scrollStyle">
			<!-- 左边一级分类 -->
			<view class="kind-left h-100">
				<m-scroll :isLoading="false" bgColor="transparent" :scrollStyle="scrollStyle" mainColor="#fb7290">
					<view v-if="tabs.length != 0" class="one-list">
						<view class="list-item d-flex a-center j-center px-3" v-for="(item, i) in tabs" :key="i"
							@click="switchOneTabs(item, i)">
							{{item.mallCategoryName}}
						</view>
					</view>
				</m-scroll>
			</view>
			<!-- 右边二级分类以及商品列表 -->
			<view class="kind-right h-100">
				<view class="two-list">
					<m-tabs scrollHeight="88rpx" :tabs="tabs[oneCurrent].bxMallSubDto" keyName="mallSubName">
						
					</m-tabs>
				</view>
				<view class="goods-list w-100" :style="{height: `calc(100% - 88rpx)`}">
					
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
	import MListSwiper from '@/main_modules/main-ui/m-list-swiper/index.vue'
	import tabbarInit from '@/mixins/tabbar-init.js'
	import capsuleInit from '@/mixins/capsule-init.js'
	import data from './data.json'
	export default {
		mixins: [tabbarInit, capsuleInit],
		components: {
			MTabbar,
			MScroll,
			MListSwiper,
			MTabs
		},
		data() {
			return {
				tabs: [],
				oneCurrent: 0,
				istrig: true,
				isLock: false,
				query: {
					page: 1,
					limit: 20,
					type: 2
				},
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				console.log(data)
				// this.getData()
				this.getCategoryData()
			},
			// 获取分类数据
			async getCategoryData() {
				this.tabs = await data.data
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
						img: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/141b53c86d1f6dc174982e6f122dcbfc.jpg',
						title: 'haha',
						desc: 'nishidsahhda'
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
					this.tabs[this.current].isLoading = false
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
			// 进入搜索界面
			openSearch() {
				this.$tools.Navigate.navigateTo('/pages-next/common/search/index')
			},
			// 点击一级分类
			switchOneTabs(item, i) {
				this.oneCurrent = i
			},
			// 点击二级分类
			switchTwoTabs(item, i) {

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
				width: 24%;
				background-color: #fff;

				.one-list {
					.list-item {
						height: 88rpx;
					}
				}
			}

			.kind-right {
				width: 76%;
				.two-list{
					height: 88rpx;
				}
				.goods-list{
					
				}
			}
		}

	}
</style>