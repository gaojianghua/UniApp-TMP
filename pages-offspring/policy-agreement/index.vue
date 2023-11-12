<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="transparent" textColor="#fb7299" :value="pageTitle" i18n></m-navbar>
		<!-- 内容区域 -->
		<view class="px-3">
			<u-parse :content="content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageTitle: '',
				content: ''
			}
		},
		onLoad(options) {
			options.item == 1 ? this.pageTitle = 'page.用户协议' : this.pageTitle = 'page.隐私政策'
			this.getData()
		},
		methods: {
			getData() {
				this.content = `<p>露从今夜白，月是故乡明</p>
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />`
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background-color: #FFFAE7;
	}
</style>