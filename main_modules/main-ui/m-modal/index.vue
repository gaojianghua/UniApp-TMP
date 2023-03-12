<template>
	<u-overlay :show="show" @click="cancel">
		<view class="warp d-flex a-center j-center">
			<view class="rect" @tap.stop>
				<view class="rect-title d-flex a-center j-center">
					{{$t(title)}}
					<view class="rect-close" @click="cancel">
						<u-image src="@/static/img/wallet/close.png" width="25rpx" height="25rpx"></u-image>
					</view>
				</view>
				<view class="rect-input">
					<slot />
				</view>
				<view v-if="isCancel" class="rect-btn d-flex j-sb a-center">
					<view class="rect-btn-item text-center" @click="cancel">
						{{$t('取消')}}
					</view>
					<view class="px-4"></view>
					<view class="rect-btn-item text-center" @click="confirm">
						{{$t('确认')}}
					</view>
				</view>
				<view v-else class="rect-btn d-flex j-center a-center">
					<view class="rect-btn-btn text-center" @click="confirm">
						{{$t(btnName)}}
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
			btnName: {
				type: String,
				default: '确定'
			}
		},
		data() {
			return {};
		},
		methods: {
			cancel() {
				this.$emit('cancel')
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
				background-color: #00AA8F;
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
					background-color: #00AA8F;
					border-radius: 50rpx;
					width: 200rpx;
					height: 56rpx;
					line-height: 56rpx;
					font-size: 26rpx;
					color: #fff;
					font-weight: 400;
				}

				.rect-btn-btn {
					background-color: #00AA8F;
					border-radius: 50rpx;
					height: 60rpx;
					padding: 0 35rpx;
					line-height: 60rpx;
					font-size: 26rpx;
					color: #fff;
					font-weight: 400;
				}

				.rect-btn-item:active {
					background-color: #00AA8F99;
				}
			}
		}
	}
</style>
