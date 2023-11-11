<template>
	<view class="page">
		<!-- 顶部信息 -->
		<view class="user" :style="{height: `calc(388rpx + ${statusHeight}px)`}">
			<!-- 顶部状态栏高度 -->
			<m-top />
			<view class="d-flex a-center">
				<view class="user-avatar mr-2">
					<u-image width="100rpx" height="100rpx" class="user-img"
						:src="$store.state.userinfo.avatar" mode="">
					</u-image>
				</view>
				<view class="user-info d-flex flex-column j-around" @click="openLogin">
					<view class="info-name font-lg line-h">
						{{$store.state.token ? $store.state.userinfo.name : $t('前往登录')}}
					</view>
					<view v-if="$store.state.token" class="info-desc font-md line-h">
						ID: {{$store.state.userinfo.id}}
					</view>
					<view v-else class="user-notice line-h">
						{{$t('您还未登录。立即登录，享受更多特权！')}}
					</view>
				</view>
				<view class="top-menu ml-auto mr-1 d-flex flex-column j-center a-center" @click="openSet">
					<u-image width="50rpx" height="50rpx" src="/static/img/common/setting-two.svg" mode="" />
					<view class="top-menu-text">
						{{$t('page.设置')}}
					</view>
				</view>
			</view>
			<view class="assets mt-2 d-flex a-center j-around">
				<view v-for="(item, i) in assets" class="assets-item mt-2 d-flex flex-column a-center j-center"
					@click="openAssets(item)">
					<view class="item-value">
						{{item.value}}
					</view>
					<view class="item-text">
						{{$t(item.name)}}
					</view>
				</view>
			</view>
			<view class="vip-card" @click="$tools.Navigate.navigateTo('/pages-next/mine/member-center/index')"></view>
		</view>
		<u-gap height="80rpx"></u-gap>
		<!-- 订单栏 -->
		<view class="order">
			<view class="d-flex j-sb">
				<span class="font-weight">{{$t('我的订单')}}</span>
				<view class="d-flex a-base" @click="openOrderList()">
					{{$t('全部')}}
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
			</view>
			<view class="d-flex a-center mt-2 j-sb">
				<block v-for="(item, i) in orderMenus" :key="i">
					<view class="order-item d-flex flex-column a-center j-center" @click="openOrderList(item.id)">
						<u-image width="60rpx" height="60rpx" :src="item.img" mode="aspectFit" />
						<view class="order-text">
							{{$t(item.name)}}
						</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 菜单栏 -->
		<view class="menu mt-2">
			<view class="menu-item" v-for="(item, i) in menuList" :key="i" @click="openMenu(item)">
				<m-cell i18n v-if="item.id != 5" :item="item"></m-cell>
				<!-- #ifdef H5 -->
				<m-cell i18n v-if="item.id == 5" :item="item"></m-cell>
				<!-- #endif -->
			</view>
		</view>
		<!-- 底部导航栏 -->
		<m-tabbar pagePath="pages/tabbar/mine/index" i18n></m-tabbar>
	</view>
</template>

<script>
	import MTabbar from '@/main_modules/main-ui/m-tabbar/index.vue'
	import MCell from '@/main_modules/main-ui/m-cell/index.vue'
	import tabbarInit from '@/mixins/tabbar-init.js'
	import {
		orderMenus,
		menuList,
		assets
	} from './data.js'
	export default {
		mixins: [tabbarInit],
		components: {
			MTabbar,
			MCell
		},
		data() {
			return {
				orderMenus,
				menuList,
				assets,
				statusHeight: 0,
				appVersion: ''
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				
			},
			openOrderList(i) {
				i == 5 ? this.$tools.Navigate.navigateTo('/pages-next/mine/my-evaluate/index') :
					this.$tools.Navigate.navigateTo('/pages-next/mine/order-list/index', i)
			},
			openSet() {
				this.$tools.Navigate.navigateTo('/pages-next/mine/setting/index')
			},
			openAssets(e) {
				this.$tools.Navigate.navigateTo(e.page)
			},
			openMenu(e) {
				switch (e.id) {
					case 1:
						this.$tools.Navigate.navigateTo(e.page)
						break;
					case 2:
						this.$tools.Navigate.navigateTo(e.page)
						break;
					case 3:
						this.$tools.Navigate.navigateTo(e.page)
						break;
					case 4:
						this.$tools.Navigate.navigateTo(e.page)
						break;
					case 5:
						this.$tools.Navigate.navigateTo(e.page)
						break;
					case 6:
						this.$tools.Navigate.navigateTo(e.page)
						break;
				}
			},
			openShow() {
				this.$mToast.show({
					content: '你们都是大傻逼',
					type: 'warning',
					duration: 3000,
					complete() {
						console.log('执行完后的回调')
					}
				}, () => {
					console.log('打开提示弹框');
				})
			},
			// 前往登录
			openLogin() {
				if (!this.$store.state.token) {
					this.$tools.Navigate.navigateTo('/pages/account/login/index')
				}
			}
		},
		created() {
			this.statusHeight = this.$store.state.statusHeight
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.user {
			position: relative;
			padding: 30rpx 30rpx 0;
			background: linear-gradient(to bottom, #FF9412 40%, #fff);
			border-radius: 0 0 40rpx 40rpx;
			color: #fff;

			.assets {
				.assets-item {
					.item-value {
						font-weight: bold;
						font-size: 36rpx;
					}

					.item-text {
						font-size: 28rpx;

					}
				}
			}

			.user-info {
				height: 100rpx;

				.user-notice {
					font-size: 26rpx;
					font-weight: 400;
					color: #eee;
				}
			}

			.user-avatar {
				.user-img {
					border-radius: 50%;
					overflow: hidden;
				}
			}

			.top-menu {
				color: #fff;

				.top-menu-text {
					font-size: 24rpx;
				}
			}

			.vip-card {
				width: 690rpx;
				height: 120rpx;
				position: absolute;
				left: 30rpx;
				bottom: -60rpx;
				background: url('/static/img/mine/mine-vip-card.png') no-repeat;
				background-size: cover;
				border-radius: 8rpx;
			}
		}

		.order {
			border-radius: 8rpx;
			background-color: #fff;
			width: 690rpx;
			margin-left: 30rpx;
			padding: 20rpx 30rpx;

			.order-item {
				.order-img {
					width: 88rpx;
					height: 88rpx;
				}

				.order-text {
					font-size: 26rpx;
				}
			}
		}

		.menu {
			width: 690rpx;
			margin-left: 30rpx;
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