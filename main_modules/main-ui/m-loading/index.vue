<!-- 上拉加载组件 -->
<template>
	<view class="loading d-flex j-center a-center" :style="{'height': `${height}rpx`}">
		<view v-if="load == 2" class="loading-text d-flex j-center a-center" :style="'color:' + mainColor + ';'">
			<!-- <view class="logo flex justify-center align-center">
				<image lazy-load :src="entLogo" mode=""></image>
			</view> -->
			<text class="logo-text">{{$t('上拉加载更多哦~')}}</text>
		</view>
		<view v-if="load == 0" class="loading-text d-flex j-center a-center" :style="'color:' + mainColor + ';'">
			<u-loading-icon size="20" :inactiveColor="mainColor + '22'" mode="circle" :color="mainColor"></u-loading-icon>
			<text class="logo-text ml-2">{{$t('正在加载中哦! 亲~')}}</text>
		</view>
		<view v-if="load == 1" class="loading-text d-flex j-center a-center" :style="'color:' + mainColor + ';'">
			<!-- <view class="logo flex justify-center align-center">
				<image lazy-load :src="entLogo" mode=""></image>
			</view> -->
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
			height: {
				type: [String, Number],
				default: () => {
					return 50
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
