<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.电子签名" i18n></m-navbar>
		<!-- 内容区域 -->
		<view class="d-flex a-center j-center flex-column" :style="scrollStyle">
			<m-signature></m-signature>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import MSignature from '@/main_modules/main-ui/m-signature/index.vue'
	export default {
		components: {
			MSignature
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			
			
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.browserFitHeight}px - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
	
	}
</style>
