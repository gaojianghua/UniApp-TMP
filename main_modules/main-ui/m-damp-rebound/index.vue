<template>
	<view class="views d-flex"
		:style="{ transform: 'translate3d(' + translateX + 'px, 0, 0)', transition: transition }"
		@touchstart="isCustomRefresh ? onTouchStart : ()=>{}" 
		@touchmove="isCustomRefresh ? onTouchMove : ()=>{}" 
		@touchend="isCustomRefresh ? onTouchEnd : ()=>{}">
		<m-refresh isColumn :mainColor="mainColor" :isLoad="triggered" :show="none" :dropDown="dropDown" i18n :text="text" />
		<slot />
	</view>
</template>

<script>
	import MRefresh from '../m-refresh/index.vue'
	import props from './props.js'
	export default {
		components: {
			MRefresh
		},
		props,
		data() {
			return {
				startX: 0,
				currentX: 0,
				translateX: 0,
				isDragging: false,
				transition: 'none',
				triggered: false,
				threshold: 40,
				dropDown: 50,
				none: false,
				text: ''
			};
		},
		created() {
			this.init()
		},
		methods: {
			//初始化
			init() {
				this.text = this.refresherDefaultText
			},
			//右拉刷新开始
			onTouchStart(e) {
				this.none = true
				this.startX = e.touches[0].clientX;
				this.isDragging = true;
				this.transition = 'none';
			},
			//右拉中
			onTouchMove(e) {
				if (this.isDragging) {
					this.currentX = e.touches[0].clientX;
					this.translateX = this.currentX - this.startX;
					if (this.translateX > 0) {
						this.translateX = Math.sqrt(this.translateX) * 2; // 添加阻尼效果
						this.dropDown = this.translateX.toFixed(2) + 'rpx'
						if (this.translateX > this.threshold) {
							this.text = this.refresherRefreshText
							
						}
					}
					if (this.translateX < 0) {
						this.translateX = Math.sqrt(-this.translateX) * -2; // 添加阻尼效果
					}
				}
			},
			//右拉结束
			onTouchEnd(e) {
				if (this.isDragging) {
					this.isDragging = false;
					this.transition = 'transform 0.3s ease';
					// 根据右拉的距离来判断是否触发操作
					if (this.translateX > this.threshold) {
						this.dropDown = this.translateX.toFixed(2)
						this.onRefresh()
						this.translateX = this.threshold;
					}else {
						this.translateX = 0
					}
				}
			},
			//刷新中
			onRefresh() {
				this.text = this.refresherLoadingText
				this.dropDown = this.threshold
				this.triggered = true
				this.$emit('onRefresh')
				let time = setTimeout(() => {
					this.width = '0rpx'
					this.none = false
					this.triggered = false
					this.init()
					this.translateX = 0
					console.log(123)
					clearTimeout(time)
				}, 1000)
			}
		}
	}
</script>