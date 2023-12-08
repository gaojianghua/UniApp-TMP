<template>
	<u-overlay :show="posterShow" @click="closePoster">
		<view class="share d-flex flex-column j-center a-center" @click.stop>
			<image :src="path" mode="widthFix" show-menu-by-longpress @longpress="show = true"></image>
			<view v-if="path" class="close" @click="closePoster">
				<image src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/exit.png" mode="">
				</image>
			</view>
			<l-painter v-if="posterShow" useCORS :after-delay="1000" :board="poster" :isCanvasToTempFilePath="canvasSwitch"
				@success="openSuccess" @fail="openFail" custom-style="position: fixed; left: 200%" />
		</view>
		<!-- 弹框 -->
		<m-modal :show="show" i18n title="温馨提示" @cancel="show = false" @confirm="saveConfirm">
			<view class="d-flex a-center j-center flex-column">
				<view class="d-flex a-center text-center j-center flex-column main-text-color letter-1">
					{{$t('确定要保存图片到本地相册吗？')}}
				</view>
			</view>
		</m-modal>
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
				canvasSwitch: false,
				show: false,
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
			//关闭
			closePoster() {
				this.canvasSwitch = false
				this.path = ''
				this.$emit('closePoster')
			},
			//分享按钮
			posterShowClick() {
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
			},
			//保存图片到相册
			saveConfirm() {
				this.$tools.Common.saveImageToPhotosAlbum(this.path, (e) => {
					if (e) {
						uni.showToast({
							title: this.$t('保存成功'),
							icon: 'none'
						})
					}else {
						uni.showToast({
							title: this.$t('保存失败'),
							icon: 'none'
						})
					}
					this.modalShow = false
					this.closePoster()
				})
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
