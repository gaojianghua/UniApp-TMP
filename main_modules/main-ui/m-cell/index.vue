<template>
	<view class="menu-item d-flex j-sb a-center p-3">
		<view class="menu-item-left d-flex a-center">
			<u-image class="mr-2" v-if="item.icon" v-bind="$attrs" :radius="radius" :src="item.icon" :width="imgWidth"
				:height="imgHeight" :mode="mode"></u-image>
			<span v-if="item.name" :style="{color}">{{text ? $t(text) : $t(item.name)}}</span>
		</view>
		<view class="menu-item-right d-flex a-center">
			<slot />
			<u-icon v-if="isIcon" name="arrow-right" color="#fff" size="20"></u-icon>
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
			text: {
				type: String,
				default: () => {
					return ''
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
					return '#fff'
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
		border-bottom: 1rpx solid #2A2A6C;

		span {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
</style>
