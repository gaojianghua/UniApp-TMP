<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" isTab isSlot>
			<view class="w-100 d-flex a-center search px-2" :style="{
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
			<view class="content">
			</view>
		</m-scroll>
		<!-- 底部导航栏 -->
		<m-tabbar pagePath="pages/tabbar/home/index" i18n></m-tabbar>
	</view>
</template>

<script>
	import MTabbar from '@/main_modules/main-ui/m-tabbar/index.vue'
	import MScroll from '@/main_modules/main-ui/m-scroll/index.vue'
	import tabbarInit from '@/mixins/tabbar-init.js'
	import capsuleInit from '@/mixins/capsule-init.js'
	import shareInit from '@/mixins/share-init.js'
	import {
		list
	} from './data.js'
	export default {
		mixins: [tabbarInit, capsuleInit, shareInit],
		components: {
			MTabbar,
			MScroll
		},
		data() {
			return {
				list: [],
				isLoading: true,
				load: 0,
				query: {
					page: 1,
					limit: 10
				},
				total: 0,
				istrig: true
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
				data.list = list
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
			padding: 20rpx 20rpx 0;

		}
	}
</style>