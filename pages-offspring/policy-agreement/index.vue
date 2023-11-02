<template>
	<view class="page">
		<m-navbar bgColor="#fff" textColor="#fb7299" :value="pageTitle" i18n></m-navbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageTitle: ''
			}
		},
		onLoad(options) {
			options.item == 1 ? this.pageTitle = 'page.用户协议' : this.pageTitle = 'page.隐私政策'
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
</style>
