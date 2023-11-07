<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.积分商城" i18n></m-navbar>
		<!-- 内容区域 -->
		<view class="content">
			
		</view>
		<!-- 单页tabbar -->
		<m-single-tabbar :tabs="tabs" i18n @switchTab="switchTab"></m-single-tabbar>
	</view>
</template>

<script>
	import MSingleTabbar from '@/main_modules/main-ui/m-single-tabbar/index.vue'
	import { tabs } from './data.js'
	export default {
		components: {
			MSingleTabbar
		},
		data() {
			return {
				current: 0,
				tabs,
			}
		},
		methods: {
			// 切换tab
			switchTab(item) {
				console.log(item.pageId)
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
