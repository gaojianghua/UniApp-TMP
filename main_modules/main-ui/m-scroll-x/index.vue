<template>
	<view class="hidden">
		<m-damp-rebound :refresherDefaultText="refresherDefaultText" 
		:refresherRefreshText="refresherRefreshText" :refresherLoadingText="refresherLoadingText" :mainColor="mainColor"
		:isCustomRefresh="isCustomRefresh">
			<!-- #ifdef MP-WEIXIN -->
			<scroll-view class="scroll-row h-100" scroll-anchoring scroll-x :style="[scrollStyle]" @scroll="scroll"
			@scrolltolower="loadmore">
			<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<scroll-view class="scroll-row h-100" scroll-anchoring scroll-x :style="{scrollStyle}" @scroll="scroll"
				@scrolltolower="loadmore">
				<!-- #endif -->
					<slot name="default" />
					<view v-if="isLoading" class="scroll-row-item">
						<view class="w-100 position-relative hidden">
							<view class="d-flex a-center j-center" :style="{height: loadHeight, width: loadWidth}">
								<m-loading :textCenter="textCenter" :textStart="textStart" :textEnd="textEnd"
									:height="loadHeight" :width="loadWidth" isColumn :load="load" :mainColor="mainColor"
									:bgColor="bgColor" />
							</view>
						</view>
					</view>
				</scroll-view>
		</m-damp-rebound>
	</view>
</template>

<script>
	import MLoading from '../m-loading/index.vue'
	import MDampRebound from '../m-damp-rebound/index.vue'
	import props from './props.js'
	export default {
		components: {
			MLoading,
			MDampRebound
		},
		props,
		data() {
			return {
				
			}
		},
		methods: {
			//加载更多
			loadmore() {
				this.$emit('loadmore')
			},
			//滚动触发
			scroll(e) {
				this.$emit('scroll', e.detail)
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>