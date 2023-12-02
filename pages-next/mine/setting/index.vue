<template>
	<view class="page">
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.设置" i18n></m-navbar>
		<m-scroll-y :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
		<view class="menu">
			<u-gap height="10rpx"></u-gap>
			<view class="menu-item" v-for="(item, i) in setList" :key="i" @click="cellClick(item)">
				<m-cell v-if="i == 0" :isShowL="false" :itemStyle="{padding: '0 30rpx', backgroundColor: '#fff'}">
					<view :slot="'left'" class="d-flex py-3 a-center">
						<view class="user-avatar border-2 main-border-color mr-2">
							<u-image radius="100" width="100rpx" height="100rpx"
								:src="userinfo.avatar || 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/default-avatar.png'" mode="">
							</u-image>
						</view>
						<view class="user-info d-flex flex-column j-around">
							<view class="info-name line-h">
								{{token ? userinfo.name : $t('前往登录')}}
							</view>

							<view v-if="token" class="info-desc font-md line-h">
								ID: {{userinfo.id}}
							</view>
							<view v-else class="user-notice line-h">
								{{$t('您还未登录。立即登录，享受更多特权！')}}
							</view>
						</view>
					</view>
				</m-cell>
				<m-cell v-if="i > 0 && i <= 1" :itemStyle="{height: '88rpx', padding: '0 30rpx', backgroundColor: '#fff'}" i18n
					:item="item"></m-cell>
				<m-cell v-if="i == 2" :itemStyle="{height: '88rpx', padding: '0 30rpx', backgroundColor: '#fff'}" i18n :item="item">
					<template :slot="'right-row'">
						<view class="d-flex a-center">
							<u-image v-if="userinfo.phone" width="45rpx" height="45rpx"
								src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/phone.svg"></u-image>
							<view class="text-muted line-h ml-1">
								{{userinfo.phone ? $t('已绑定手机号') : $t('未绑定手机号')}}
							</view>
						</view>
					</template>
				</m-cell>
				<m-cell v-if="i == 3" :itemStyle="{height: '88rpx', padding: '0 30rpx', backgroundColor: '#fff'}" i18n 
					:item="item"></m-cell>
				<u-gap v-if="i == 3" height="10rpx"></u-gap>
				<m-cell v-if="i > 3 && i <= 6" :itemStyle="{height: '88rpx', padding: '0 30rpx', backgroundColor: '#fff'}" i18n
					:item="item"></m-cell>
				<u-gap v-if="i == 6" height="10rpx"></u-gap>
				<m-cell v-if="i > 6 && i <= 9" :itemStyle="{height: '88rpx', padding: '0 30rpx', backgroundColor: '#fff'}" i18n
					:item="item"></m-cell>
				<!-- #ifdef APP-PLUS -->
				<m-cell v-if="i == 10" :itemStyle="{height: '88rpx', padding: '0 30rpx', backgroundColor: '#fff'}" i18n :item="item"></m-cell>
				<!-- #endif -->
				<m-cell v-if="i == 11" :itemStyle="{height: '88rpx', padding: '0 30rpx', backgroundColor: '#fff'}" i18n :item="item">
					<view slot="right-row" class="main-text-color">
						V{{appSystemInfo.appVersion}}
					</view>
				</m-cell>
				<u-gap v-if="i == 12 && token" height="10rpx"></u-gap>
				<m-cell v-if="i == 12 && token" :itemStyle="{height: '88rpx', padding: '0 30rpx', backgroundColor: '#fff'}" i18n textCenter
					:isIcon="false" :item="item"></m-cell>
			</view>
		</view>
		</m-scroll-y>
		<!-- 弹框 -->
		<m-modal :show="show" i18n title="确认退出" @cancel="show = false" @confirm="confirmLogout">
			<view class="d-flex a-center j-center">
				{{$t('确定退出登录吗？')}}
			</view>
		</m-modal>
		<common-lang-model :show="langShow" @close="langShow = false" @confirmSwitch="confirmSwitch"></common-lang-model>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import MCell from '@/main_modules/main-ui/m-cell/index.vue'
	import CommonLangModel from '@/components/pages/common-lang-model/index.vue'
	// #ifdef APP-PLUS
	import APPUpdate from '@/uni_modules/zhouWei-APPUpdate/js_sdk/appUpdate';
	// #endif
	import {
		setList
	} from './data.js'
	export default {
		components: {
			MCell,
			CommonLangModel
		},
		data() {
			return {
				setList,
				show: false,
				langShow: false,
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
				i.id == 12 ? this.show = true : this.isLoginOpen(i)
			},
			// 鉴别登录指定跳转
			isLoginOpen(i) {
				// #ifdef APP-PLUS
				if (i.id == 11) {
					APPUpdate()
				}
				// #endif
				if (i.id == 6) {
					return this.langShow = true
				}
				if (!this.$store.state.token) {
					if (i.id == 0 || i.id == 1 || i.id == 2 || i.id == 3 || i.id == 5) {
						return this.$tools.Navigate.navigateTo('/pages-common/account/login/index')
					}
					
					return this.$tools.Navigate.navigateTo(i.page)
				}
				if (i.id == 2 && !this.$store.state.userinfo.phone) {
					return this.$tools.Navigate.navigateTo('/pages-offspring/bind-update-phone/index', 1)
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
			},
			// 确认切换语言
			confirmSwitch(lang) {
				this.$store.commit('updateLanguage', lang)
				uni.setStorageSync('lang', lang)
				this.$i18n.locale = lang
				uni.setLocale(lang)
				this.langShow = false
				this.$refs.uToast.show({
					message: this.$t('切换语言成功'),
					type: 'success',
					duration: 1200
				})
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			},
			userinfo() {
				return this.$store.state.userinfo
			},
			token() {
				return this.$store.state.token
			},
			appSystemInfo() {
				return this.$store.state.appSystemInfo
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
					border-radius: 50%;
					overflow: hidden;
				}
			}

			.menu-item:nth-child(2),
			:nth-child(6),
			:nth-child(9),
			:nth-child(14) {
				/deep/ .menu-item {
					border-top: none !important;
				}
			}
		}
	}
</style>