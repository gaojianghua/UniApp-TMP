<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.常见问题" i18n></m-navbar>
		<!-- 内容区域 -->
		<view class="menu px-1">
			<view class="menu-item px-3 mt-1 rounded" v-for="(item, i) in list" :key="i" 
			@click="$tools.Navigate.navigateTo('/pages-offspring/common-issue-detail/index', item.id)">
				<m-cell :item="item"></m-cell>
			</view>
		</view>
	</view>
</template>

<script>
	import MCell from '@/main_modules/main-ui/m-cell/index.vue'
	export default {
		components: {
			MCell
		},
		data() {
			return {
				list: [],
				id: 0
			}
		},
		onLoad(options) {
			this.id = options.item
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.getData()
			},
			// 获取数据
			getData() {
				this.list = [
					{
						id: 0,
						name: '如何开通VIP？'
					},
					{
						id: 1,
						name: '如何手动更新APP？'
					},
					{
						id: 2,
						name: '如何使用积分抽奖？'
					},
					{
						id: 3,
						name: '如何使用积分兑换奖品？'
					},
					{
						id: 4,
						name: '开通VIP都有哪些权益？'
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.menu {
			.menu-item {
				background-color: #fff;
				/deep/ .menu-item {
					border-top: none !important;
				}
			}
		}
	}
</style>
