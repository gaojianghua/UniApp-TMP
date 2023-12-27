<!-- 顶部组件 -->
<template>
	<view class="index-5" :class="isFixed ? 'position-fixed' : 'position-sticky'">
		<!-- #ifndef MP -->
		<view :style="{height: `${statusHeight}px`, backgroundColor: bgColor}"></view>
		<!-- #endif -->
		<!-- #ifdef MP -->
		<view :style="[{height: `${statusHeight}px`, backgroundColor: bgColor}]"></view>
		<!-- #endif -->
		<!-- #ifndef MP -->
		<view class="top top-0 index-1"
			:style="{height: `${navbarHeight}px`, borderBottom: borderBottom ? '1rpx solid #f5f5f5' : 'none'}">
			<view :style="{backgroundColor: bgColor}" class="tabbar d-flex a-center position-relative"
				:class="textDirection === 'center' ? 'j-center' : 'pl-10'">
			<!-- #endif -->
				<!-- #ifdef MP -->
				<view class="top top-0 index-1"
					:style="[{height: `${navbarHeight}px`, borderBottom: borderBottom ? '1rpx solid #f5f5f5' : 'none'}]">
					<view :style="[{backgroundColor: bgColor}]" class="tabbar d-flex a-center position-relative"
						:class="textDirection === 'center' ? 'j-center' : 'pl-10'">
					<!-- #endif -->
						<view v-if="!isTab" class="tabbar-back d-flex j-center a-center p-1" @click.stop="unBack ? onBack() : retreat()">
							<u-image height="60rpx" width="60rpx" src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/back.svg"></u-image>
							<!-- <u-icon name="arrow-left" :color="iconColor" size="20"></u-icon> -->
						</view>
						<view v-else class="tabbar-back">
							<slot name="left"></slot>
						</view>
						<template v-if="isSlot">
							<slot></slot>
						</template>
						<template v-else>
							<!-- #ifndef MP -->
							<view class="tabbar-title" :style="{color: textColor, ...textStyle}">
								<!-- #endif -->
								<!-- #ifdef MP -->
								<view class="tabbar-title" :style="[{color: textColor}, textStyle]">
								<!-- #endif -->
								{{i18n ? $t(value) : value}}
							</view>
						</template>
						<!-- #ifndef MP -->
						<view v-if="isLang" class="tabbar-locale d-flex j-center a-center"
						:style="{right: '20rpx'}"
						 @click="selectLang">
						 <!-- #endif -->
						<!-- #ifdef MP -->
						<view v-if="isLang" class="tabbar-locale d-flex j-center a-center"
						:style="{right: `calc(20rpx + ${miniProgramCapsule.width}px + 100vw - ${miniProgramCapsule.right}px)`}"
						 @click="selectLang">
						 <!-- #endif -->
							<u-image height="50rpx" width="50rpx" src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/home/locale.svg"></u-image>
						</view>
						<slot v-else name="right"></slot>
					</view>
				</view>
			</view>
</template>

<script>
	import tools from '../../tools/index.js'
	import props from './props.js'
	export default {
		props,
		data() {
			return {};
		},
		methods: {
			selectLang() {
				this.$emit('selectLang')
			},
			onBack() {
				this.$emit('pageBack')
			},
			retreat() {
				// #ifdef H5
				let pages = getCurrentPages();
				if (pages.length > 1) {
					// 存在上级页面
					tools.Navigate.navigateBack()
				} else {
					// 不存在上级页面
					tools.Navigate.switchTab(this.$router.options.routes[0].alias)
				}
				// #endif
				// #ifndef H5
				tools.Navigate.navigateBack()
				// #endif
				this.$emit('pageBack')
			}
		},
		computed: {
			statusHeight() {
				return this.$store.state.statusHeight
			},
			navbarHeight() {
				return this.$store.state.navbarHeight
			},
			miniProgramCapsule() {
				return this.$store.state.miniProgramCapsule
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		width: 100vw;
		overflow: hidden;

		.tabbar {
			height: 100%;
			width: 100%;

			.tabbar-title {
				font-size: 28rpx;
				font-weight: 500;
			}

			.tabbar-locale {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				width: 50rpx;
				height: 50rpx;

				img {
					width: 50rpx;
				}
			}

			.tabbar-back {
				position: absolute;
				left: 20rpx;
				top: 50%;
				transform: translateY(-50%);

				img {
					width: 60rpx;
				}
			}
		}
	}
</style>