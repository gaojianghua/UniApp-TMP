<template>
	<u-popup round="25" :show="show" @close="close">
		<view class="popup">
			<view class="d-flex a-center pt-1 j-center position-relative" :style="{
				height: titleHeight,
				background: bgColor
			}">
				<view :style="{color: textColor, fontSize: textSize, ...textStyle}">
					{{i18n ? $t(title) : title}}
				</view>
				<view class="position-absolute" :style="{right: closeL, top: closeT}" @click="close">
					<u-icon v-if="isClose" name="close" color="#fff" size="18"></u-icon>
					<slot name="close" />
				</view>
			</view>
			<slot />
		</view>
	</u-popup>
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
			bgColor: {
				type: String,
				default: () => {
					return '#f27299'
				}
			},
			title: {
				type: String,
				default: () => {
					return ''
				}
			},
			closeL: {
				type: String,
				default: () => {
					return '25rpx'
				}
			},
			closeT: {
				type: String,
				default: () => {
					return '33rpx'
				}
			},
			titleHeight: {
				type: String,
				default: () => {
					return '90rpx'
				}
			},
			textSize: {
				type: String,
				default: () => {
					return '30rpx'
				}
			},
			textColor: {
				type: String,
				default: () => {
					return '#fff'
				}
			},
			textStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			i18n: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			isClose: {
				type: Boolean,
				default: () => {
					return true
				}
			},
		},
		data() {
			return {

			}
		},
		methods: {
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .u-popup__content{
		overflow: hidden;
	}
	.popup{
		
	}
</style>
