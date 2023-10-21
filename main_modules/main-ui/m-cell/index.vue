<template>
	<view class="menu-item d-flex a-center" 
	:class="[textCenter ? 'j-center': 'j-sb', isActive ? 'active': '']" :style="[{borderTop: `1rpx solid ${BBColor}`},itemStyle]">
		<view v-if="isShowL" class="menu-item-left d-flex a-center">
			<u-image class="mr-2" v-if="item.icon" v-bind="$attrs" :radius="radius" :src="item.icon" :width="imgWidth"
				:height="imgHeight" :mode="mode"></u-image>
			<view v-if="item.name" :style="{color}">{{i18n ? $t(item.name) : item.name}}</view>
		</view>
		<slot name="left" />
		<view v-if="isShowR" class="menu-item-right d-flex a-center">
			<slot name="right-row" />
			<u-icon v-if="isIcon" name="arrow-right" :color="iconColor" size="16"></u-icon>
		</view>
		<slot name="right"></slot>
	</view>
</template>

<script>
	export default {
		name: "menu-item",
		props: {
			item: {
				type: Object,
				default: () => {
					return {}
				}
			},
			textCenter: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			itemStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			BBColor: {
				type: String,
				default: () => {
					return '#eee'
				}
			},
			i18n: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			imgWidth: {
				type: String,
				default: () => {
					return '41rpx'
				}
			},
			imgHeight: {
				type: String,
				default: () => {
					return '41rpx'
				}
			},
			mode: {
				type: String,
				default: () => {
					return 'aspectFit'
				}
			},
			isIcon: {
				type: Boolean,
				default: () => {
					return true
				}
			},
			isActive: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			isShowR: {
				type: Boolean,
				default: () => {
					return true
				}
			},
			isShowL: {
				type: Boolean,
				default: () => {
					return true
				}
			},
			radius: {
				type: [String, Number],
				default: () => {
					return 2
				}
			},
			color: {
				type: String,
				default: () => {
					return '#333'
				}
			},
			iconColor: {
				type: String,
				default: () => {
					return '#999'
				}
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.menu-item {
		min-height: 90rpx;
		span {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
	.active:active{
		background-color: #fc8bb266;
	}
</style>
