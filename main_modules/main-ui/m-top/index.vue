<!-- 顶部组件 -->
<template>
	<view :style="{height: `${statusHeight}px`}">
	</view>
</template>

<script>
	export default {
		name: "m-top",
		data() {
			return {
				statusHeight: 0
			};
		},
		created() {
			this.statusHeight = this.$store.state.statusHeight
		}
	}
</script>
