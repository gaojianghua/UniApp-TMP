<template>
	<view class="capsule d-flex a-center flex-column mt-5">
		<view class="list px-2">
			<scroll-view scroll-x class="scroll-row h-100 w-100 ">
				<view v-for="(item, i) in gridItems" :key="i" class="scroll-row-item mr-5">
					<view class="d-flex flex-column a-center j-center">
						<u-image width="75rpx" height="75rpx" :src="item.image | mediaUrlDeal"
							mode=""></u-image>
						<view class="line-h mt-1 text-center text-ellipsis1 auto-feed"
							style="font-size: 24rpx;color: #fff; width: 80rpx;">
							{{item.name}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="niudan position-relative" ref="eggBody">
			<view :ref="`box${i}`" class="position-absolute" v-for="(item, i) in danList"
				:style="calcStyle(i+1)" :class="[`egg_box${i+1}`, isStart ? `anni${i+1}` : '']"
				:key="i">
				<u-image width="100rpx" height="100rpx" :src="item" />
			</view>
		</view>
		<view :class="isBun ? 'press' : ''" class="niudanbtn" @click="startLuckyDraw"></view>
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
			isStart: {
				type: Boolean,
				default: () => {
					return false
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
				this.lock = true
				this.isNiu = true
				this.list.forEach((item, i) => {
					if (item.id == this.winningItem.id) {
						this.prize = i
					}
				})
				let time = setTimeout(() => {
					this.prizeName = this.gridItems[this.prize].name
					this.prizeSrc = this.gridItems[this.prize].image
					this.danShow = true
					this.lock = false
					this.isNiu = false
					this.styleCacheMap = {}
					clearTimeout(time)
				}, 4000)
			}
		},
		computed: {
			calcStyle() {
				return (index) => {
					// 作一次缓存处理
					if (Object.keys(this.styleCacheMap).length && this.styleCacheMap[index]) {
						return this.styleCacheMap[index]
					}
					let top = index < 4 ? ([1, 2].includes(index) ? '50%' : '40%') :
						(index < 8 ? ([5, 6].includes(index) ? '41%' : `${this.$tools.Common.getRandomArbitrary(62,46)}%`) :
							`${this.$tools.Common.getRandomArbitrary(60,36)}%`);
					this.styleCacheMap[index] = {
						width: '20%',
						transform: `rotate(${this.$tools.Common.getRandomArbitrary(8,10) * 15}deg)`,
						top
					}
					return this.styleCacheMap[index]
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.capsule {
		width: 636rpx;
		height: 712rpx;
		background: url('/static/img/common/niu.png') no-repeat;
		background-size: cover;
		padding-top: 80rpx;
	
		.list {
			margin-left: 18rpx;
			height: 110rpx;
			width: 485rpx;
	
	
			.scroll-row-item:last-child {
				margin-right: 0;
			}
		}
	
		.niudan {
			height: 242rpx;
			width: 406rpx;
			margin: 40rpx 0 0 18rpx;
	
			/* 前4个 */
			.egg_box1 {
				left: 3%;
			}
	
			.egg_box2 {
				left: 18%;
			}
	
			.egg_box3 {
				left: 78%;
			}
	
			.egg_box4 {
				left: 34%;
			}
	
			/* 后四个 */
			.egg_box5 {
				left: 11%;
			}
	
			.egg_box6 {
				left: 24%;
			}
	
			.egg_box7 {
				left: 72%;
			}
	
			.egg_box8 {
				left: 65%;
			}
	
			/* 后两个 */
			.egg_box9 {
				left: 50%;
			}
	
			.egg_box10 {
				left: 58%;
			}
			
			/* 蛋滚动 */
			.anni1 {
				animation: move1 0.75s 6 linear;
			
				@keyframes move1 {
					0% {
						transform: rotate(-30deg);
						left: 12.7%;
						top: 57.9%;
					}
			
					26% {
						transform: rotate(60deg);
						left: 41.2%;
						top: 8.9%;
					}
			
					44% {
						transform: rotate(110deg);
						left: 52.2%;
						top: 21.8%;
					}
			
					64% {
						transform: rotate(56deg);
						left: 72%;
						top: 38%;
					}
			
					100% {
						transform: rotate(-30deg);
						left: 12.7%;
						top: 57.9%;
					}
				}
			}
			
			.anni2 {
				animation: move2 0.75s 6 linear;
			
				@keyframes move2 {
					0% {
						transform: rotate(85deg);
						left: 31.2%;
						top: 57.9%;
					}
			
					23% {
						transform: rotate(210deg);
						left: 70%;
						top: 36%;
					}
			
					45% {
						transform: rotate(120deg);
						left: 45%;
						top: 8%;
					}
			
					72% {
						transform: rotate(30deg);
						left: 8%;
						top: 34%;
					}
			
					100% {
						transform: rotate(85deg);
						left: 31.2%;
						top: 57.9%;
					}
				}
			}
			
			.anni3 {
				animation: move3 0.75s 6 linear;
			
				@keyframes move3 {
					0% {
						transform: rotate(-10deg);
						left: 50%;
						top: 57.9%;
					}
			
					38% {
						transform: rotate(-30deg);
						left: 38%;
						top: 11.4%;
					}
			
					65% {
						transform: rotate(-50deg);
						left: 7%;
						top: 38.7%;
					}
			
					100% {
						transform: rotate(-10deg);
						left: 50%;
						top: 57.9%;
					}
				}
			}
			
			.anni4 {
				animation: move4 0.75s 6 linear;
			
				@keyframes move4 {
					0% {
						transform: rotate(20deg);
						left: 65%;
						top: 59.9%;
					}
			
					35% {
						transform: rotate(-30deg);
						left: 53.4%;
						top: 11.3%;
					}
			
					64% {
						transform: rotate(-53deg);
						left: 24.3%;
						top: 56%;
					}
			
					100% {
						transform: rotate(20deg);
						left: 65%;
						top: 59.9%;
					}
				}
			}
			
			.anni5 {
				animation: move5 0.75s 6 linear;
			
				@keyframes move5 {
					0% {
						transform: rotate(-65deg);
						left: 61.4%;
						top: 38%;
					}
			
					29% {
						transform: rotate(-180deg);
						left: 40%;
						top: 11.5%;
					}
			
					53% {
						transform: rotate(-222deg);
						left: 9%;
						top: 41.3%;
					}
			
					76% {
						transform: rotate(-160deg);
						left: 21.8%;
						top: 57.9%;
					}
			
					100% {
						transform: rotate(-65deg);
						left: 61.4%;
						top: 38%;
					}
				}
			}
			
			.anni6 {
				animation: move6 0.75s 6 linear;
			
				@keyframes move6 {
					0% {
						transform: rotate(16deg);
						left: 44.2%;
						top: 42%;
					}
			
					28% {
						transform: rotate(-60deg);
						left: 18%;
						top: 57%;
					}
			
					40% {
						transform: rotate(-45deg);
						left: 8%;
						top: 41.3%;
					}
			
					80% {
						transform: rotate(70deg);
						left: 52.7%;
						top: 9.9%;
					}
			
					100% {
						transform: rotate(16deg);
						left: 44.2%;
						top: 42%;
					}
				}
			}
			
			.anni7 {
				animation: move7 0.75s 6 linear;
			
				@keyframes move7 {
					0% {
						transform: rotate(-13deg);
						left: 27.5%;
						top: 39.9%;
					}
			
					17% {
						transform: rotate(50deg);
						left: 37.5%;
						top: 57.9%;
					}
			
					44% {
						transform: rotate(75deg);
						left: 75%;
						top: 41.3%;
					}
			
					67% {
						transform: rotate(42deg);
						left: 50.18%;
						top: 8%;
					}
			
					100% {
						transform: rotate(-13deg);
						left: 27.5%;
						top: 39.9%;
					}
				}
			}
			
			.anni8 {
				animation: move8 0.75s 6 linear;
			
				@keyframes move8 {
					0% {
						transform: rotate(46deg);
						left: 14.4%;
						top: 33.9%;
					}
			
					20% {
						transform: rotate(97deg);
						left: 45.6%;
						top: 7.8%;
					}
			
					45% {
						transform: rotate(143deg);
						left: 76.8%;
						top: 41.6%;
					}
			
					65% {
						transform: rotate(85deg);
						left: 64.6%;
						top: 57%;
					}
			
					100% {
						transform: rotate(46deg);
						left: 14.4%;
						top: 33.9%;
					}
				}
			}
			
			.anni9 {
				animation: move9 0.75s 6 linear;
			
				@keyframes move9 {
					0% {
						transform: rotate(65deg);
						left: 36.4%;
						top: 20%;
					}
			
					41% {
						transform: rotate(130deg);
						left: 74.3%;
						top: 42.9%;
					}
			
					76% {
						transform: rotate(94deg);
						left: 46.5%;
						top: 57.9%;
					}
			
					100% {
						transform: rotate(65deg);
						left: 36.4%;
						top: 20%;
					}
				}
			}
			
			.anni10 {
				animation: move10 0.75s 6 linear;
			
				@keyframes move10 {
					0% {
						transform: rotate(-92deg);
						left: 53.6%;
						top: 22.11%;
					}
			
					20% {
						transform: rotate(-142deg);
						left: 37%;
						top: 58.5%;
					}
			
					47% {
						transform: rotate(-198deg);
						left: 6.7%;
						top: 37.3%;
					}
			
					67% {
						transform: rotate(-135deg);
						left: 23%;
						top: 10.7%;
					}
			
					100% {
						transform: rotate(-92deg);
						left: 53.6%;
						top: 22.11%;
					}
				}
			}
		}
	
		.niudanbtn {
			width: 310rpx;
			height: 93.5rpx;
			margin: 30rpx 0 0 18rpx;
			background: url('/static/img/common/ballbutton.png') no-repeat;
			background-size: cover;
			transition: transform 0.2s ease-out;
		}
	
		.press {
			transform: translateY(10rpx);
		}
	}
	
</style>