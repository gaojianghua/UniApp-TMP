<template>
	<view class="page">
		<m-tabbar :pagePath="$store.state.tabbar[2].pagePath" i18n></m-tabbar>
	</view>
</template>

<script>
	import MTabbar from '@/main_modules/main-ui/m-tabbar/index.vue'
	export default {
		components: {
			MTabbar
		},
		data() {
			return {}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
</style>
