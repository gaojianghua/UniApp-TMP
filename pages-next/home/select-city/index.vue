<template>
	<view class="page">
		<!-- <m-navbar bgColor="#fff" textColor="#fb7299" value="page.选择城市" i18n></m-navbar> -->
		<view class="d-flex a-center j-center py-10">
			<view class="d-flex a-center j-center px-3 rounded-1 bg-danger text-white" @click="show = true">
				显隐
			</view>
		</view>
		<m-preview :show="show" :mediums="arr" @close="show = false"></m-preview>
	</view>
</template>

<script>
	import MPreview from '@/main_modules/main-ui/m-preview/index.vue'
	export default {
		components: {
			MPreview
		},
		data() {
			return {
				show: false,
				arr: [
					{
						image: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/uniapp.png',
						type: 'image'
					},
					{
						video: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/7xi.mp4',
						type: 'video'
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
</style>