<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.我的积分" i18n></m-navbar>
		<!-- 内容区域 -->
		<view class="menu mt-1">
			<view class="menu-item" v-for="(item, i) in menuList" :key="i" @click="openMenu(item)">
				<m-cell i18n :item="item"></m-cell>
			</view>
		</view>
	</view>
</template>

<script>
	import MCell from '@/main_modules/main-ui/m-cell/index.vue'
	import {
		menuList
	} from './data.js'
	export default {
		components: {
			MCell
		},
		data() {
			return {
				menuList,
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {

			},
			openMenu(e) {
				this.$tools.Navigate.navigateTo(e.page)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.menu {
			border-radius: 8rpx;
			padding: 0 30rpx;
			background-color: #fff;

			.menu-item:first-child {
				/deep/ .menu-item {
					border-top: none !important;
				}
			}
		}
	}
</style>