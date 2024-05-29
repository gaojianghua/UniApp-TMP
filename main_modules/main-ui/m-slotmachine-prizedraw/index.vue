<!-- 老虎机抽奖组件 -->
<template>
	<view class="draw-item mt-auto position-relative">
		<view class="draw-row d-flex a-center position-absolute">
			<view v-for="(column, index) in columns" :key="index" class="column hidden">
				<view v-for="(num, numIndex) in column.numbers" :key="numIndex" class="number d-flex a-center j-center"
					:class="{ rolling: column.rolling }">
					{{ num }}
				</view>
			</view>
		</view>
		<view class="draw-after d-flex a-end j-center">
			<view class="draw-btn" :class="isBun ? 'press' : ''" @click="openDraw"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				columns: Array.from({
					length: 5
				}, () => ({
					rolling: false,
					numbers: Array.from({
						length: 10
					}, (_, i) => i)
				})),
				rollingTimeouts: [],
				isBun: false
			}
		},
		methods: {
			// 清除定时器
			clearTimeouts() {
				this.rollingTimeouts.forEach(timeout => clearTimeout(timeout));
				this.rollingTimeouts = [];
			},
			// 启动抽奖
			openDraw() {
				this.$emit('openDraw')
			},
			// 开始抽奖
			startDraw() {
				this.isBun = true
				const time = setTimeout(() => {
					this.isBun = false
					clearTimeout(time)
				}, 300);
				this.clearTimeouts();
				this.columns.forEach((column, index) => {
					setTimeout(() => {
						column.rolling = true;
					}, index * 500); // 延迟
				});
			},
			// 结束抽奖
			stopDraw(data) {
				let nums = (data + '').split('')
				let result = 5 - nums.length
				for (let i = 0; i < result; i++) {
					nums.unshift(0);
				}
				let time = setTimeout(() => {
					this.columns.forEach((column, index) => {
						switch (index) {
							case 0:
								column.numbers[0] = parseInt(nums[0])
								break;
							case 1:
								column.numbers[0] = parseInt(nums[1])
								break;
							case 2:
								column.numbers[0] = parseInt(nums[2])
								break;
							case 3:
								column.numbers[0] = parseInt(nums[3])
								break;
							case 4:
								column.numbers[0] = parseInt(nums[4])
								break;
						}
						const timeout = setTimeout(() => {
							column.rolling = false;
						}, index * 500); // 延迟
						this.rollingTimeouts.push(timeout);
					});
					const time1 = setTimeout(() => {
						this.$emit('stopCallback')
						clearTimeout(time1)
					}, 2500); // 延迟
				}, 4000)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.draw-item {
		width: 654rpx;
		height: 606rpx;
		background: url('https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/draw-c.png') no-repeat;
		background-size: 100% 100%;

		.draw-row {
			top: 272rpx;
			left: 70rpx;
		}

		.draw-after {
			width: 294rpx;
			height: 280rpx;
			margin-top: 196rpx;
			margin-left: 189rpx;
			overflow: hidden;
			border-radius: 50%;
		}
	}

	.draw-btn {
		width: 150rpx;
		height: 70rpx;
		background: url('https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/draw-b.png') no-repeat;
		background-size: 100% 100%;
		transition: transform 0.2s ease-out;
	}

	.press {
		transform: translateY(10rpx);
	}

	.column {
		margin: 0 32rpx;
		height: 93rpx;
		width: 40rpx;
	}

	.number {
		color: #B10F03;
		height: 100rpx;
		font-size: 76rpx;
		font-weight: 700;
		transition: transform 0.5s ease-in-out;
	}

	.number.rolling {
		animation: roll 1s infinite linear;
	}

	@keyframes roll {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(-1000%);
		}
	}
</style>