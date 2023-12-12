<template>
	<u-overlay :show="show" @click="cancel" :zIndex="zIndex">
		<view class="warp d-flex a-center j-center">
			<view class="rect" @tap.stop>
				<view class="rect-title d-flex a-center j-center main-bg-color">
					{{i18n ? $t(title) : title}}
					<view class="rect-close" @click="cancel('S')">
						<u-icon name="close" :color="iconColor" :size="iconSize"></u-icon>
					</view>
				</view>
				<view class="rect-input">
					<slot />
				</view>
				<view v-if="isCancel" class="rect-btn d-flex j-sb a-center">
					<view class="rect-btn-item text-center main-bg-color main-bg-color-active" @click="cancel">
						{{i18n ? $t(cancelName) : cancelName}}
					</view>
					<view class="px-4"></view>
					<view class="rect-btn-item text-center main-bg-color main-bg-color-active" @click="confirm">
						{{i18n ? $t(confirmName) : confirmName}}
					</view>
				</view>
				<view v-else class="rect-btn d-flex j-center a-center">
					<view class="rect-btn-btn text-center main-bg-color main-bg-color-active" @click="confirm">
						{{i18n ? $t(confirmName) : confirmName}}
					</view>
				</view>
			</view>
		</view>
	</u-overlay>
</template>

<script>
	export default {
		name: "m-modal",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '提示'
			},
			isCancel: {
				type: Boolean,
				default: true
			},
			confirmName: {
				type: String,
				default: '确认'
			},
			cancelName: {
				type: String,
				default: '取消'
			},
			iconColor: {
				type: String,
				default: '#fff'
			},
			iconSize: {
				type: String,
				default: '16'
			},
			zIndex: {
				type: String,
				default: '10070'
			},
			i18n: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {};
		},
		methods: {
			cancel(i) {
				i ? this.$emit('cancel', i) : this.$emit('cancel')
			},
			confirm() {
				this.$emit('confirm')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		height: 100%;

		.rect {
			max-width: 600rpx;
			min-width: 560rpx;
			padding-bottom: 40rpx;
			overflow: hidden;
			background-color: #fff;
			border-radius: 25rpx;

			.rect-title {
				height: 90rpx;
				width: 100%;
				position: relative;
				color: #fff;
				font-size: 28rpx;
				font-weight: 400;

				.rect-close {
					position: absolute;
					right: 32rpx;
					top: 50%;
					transform: translateY(-50%);
				}
			}

			.rect-input {
				padding: 30rpx 30rpx;
			}

			.rect-btn {
				padding: 0 40rpx;

				.rect-btn-item {
					border-radius: 50rpx;
					width: 200rpx;
					height: 56rpx;
					line-height: 56rpx;
					font-size: 26rpx;
					color: #fff;
					font-weight: 400;
				}

				.rect-btn-btn {
					border-radius: 50rpx;
					height: 60rpx;
					padding: 0 50rpx;
					line-height: 60rpx;
					font-size: 26rpx;
					color: #fff;
					font-weight: 400;
				}
			}
		}
	}
</style>
