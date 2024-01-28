<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.问题详情" i18n></m-navbar>
		<!-- 内容区域 -->
		<m-scroll-y :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
			<view class="pt-1">
				<view class="bg-white d-flex p-2">
					<view class="feedback-label flex-shrink font-weight">
						{{$t('问题')}}:
					</view>
					<view class="feedback-desc-text ml-2">
						{{detail.desc}}
					</view>
				</view>
				<view class="bg-white d-flex mt-1 p-2 pb-3">
					<view class="feedback-label flex-shrink font-weight">
						{{$t('解答')}}:
					</view>
					<view class="feedback-desc ml-2">
						<view class="feedback-desc-text">
							{{detail.reply}}
						</view>
						<view class="feedback-desc-image d-flex flex-wrap">
							<view class="img mt-2" v-for="(item, i) in detail.replyImgs" :key="i"
								@click="openPreview(i)">
								<u-image width="100%" height="100%" :src="item" mode="widthFix"></u-image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {},
				id: 0
			}
		},
		onLoad(options) {
			this.id = options.item
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.getData()
			},
			// 获取数据
			getData() {
				this.detail = {
					desc: '为什么我购买商品，支付不成功呢？我使用的是支付宝支付，支付的时候没有任何反应的。',
					reply: '目前暂不支持支付宝支付。非常抱歉给您带来的不便，敬请谅解。我们会尽快上线支付宝支付方式，敬请期待后续新版本。',
					replyImgs: [
						'https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/home/gaojianghua.jpg',
						'https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/home/gaojianghua.jpg'
					]
				}
			},
			// 预览图片
			openPreview(i) {
				uni.previewImage({
					urls: this.detail.replyImgs,
					current: i,
					indicator: 'default',
					loop: false
				})
			}
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
	.page {
		.feedback-desc-text {
			color: #555;
		}
		.feedback-desc-image {
			.img {
				margin-top: 13rpx;
				width: 32%;
				margin-right: 2%;
			}
				
			.img:nth-child(3n) {
				margin-right: 0;
			}
		}
	}
</style>