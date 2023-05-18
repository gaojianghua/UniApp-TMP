<template>
	<view class="page">
		<m-navbar value="123"></m-navbar>
		<!-- 顶部状态栏高度 -->
		<!-- <m-top /> -->
		<!-- 底部导航栏 -->
		<m-tabbar pagePath="pages/tabbar/home/index" i18n></m-tabbar>
	</view>
</template>

<script>
	import MTabbar from '@/main_modules/main-ui/m-tabbar/index.vue'
	import MNavbar from '@/main_modules/main-ui/m-navbar/index.vue'
	import tabbarInit from '@/mixins/tabbar-init.js'
	export default {
		mixins: [tabbarInit],
		components: {
			MTabbar,
			MNavbar
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