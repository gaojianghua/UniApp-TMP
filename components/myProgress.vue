<template>
	<view class="progress-container">
		<view class="progress-container2" id="progress" @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove">
			<view class="progress-box">
				<progress :percent="percent" activeColor="#000" backgroundColor="#1c1c1c" stroke-width="3"/>
			</view>
			<view class="ball-box" :class="{bigger: isTouch, shadow: isTouch}" :style="{left: `${percent}%`}"></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			total: {
				type: Number,
				default: 1
			},
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			return { 
				left: 0,  //进度条最左侧位置
				right: 0,  //进度条最右侧位置
				isTouch: false,  
				// touchTimer: null,  //用于触摸节流
				percent: 0,
			}
		},
		watch:{
			index() {
				this.percent = this.index / this.total * 100
			}
		},
		mounted() {
			this.percent = this.index / this.total * 100
			this.getLocation()
		},
		methods: {
			
			getLocation() {
				const query = uni.createSelectorQuery().in(this);
				query.select('#progress').boundingClientRect(data => {
					this.left = data.left
					this.right = data.right
				}).exec();
			},
			
			touchstart() {
				this.isTouch = true
				this.$emit('progressStart')
			},
			
			touchend(e) {
				this.isTouch = false
				let index = this.calcIndex(e.changedTouches[0].clientX)
				this.$emit('progressEnd', index)
				this.percent = index / this.total * 100
			},
			
			touchmove(e) {
				// if (!this.touchTimer) {
					let index = this.calcIndex(e.touches[0].clientX) 
					this.$emit('indexChange', index)
					this.percent = index / this.total * 100
					// this.touchTimer = setTimeout(() => {
					// 	this.touchTimer = null;
					// }, 100)
				// }
			},
			
			/**
			* 输入位置计算index
			**/
			calcIndex(px) {
				let single = (this.right - this.left) / this.total
				let index = Math.round((px - this.left) / single)
				index = index < 0 ? 0 : index
				index = index > this.total ? this.total : index
				return index
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.progress-container{
		padding: 0 10px;
		width: 100%;
		height: 100%;
		.progress-container2{
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			.progress-box{
				width: 100%;
			}
			.ball-box{
				position: absolute;
				width: 10px;
				height: 10px;
				border-radius: 50%;
				background-color: #000;
				transform: translateX(-50%);
			}
			.shadow{
				box-shadow: 0px 0px 1px 5px rgba(#888,.4);
			}
			.bigger{
				width: 20px;
				height: 20px;
			}
		}
		
	}
</style>
