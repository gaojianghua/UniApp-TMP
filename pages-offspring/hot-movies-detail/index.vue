<template>
	<view class="page">
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.热门影视" i18n></m-navbar>
		<yingbing-video objectFit="fill" autoplay :style="scrollStyle"
			:src="item.videourl">
		</yingbing-video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {}
			}
		},
		onLoad(args) {
			this.item = this.$tools.Navigate.receivePageData(args)
		},
		methods: {

		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.browserFitHeight}px - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
</style>
