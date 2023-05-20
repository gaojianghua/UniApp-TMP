<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" isTab isSlot>
			<view class="w-100 search px-2" :style="{
			width: `calc(100vw - ${miniProgramCapsule.width}px)`,
			marginRight: `${miniProgramCapsule.width}px`}">
				<u-search placeholder="请输入关键词" height="60rpx" disabled :showAction="false" @click="openSearch"></u-search>
			</view>
		</m-navbar>
		<!-- 标签栏 -->
		<view class="tabs">
			<u-tabs :list="tabs" lineColor="#fb7299" :itemStyle="{height: '65rpx'}"></u-tabs>
		</view>
		<!-- 底部导航栏 -->
		<m-tabbar pagePath="pages/tabbar/kind/index" i18n></m-tabbar>
	</view>
</template>

<script>
	import MTabbar from '@/main_modules/main-ui/m-tabbar/index.vue'
	import tabbarInit from '@/mixins/tabbar-init.js'
	import capsuleInit from '@/mixins/capsule-init.js'
	import { tabs } from './data.js'
	export default {
		mixins: [tabbarInit,capsuleInit],
		components: {
			MTabbar
		},
		data() {
			return {
				tabs,
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				
			},
			// 获取数据
			getData() {
				
			},
			// 进入搜索界面
			openSearch() {
				this.$tools.Navigate.navigateTo('/pages-next/common/search/index')
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
