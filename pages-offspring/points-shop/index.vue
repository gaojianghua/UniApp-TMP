<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" :value="value" i18n></m-navbar>
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
					<shop :current="current" v-if="i == 0"></shop>
					<order :current="current" v-if="i == 1"></order>
					<record :current="current" v-if="i == 2"></record>
				</view>
			</swiper-item>
		</swiper>
		<!-- 单页tabbar -->
		<m-single-tabbar :current="current" :tabs="tabs" i18n @switchTab="switchTab"></m-single-tabbar>
	</view>
</template>

<script>
	import MSingleTabbar from '@/main_modules/main-ui/m-single-tabbar/index.vue'
	import Shop from './tabbar-page/shop.vue'
	import Order from './tabbar-page/order.vue'
	import Record from './tabbar-page/record.vue'
	import { tabs } from './data.js'
	export default {
		components: {
			MSingleTabbar,
			Shop,
			Order,
			Record
		},
		data() {
			return {
				current: 0,
				tabs,
				isLock: false,
				value: 'page.积分商城'
			}
		},
		methods: {
			// 切换tab
			switchTab(item) {
				this.isLock = true
				this.current = item.pageId
				this.current == 0 ? this.value = 'page.积分商城' : (this.current == 1 ? this.value = 'page.积分订单' : this.value = 'page.积分记录')
				this.isLock = false
			},
			// 滑动切换tabs
			changeSwiper(i) {
				if (this.isLock) return
				this.current = i.detail.current
				this.current == 0 ? this.value = 'page.积分商城' : (this.current == 1 ? this.value = 'page.积分订单' : this.value = 'page.积分记录')
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.browserFitHeight}px - ${this.$store.state.navbarHeight}px - 52px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
</style>
