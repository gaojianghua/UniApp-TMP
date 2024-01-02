<!-- 分页组件 -->
<template>
	<view class="paging d-flex a-center j-center">
		<view :class="current == 0 ? 'no' : ''" class="prev mr-3 d-flex a-center j-center" @click="openPrev">
			<u-icon name="arrow-left" :color="current == 0 ? '#999' : '#fff'" size="16"></u-icon>
		</view>
		<view :class="current == 0 ? 'no' : ''" class="first mr-3 d-flex a-center j-center" @click="openFirst">
			<u-icon name="arrow-left-double" :color="current == 0 ? '#999' : '#fff'" size="18"></u-icon>
		</view>
		<view class="center">
			<scroll-view :scroll-into-view="pageIntoView" class="scroll-row" scroll-x>
				<view @click="openSelect(i)" :id="'page' + i" :class="current == i ? 'select' : ''" 
				class="scroll-row-item text-center mr-2 text-white" 
				v-for="(item, i) in totalPageNum" :key="i">
					{{i + 1}}
				</view>
			</scroll-view>
		</view>
		<view :class="current == totalPageNum - 1 ? 'no' : ''" class="last ml-3 d-flex a-center j-center" @click="openLast">
			<u-icon name="arrow-right-double" :color="current == totalPageNum - 1 ? '#999' : '#fff'" size="18"></u-icon>
		</view>
		<view :class="current == totalPageNum - 1 ? 'no' : ''" class="next ml-3 d-flex a-center j-center" @click="openNext">
			<u-icon name="arrow-right" :color="current == totalPageNum - 1 ? '#999' : '#fff'" size="16"></u-icon>
		</view>
	</view>
</template>

<script>
	import props from './props.js'
	export default {
		data() {
			return {
				current: 0,
				pageIntoView: ''
			};
		},
		methods: {
			// 上一页
			openPrev() {
				if (this.current == 0) return
				this.current--
				this.locationCurrentPage()
				this.$emit('prev', this.current)
			},
			// 回到首页
			openFirst() {
				if (this.current == 0) return 
				this.current = 0
				this.locationCurrentPage()
				this.$emit('first', this.current)
			},
			// 跳到某页
			openSelect(i) {
				if (i == this.current) return
				this.current = i
				this.locationCurrentPage()
				this.$emit('select', this.current)
			},
			// 回到尾页
			openLast() {
				if (this.current == this.totalPageNum - 1) return 
				this.current = this.totalPageNum - 1
				this.locationCurrentPage()
				this.$emit('last', this.current)
			},
			// 下一页
			openNext() {
				if (this.current == this.totalPageNum - 1) return 
				this.current++
				this.locationCurrentPage()
				this.$emit('next', this.current)
			},
			// 定位到当前页码
			locationCurrentPage() {
				this.pageIntoView = this.current > 0 ? 'page' + (this.current - 1) : 'page' + this.current
				// 数据处理示例
				// this.list = this.allList.slice(this.current * this.pageSize, (this.current + 1) * this.pageSize)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.paging{
		height: 100rpx;
		
		.prev,
		.first,
		.last,
		.next{
			border: 2rpx solid #fff;
			border-radius: 6rpx;
			height: 50rpx;
			width: 50rpx;
		}
		
		.no{
			border: 2rpx solid #999;
			color: #999 !important;
		}
		
		.center{
			width: 190rpx;
			.scroll-row{
				.scroll-row-item{
					border: 2rpx solid #fff;
					border-radius: 6rpx;
					height: 50rpx;
					width: 50rpx;
				}
				.scroll-row-item:last-child{
					margin-right: 0;
				}
				.select{
					border: 2rpx solid #4ACD48;
					color: #4ACD48 !important;
				}
			}
		}
	}
</style>