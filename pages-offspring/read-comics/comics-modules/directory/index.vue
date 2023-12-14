<template>
	<m-popup :show="show" i18n @close="close" title="目录" zIndex="10071" i18n>
		<view class="directory px-2">
			<view class="directory-top d-flex a-center j-sb">
				<view class="d-flex a-center">
					<view class="">
						{{detail.state == 1 ? $t('连载中') : $t('已完结')}}
					</view>
					<view class="ml-1">
						({{detail.allRun}})
					</view>
				</view>
				<view class="sort d-flex a-center" @click="openSort">
					<image
						:src="`https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/${isSort ? 'asc' : 'desc'}.png`">
					</image>
				</view>
			</view>
			<m-scroll-y :isLoading="false" :intoView="intoView" :scrollTop="scrollTop" :scrollStyle="directoryStyle" :isCustomRefresh="false">
				<view :id="'item'+item.id" class="directory-item d-flex a-center" :class="{'main-text-color': item.id == chapterId}"
					v-for="(item, i) in chapterList" :key="i" @click="openChapter(item.id)">
					<view v-if="item.vip" class="isvip font-weight line-h mr-2">
						VIP
					</view>
					<view class="name">
						{{item.name}}
					</view>
					<u-icon v-if="item.lock" class="ml-auto" name="lock" color="#FFA16A" size="24"></u-icon>
				</view>
			</m-scroll-y>
		</view>
	</m-popup>
</template>

<script>
	import MPopup from '@/main_modules/main-ui/m-popup/index.vue'
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			detail: {
				type: Object,
				default: () => {
					return {}
				}
			},
			chapterList: {
				type: Array,
				default: () => {
					return []
				}
			},
			chapterId: {
				type: Number,
				default: () => {
					return 0
				}
			}
		},
		components: {
			MPopup
		},
		data() {
			return {
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
			// 排序
			openSort() {
				this.isSort = !this.isSort
				this.scrollTop = 1
				this.$nextTick(() => {
					this.scrollTop = 0
				})
				this.$emit('openSort')
			},
			// 打开某个章节
			openChapter(i) {
				this.$emit('openChapter', i)
			}
		},
		computed: {
			directoryStyle() {
				return {
					height: `calc(80vh - 88rpx - 90rpx - env(safe-area-inset-bottom))`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.directory {
		height: 80vh;
	
		.directory-top {
			height: 88rpx;
	
			.sort {
				width: 45rpx;
				height: 45rpx;
			}
		}
	
		.directory-item {
			height: 88rpx;
			font-size: 28rpx;
			border-bottom: #eee solid 1rpx;
			.isvip {
				border-radius: 20rpx 0 20rpx 0;
				padding: 8rpx 18rpx;
				font-size: 24rpx;
				color: #A1562F;
				background: linear-gradient(270deg, #F3D1B1 0%, #E2A167 100%);
			}
		}
		
		.directory-item:last-child{
			border-bottom: none
		}
	}
	.list-item{
		font-size: 0;
	}
</style>