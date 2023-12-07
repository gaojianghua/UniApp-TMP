<template>
	<view class="virtual-list" style="position: relative;">
		<movable-area style="position: absolute;right: 0;width: 30px;height: 100%;">
			<movable-view class="action-bar-box" direction="vertical" @change="change" :y="y" :animation="false">
				<view style="border-bottom: #fff solid 5rpx;width: 100%;"></view>
				<view style="border-bottom: #fff solid 5rpx;width: 100%;"></view>
			</movable-view>
		</movable-area>
		<scroll-view scroll-y="true" 
					 :style="{
						 'height': `calc(100vh - 80rpx - ${$store.state.statusHeight}px)`,
						 'position': 'relative',
						 'zIndex': 1
					 }" 
					 @scroll="handleScroll" :scroll-top="scrollTop" :show-scrollbar="false">
			
			<view class="scroll-bar" 
				  :style="{
					'height': localHeight + 'px'
				  }"></view>
			<view class="list" 
				  :style="{
					  'transform': `translateY(${offset}px)`
				  }">
				<view class="item-wrap" 
					  v-for="(item, index) in visibleData" 
					  :key="index">
					<slot :item="item" :active="active"></slot>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'VirtualList',
		props: {
			// 所有的items
			items: Array,
			// 可视区域的item数量
			remain: Number,
			// item大小
			size: Number,
			// 当前章节
			active: Number,
			// 可使区域高度
			scrollHeight: Number
		},
		data() {
			return {
				// 起始
				start: 0,
				// 结束
				end: this.remain,
				// list 偏移量
				offset: 0,
				scrollTop: 0,
				y: 0
			}
		},
		created() {
			//当前章节滚动至顶部
			this.scrollTop = this.size * this.active
		},
		computed: {
			// 预留项
			preCount() {
				return Math.min(this.start, this.remain);
			},
			nextCount() {
				return Math.min(this.items.length - this.end, this.remain);
			},
			// 可视区域的item
			visibleData() {
				const start = this.start - this.preCount;
				const end = this.end + this.nextCount;
				return this.items.slice(start, end);
			},
			localHeight() {
				return this.items.length * this.size
			}
		},
		methods: {
			change(e) {
				if (e.detail.source !== 'touch') {
					return
				}
				let y = e.detail.y;
				let scroll = y/(this.scrollHeight-40)*(this.localHeight-this.scrollHeight);
				scroll = scroll < 0 ? 0 : scroll;
				this.scrollTop = scroll;
			},
			handleScroll(ev) {
				const scrollTop = ev.detail.scrollTop;
				this.y = scrollTop/(this.localHeight-this.scrollHeight)*(this.scrollHeight-40)
				// 开始位置
				const start = Math.floor(scrollTop / this.size)
				this.start = start < 0 ? 0 : start;
				// 结束位置
				this.end = this.start + this.remain;
				// 计算偏移
				const offset = scrollTop - (scrollTop % this.size) - this.preCount * this.size
				this.offset = offset < 0 ? 0 : offset;
			}
		}
	}
</script>

<style scoped>
	
	.list {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
	.action-bar-box{
		padding: 6rpx;
		display: flex;
		flex-flow: column;
		justify-content: space-around;
		align-items: center;
		position: absolute;
		right: 0;
		background-color: #33C795;
		border-radius: 6rpx;
		box-shadow: 0 0 5rpx #000;
		width: 30rpx;
		height: 60rpx;
		z-index:2;
	}
</style>
