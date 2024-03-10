<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="transparent" textColor="#fff" i18n value="page.APP下载"></m-navbar>
		<!-- 内容区域 -->
		<m-scroll-y :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
			<view class="d-flex a-center j-center flex-column pt-10">
				<u-image width="120rpx" height="120rpx"
					src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/GongYueLogo.png"></u-image>
				<view class="title line-h letter-2 mt-3 font-weight text-white">
					{{$t('宫悦商城欢迎您')}}
				</view>
				<view class="mt-2 text-light font-weight line-h">
					V{{appSystemInfo.appVersion}}
				</view>
				<view class="desc initial p-4 text-i2">
					<p>欢迎下载宫悦商城！我们致力于为您提供便捷、安全和多样化的购物体验。宫悦商城是一个全方位的在线购物平台，汇集了各个领域的优质商品和服务。</p>
					<p>无论您是在寻找时尚服饰、电子产品、家居用品还是美妆护肤产品，宫悦商城都能满足您的需求。我们与众多知名品牌和经过严格筛选的卖家合作，确保您能够找到高品质的产品，享受到最佳的购物体验。</p>
					<p>无论您是购物达人还是首次在线购物，宫悦商城都将成为您理想的购物伙伴。立即下载宫悦商城应用，探索数以万计的优质商品，尽享便捷、安全、愉悦的购物之旅！</p>
				</view>
				<view class="content-form mt-3 p-3">
					<view @click="appDownload" class="btons d-flex a-center j-center text-white">
						{{$t('Android版下载')}}
					</view>
					<view @click="appDownload" class="mt-3 btons d-flex a-center j-center text-white">
						{{$t('IOS版下载')}}
					</view>
				</view>
			</view>
		</m-scroll-y>
		<!-- 弹框 -->
		<m-modal :show="show" i18n title="温馨提示" :isCancel="false" confirmName="复制链接" @cancel="show = false" @confirm="urlCopy">
			<view class="d-flex a-center j-center flex-column">
				<view class="d-flex a-center j-center text-center flex-column main-text-color letter-1">
					<span>{{$t('您当前使用的不是Safari浏览器')}}</span>
					<span>{{$t('请复制下方链接在Safari浏览器中打开')}}</span>
					<u-icon name="arrow-downward" size="18" color="#f27299"></u-icon>
				</view>
				<view class="mt-1 text-center text-success border-2 border-success px-2 py-1 rounded-1 initial text-break">
					{{downloadAuth.iosUrl}}
				</view>
			</view>
		</m-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				downloadAuth: {},
				show: false
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.getDownloadAuth()
			},
			// 获取下载权限
			getDownloadAuth() {
				/*
					是google商店下载（ 地址：https://play.google.com/store/apps/details?id=uni.Gao.GongYue）
					不是google商店下载，使用APK包直接下载（ 地址：https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/GongYue-Pro-1.0.0.apk）
				*/
				this.downloadAuth = {
					android: true,
					androidUrl: `https://play.google.com/store/apps/details?id=${this.$store.state.androidAppName}`,
					ios: true,
					iosUrl: `https://apps.apple.com/app/${this.$store.state.iosAppName}`
				}
			},
			// APP下载
			appDownload() {
				if (this.$store.state.appSystemInfo.platform == 'android') {
					this.androidDownload()
				} else {
					this.iosDownload()
				}
			},
			// 安卓端下载
			androidDownload() {
				if (this.downloadAuth.android) {
					location.href = this.downloadAuth.androidUrl
				}else{
					uni.showToast({
						title: this.$t('暂不支持Android系统'),
						icon: 'none',
						duration: 3000,
					})
				}
			},
			// IOS端下载
			iosDownload() {
				if (this.downloadAuth.ios) {
					if (this.$check.isSafari()) {
						location.href = this.downloadAuth.iosUrl
					}else {
						this.show = true
					}
				}else{
					uni.showToast({
						title: this.$t('暂不支持IOS系统'),
						icon: 'none',
						duration: 3000,
					})
				}
			},
			// IOS端拷贝URL
			urlCopy() {
				uni.setClipboardData({
					data: this.downloadAuth.iosUrl,
					showToast: false,
					success: () => {
						this.show = false
						this.$refs.uToast.show({
							message: this.$t('复制成功'),
							type: 'success',
							duration: 1200
						})
					},
					fail: () => {
						this.show = false
						this.$refs.uToast.show({
							message: this.$t('复制失败'),
							type: 'warning',
							duration: 1200
						})
					}
				})
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.browserFitHeight}px - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			},
			appSystemInfo() {
				return this.$store.state.appSystemInfo
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page {
		background: url('https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/login-bg.jpg') no-repeat;
		background-size: 100% 100%;

		.title {
			font-size: 38rpx;
			text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.5);
		}

		.desc {
			font-size: 26rpx;
			letter-spacing: 2rpx;
			color: #666;
		}

		.content-form {
			width: 690rpx;
			background-color: #ffffff80;
			border: 2rpx solid #fff;
			border-radius: 20rpx;
			margin-top: 200rpx;
		}

		.btons {
			font-size: 30rpx;
			border-radius: 18rpx;
			height: 88rpx;
			width: 630rpx;
			background: linear-gradient(to right, #85B6CA, #F9A4A0);
		}

		.btons:active {
			background: linear-gradient(to right, #85B6CA80, #F9A4A080);
		}
	}
</style>