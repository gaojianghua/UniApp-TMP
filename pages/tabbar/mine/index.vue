<template>
	<view class="page">
		<!-- 顶部信息 -->
		<m-scroll-y :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
			<!-- #ifdef MP -->
			<view class="user position-relative" :style="{
			height: `calc(488rpx + ${statusHeight}px + ${navbarHeight}px)`}">
				<view class="user-image hidden">
					<u-image width="100%" :height="`calc(488rpx + ${statusHeight}px + ${navbarHeight}px)`"
						src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/mine-bg.png" mode="">
					</u-image>
				</view>
				<!-- #endif -->
				<!-- #ifndef MP -->
				<view class="user position-relative" :style="{
			height: `calc(488rpx + ${statusHeight}px)`}">
					<view class="user-image hidden">
						<u-image width="100%" :height="`calc(488rpx + ${statusHeight}px)`"
							src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/mine-bg.png" mode="">
						</u-image>
					</view>
					<!-- #endif -->
					<view class="position-absolute px-3 pt-3 top-0 right-0 left-0 right-0">
						<!-- 顶部状态栏高度 -->
						<!-- #ifdef MP -->
						<view :style="{height: `calc(${statusHeight}px + ${navbarHeight}px - 30rpx)`}"></view>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS -->
						<view :style="{height: `calc(${statusHeight}px - 30rpx)`}"></view>
						<!-- #endif -->
						<view class="d-flex">
							<view></view>
							<view class="ml-auto flex-shrink d-flex a-center">
								<!-- #ifndef H5 -->
								<view class="top-menu mr-3 d-flex flex-column j-center a-center" @click="openScanCode">
									<u-image width="50rpx" height="50rpx"
										src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/scan-code.svg"
										mode="" />
									<view class="top-menu-text main-text-color">
										{{$t('扫码')}}
									</view>
								</view>
								<view class="top-menu mr-3 d-flex flex-column j-center a-center"
									@click="$tools.Navigate.navigateTo('/pages-next/mine/bluetooth/index')">
									<u-image width="50rpx" height="50rpx"
										src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/bluetooth.svg"
										mode="" />
									<view class="top-menu-text main-text-color">
										{{$t('page.蓝牙')}}
									</view>
								</view>
								<!-- #endif -->
								<view class="top-menu mr-3 d-flex flex-column j-center a-center"
									@click="$tools.Navigate.navigateTo('/pages-next/mine/message/index')">
									<u-image width="50rpx" height="50rpx"
										src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/message.svg"
										mode="" />
									<view class="top-menu-text main-text-color">
										{{$t('page.消息')}}
									</view>
								</view>
								<view class="top-menu mr-1 d-flex flex-column j-center a-center"
									@click="$tools.Navigate.navigateTo('/pages-next/mine/setting/index')">
									<u-image width="50rpx" height="50rpx"
										src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/setting-two.svg"
										mode="" />
									<view class="top-menu-text main-text-color">
										{{$t('page.设置')}}
									</view>
								</view>
							</view>
						</view>
						<view class="d-flex a-center mt-2">
							<view class="user-avatar flex-shrink border-2 border-white mr-2">
								<u-image radius="100" width="100rpx" height="100rpx"
									:src="userinfo.avatar || 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/default-avatar.png'"
									mode="">
								</u-image>
							</view>
							<view class="user-info d-flex flex-column j-around mr-2" @click="openLogin">
								<view class="info-name font-lg line-h">
									{{token ? userinfo.name : $t('前往登录')}}
								</view>
								<view v-if="token" class="info-desc font-md line-h mt-2">
									ID: {{userinfo.id}}
								</view>
								<view v-else class="user-notice line-h mt-2">
									{{$t('您还未登录。立即登录，享受更多特权！')}}
								</view>
							</view>
						</view>
						<!-- 小说漫画 -->
						<view class="media py-2 d-flex a-center j-around mt-3">
							<view class="d-flex a-center j-center flex-column" v-for="(item, i) in literList" :key="i"
								@click="$tools.Navigate.navigateTo(item.page)">
								<u-image width="80rpx" height="80rpx" :src="item.src"></u-image>
								<view class="mt-1 line-h main-text-color">
									{{$t(item.name)}}
								</view>
							</view>
						</view>
						<!-- VIP -->
					</view>
					<view class="vip-card">
						<u-image width="690rpx" height="120rpx"
							src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/mine-vip-card.png"
							@click="$tools.Navigate.navigateTo('/pages-next/mine/member-center/index')">
						</u-image>
					</view>
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
							<view class="order-item d-flex flex-column a-center j-center"
								@click="openOrderList(item.id)">
								<u-image width="60rpx" height="60rpx" :src="item.img" mode="aspectFit" />
								<view class="order-text">
									{{$t(item.name)}}
								</view>
							</view>
						</block>
					</view>
				</view>
				<!-- 币区 -->
				<view class="assets text-white mt-2 bg-white d-flex a-center j-around">
					<view v-for="(item, i) in assets" :key="i" class="assets-item d-flex flex-column a-center j-center"
						@click="$tools.Navigate.navigateTo(item.page)">
						<view class="item-value">
							{{item.value}}
						</view>
						<view class="item-text">
							{{$t(item.name)}}
						</view>
					</view>
				</view>
				<!-- 菜单栏 -->
				<view class="menu mt-2">
					<view class="menu-item" v-for="(item, i) in menuList" :key="i"
						@click="$tools.Navigate.navigateTo(item.page)">
						<m-cell i18n v-if="item.id != 5" :item="item"></m-cell>
						<!-- #ifdef H5 -->
						<m-cell i18n v-if="item.id == 5" :item="item"></m-cell>
						<!-- #endif -->
					</view>
				</view>
				<u-gap height="50rpx"></u-gap>
		</m-scroll-y>
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
		assets,
		literList
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
				appVersion: '',
				literList
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			async init() {
				// this.openShow()
				// let bool = this.$sqlite.isOpenDB('carema')
				let result = await this.$sqlite.openDB('carema')
				// let result = await this.$sqlite.queryDBTable('carema')
				// let result = await this.$sqlite.isTable('carema', 'carema')
				// let res = await this.$sqlite.deleteTable('carema', 'carema')
				// console.log(res)
				// let result = await this.$sqlite.createTable({
				// 	dbname: 'carema',
				// 	tablename: 'carema',
				// 	describe: '相机'
				// })
				console.log(result)
			},
			// 跳转页面
			openOrderList(i) {
				i == 5 ? this.$tools.Navigate.navigateTo('/pages-next/mine/my-evaluate/index') :
					this.$tools.Navigate.navigateTo('/pages-next/mine/order-list/index', i)
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
					this.$tools.Navigate.navigateTo('/pages-common/account/login/index')
				}
			},
			// 扫码
			openScanCode() {
				if (!this.$store.state.token) {
					return this.$tools.Navigate.navigateTo('/pages-common/account/login/index')
				}
				uni.scanCode({
					success: (res) => {
						let startIndex = res.result.indexOf("/pages/"); // 获取 "/pages/" 的起始下标
						let result = res.result.substring(startIndex);
						this.$tools.Navigate.navigateTo(result)
					}
				})
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.browserFitHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.tabbarHeight}px)`
				}
			},
			statusHeight() {
				return this.$store.state.statusHeight
			},
			navbarHeight() {
				return this.$store.state.navbarHeight
			},
			userinfo() {
				return this.$store.state.userinfo
			},
			token() {
				return this.$store.state.token
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.user {
			color: #111;

			.user-image {
				border-radius: 0 0 40rpx 40rpx;
			}

			.user-info {
				// height: 100rpx;

				.user-notice {
					font-size: 26rpx;
					font-weight: 400;
					color: #666;
				}
			}

			.user-avatar {
				border-radius: 50%;
				overflow: hidden;
			}

			.top-menu {
				color: #fff;

				.top-menu-text {
					font-size: 24rpx;
				}
			}

			.vip-card {
				position: absolute;
				left: 30rpx;
				bottom: -60rpx;
			}
		}

		.media {}

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
					font-size: 24rpx;
				}
			}
		}

		.assets {
			width: 690rpx;
			margin-left: 30rpx;
			border-radius: 8rpx;
			padding: 20rpx 0;
			background: linear-gradient(to right, #85B6CA, #F9A4A0);

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