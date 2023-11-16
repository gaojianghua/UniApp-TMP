<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" :value="pageTitle" i18n></m-navbar>
		<!-- 内容区域 -->
		<m-scroll :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
			<view class="px-3 pb-3">
				<u-parse :content="content" :tagStyle="style"></u-parse>
			</view>
		</m-scroll>
	</view>
</template>

<script>
	import MScroll from '@/main_modules/main-ui/m-scroll/index.vue'
	import { policy, agreement } from './data.js'
	export default {
		components: {
			MScroll
		},
		data() {
			return {
				pageTitle: '',
				content: '',
				style: {
					h3: 'margin-top: 20rpx;',
					h4: 'margin-top: 20rpx;',
				},
				pageId: 0
			}
		},
		onLoad(options) {
			this.pageId = options.item
			options.item == 1 ? this.pageTitle = 'page.用户协议' : this.pageTitle = 'page.隐私政策'
			this.getData()
		},
		methods: {
			getData() {
				this.pageId == 1 ? this.content = agreement : this.content = policy
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background-color: #FFFAE7;
	}
</style>