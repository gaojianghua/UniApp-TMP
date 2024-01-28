<template>
	<u-popup :customStyle="{width: '75vw'}" zIndex="10990" :show="show" mode="left"
		@close="close">
		<view class="w-100"
			:style="{background: backgroundId == 1 ? bgList[backgroundId].color : (backgroundId == 2 ? bgList[backgroundId - 2].color : bgList[backgroundId - 1].color)}">
			<view class="d-flex a-center px-2 j-sb"
				:style="{height: `calc(${navbarHeight}px + ${statusHeight}px)`}">
				<view class="d-flex a-center" :style="{color: backgroundId != 1 ? bgList[1].color : bgList[0].color}">
					<view class="text-ellipsis1">{{detail.name}}</view>
					<view>({{directoryList.length}})</view>
				</view>
				<view class="sort d-flex a-center" @click="openSort">
					<image
						:src="`https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/${isSort ? 'asc' : 'desc'}.png`">
					</image>
				</view>
			</view>
			<m-scroll-y :isLoading="false" :intoView="intoView" :setScrollTop="scrollTop" :isCustomRefresh="false"
				:scrollStyle="scrollStyle">
				<view :id="'item'+item.id" class="directory-item d-flex px-2 a-center"
					v-for="(item, i) in directoryList" :key="i"
					:style="{borderColor: backgroundId == 1 ? '#232323' : '#ddd'}"
					@click="openToChapter(i)">
					<view v-if="item.vip" class="isvip font-weight line-h mr-2">
						VIP
					</view>
					<view class="name" :style="{color: backgroundId != 1 ? bgList[1].color : bgList[0].color}"
					:class="{'main-text-color': item.name == composeCurChild.chapterName}">
						{{item.name}}
					</view>
					<u-icon v-if="item.lock" class="ml-auto" name="lock" color="#FFA16A" size="24"></u-icon>
				</view>
			</m-scroll-y>
		</view>
	</u-popup>
</template>

<script>
	import props from './props.js'
	import { bgList } from '../options.js'
	export default {
		props,
		data() {
			return {
				bgList,
				intoView: '',
				scrollTop: 0,
				isSort: true
			}
		},
		methods: {
			// 关闭
			close() {
				this.$emit('close')
			},
			// 切换排序
			openSort() {
				this.isSort = !this.isSort
				this.$emit('openSort')
			},
			// 打开某个章节
			openToChapter(i) {
				this.$emit('openToChapter', i)
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.browserFitHeight}px - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			},
			statusHeight() {
				return this.$store.state.statusHeight
			},
			navbarHeight() {
				return this.$store.state.navbarHeight
			}
		},
		watch: {
			show(nv, ov) {
				if (nv) {
					this.intoView = 'item' + this.directoryList[this.chapterProgress].id
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.directory-item {
		height: 88rpx;
		font-size: 28rpx;
		border-bottom: solid 1rpx;
	
		.isvip {
			border-radius: 20rpx 0 20rpx 0;
			padding: 8rpx 18rpx;
			font-size: 24rpx;
			color: #A1562F;
			background: linear-gradient(270deg, #F3D1B1 0%, #E2A167 100%);
		}
	}
	
	.directory-item:last-child {
		border-bottom: none
	}
	
	.sort {
		width: 45rpx;
		height: 45rpx;
	}
</style>