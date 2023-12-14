<template>
	<view class="battery-container d-flex a-center j-center">
		<view class="battery-body position-relative"
		:style="{borderColor: backgroundId != 2 ? bgList[1].color : bgList[0].color}">
			<view class="h-100" :style="{width: `${level}%`, background: backgroundId != 2 ? bgList[1].color : bgList[0].color}"></view>
			<text class="iconfont charging position-absolute left-half top-half tf-half-xy"
			:style="{color: backgroundId != 2 ? bgList[1].color : bgList[0].color}" v-if="charging">&#xe625;</text>
		</view>
		<view class="battery-head" :style="{background: backgroundId != 2 ? bgList[1].color : bgList[0].color}"></view>
	</view>
</template>

<script>
	import { bgList } from '../options.js'
	export default {
		props: {
			level: {
				type: Number,
				default: 0
			},
			charging: {
				type: Boolean,
				default: false
			},
			backgroundId: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				bgList
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.battery-container {
		width: 50rpx;
		height: 20rpx;

		.battery-body {
			padding: 2rpx;
			width: 44rpx;
			height: 100%;
			border-radius: 2rpx;
			border: 2rpx solid;

			.charging {
				height: 24rpx;
				line-height: 24rpx;
			}
		}

		.battery-head {
			width: 4rpx;
			height: 12rpx;
		}
	}
</style>