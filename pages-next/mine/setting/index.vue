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
								高江华
							</view>
							<view class="info-desc line-h">
								ID: {{89403076}}
							</view>
						</view>
					</view>
				</m-cell>
				<m-cell v-if="i > 0 && i <= 2" :itemStyle="{height: '88rpx'}" class="px-3 bg-white"
					:item="item"></m-cell>
				<u-gap v-if="i == 2" height="10rpx"></u-gap>
				<m-cell v-if="i > 2 && i <= 4" :itemStyle="{height: '88rpx'}" class="px-3 bg-white"
					:item="item"></m-cell>
				<u-gap v-if="i == 4" height="10rpx"></u-gap>
				<m-cell v-if="i > 4 && i <= 7" :itemStyle="{height: '88rpx'}" class="px-3 bg-white"
					:item="item"></m-cell>
				<u-gap v-if="i == 8" height="10rpx"></u-gap>
				<m-cell v-if="i == 8" :itemStyle="{height: '88rpx'}" textCenter :isIcon="false" class="px-3 bg-white"
					:item="item"></m-cell>
			</view>
		</view>
		<!-- 弹框 -->
		<m-modal :show="show" title="确认退出" @cancel="show = false" @confirm="confirmLogout">
			<view class="d-flex a-center j-center">
				{{$t('确定退出登录吗？')}}
			</view>
		</m-modal>
	</view>
</template>

<script>
	import MCell from '@/main_modules/main-ui/m-cell/index.vue'
	import MModal from '@/main_modules/main-ui/m-modal/index.vue'
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
				show: false
			}
		},
		onLoad() {

		},
		methods: {
			// cell点击事件
			cellClick(i) {
				i.id == 8 ? this.show = true :
					this.$tools.Navigate.navigateTo(i.page)
			},
			// 退出登录
			confirmLogout() {

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
			:nth-child(10) {
				/deep/ .menu-item {
					border-top: none !important;
				}
			}
		}
	}
</style>