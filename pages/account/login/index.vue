<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="transparent" textColor="#fb7299"></m-navbar>
		<!-- 内容区域 -->
		<m-scroll :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
			<m-agree-policy i18n @checkChange="checkChange"></m-agree-policy>
		</m-scroll>
	</view>
</template>

<script>
	import MScroll from '@/main_modules/main-ui/m-scroll/index.vue'
	import MAgreePolicy from '@/main_modules/main-ui/m-agree-policy/index.vue'
	export default {
		components: {
			MScroll,
			MAgreePolicy
		},
		data() {
			return {}
		},
		methods: {
			// 同意协议
			checkChange(e) {
				console.log(e)
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - 2rpx - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
</style>
