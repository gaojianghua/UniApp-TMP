<template>
	<view class="page">
		<!-- 顶部状态栏高度 -->
		<m-top />
		<!-- 底部导航栏 -->
		<m-tabbar pagePath="pages/tabbar/kind/index" i18n></m-tabbar>
	</view>
</template>

<script>
	import MTabbar from '@/main_modules/main-ui/m-tabbar/index.vue'
	import tabbarInit from '@/mixins/tabbar-init.js'
	export default {
		mixins: [tabbarInit],
		components: {
			MTabbar
		},
		data() {
			return {}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
</style>
