<template>
	<view>
		<movable-area class="movable-area position-fixed bottom-0 left-0 right-0 w-100" :scale-area="false" :style="scrollStyle">
			<movable-view class="movable-view position-relative d-flex a-center j-center rounded-circle" :class="!isRemove?'animation-info':''" style="pointer-events: auto;"
				@click="clickBtn" @touchstart="touchstart" @touchend="touchend" @change="onChange" direction="all"
				inertia="true" :x="$store.state.ball.x" :y="$store.state.ball.y" :disabled="disabled" :out-of-bounds="true" :damping="200" :friction="100">
				<slot></slot>
				<view class="position-absolute bg-dark rounded-1 text-white left-half tf-half-x py px-2" style="bottom: -70rpx;">
					{{$store.state.ball.x}}:{{$store.state.ball.y}}
				</view>
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
				// #ifndef MP
				uni.createSelectorQuery().in(this).select(".movable-view").boundingClientRect(rect => {
					this.btnWidth = rect.width
					this.btnHeight = rect.height
					if (this.$store.state.ball.x == 0) {
					this.$nextTick(res => {
						let newX = this.$store.state.appSystemInfo.windowWidth - this.btnWidth - this.rightPx
						let newY = this.$store.state.appSystemInfo.windowHeight - this.btnHeight - (this.bottomPx * 2) - 
						this.$store.state.browserFitHeight - this.$store.state.tabbarHeight - this.$store.state.statusHeight -
						this.$store.state.navbarHeight - 100
						uni.setStorageSync('ball', {x: newX, y: newY})
						this.$store.commit('updateBall', {x: newX, y: newY})
					})
					}
				}).exec() 
				// #endif
				// #ifdef MP
				uni.createSelectorQuery().select(".movable-view").boundingClientRect(rect => {
					this.btnWidth = rect.width
					this.btnHeight = rect.height
					if (this.$store.state.ball.x == 0) {
					this.$nextTick(res => {
						let newX = this.$store.state.appSystemInfo.windowWidth - this.btnWidth - this.rightPx
						let newY = this.$store.state.appSystemInfo.windowHeight - this.btnHeight - (this.bottomPx * 2) -
						this.$store.state.browserFitHeight - this.$store.state.tabbarHeight - this.$store.state.statusHeight -
						this.$store.state.navbarHeight - 100
						uni.setStorageSync('ball', {x: newX, y: newY})
						this.$store.commit('updateBall', {x: newX, y: newY})
					})
					}
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
					uni.setStorageSync('ball', {x: this.old.x, y: this.old.y})
					this.$store.commit('updateBall', {x: this.old.x, y: this.old.y})
					let bWidth = (this.$store.state.appSystemInfo.windowWidth - this.btnWidth) / 2
					if (this.$store.state.ball.x < 0 || (this.$store.state.ball.x > 0 && this.$store.state.ball.x <= bWidth)) {
						this.$nextTick(res => {
							uni.setStorageSync('ball', {x: this.rightPx, y: this.$store.state.ball.y})
							this.$store.commit('updateBall', {x: this.rightPx, y: this.$store.state.ball.y})
						})
					} else {
						this.$nextTick(res => {
							let newX = this.$store.state.appSystemInfo.windowWidth - this.btnWidth - this.rightPx
							uni.setStorageSync('ball', {x: newX, y: this.$store.state.ball.y})
							this.$store.commit('updateBall', {x: newX, y: this.$store.state.ball.y})
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
					top: `calc(${this.$store.state.statusHeight}px + ${this.$store.state.navbarHeight}px + ${this.rightPx}px)`
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

