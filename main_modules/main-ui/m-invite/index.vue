<template>
	<u-overlay :show="show" @click="cancel">
		<view class="warp">
			<view class="rect" @tap.stop>
				<view class="rect-item">
					<view class="rect-img"></view>
					<view class="rect-content">
						<view class="rect-title">
							{{$t('邀请好友')}}
						</view>
						<view class="rect-desc text-all" :class="lang != 'en'? 'zh-Hans' : ''">
							{{$t('邀请0')}}
							<br>{{$t('邀请1')}}
							<br>{{$t('邀请2')}}
							<br>{{$t('邀请3')}}
						</view>
						<view class="link-notice">
							{{$t('我的邀请链接')}}
						</view>
						<view class="link px-2 text-center d-flex a-center j-center">
							<span>{{link}}</span>
						</view>
						<view class="link-btn text-center" @click="copeLink">
							{{$t('复制链接')}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</u-overlay>
</template>

<script>
	export default {
		name: "m-invite",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			link: {
				type: String,
				default: 'https://www.toutiao.com/'
			},
			lang: {
				type: String,
				default: 'en'
			}
		},
		data() {
			return {

			};
		},
		mounted() {},
		methods: {
			cancel() {
				this.$emit('cancel')
			},
			copeLink() {
				this.$emit('copeLink', this.link)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		height: 100vh;
		width: 100vw;
		position: relative;


		.rect {
			width: 604rpx;
			height: 898rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			.rect-item {
				width: 604rpx;
				height: 630rpx;
				position: absolute;
				left: 0;
				bottom: 0;
				background: url('@/static/img/mine/invite1.png') no-repeat;
				background-size: cover;

				.rect-img {
					width: 589rpx;
					height: 428rpx;
					position: absolute;
					left: 50%;
					top: -268rpx;
					z-index: 1;
					transform: translateX(-50%);
					background: url('@/static/img/mine/invite3.png') no-repeat;
					background-size: cover;
				}

				.rect-content {
					width: 532rpx;
					height: 562rpx;
					position: absolute;
					left: 50%;
					bottom: 41rpx;
					z-index: 2;
					transform: translateX(-50%);
					background: url('@/static/img/mine/invite2.png') no-repeat;
					background-size: cover;


					.rect-title {
						position: absolute;
						left: 50%;
						bottom: 520rpx;
						transform: translateX(-50%);
						font-size: 34rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 1;
					}

					.rect-desc {
						width: 487rpx;
						height: 240rpx;
						overflow-y: auto;
						position: absolute;
						left: 50%;
						bottom: 250rpx;
						transform: translateX(-50%);
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #8A8A8A;
						line-height: 28rpx;
						word-break: break-all;
					}

					.zh-Hans {
						font-size: 26rpx;
						line-height: 38rpx;
					}

					.link-notice {
						position: absolute;
						left: 24rpx;
						bottom: 194rpx;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #00AA8F;
						line-height: 33rpx;
					}

					.link {
						position: absolute;
						left: 24rpx;
						bottom: 96rpx;
						background-color: #FFCF00;
						word-break: break-all;
						width: 485rpx;
						height: 86rpx;
						border-radius: 4rpx;

						span {
							width: 100%;
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							line-height: 33rpx;
						}
					}

					.link-btn {
						position: absolute;
						left: 50%;
						bottom: 36rpx;
						color: #000;
						transform: translateX(-50%);
						background-color: #FFCF00;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						line-height: 42rpx;
						border-radius: 50rpx;
						width: 194rpx;
						height: 42rpx;
					}

					.link-btn:active {
						background-color: #FFCF0099;
					}
				}
			}
		}
	}
</style>
