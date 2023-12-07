<template>
	<view class="page">
		<m-scroll-y :isLoading="false" :scrollStyle="scrollStyle" :isCustomRefresh="false">
			<!-- 顶部导航 -->
			<m-navbar isFixed :borderBottom="false" bgColor="tansparent" i18n value="page.会员中心"></m-navbar>
			<!-- 用户信息 -->
			<view class="bg-box" :style="{height: `calc(340rpx + ${navbarHeight}px)`}">
				<view class="bg-card d-flex pl-3">
					<view class="rounded-circle border border-white" style="width: 126rpx; height: 126rpx;">
						<u-image width="124rpx" height="124rpx" radius="50" :src="userinfo.avatar"></u-image>
					</view>
					<view class="ml-2 d-flex flex-column j-center" style="height: 124rpx;">
						<view class="vipinfo-t d-flex a-center">
							<u-image width="40rpx" height="40rpx"
								src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/VIP-Icon.png"></u-image>
							<view class="font-weight ml-1 line-h">
								{{userinfo.name}}
							</view>
						</view>
						<view v-if="userinfo.isVIP" class="info-desc mt-1">
							{{userinfo.VIPExpirationTime}} {{$t('到期')}}
						</view>
						<view v-else class="info-desc mt-1">
							{{$t('激活会员权限，畅享更多专属特权。')}}
						</view>
					</view>
				</view>
			</view>
			<u-gap height="134rpx"></u-gap>
			<!-- 会员权益 -->
			<view class="up m-5">
				<view class="d-flex a-center j-center">
					<u-image width="52rpx" height="20rpx" :src="iconL"></u-image>
					<view class="up-title mx-2">
						{{$t('会员权益')}}
					</view>
					<u-image width="52rpx" height="20rpx" :src="iconR"></u-image>
				</view>
				<view class="up-list d-flex a-center j-sb mt-4">
					<view class="up-itemTwo d-flex flex-column a-center j-center" v-for="(item, i) in equitylist"
						:key="i">
						<u-image radius="50" width="80rpx" height="80rpx" :src="item.icon"></u-image>
						<view class="item-name text-white mt-1">
							{{$t(item.name)}}
						</view>
					</view>
				</view>
			</view>
			<!-- 会员充值 -->
			<view class="up m-6">
				<view class="d-flex a-center j-center">
					<u-image width="52rpx" height="20rpx" :src="iconL"></u-image>
					<view class="up-title mx-2">
						{{$t('会员充值')}}
					</view>
					<u-image width="52rpx" height="20rpx" :src="iconR"></u-image>
				</view>
				<view class="up-change ml-3 d-flex a-center mt-4">
					<scroll-view class="scroll-row position-relative" scroll-x>
						<view class="up-data scroll-row-item mr-2" v-for="(item, i) in VIPPriceList" :key="i"
							@click="selectVIP(item, i)" :class="i == VIPIndex ? 'up-active': ''">
							<view class="up-i">
								<view class="item-name font-weight" :class="VIPIndex == i ? 'item-active': ''">
									{{item.name}}
								</view>
								<view class="item-desc mt-1" :class="VIPIndex == i ? 'item-action': ''">
									{{$t('会员尊享')}}
								</view>
								<view class="item-price d-flex a-center flex-column j-center mt-5">
									<span class="price font-weight line-h"
										:class="VIPIndex == i ? 'price-active': ''">{{item.price}}</span>
									<span class="syml font-weight mt-1"
										:class="VIPIndex == i ? 'syml-active': ''">{{moneySymbol}}</span>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</m-scroll-y>
		<view class="bottombox position-fixed bottom-0 left-0 p-3 w-100">
			<view class="bottombox-ri d-flex a-center flex-column j-center" @click="openVIP">
				<view class="bottombox-name font-weight line-h">
					{{$t('开通会员')}}
				</view>
				<view v-if="VIPPriceList[VIPIndex]" class="bottombox-price line-h mt-1">
					{{VIPPriceList[VIPIndex].name}} {{moneySymbol}} {{VIPPriceList[VIPIndex].price}}
				</view>
			</view>
		</view>
		<!-- 弹框 -->
		<m-modal :show="show" i18n title="温馨提示" @cancel="show = false" btnName="去完善"
			@confirm="$tools.Navigate.navigateTo('/pages-next/mine/setting/index')">
			<view class="d-flex a-center text-center j-center">
				{{$t('为了保障您的账户安全，请尽快完善您的个人信息 (绑定手机号/邮箱)。')}}
			</view>
		</m-modal>
		<!-- 支付方式 -->
		<c-pay-methods :vipInfo="VIPPriceList[VIPIndex]" :show="payMethodShow" @close="payMethodShow = false" @payCallback="payCallback" />
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import MModal from '@/main_modules/main-ui/m-modal/index.vue'
	import CPayMethods from '@/components/common/c-pay-methods/index.vue'
	import {
		equitylist,
		VIPPriceList,
		iconL,
		iconR
	} from './data.js'
	export default {
		components: {
			MModal,
			CPayMethods
		},
		data() {
			return {
				iconL,
				iconR,
				VIPPriceList: [],
				payMethodList: [],
				equitylist,
				VIPIndex: 0,
				show: false,
				payMethodShow: false,
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.getVIPPriceList()
			},
			// 获取VIP价目表
			async getVIPPriceList() {
				this.VIPPriceList = VIPPriceList
			},
			// 选择VIP价目
			selectVIP(i) {
				this.VIPIndex = i
			},
			// 更新用户信息
			async updateUserinfo(e) {
				await this.$store.dispatch('getUserinfo')
				if (e) {
					if (!userinfo.email || !userinfo.mobile) {
						this.show = true
					}
				}
			},
			// 点击开通VIP
			openVIP() {
				this.payMethodShow = true
			},
			// 支付完成回调
			payCallback() {
				this.updateUserinfo()
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			},
			navbarHeight() {
				return this.$store.state.navbarHeight
			},
			userinfo() {
				return this.$store.state.userinfo
			},
			moneySymbol() {
				return this.$store.state.moneySymbol
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background: linear-gradient(180deg, #0E0908 0%, #1A1818 100%);

		.bg-box {
			background: url('https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/VIP-bg.png') no-repeat;
			background-size: cover;
			border-radius: 0 0 40rpx 40rpx;
			position: relative;

			.bg-card {
				background: url('https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/VIP-card.png') no-repeat;
				background-size: cover;
				width: calc(100% - 60rpx);
				position: absolute;
				height: 341rpx;
				bottom: -134rpx;
				left: 30rpx;
				padding-top: 48rpx;

				.vipinfo-t {
					font-size: 40rpx;
					line-height: 40rpx;
					background: linear-gradient(146deg, #4E281A 0%, #A05D49 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;

					.vipinfo-level {
						background: linear-gradient(90deg, #FDEDCC 0%, #FCCC8C 52%, #F2A82B 100%);
						height: 40rpx;
						width: 92rpx;
						border-radius: 8rpx;
						font-size: 20rpx;
						color: #74300B;
						border: 4rpx solid #FFCA95;
					}
				}

				.info-desc {
					font-size: 24rpx;
					font-weight: 400;
					background: #3E1D04;
					line-height: 48rpx;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}
		}

		.up {
			.up-title {
				font-size: 30rpx;
				background: #F2E6D8;
				line-height: 36rpx;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}

			.up-list {
				.up-item {
					width: 184rpx;
					height: 230rpx;
					border-radius: 12rpx;
					border: 1rpx solid #E7E7E7;
				}

				.up-itemTwo {
					width: 25%;

					.item-name {
						font-size: 26rpx;
						color: #999;
					}
				}
			}

			.up-change {
				padding: 0 20rpx 0 30rpx;
				width: 690rpx;
				height: 492rpx;
				background: #34302F;
				box-shadow: 0 -2rpx 4rpx 0 #8C867F;
				border-radius: 40rpx;

				.scroll-row::after {
					content: '';
					position: absolute;
					right: -1rpx;
					top: -2%;
					z-index: 100;
					width: 30rpx;
					height: 104%;
					border-radius: 0 10rpx 10rpx 0;
					background: linear-gradient(to right, #00000000 0%, #34302F 60%);
				}

				.up-data {
					margin-right: 24rpx;
					padding: 48rpx 32rpx;
					width: 268rpx;
					height: 336rpx;
					background: linear-gradient(180deg, rgba(89, 70, 41, 0.8) 0%, rgba(88, 68, 41, 0) 35%, rgba(88, 68, 41, 0) 64%, rgba(88, 68, 41, 0.8) 100%);
					border-radius: 16rpx;
					border: 2rpx solid #FFE0C2;

					.up-i {
						.item-name {
							background: #E5CC91;
							line-height: 32rpx;
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
						}

						.item-active {
							background: #5D3717;
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
						}

						.item-desc {
							font-size: 24rpx;
							background: #E5CC91;
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
						}

						.item-action {
							background: #5D3717;
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
						}

						.item-price {
							.price {
								background: #FFE0C2;
								line-height: 66rpx;
								-webkit-background-clip: text;
								-webkit-text-fill-color: transparent;
								font-size: 56rpx;
							}

							.price-active {
								background: #290D00;
								-webkit-background-clip: text;
								-webkit-text-fill-color: transparent;
							}

							.syml {
								font-size: 50rpx;
								background: #E5CC91;
								-webkit-background-clip: text;
								-webkit-text-fill-color: transparent;
							}

							.syml-active {
								background: #5D3717;
								-webkit-background-clip: text;
								-webkit-text-fill-color: transparent;
							}
						}
					}
				}

				.up-active {
					border: 2rpx solid #fb7299;
					background: linear-gradient(180deg, #FFE3C2 0%, #FFD7C0 100%);
				}
			}
		}

		.bottombox {
			.bottombox-ri {
				height: 100rpx;
				background: linear-gradient(180deg, #F8ECCA 0%, #EFBF89 37%, #EFBF89 65%, #F8ECCA 100%);
				border-radius: 16rpx;

				.bottombox-name {
					background: #744201;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}

				.bottombox-price {
					font-size: 22rpx;
					background: #744201;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}
		}
	}
</style>