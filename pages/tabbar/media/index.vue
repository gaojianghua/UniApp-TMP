<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" isTab textColor="#fb7299" i18n value="page.娱乐"></m-navbar>
		<!-- 内容区域 -->
		
		<!-- 底部导航栏 -->
		<m-tabbar pagePath="pages/tabbar/media/index" i18n></m-tabbar>
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
			return {
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>