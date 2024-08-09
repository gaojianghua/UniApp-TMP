<template>
	<view class="page">
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.图片剪裁" i18n></m-navbar>
		<view class="d-flex a-center j-center">
			<view class="text-center py-1 px-3 rounded-1 main-bg-color text-white"
			@click="chooseImage">
				{{$t('选择图片')}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			// 选择图片
			chooseImage() {
				uni.chooseImage({
					
					success: (res) => {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>