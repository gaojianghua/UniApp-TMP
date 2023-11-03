<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.清除缓存" i18n></m-navbar>
		<!-- 内容区域 -->
		<view class="content p-3">
			<view class="p-3">
				<view class="">
					{{$t('已使用缓存')}}
				</view>
				<view class="">
					{{cache}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cache: ''
			}
		},
		onLoad() {
			this.cache = this.$multiportApi.app.computeCacheSize();
		},
		methods: {
			// 清除缓存
			clearCache() {
				this.$multiportApi.app.clearCache(()=> {
					this.$refs.uToast.show({
						title: this.$t('清除缓存成功~'),
						type: 'success'
					})
					this.cache = this.$multiportApi.app.computeCacheSize(); // 重新计算缓存  
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
