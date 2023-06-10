<template>
	<view class="hover d-flex flex-column a-center" @touchstart="touchstart" @touchend="touchend"
		:class="isAni == 2 ? 'stop' : (isAni == 1 ? 'start' : 'init')">
		<view class="hover-item d-flex j-center a-center mt-2" v-for="(item, i) in menuList" :key="i" @click="menuClick(i)">
			<u-image height="50rpx" width="50rpx" mode="aspectFit" :src="item.badge && item.badge > 0 ? item.activeSrc : item.src"></u-image>
			<view v-if="item.badge && item.badge > 0" class="item-badge text-white d-flex a-center j-center">
				{{item.badge}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "m-hover-menu",
		props: {
			// 菜单列表
			menuList: {
				type: Array,
				default: () => {
					return []
				},
				required: true
			},
			// 触摸后菜单停留时间
			stayTime: {
				type: [Number, String],
				default: 1000,
			}
		},
		data() {
			return {
				isAni: 0
			};
		},
		methods: {
			menuClick(i) {
				this.$emit('menuClick', i)
			},
			touchstart() {
				this.isAni = 1
			},
			touchend() {
				let time = setTimeout(() => {
					this.isAni = 2
					clearTimeout(time)
				}, this.stayTime)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hover {
		position: fixed;
		right: -50rpx;
		bottom: 180rpx;
		z-index: 1000;

		.hover-item {
			border-radius: 50%;
			width: 80rpx;
			height: 80rpx;
			background-color: #fff;
			position: relative;
			box-shadow: 4rpx 6rpx 8rpx #ababab;
			.item-badge{
				padding: 2rpx 8rpx;
				background-color: #F56C6C;
				position: absolute;
				top: -10rpx;
				right: -10rpx;
				height: 30rpx;
				min-width: 30rpx;
				border-radius: 30rpx;
				font-size: 20rpx;
			}
			&:first-child {
				margin-top: 0;
			}
		}
	}

	.init {
		animation: none;
	}

	.start {
		animation: start 0.3s linear forwards;

		@keyframes start {
			0% {
				right: -50rpx
			}

			100% {
				right: 20rpx;
			}
		}
	}

	.stop {
		animation: stop 0.3s linear forwards;

		@keyframes stop {
			0% {
				right: 20rpx
			}

			100% {
				right: -50rpx;
			}
		}
	}
</style>