<template>
	<u-overlay :show="show" mode="center" @click="close">
		<view @click.stop class="feedback d-flex a-center flex-column position-relative">
			<view class="feedback-row pb-5 d-flex a-center flex-column w-100 position-relative">
				<view class="task position-absolute d-flex a-center j-center">
					<u-image width="180rpx" height="180rpx" :src="winningImg"></u-image>
				</view>
				<view class="title line-h">
					{{$t('恭喜您获得')}}
				</view>
				<view class="d-flex a-center j-center flex-column mt-5">
					<u-image width="160rpx" height="160rpx" :src="prize.src"></u-image>
					<view class="mt-3 text-center">
						{{prize.name}}
					</view>
				</view>
				<view class="feedback-btn mt-5 d-flex text-center a-center j-center" @click="close">
					{{$t('好的')}}
				</view>
			</view>
		</view>
	</u-overlay>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			winningImg: {
				type: String,
				default: () => {
					return ''
				}
			},
			prize: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {}
		},
		methods: {
			// 关闭弹框
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.feedback {
		background-color: #48484A;
		width: 520rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50rpx;
		padding: 25rpx;
	
		.feedback-row {
			background: linear-gradient(to bottom, #F3EADC, #F7EBD4, #F1ECE7);
			border-radius: 50rpx;
			padding-top: 110rpx;
	
			.title {
				font-weight: 600;
				font-size: 38rpx;
				color: #EF6822;
			}
	
			.task {
				top: 0;
				left: 50%;
				transform: translate(-50%, -50%);
				z-index: 20;
				width: 180rpx;
				height: 180rpx;
				border-radius: 50%;
			}
	
			.feedback-text {}
	
			.feedback-btn {
				width: 300rpx;
				color: #E0CF65;
				height: 60rpx;
				font-size: 34rpx;
				font-weight: 600;
				border-radius: 50rpx;
				background-color: #000;
			}
		}
	}
</style>
