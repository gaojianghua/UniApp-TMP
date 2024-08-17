<template>
	<view>
		<movable-area class="movable-area position-fixed bottom-0 left-0 right-0 w-100" :scale-area="false" :style="scrollStyle">
			<movable-view class="movable-view d-flex a-center j-center rounded-circle" :class="!isRemove?'animation-info':''" style="pointer-events: auto;"
				@click="clickBtn" @touchstart="touchstart" @touchend="touchend" @change="onChange" direction="all"
				inertia="true" :x="x" :y="y" :disabled="disabled" :out-of-bounds="true" :damping="200" :friction="100">
				<slot></slot>
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
	export default {
		props: {
			//是否禁用拖动
			disabled: {
				type: Boolean,
				default: false
			},
			//是否自动停靠
			canDocking: {
				type: Boolean,
				default: true
			},
			//按钮默认位置离底部距离（px）
			bottomPx: {
				type: Number,
				default: 10
			},
			//按钮默认位置离右边距离（px）
			rightPx: {
				type: Number,
				default: 10
			},
		},
		data() {
			return {
				left: 0,
				top: 0,
				isRemove: true,
				btnWidth: 0,
				btnHeight: 0,
				x: 10000,
				y: 10000,
				old: {
					x: 0,
					y: 0
				}
			};
		},
		mounted() {
			this.getSysInfo()
		},
		methods: {
			getSysInfo() {
				// #ifndef H5
				uni.createSelectorQuery().in(this).select(".movable-view").boundingClientRect(rect => {
					this.btnWidth = rect.width
					this.btnHeight = rect.height
					this.x = this.old.x
					this.y = this.old.y
					this.$nextTick(res => {
						this.x = this.$store.state.appSystemInfo.windowWidth - this.btnWidth - this.rightPx
						this.y = this.$store.state.appSystemInfo.windowHeight - this.btnHeight - this.bottomPx
					})
				}).exec()
				// #endif
			},
			//移动按钮
			onChange(e) {
				this.old.x = e.detail.x
				this.old.y = e.detail.y
			},
			//开始移动
			touchstart(e) {
				this.isRemove = true
			},
			//结束移动
			touchend(e) {
				if (this.canDocking && this.old.x) {
					this.x = this.old.x
					this.y = this.old.y
					let bWidth = (this.$store.state.appSystemInfo.windowWidth - this.btnWidth) / 2
					if (this.x < 0 || (this.x > 0 && this.x <= bWidth)) {
						this.$nextTick(res => {
							this.x = this.rightPx
						})
					} else {
						this.$nextTick(res => {
							this.x = this.$store.state.appSystemInfo.windowWidth - this.btnWidth - this.rightPx
						})
					}
					this.isRemove = false
				}
			},
			//点击按钮
			clickBtn() {
				this.$emit('clickBtn')
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.browserFitHeight}px - ${this.rightPx * 2}px - ${this.$store.state.navbarHeight}px - ${this.$store.state.tabbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`,
					top: `calc(${this.$store.state.statusHeight}px + ${this.$store.state.navbarHeight}px)`
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.movable-view {
		width: 88rpx;
		height: 88rpx;
		touch-action: none;
		background-color: #00000060;
		border: 10rpx solid #00000030;
	}

	.animation-info {
		transition: left .25s ease;
	}

	.movable-area {
		z-index: 999999 !important;
		pointer-events: none;
	}
</style>

