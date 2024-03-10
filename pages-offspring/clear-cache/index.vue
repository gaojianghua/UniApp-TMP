<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="transparent" textColor="#fff" value="page.清除缓存" i18n></m-navbar>
		<!-- 内容区域 -->
		<view class="cache px-3 pt-10">
			<view class="cache-card bg-white shadow-main d-flex flex-column a-center">
				<view class="cache-card-title font-weight">
					{{$t('已使用缓存')}}
				</view>
				<view class="cache-card-num font-weight mt-2">
					{{cache}}
				</view>
				<view class="cache-card-desc ml-auto mt-2">
					{{$t('包括图片，音频，视频，数据等')}}
				</view>
			</view>
			<!-- 按钮 -->
			<view class="cache-btn font-weight text-white d-flex a-center j-center mt-10" @click="clearCache">
				{{$t('page.清除缓存')}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cache: '0MB'
			}
		},
		onLoad() {
			this.cache = this.$multiportApi.app.computeCacheSize();
		},
		methods: {
			// 清除缓存
			clearCache() {
				this.$multiportApi.app.clearCache(() => {
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
	.page {
		background: url('https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/cache-bg.png') no-repeat;
		background-size: 100% 100%;
		height: 350rpx;
		.cache {
			.cache-card {
				width: 690rpx;
				padding: 35rpx;
				border-radius: 24rpx;

				.cache-card-title {
					font-size: 32rpx;
					color: #333333;
				}

				.cache-card-num {
					font-size: 36rpx;
					color: #57bc73;
				}

				.cache-card-desc {
					font-size: 22rpx;
					color: #999999;
				}
			}

			.cache-btn {
				width: 690rpx;
				height: 80rpx;
				border-radius: 42rpx;
				background: linear-gradient(264deg, #02B275, #67CC6E);
				font-size: 30rpx;
			}
			.cache-btn:active{
				background: linear-gradient(264deg, #02B27580, #67CC6E80);
			}
		}
	}
</style>