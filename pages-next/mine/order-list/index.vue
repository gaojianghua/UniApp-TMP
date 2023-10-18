<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" isSlot>
			<view class="w-100 search pl-10 pr-2" :style="{
			width: `calc(100vw - ${miniProgramCapsule.width}px)`,
			marginRight: `${miniProgramCapsule.width}px`}">
				<!-- 搜索框 -->
				<u-search placeholder="请输入关键词" height="60rpx" disabled :showAction="false"
					@click="openSearch"></u-search>
			</view>
		</m-navbar>
		<!-- 标签栏 -->
		<view class="tabs">
			<u-tabs :current="current" :list="tabs" lineColor="#fb7299" :itemStyle="{height: '65rpx'}"
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
					<m-scroll :isLoading="item.isLoading" :scrollStyle="scrollStyle" :load="item.load"
						@loadmore="loadmore" bgColor="transparent" @onRefresh="onRefresh">
						<view class="item d-flex a-center j-sb p-2 mt-2" v-for="(val, index) in item.list" :key="index">
							<view class="left d-flex flex-column">
								<view class="title">
									{{val.title}}
								</view>
								<view class="desc">
									{{val.desc}}
								</view>
							</view>
							<u-image width="300rpx" height="180rpx" :src="val.img"></u-image>
						</view>
					</m-scroll>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import MScroll from '@/main_modules/main-ui/m-scroll/index.vue'
	import MListSwiper from '@/main_modules/main-ui/m-list-swiper/index.vue'
	import capsuleInit from '@/mixins/capsule-init.js'
	import {
		tabs
	} from './data.js'
	export default {
		mixins: [capsuleInit],
		components: {
			MScroll,
			MListSwiper
		},
		data() {
			return {
				tabs,
				current: 1,
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
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - 65rpx - 2rpx - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
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

		.item {
			border-radius: 8rpx;
			background-color: #fff;
		
			.left {
				height: 180rpx;
			}
		}
	}
</style>