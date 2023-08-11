<template>
	<view class="page">
		<!-- 顶部信息 -->
		<view class="user d-flex a-center">
			<!-- 顶部状态栏高度 -->
			<m-top />
			<view class="user-avatar mr-2">
				<image class="user-img" src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/weChatLogo.png" mode="">
				</image>
			</view>
			<view class="user-info">
				<view class="info-name font-lg line-h">
					高江华
				</view>
				<view class="info-desc font-md">
					我自横刀向天笑，去留肝胆两昆仑
				</view>
			</view>
		</view>
		<!-- 订单栏 -->
		<view class="order d-flex a-center j-around">
			<block v-for="i in 4" :key="i">
				<view class="order-item d-flex flex-column a-center j-center">
					<image class="order-img" src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/weChatLogo.png"
						mode=""></image>
					<view class="order-text">
						待付款
					</view>
				</view>
			</block>
		</view>
		<!-- 菜单栏 -->
		<view class="menu" @click="openSet">
			设置
		</view>
		<view class="menu" @click="openShow">
			show
		</view>
		<!-- 底部导航栏 -->
		<m-tabbar pagePath="pages/tabbar/mine/index" i18n></m-tabbar>
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
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				
			},
			openSet() {
				let obj = {
					abc: '123',
					bjj: '456'
				}
				this.$tools.Navigate.navigateTo('/pages-next/mine/setting/index', obj, true)
			},
			openShow() {
				this.$mToast.show({
					content: '你们都是大傻逼',
					type: 'warning',
					duration: 3000,
					complete(){
						console.log('执行完后的回调')
					}
				}, () => {
					console.log('打开提示弹框');
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background-color: #fff;

		.user {
			padding: 100rpx 50rpx 0;
			background: linear-gradient(#fb7299, #fff);

			.user-avatar {
				.user-img {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					overflow: hidden;
				}
			}
		}

		.order {
			margin-top: 30rpx;
			border-radius: 10rpx;
			border: 1rpx solid #151515;
			width: 690rpx;
			margin-left: 30rpx;
			padding: 30rpx;

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
	}
</style>