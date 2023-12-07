<template>
	<u-overlay :show="posterShow" @click="closePoster">
		<view class="share d-flex flex-column j-center a-center" @click.stop>
			<image :src="path" mode="widthFix" show-menu-by-longpress></image>
			<view v-if="path" class="close" @click="closePoster">
				<image src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/exit.png" mode="">
				</image>
			</view>
			<l-painter v-if="posterShow" useCORS :after-delay="1000" :board="poster" :isCanvasToTempFilePath="canvasSwitch"
				@success="openSuccess" @fail="openFail" custom-style="position: fixed; left: 200%" />
		</view>
	</u-overlay>
</template>

<script>
	export default {
		name: "myShare",
		props: {
			posterShow: {
				type: [String, Boolean],
				default: false
			},
			poster: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				path: '',
				oldPath: '',
				canvasSwitch: false
			};
		},
		watch: {
			posterShow: {
				handler(newV, oldV) {
					if (newV) {
						this.posterShowClick()
					}
				},
				deep: true
			}
		},
		methods: {
			//初始化
			// init() {
			// },
			//关闭
			closePoster() {
				this.canvasSwitch = false
				// this.poster = {}
				this.path = ''
				this.$emit('closePoster')
			},
			//分享按钮
			posterShowClick() {
				// this.init()
				this.canvasSwitch = true
			},
			//生成海报成功
			openSuccess(e) {
				this.$emit('success')
				uni.hideLoading()
				this.path = e
			},
			//生成海报失败
			openFail(e) {
				uni.$u.toast(e)
				uni.hideLoading()
			}
		}
	}
</script>

<style lang="scss">
	.share {
		width: 600rpx;
		border-radius: 20rpx;
		position: absolute;
		bottom: 50%;
		left: 75rpx;
		transform: translateY(50%);

		.close {
			width: 79rpx;
			height: 146rpx;
		}
	}
</style>
