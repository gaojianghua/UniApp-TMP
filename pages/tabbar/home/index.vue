<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" isTab textColor="#fb7299" value="首页"></m-navbar>
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