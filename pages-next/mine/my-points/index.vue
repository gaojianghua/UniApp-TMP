<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.我的积分" i18n></m-navbar>
		<!-- 内容区域 -->
		<view class="points mt-1 d-flex flex-column j-center a-center bg-white py-3">
			<view class="points-row d-flex a-center">
				<u-image class="mr-2 font-weight" width="60rpx" height="60rpx" src="/static/img/mine/points-value.svg"></u-image>
				<span class="points-value">{{$store.state.userinfo.points}}</span>
			</view>
		</view>
		<view class="menu mt-1">
			<view class="menu-item" v-for="(item, i) in menuList" :key="i" @click="openMenu(item)">
				<m-cell class="px-3" i18n :item="item"></m-cell>
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
		.points{
			.points-row{
				.points-value{
					font-size: 40rpx;
					font-weight: 500;
					color: #f27299;
				}
			}
		}
		
		.menu {
			border-radius: 8rpx;
			background-color: #fff;

			.menu-item:first-child {
				/deep/ .menu-item {
					border-top: none !important;
				}
			}
		}
	}
</style>