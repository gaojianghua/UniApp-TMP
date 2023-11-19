<!-- 上拉加载组件 -->
<template>
	<view class="loading d-flex j-center a-center" :style="{height: `${height}rpx`, backgroundColor: bgColor}">
		<view v-if="load == 2" 
		class="loading-text d-flex j-center a-center" 
		:class="isColumn ? 'text-column' : ''"
		:style="'color:' + mainColor + ';'">
			<view v-if="image" class="logo mb-1 d-flex j-center a-center" :style="imageStyle">
				<image lazy-load :src="image" mode=""></image>
			</view>
			<text class="logo-text">{{$t('上拉加载更多哦~')}}</text>
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
				<text class="logo-text ml-2">{{$t('正在加载中哦! 亲~')}}</text>
			</view>
		</view>
		<view v-if="load == 1" 
		class="loading-text d-flex j-center a-center" 
		:class="isColumn ? 'text-column' : ''"
		:style="'color:' + mainColor + ';'">
			<view v-if="image" class="logo mb-1 d-flex j-center a-center" :style="imageStyle">
				<image lazy-load :src="image" mode=""></image>
			</view>
			<text class="logo-text">{{$t('亲~ 我是有底线的哦!')}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "loading",
		props: {
			load: {
				type: [String, Number],
				default: () => {
					return 2
				}
			},
			mainColor: {
				type: String,
				default: () => {
					return '#fb7299'
				}
			},
			bgColor: {
				type: String,
				default: () => {
					return 'transparent'
				}
			},
			image: {
				type: String,
				default: () => {
					return ''
				}
			},
			imageStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			height: {
				type: [String, Number],
				default: () => {
					return 50
				}
			},
			isLoadingIcon: {
				type: Boolean,
				default: () => {
					return true
				}
			},
			isColumn: {
				type: Boolean,
				default: () => {
					return false
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
	.loading {
		//height: 50rpx;

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
