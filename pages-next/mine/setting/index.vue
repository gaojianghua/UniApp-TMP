<template>
	<view class="page">
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.设置" i18n></m-navbar>
		<view class="menu">
			<u-gap height="10rpx"></u-gap>
			<view class="menu-item" v-for="(item, i) in setList" :key="i" @click="cellClick(item)">
				<m-cell v-if="i == 0" :isShowL="false" class="px-3 bg-white">
					<view :slot="'left'" class="d-flex py-3 a-center">
						<view class="user-avatar mr-2">
							<u-image width="100rpx" height="100rpx" class="user-img"
								src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/weChatLogo.png" mode="">
							</u-image>
						</view>
						<view class="user-info d-flex flex-column j-around">
							<view class="info-name line-h">
								{{$store.state.token ? $store.state.userinfo.name : $t('前往登录')}}
							</view>

							<view v-if="$store.state.token" class="info-desc font-md line-h">
								ID: {{$store.state.userinfo.id}}
							</view>
							<view v-else class="user-notice line-h">
								{{$t('您还未登录。立即登录，享受更多特权！')}}
							</view>
						</view>
					</view>
				</m-cell>
				<m-cell v-if="i > 0 && i <= 1" :itemStyle="{height: '88rpx'}" i18n class="px-3 bg-white"
					:item="item"></m-cell>
				<m-cell v-if="i == 2" :itemStyle="{height: '88rpx'}" i18n class="px-3 bg-white" :item="item">
					<template :slot="'right-row'">
						<view class="d-flex a-center">
							<u-image v-if="$store.state.userinfo.phone" width="45rpx" height="45rpx"
								src="/static/img/mine/phone.svg"></u-image>
							<view class="text-muted line-h ml-1">
								{{$store.state.userinfo.phone ? $t('已绑定手机号') : $t('未绑定手机号')}}
							</view>
						</view>
					</template>
				</m-cell>
				<u-gap v-if="i == 2" height="10rpx"></u-gap>
				<m-cell v-if="i > 2 && i <= 4" :itemStyle="{height: '88rpx'}" i18n class="px-3 bg-white"
					:item="item"></m-cell>
				<u-gap v-if="i == 4" height="10rpx"></u-gap>
				<m-cell v-if="i > 4 && i <= 7" :itemStyle="{height: '88rpx'}" i18n class="px-3 bg-white"
					:item="item"></m-cell>
				<!-- #ifdef APP-PLUS -->
				<m-cell v-if="i == 8" :itemStyle="{height: '88rpx'}" i18n class="px-3 bg-white" :item="item"></m-cell>
				<!-- #endif -->
				<m-cell v-if="i == 9" :itemStyle="{height: '88rpx'}" i18n class="px-3 bg-white" :item="item">
					<view slot="right-row" class="main-text-color">
						V{{$store.state.appSystemInfo.appVersion}}
					</view>
				</m-cell>
				<u-gap v-if="i == 10 && $store.state.token" height="10rpx"></u-gap>
				<m-cell v-if="i == 10 && $store.state.token" :itemStyle="{height: '88rpx'}" i18n textCenter
					:isIcon="false" class="px-3 bg-white" :item="item"></m-cell>
			</view>
		</view>
		<!-- 弹框 -->
		<m-modal :show="show" title="确认退出" @cancel="show = false" @confirm="confirmLogout">
			<view class="d-flex a-center j-center">
				{{$t('确定退出登录吗？')}}
			</view>
		</m-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import MCell from '@/main_modules/main-ui/m-cell/index.vue'
	import MModal from '@/main_modules/main-ui/m-modal/index.vue'
	// #ifdef APP-PLUS
	import APPUpdate from '@/uni_modules/zhouWei-APPUpdate/js_sdk/appUpdate';
	// #endif
	import {
		setList
	} from './data.js'
	export default {
		components: {
			MCell,
			MModal
		},
		data() {
			return {
				setList,
				show: false,
				systemInfo: {}
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.systemInfo = uni.getSystemInfoSync()
			},
			// cell点击事件
			cellClick(i) {
				i.id == 10 ? this.show = true : this.isLoginOpen(i)
			},
			// 鉴别登录指定跳转
			isLoginOpen(i) {
				// #ifdef APP-PLUS
				if (i.id == 8) {
					APPUpdate()
				}
				// #endif
				if (!this.$store.state.token) {
					if (i.id == 0 || i.id == 1 || i.id == 2 || i.id == 4) {
						return this.$tools.Navigate.navigateTo('/pages/account/login/index')
					}
					return this.$tools.Navigate.navigateTo(i.page)
				}
				this.$tools.Navigate.navigateTo(i.page)
			},
			// 确认退出登录
			confirmLogout() {
				uni.removeStorageSync('token')
				uni.removeStorageSync('userinfo')
				this.$store.commit('updateToken', '')
				this.$store.commit('updateUserinfo', {})
				this.show = false
				this.$refs.uToast.show({
					message: this.$t('退出登录成功'),
					type: 'success',
					duration: 1200
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.menu {
			.menu-item {
				.user-info {
					height: 100rpx;

					.info-name {
						font-size: 30rpx;
						font-weight: 500;
					}

					.info-desc {
						font-size: 26rpx;
						font-weight: 400;
						color: #898989;
					}

					.user-notice {
						font-size: 26rpx;
						font-weight: 400;
						color: #999;
					}
				}

				.user-avatar {
					.user-img {
						border-radius: 50%;
						overflow: hidden;
					}
				}
			}

			.menu-item:nth-child(2),
			:nth-child(5),
			:nth-child(7),
			:nth-child(12) {
				/deep/ .menu-item {
					border-top: none !important;
				}
			}
		}
	}
</style>