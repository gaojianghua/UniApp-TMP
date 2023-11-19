<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar isFixed bgColor="transparent" isTab isSlot :style="{
			width: `calc(100vw - ${miniProgramCapsule.width}px)`,
			marginRight: `${miniProgramCapsule.width}px`}">
			<view class="d-flex a-center w-100 px-2">
				<u-image class="mr-2" width="50rpx" height="50rpx" src="/static/img/media/menu.svg"></u-image>
				<u-tabs :scrollable="false" :activeStyle="{color: '#f27299', fontWeight: '500'}" :current="current" :list="tabs" lineColor="#fb7299"
					@click="switchTabs"></u-tabs>
				<u-icon class="ml-auto" size="31" name="search" color="#f27299" @click="openSearch"></u-icon>
			</view>
		</m-navbar>
		<!-- 内容区域 -->
		<!-- #ifdef MP-WEIXIN -->
		<swiper :current="current" :style="[scrollStyle]" @change="changeSwiper">
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<swiper :current="current" :style="scrollStyle" @change="changeSwiper">
		<!-- #endif -->
			<swiper-item v-for="(item, i) in tabs" :key="i">
				<!-- 列表区域 -->
				<view class="w-100 h-100">
					<hot-spot v-if="i == 0" :current="current"></hot-spot>
					<novel v-else-if="i == 1" :current="current"></novel>
				</view>
			</swiper-item>
		</swiper>
		<!-- 底部导航栏 -->
		<m-tabbar pagePath="pages/tabbar/media/index" i18n></m-tabbar>
	</view>
</template>

<script>
	import MTabbar from '@/main_modules/main-ui/m-tabbar/index.vue'
	import MListSwiper from '@/main_modules/main-ui/m-list-swiper/index.vue'
	import HotSpot from './views/hot-spot.vue'
	import Novel from './views/novel.vue'
	import capsuleInit from '@/mixins/capsule-init.js'
	import tabbarInit from '@/mixins/tabbar-init.js'
	import {
		tabs
	} from './data.js'
	export default {
		mixins: [tabbarInit, capsuleInit],
		components: {
			MTabbar,
			MListSwiper,
			HotSpot,
			Novel
		},
		data() {
			return {
				current: 0,
				tabs,
				istrig: true,
				isLock: false,
				query: {
					page: 1,
					limit: 20,
					type: 2
				}
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				
			},
			// 进入搜索界面
			openSearch() {
				this.$tools.Navigate.navigateTo('/pages-next/media/all-search/index')
			},
			// 点击切换tabs
			switchTabs(i) {
				this.isLock = true
				this.current = i.index
				this.tabs[this.current].isLoading = true
				let time = setTimeout(() => {
					// this.getData()
					this.isLock = false
					clearTimeout(time)
				}, 1000)
			},
			// 滑动切换tabs
			changeSwiper(i) {
				if (this.isLock) return
				this.current = i.detail.current
				this.tabs[this.current].isLoading = true
				let time = setTimeout(() => {
					// this.getData()
					clearTimeout(time)
				}, 1000)
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - env(safe-area-inset-bottom) - ${this.$store.state.tabbarHeight}px)`
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
</style>