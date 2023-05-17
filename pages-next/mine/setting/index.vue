<template>
	<view class="page">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad(data) {
			let obj = this.$tools.Navigate.receivePageData(data, true)
			console.log(obj)
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
</style>
