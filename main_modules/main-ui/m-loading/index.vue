<!-- 上拉加载组件 -->
<template>
	<view class="loading d-flex j-center a-center" :style="{height, width, backgroundColor: bgColor}">
		<view v-if="load == 2" 
		class="loading-text d-flex j-center a-center" 
		:class="isColumn ? 'text-column' : ''"
		:style="'color:' + mainColor + ';'">
			<view v-if="image" class="logo mb-1 d-flex j-center a-center" :style="imageStyle">
				<image lazy-load :src="image" mode=""></image>
			</view>
			<text class="logo-text">{{i18n ? $t(textStart) : textStart}}</text>
		</view>
		<view v-if="load == 0" 
		class="loading-text d-flex j-center a-center" 
		:class="isColumn ? 'text-column' : ''"
		:style="'color:' + mainColor + ';'">
			<view v-if="image" class="logo mb-1 d-flex j-center a-center" :style="imageStyle">
				<image lazy-load :src="image" mode=""></image>
			</view>
			<view class="d-flex j-center a-center">
				<u-loading-icon v-if="isLoadingIcon" size="20" :inactiveColor="mainColor + '22'" mode="circle" :color="mainColor"></u-loading-icon>
				<slot v-else name="loadIcon" />
				<text class="logo-text " :class="isColumn ? 'mt-1' : 'ml-2'">{{i18n ? $t(textCenter) : textCenter}}</text>
			</view>
		</view>
		<view v-if="load == 1" 
		class="loading-text d-flex j-center a-center" 
		:class="isColumn ? 'text-column' : ''"
		:style="'color:' + mainColor + ';'">
			<view v-if="image" class="logo mb-1 d-flex j-center a-center" :style="imageStyle">
				<image lazy-load :src="image" mode=""></image>
			</view>
			<text class="logo-text">{{i18n ? $t(textEnd) : textEnd}}</text>
		</view>
	</view>
</template>

<script>
	import props from './props.js'
	export default {
		name: "loading",
		props,
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.loading {

		.loading-text {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;

			.logo {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
</style>
