<!-- 顶部组件 -->
<template>
	<!-- #ifdef MP -->
	<view :style="[{height: `${statusHeight}px`}]">
	<!-- #endif -->
		<!-- #ifndef MP -->
		<view :style="{height: `${statusHeight}px`}">
		<!-- #endif -->
		</view>
</template>

<script>
	export default {
		name: "m-top",
		data() {
			return {};
		},
		computed: {
			statusHeight() {
				return this.$store.state.statusHeight
			}
		}
	}
</script>