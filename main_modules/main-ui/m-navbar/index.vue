<!-- 顶部组件 -->
<template>
	<view class="position-sticky index-5">
		<view :style="{height: `${$store.state.statusHeight}px`}"></view>
		<view class="top top-0 index-1">
			<view :style="{backgroundColor: bgColor}" class="tabbar d-flex j-center a-center position-relative">
				<view v-if="!isTab" class="tabbar-back d-flex j-center a-center p-1" @click="retreat">
					<u-image height="60rpx" width="60rpx" src="/static/img/common/back.svg"></u-image>
					<!-- <u-icon name="arrow-left" :color="iconColor" size="20"></u-icon> -->
				</view>
				<view class="tabbar-title">
					{{i18n ? $t(value) : value}}
				</view>
				<view v-if="isLang" class="tabbar-locale d-flex j-center a-center p-1" @click="selectLang">
					<u-image height="60rpx" width="60rpx" src="/static/img/home/lang1.png"></u-image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		navigateBack
	} from '../../tools/index.js'
	export default {
		name: "navbar",
		props: {
			value: {
				type: String,
				default: ''
			},
			isLang: {
				type: Boolean,
				default: false
			},
			isTab: {
				type: Boolean,
				default: false
			},
			bgColor: {
				type: String,
				default: '#151521'
			},
			iconColor: {
				type: String,
				default: '#fff'
			},
			i18n: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		},
		methods: {
			selectLang() {
				this.$emit('selectLang')
			},
			retreat() {
				navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.top {
		height: 44px;
		width: 100vw;
		border-radius: 8rpx;
		overflow: hidden;

		.tabbar {
			height: 100%;
			width: 100%;

			.tabbar-title {
				color: #fff;
				font-size: 28rpx;
				font-weight: 500;
			}

			.tabbar-locale {
				position: absolute;
				right: 30rpx;
				top: 50%;
				transform: translateY(-50%);
				width: 60rpx;
				height: 60rpx;

				img {
					width: 60rpx;
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
