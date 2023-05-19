<template>
	<view class="page">
		<!-- 顶部状态栏高度 -->
		<m-top />
		<u-action-sheet :actions="list" :closeOnClickOverlay="true" :closeOnClickAction="true"
			:show="show"></u-action-sheet>
			<u-button @click="show = true">打开ActionSheet</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '选项一'
					},
					{
						name: '选项二'
					}
				],
				show: false
			}
		},
		onLoad(data) {
			let obj = this.$tools.Navigate.receivePageData(data, true)
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
</style>