<template>
	<view class="page">
		<!-- 顶部导航 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.反馈详情" i18n></m-navbar>
		<!-- 内容区域 -->
		<m-scroll :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
			<view class="pt-1">
				<view class="bg-white d-flex p-2 pb-3">
					<view class="feedback-label flex-shrink font-weight">
						{{$t('您的反馈')}}:
					</view>
					<view class="feedback-desc ml-2">
						<view class="feedback-desc-text">
							{{detail.desc}}
						</view>
						<view class="feedback-desc-image d-flex flex-wrap">
							<view class="img" v-for="(item, i) in detail.imgs" :key="i" @click="openPreview(0, i)">
								<u-image width="100%" height="100%" :src="item" mode="widthFix"></u-image>
							</view>
						</view>
					</view>
				</view>
				<view class="bg-white d-flex mt-1 p-2 pb-3">
					<view class="feedback-label flex-shrink font-weight">
						{{$t('反馈回复')}}:
					</view>
					<view class="feedback-desc ml-2">
						<view class="feedback-desc-text">
							{{detail.reply}}
						</view>
						<view class="feedback-desc-image d-flex flex-wrap">
							<view class="img mt-2" v-for="(item, i) in detail.replyImgs" :key="i"
								@click="openPreview(1, i)">
								<u-image width="100%" height="100%" :src="item" mode="widthFix"></u-image>
							</view>
						</view>
					</view>
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
				id: 0,
				detail: {}
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
					imgs: [
						'https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/home/gaojianghua.jpg',
						'https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/home/gaojianghua.jpg',
						'https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/home/gaojianghua.jpg',
						'https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/home/gaojianghua.jpg'
					],
					reply: '目前暂不支持支付宝支付。非常抱歉给您带来的不便，敬请谅解。我们会尽快上线支付宝支付方式，敬请期待后续新版本。',
					replyImgs: [
						'https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/home/gaojianghua.jpg',
						'https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/home/gaojianghua.jpg'
					]
				}
			},
			// 预览图片
			openPreview(e, i) {
				uni.previewImage({
					urls: e == 0 ? this.detail.imgs : this.detail.replyImgs,
					current: i,
					indicator: 'default',
					loop: false
				})
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.feedback-desc {
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
	}
</style>