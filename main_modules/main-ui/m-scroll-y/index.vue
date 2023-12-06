<template>
	<!-- #ifdef MP-WEIXIN -->
	<scroll-view class="w-100" scroll-anchoring scroll-y :scroll-top="scrollTop" :style="[scrollStyle]"
		:enable-flex="true" @scroll="scroll" refresher-default-style="none" :refresher-threshold="threshold"
		:refresher-background="bgColor" @scrolltolower="loadmore"
		:refresher-enabled="isCustomRefresh" :refresher-triggered="triggered" @refresherpulling="onPulling"
		@refresherrefresh="onRefresh" @refresherabort="onAbort" @refresherrestore="onRestore" :scroll-into-view="intoView">
	<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<scroll-view class="w-100" scroll-anchoring scroll-y :scroll-top="scrollTop" :style="scrollStyle"
			@scroll="scroll" refresher-default-style="none" :refresher-threshold="threshold"
			:refresher-background="bgColor" @scrolltolower="loadmore" :refresher-enabled="isCustomRefresh"
			:refresher-triggered="triggered" @refresherpulling="onPulling" @refresherrefresh="onRefresh"
			@refresherabort="onAbort" @refresherrestore="onRestore" :scroll-into-view="intoView">
		<!-- #endif -->
			<view class="position-relative" :class="isCustomRefresh ? '' : 'h-100'">
				<m-refresh :mainColor="mainColor" :isLoad="triggered" :show="none" :dropDown="dropDown" i18n
					:text="text" />
				<slot name="default" />
			</view>
			<m-loading i18n v-if="isLoading" :height="loadHeight" :load="load" :mainColor="mainColor"
				:bgColor="bgColor" />
			<view :style="{height: placeHeight}" class="w-100"></view>
		</scroll-view>
</template>

<script>
	import MRefresh from '../m-refresh/index.vue'
	import MLoading from '../m-loading/index.vue'
	import props from './props.js'
	export default {
		components: {
			MLoading,
			MRefresh
		},
		props,
		data() {
			return {
				triggered: false,
				threshold: 45,
				dropDown: 0,
				none: false,
				text: ''
			}
		},
		created() {
			this.init()
		},
		methods: {
			//初始化
			init() {
				this.text = this.refresherDefaultText
			},
			//下拉刷新被下拉
			onPulling(e) {
				this.none = true
				this.dropDown = e.detail.deltaY
				if (e.detail.deltaY >= this.threshold) {
					this.text = this.refresherRefreshText
				}
			},
			//下拉刷新
			onRefresh() {
				this.text = this.refresherLoadingText
				this.dropDown = this.threshold
				this.triggered = true
				setTimeout(() => {
					this.$emit('onRefresh')
					this.triggered = false
				}, 1000)
			},
			//下拉刷新被复位
			onRestore(e) {
				this.none = false
				this.triggered = false
				this.init()
			},
			//下拉被终止
			onAbort() {
				this.none = false
			},
			//加载更多
			loadmore() {
				this.$emit('loadmore')
			},
			//滚动触发
			scroll(e) {
				this.$emit('scroll', e.detail)
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>