<!-- 消息提示 -->
<template>
	<view :class="['toast', type]">
		<view class="inner">
			<view class="content d-flex a-center j-center">{{ content }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'm-toast',
		props: {
			content: {
				type: String,
				default: ""
			},
			duration: {
				type: Number,
				default: 1500
			},
			complete: {
				type: Function,
				default: null
			},
			type: {
				type: String,
				default: 'primary',
				validator(value) {
					return [
						'primary',
						'success',
						'warning',
						'danger'
					].includes(value);
				}
			}
		},
		mounted() {
			let time = setTimeout(() => {
				this.$mToast.hide(this.complete())
				clearTimeout(time)
			}, this.duration)
		}
	}
</script>

<style lang="scss" scoped>
	.toast {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;

		.inner {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 8rpx;

			.content {
				padding: 0 20rpx;
				border-radius: 12rpx;
			}
		}

		&.primary {
			.content {
				background-color: rgba(148, 202, 231, .2);
				border: 1rpx solid var(--primary);
				color: var(--primary);
			}
		}

		&.success {
			.content {
				background-color: rgba(148, 231, 173, .2);
				border: 1rpx solid var(--success);
				color: var(--success);
			}
		}

		&.warning {
			.content {
				background-color: rgba(245, 175, 122, .2);
				border: 1rpx solid var(--warning);
				color: var(--warning);
			}
		}

		&.danger {
			.content {
				background-color: rgba(240, 145, 145, .2);
				border: 1rpx solid var(--danger);
				color: var(--danger);
			}
		}
	}
</style>