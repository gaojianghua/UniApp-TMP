<template>
	<u-transition :show="show" :mode="isColumn ? 'isColumn' : 'slide-down'">
		<view :style="{height: isColumn ? '100%' : `${dropDown}px`, 
		width: isColumn ? `${dropDown}px` : '100%', 
		top: isColumn ? `0` : `-${dropDown}px`,
		left: isColumn ? `-${dropDown}px` : '0',
		}"
			:class="isColumn ? 'flex-column' : ''"
			class="refresher d-flex a-center j-center">
			<view v-if="image" class="logo mb-1 d-flex j-center a-center" :style="imageStyle">
				<image lazy-load :src="image" mode=""></image>
			</view>
			<view class="d-flex a-center j-center" :class="isColumn ? 'flex-column' : ''">
				<u-loading-icon v-if="isLoad" size="20" :inactiveColor="mainColor + '22'" mode="circle" :color="mainColor">
				</u-loading-icon>
				<slot v-else name="loadIcon" />
				<view :style="{color: mainColor}" class="refresher-text" :class="[isColumn ? 'text-column' : 'ml-2', isLoad ? 'mt-1' : '']">
					{{i18n ? $t(text) : text}}
				</view>
			</view>
		</view>
	</u-transition>
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
			mainColor: {
				type: String,
				default: () => {
					return '#151521'
				}
			},
			dropDown: {
				type: [String, Number],
				default: () => {
					return 45
				}
			},
			text: {
				type: String,
				default: () => {
					return ''
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
			isLoad: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			isColumn: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			i18n: {
				type: Boolean,
				default: () => {
					return false
				}
			},
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.refresher {
		position: absolute;
		transform: all 0.3s linear;

		.refresher-text {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
		}
		.logo{
			width: 60rpx;
			height: 60rpx;
		}
	}
</style>
