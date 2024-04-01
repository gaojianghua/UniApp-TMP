<template>
	<view class="page">
		<!-- 顶部导航 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.收货地址" i18n>
			<template slot="right">
				<view :class="isManage ? 'bg-warning text-white' : 'bg-light-secondary'"
					class="manage position-absolute" @click="isManage = !isManage">
					{{isManage ? $t('完成') : $t('管理')}}
				</view>
			</template>
		</m-navbar>
		<!-- 内容区域 -->
		<view class="content">
			<view class="item mt-1 bg-white" v-for="(item, i) in $store.state.shippingAddress" :key="i">
				<view class="d-flex a-center px-3 py-2">
					<view class="item-l">
						<view class="item-l-t d-flex a-center">
							<span class="item-name">{{item.name}}</span>
							<span class="item-phone ml-2">{{item.phone}}</span>
							<view v-if="item.isDefault" class="item-l-t-tag ml-2 line-h">
								{{$t('默认')}}
							</view>
						</view>
						<view class="item-l-b mt-1">
							{{item.province}} {{item.city}} {{item.area}} {{item.street}}{{item.address}}
						</view>
					</view>
					<view class="item-r ml-auto"
						@click="$tools.Navigate.navigateTo('/pages-offspring/add-edit-address/index', item)">
						<u-icon name="edit-pen" color="#666" size="22"></u-icon>
					</view>
				</view>
				<view v-if="isManage" class="d-flex a-center j-sb border-top border-light-secondary px-3 py-2">
					<view class="d-flex a-center" @click="checkboxChange(i)">
						<view class="check-icon" :class="item.isDefault ? 'check-active' : ''">
							<u-icon
								:name="`https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/${item.isDefault ? 'tick-active' : 'tick'}.svg`"></u-icon>
						</view>
						<view class="ml-2 item-delete">
							{{$t('默认地址')}}
						</view>
					</view>
					<view class="item-delete" @click="openRemoveCity(i)">
						{{$t('删除')}}
					</view>
				</view>
			</view>
		</view>
		<!-- 添加收货地址按钮 -->
		<view class="position-fixed bottom-0 left-0 p-3 bg-white w-100">
			<view @click="$tools.Navigate.navigateTo('/pages-offspring/add-edit-address/index', {})"
				class="btons d-flex a-center j-center text-white">
				{{$t('page.添加收货地址')}}
			</view>
		</view>
		<!-- 弹框 -->
		<m-modal :show="show" i18n title="确认移除" @cancel="show = false" @confirm="confirmRemoveCity">
			<view class="d-flex a-center j-center">
				{{$t('确定移除此地址吗？')}}
			</view>
		</m-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		list
	} from './data.js'
	export default {
		data() {
			return {
				isManage: false,
				list: [],
				index: 0,
				show: false
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.$store.commit('updateShippingAddress', list)
			},
			// 设置默认地址
			checkboxChange(i) {
				let list = this.$store.state.shippingAddress
				list.forEach((item, index) => {
					if (i == index) {
						item.isDefault = true
					} else {
						item.isDefault = false
					}
				})
				this.$store.commit('updateShippingAddress', list)
				this.$refs.uToast.show({
					message: this.$t('切换默认地址成功'),
					type: 'success',
					duration: 1500
				})
			},
			// 打开移除地址弹框
			openRemoveCity(i) {
				this.index = i
				this.show = true
			},
			// 确认移除地址
			confirmRemoveCity(i) {
				let list = this.$store.state.shippingAddress
				list.splice(this.index, 1)
				this.$store.commit('updateShippingAddress', list)
				this.show = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.manage {
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);
			padding: 0 20rpx;
			border-radius: 8rpx;
		}

		.content {
			.item {
				.item-l {
					.item-l-t {
						.item-name {
							font-size: 28rpx;
							font-weight: 500;
						}

						.item-phone {
							font-size: 26rpx;
							color: #111;
						}

						.item-l-t-tag {
							border-radius: 6rpx;
							border: 2rpx solid #f27299;
							padding: 6rpx 12rpx;
							font-size: 22rpx;
							font-weight: 500;
							color: #f27299;
						}
					}

					.item-l-b {
						font-size: 26rpx;
						color: #666;
						line-height: 36rpx;
					}
				}

				.item-delete {
					font-size: 26rpx;
					color: #666;
				}

				.check-icon {
					border: 4rpx solid #f27299;
					border-radius: 10rpx;
				}

				.check-active {
					border: 4rpx solid #f2729980;
					background-color: #f27299;
				}
			}
		}

		.btons {
			font-size: 30rpx;
			border-radius: 50rpx;
			height: 88rpx;
			width: 690rpx;
			margin: 0 auto;
			background: linear-gradient(to right, #85B6CA, #F9A4A0);
		}

		.btons:active {
			background: linear-gradient(to right, #85B6CA80, #F9A4A080);
		}
	}
</style>