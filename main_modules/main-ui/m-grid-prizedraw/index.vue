<template>
	<view class="grid position-relative" :style="{width: gridWidth, height: gridHeight}">
		<u-image :height="gridHeight" :width="gridWidth" src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/choujiang.png" mode="widthFit"></u-image>
		<view class="position-absolute top-0 right-0 bottom-0 left-0 d-flex a-center j-center">
			<view class="grid-list d-flex flex-wrap" :style="{width: gridListWidth, height: gridListHeight}">
				<view v-for="(item, i) in list" :key="i" class="grid-item m-1 hidden"
					:style="{height: `calc(${gridListHeight} / 3.40)`}">
					<view v-if="i == 4" class="w-100 h-100 d-flex a-center j-center" @click="startLuckyDraw">
						<view class="grid-btn"></view>
					</view>
					<view v-else class="position-relative w-100 h-100">
						<view class="position-absolute h-100 w-100 top-0 right-0 left-0 border-0">
							<view v-if="!isSlot" class="d-flex h-100 flex-column a-center j-center">
								<u-image width="100rpx" height="100rpx" :src="item.image" mode=""></u-image>
								<view class="item-name line-h mt-2">
									{{item.name}}
								</view>
							</view>
							<slot v-else />
						</view>
						<!-- #ifndef MP -->
						<view v-if="current == i" class="w-100 h-100" :style="{backgroundColor: activeBgColor}"></view>
						<!-- #endif -->
						<!-- #ifdef MP -->
						<view v-if="current == i" class="w-100 h-100" :style="[{backgroundColor: activeBgColor}]"></view>
						<!-- #endif -->
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		name: "m-grid-prizedraw",
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			winningItem: {
				type: Object,
				default: () => {
					return {}
				}
			},
			activeBgColor: {
				type: String,
				default: () => {
					return '#ffdd00'
				}
			},
			isSlot: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			gridWidth: {
				type: String,
				default: () => {
					return '635rpx'
				}
			},
			gridHeight: {
				type: String,
				default: () => {
					return '635rpx'
				}
			},
			gridListWidth: {
				type: String,
				default: () => {
					return '600rpx'
				}
			},
			gridListHeight: {
				type: String,
				default: () => {
					return '600rpx'
				}
			},
			rounds: {
				type: Number,
				default: () => {
					return 5
				}
			},
			rotationSpeed: {
				type: Number,
				default: () => {
					return 50
				}
			}
		},
		data() {
			return {
				current: 10,
				prize: 0,
				index: -1,
				lock: false
			};
		},
		methods: {
			// 开始抽奖
			startLuckyDraw() {
				if (this.lock) return
				if (this.$store.state.userinfo.points < this.$store.state.sysConfig.points) {
					return this.$refs.uToast.show({
						message: this.$t('积分不足'),
						type: 'warning',
						duration: 1500
					})
				}
				this.lock = true
				this.list.forEach((item, i) => {
					if (item.id == this.winningItem.id) {
						this.prize = i
					}
				})
				let counter = 0
				let time = setInterval(() => {
					this.index++
					if (this.index < 3 || this.index == 6) {
						this.current = this.index
					} else
					if (this.index == 3) {
						this.current = 5
					} else
					if (this.index == 4) {
						this.current = 8
					} else
					if (this.index == 5) {
						this.current = 7
					} else
					if (this.index == 7) {
						this.current = 3
					} else
					if (this.index == 8) {
						counter++
						this.current = 0
						this.index = 0
					}
					if (counter == this.rounds && this.current == this.prize) {
						clearInterval(time)
						this.$emit('endLuckyDraw')
						this.lock = false
					}
				}, this.rotationSpeed)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.grid {

		.grid-list {

			.grid-item {
				flex: 0 0 calc(33.33% - 20rpx);
				border-radius: 16rpx;

				.item-name {
					font-size: 24rpx;
					color: #333;
				}

				.grid-btn {
					width: 160rpx;
					height: 160rpx;
				}

				.grid-btn:active {
					animation: actives 200ms linear;

					@keyframes actives {
						0% {
							width: 60rpx;
							height: 60rpx;
							border-radius: 100rpx;
							background-color: #F179E799;
						}

						100% {
							width: 180rpx;
							height: 180rpx;
							border-radius: 100rpx;
							background-color: #F179E799;
						}
					}
				}
			}
		}
	}
</style>