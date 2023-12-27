<!-- 返回顶部组件 -->
<template>
	<u-transition class="back position-fixed"
	:style="{bottom: `calc(${isTab ? tabbarHeight : 0}px + ${bottom} + env(safe-area-inset-bottom))`,
	right: right,
	zIndex: zIndex, ...customStyle}" :show="scrollTop >= top">
		<u-image :width="imageWidth" :height="imageHeight" :src="url" @click="backTop"></u-image>
	</u-transition>
</template>

<script>
	import props from './props.js'
	export default {
		name: "m-back-top",
		props,
		data() {
			return {
				
			};
		},
		methods: {
			// 返回顶部
			backTop() {
				this.$emit('backTop')
			}
		},
		computed: {
			tabbarHeight() {
				return this.$store.state.tabbarHeight
			}
		}
	}
</script>