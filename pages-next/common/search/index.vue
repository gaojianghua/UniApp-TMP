<!-- 搜索界面 -->
<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" isSlot>
			<view class="w-100 search pr-2" :style="{
			width: `calc(100vw - ${miniProgramCapsule.width}px - 60rpx - 30rpx)`,
			marginRight: `${miniProgramCapsule.width}px`}">
				<u-search :placeholder="$t('请输入关键词')" focus height="60rpx" v-model="search" :showAction="false" @search="startSearch"></u-search>
			</view>
		</m-navbar>
	</view>
</template>

<script>
	import capsuleInit from '@/mixins/capsule-init.js'
	export default {
		mixins: [capsuleInit],
		data() {
			return {
				search: ''
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				
			},
			// 获取数据
			getData() {
				
			},
			// 开始搜索
			startSearch(e) {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		.search{
			margin-left: 100rpx;
		}
	}
</style>
