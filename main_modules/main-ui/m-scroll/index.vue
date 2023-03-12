<template>
	<scroll-view class="scroll" scroll-anchoring scroll-y="true" :style="scrollStyle" refresher-default-style="none"
		:refresher-threshold="threshold" :refresher-background="bgColor" @scrolltolower="loadmore" refresher-enabled
		:refresher-triggered="triggered" @refresherpulling="onPulling" @refresherrefresh="onRefresh"
		@refresherabort="onAbort" @refresherrestore="onRestore">
		<view class="position-relative">
			<m-refresh :isLoad="triggered" :show="none" :dropDown="dropDown" :text="$t(text)" />
			<slot />
		</view>
		<m-loading v-if="isLoading" :height="loadHeight" :load="load" />
	</scroll-view>
</template>

<script>
	import MRefresh from '@/components/m-refresh/index.vue'
	import MLoading from '@/components/m-loading/index.vue'
	export default {
		components: {
			MLoading,
			MRefresh
		},
		props: {
			scrollStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			load: {
				type: [String, Number],
				default: () => {
					return 2
				}
			},
			bgColor: {
				type: String,
				default: () => {
					return '#151521'
				}
			},
			loadHeight: {
				type: [String, Number],
				default: () => {
					return 100
				}
			},
			refresherDefaultText: {
				type: String,
				default: () => {
					return '亲~ 下拉可以刷新哦'
				}
			},
			refresherRefreshText: {
				type: String,
				default: () => {
					return "亲~ 可以松手了哦"
				}
			},
			refresherLoadingText: {
				type: String,
				default: () => {
					return "亲~ 正在加载中哦"
				}
			},
			isLoading: {
				type: Boolean,
				default: () => {
					return true
				}
			}
		},
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
		}
	}
</script>

<style lang="scss" scoped>
</style>
