<template>
	<view class="page">
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.生成字幕" i18n>
			<view class="position-absolute top-half right-0 tf-half-y d-flex j-center a-center pr-2" slot="right">
				<view class="py-1 px-2 font rounded-1 line-h-sm" @click="show = !show"
					:class="show ? 'main-bg-color text-white' : 'bg-light-secondary text-light-muted'">
					{{$t('设置')}}
				</view>
			</view>
		</m-navbar>
		<m-scroll-y :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
			<view class="content d-flex flex-column a-center h-100">
				<view class="image-box w-100 h-100">
					<template v-if="imageList.length == 0">
						<view class="image-box-no d-flex a-center j-center flex-column" @click="uploadImage">
							<u-image width="100rpx" height="auto" mode="widthFix"
								src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/uploadImage.png"></u-image>
							<view class="mt-1 text-white line-h-sm">
								{{$t('上传图片')}}
							</view>
						</view>
					</template>
					<template v-else>
						<view class="position-relative"
							:style="{height: `calc(${height}px + ${(imageList.length - 1) * lineHeight}rpx)`}">
							<view id="content" class="position-absolute left-0 image-box-item w-100"
								:style="{top: item.top + 'rpx'}" v-for="(item, i) in imageList" :key="i">
								<view class="w-100 position-relative">
									<image class="w-100" :style="{zIndex: `${item.index - i}`}" mode="widthFix"
										:src="item.url"></image>
									<view
										:style="{fontSize: fontSzie + 'rpx', lineHeight: lineHeight + 'rpx', zIndex: `${item.index + 1}`}"
										class="w-100 d-flex a-center j-center text-white position-absolute left-0 bottom-0 font-weight5">
										{{item.title}}
									</view>
								</view>
							</view>
						</view>
					</template>
					<view v-if="imageList.length != 0" class="p-2 bg-white">
						<view class="d-flex a-center mb-2" v-for="(item, i) in imageList" :key="i">
							<u-input v-model="item.title" :placeholder="$t('请输入字幕内容')"></u-input>
							<view v-if="i == 0" @click="uploadImage"
								class="text-center ml-1 py-1 font px-3 rounded-1 main-bg-color text-white">
								{{$t('重传')}}
							</view>
							<view v-else @click="removeChild(i)"
								class="text-center py-1 ml-1 font px-3 rounded-1 main-bg-color text-white">
								{{$t('移除')}}
							</view>
						</view>
						<view
							class="rounded-1 py-1 px-3 main-bg-color main-bg-color-active text-white d-flex a-center j-center"
							@click="addLineSubtitles">
							{{$t('新增一行字幕')}}
						</view>
					</view>
					<view class="d-flex a-center j-sb p-5">
						<view class="text-center py-1 px-3 rounded-1 main-bg-color text-white"
							@click="imageShow = true">
							{{$t('选择图库图片')}} ->
						</view>
						<view class="text-center py-1 px-3 rounded-1 main-bg-color text-white"
							@click="subtitleShow = true">
							{{$t('选择字幕模板')}} ->
						</view>
					</view>
				</view>
			</view>
		</m-scroll-y>
		<!-- 保存按钮 -->
		<view class="position-fixed bottom-0 left-0 p-3 bg-white w-100">
			<view @click="saveImage" class="btons d-flex a-center j-center text-white letter-2">
				{{$t('保存')}}
			</view>
		</view>
		<!-- 弹出层 -->
		<subtitle-popup :show="subtitleShow" @close="subtitleShow = false"></subtitle-popup>
		<image-popup :show="imageShow" @close="imageShow = false"></image-popup>
	</view>
</template>

<script>
	import SubtitlePopup from './components/subtitle-popup.vue'
	import ImagePopup from './components/image-popup.vue'
	export default {
		components: {
			SubtitlePopup,
			ImagePopup
		},
		data() {
			return {
				imageList: [],
				fontSzie: 30,
				lineHeight: 64,
				imageUrl: '',
				maxLine: 10,
				height: 0,
				show: false,
				subtitleShow: false,
				imageShow: false
			}
		},
		methods: {
			// 获取图片box高度
			observeHeightChange() {
				uni.createSelectorQuery().select('#content').boundingClientRect(item => {
					this.height = item.height
					console.log(this.height)
				}).exec()
			},
			// 上传图片
			uploadImage() {
				this.imageList = []
				uni.chooseImage({
					count: 1,
					success: (res) => {
						console.log(res)
						this.imageUrl = res.tempFilePaths[0]
						this.imageList.push({
							url: this.imageUrl,
							top: 0,
							index: this.maxLine,
							title: ''
						})
						let time = setTimeout(() => {
							this.observeHeightChange()
							clearTimeout(time)
						}, 300)
					}
				})
			},
			// 新增一行字幕
			addLineSubtitles() {
				this.imageList.push({
					url: this.imageUrl && this.imageUrl,
					top: this.imageList.length * this.lineHeight,
					index: this.maxLine - this.imageList.length,
					title: ''
				})
			},
			// 根据下标移除某项
			removeChild(i) {
				this.imageList.splice(i, 1)
				this.imageList.forEach((item, i) => {
					item.top = i * this.lineHeight
					item.index = this.maxLine - i
				})
			},
			// 保存图片
			saveImage() {

			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - 88rpx - ${this.$store.state.browserFitHeight}px - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {

		.content {

			.image-box {

				.image-box-no {
					min-height: 710rpx;
					border: 2rpx dashed #fff;
				}

				.image-box-item {}
			}
		}

		.btons {
			font-size: 30rpx;
			border-radius: 50rpx;
			height: 88rpx;
			width: 690rpx;
			background: linear-gradient(to right, #85B6CA, #F9A4A0);
		}

		.btons:active {
			background: linear-gradient(to right, #85B6CA80, #F9A4A080);
		}
	}
</style>