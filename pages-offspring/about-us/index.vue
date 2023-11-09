<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.关于宫悦" i18n></m-navbar>
		<!-- 内容区域 -->
		<m-scroll :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
		<view class="content d-flex pt-10 flex-column j-center a-center" :style="scrollStyle">
			<u-image width="120rpx" height="120rpx" src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/GongYueLogo.png"></u-image>
			<view class="mt-3 line-h font-weight" style="font-size: 32rpx;">
				{{$store.state.appSystemInfo.appName}}
			</view>
			<view class="mt-2 text-light-muted font-weight line-h">
				V{{$store.state.appSystemInfo.appVersion}}
			</view>
			<view class="desc initial p-4 text-i2">
				<p>欢迎来到宫悦商城！我们致力于为您提供便捷、安全和多样化的购物体验。宫悦商城是一个全方位的在线购物平台，汇集了各个领域的优质商品和服务。</p>
				<p>无论您是在寻找时尚服饰、电子产品、家居用品还是美妆护肤产品，宫悦商城都能满足您的需求。我们与众多知名品牌和经过严格筛选的卖家合作，确保您能够找到高品质的产品，享受到最佳的购物体验。</p>
				<p>无论您是购物达人还是首次在线购物，宫悦商城都将成为您理想的购物伙伴。立即下载宫悦商城应用，探索数以万计的优质商品，尽享便捷、安全、愉悦的购物之旅！</p>
			</view>
			<view class="mt-auto main-text-color pb-3">
				<span @click="openAgree(1)">《{{$t('用户协议')}}》</span> 
				<span class="text-light-muted">| |</span>
				<span @click="openAgree(2)">《{{$t('隐私政策')}}》</span>
			</view>
			<view class="text-light-muted pb-3 d-flex a-center flex-column j-center font">
				<span>{{$t('由个人开发者高江华  版权所有')}}</span>
				<span>Copyright c 2022-{{new Date().getFullYear()}}；ALL Rights Reserved</span>
			</view>
		</view>
		</m-scroll>
	</view>
</template>

<script>
	import MScroll from '@/main_modules/main-ui/m-scroll/index.vue'
	export default {
		components: {
			MScroll
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				
			},
			// 进入协议页面
			openAgree(e) {
				this.$tools.Navigate.navigateTo('/pages-offspring/policy-agreement/index', e)
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page{
		.desc{
			font-size: 26rpx;
			letter-spacing: 2rpx;
			color: #666;
		}
	}
</style>
