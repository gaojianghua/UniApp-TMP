<template>
	<view class="menu-item d-flex j-sb a-center" :style="[{borderTop: `1rpx solid ${BBColor}`},itemStyle]">
		<view class="menu-item-left d-flex a-center">
			<u-image class="mr-2" v-if="item.icon" v-bind="$attrs" :radius="radius" :src="item.icon" :width="imgWidth"
				:height="imgHeight" :mode="mode"></u-image>
			<span v-if="item.name" :style="{color}">{{i18n ? $t(item.name) : item.name}}</span>
		</view>
		<view class="menu-item-right d-flex a-center">
			<slot />
			<u-icon v-if="isIcon" name="arrow-right" color="#333" size="16"></u-icon>
		</view>
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
		min-height: 100rpx;
		span {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
</style>
