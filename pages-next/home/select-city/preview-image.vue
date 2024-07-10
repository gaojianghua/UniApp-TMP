<template>
	<view class="previewImage" :style="{ 'background-color': 'rgba(0,0,0,' + opacity + ')' }" v-if="show" @tap="close"
		@touchmove.stop.prevent @wheel.stop.prevent>
		<swiper class="swiper" :current="index" @change="swiperChange" :disable-touch="swiper" :circular="circular">
			<swiper-item v-for="(img, i) in imageList" :key="i" :id="'swiper-item-' + i" @touchmove="handletouchmove"
				@touchstart="handletouchstart" @touchend="handletouchend">
				<movable-area class="marea" scale-area v-if="file == 'image'">
					<movable-view :id="'movable-view-' + i" :key="'movable-view-' + i" class="mview" direction="all"
						:out-of-bounds="false" :inertia="true" damping="90" friction="2" scale="true" scale-min="1"
						scale-max="4" :scale-value="scale" @scale="onScale" @change="movableChange">
						<image :id="'image-' + i" :key="'movable-view' + i" class="image"
							:src="keyName ? img[keyName] : img" :style="{ transform: 'rotateZ(' + deg + 'deg)' }"
							:data-index="i" :data-src="keyName ? img[keyName] : img" mode="widthFix"
							@error="imageError($event, i)"></image>
						<view class="" style="color: white; position: absolute; top: 3%; font-size: 16px; right: 10px"
							v-if="imageDetail.stepOnCount != 0">
							被踩原因：
							<span v-for="(iem, index) in imageDetail.downMsg" :key="index">{{ iem }};</span>
						</view>
					</movable-view>
				</movable-area>
				<!-- #ifdef APP-PLUS -->
				<view @tap="close" v-if="file == 'video'" v-html="imgVideo(keyName ? img[keyName] : img)"
					style="height: 100%; width: 100%"></view>
				<!-- <video
					v-if="file == 'video'"
					:src="img"
					:autoplay="true"
					:controls="false"
					:enable-progress-gesture="false"
					:show-fullscreen-btn="false"
					:show-center-play-btn="false"
					:vslide-gesture-in-fullscreen="false"
					:vslide-gesture="false" 
				/> -->
				<!-- #endif -->
				<!-- #ifndef APP-PLUS -->
				<!-- <view @tap="close" v-if="file == 'video'" v-html="imgVideo(img)" style="height: 100%;width: 100%;"></view> -->
				<video v-if="file == 'video'" :src="keyName ? img[keyName] : img" :autoplay="true" :controls="false"
					:enable-progress-gesture="false" :show-fullscreen-btn="false" :show-center-play-btn="false"
					:vslide-gesture-in-fullscreen="false" :vslide-gesture="false" />
				<!-- #endif -->
			</swiper-item>
		</swiper>
		<view id="videoplayer" style="height: 100%; width: 100%"></view>
		<view class="page" v-if="imageList.length > 0">
			<text class="text">{{ index + 1 }} / {{ imageList.length }}</text>
		</view>
	</view>
</template>

<script>
	// import urPopup from '@/components/urpopup.vue';
	// import urInput from '@/components/urinput.vue';
	// import { fileType } from '@/config/fileType.js';
	export default {
		name: 'ksj-previewImage', //插件名称
		props: {
			imgdefault: {
				//图片列表
				type: Array,
				required: true,
				default: () => {
					return [];
				}
			},
			// 对象字典
			keyName: {
				type: String,
				default: ''
			},
			// descs: {
			//   //描述列表
			//   type: Array,
			//   required: false,
			//   default: () => {
			//     return [];
			//   }
			// },
			//透明度,0到1之间。
			opacity: {
				type: Number,
				default: 0.9
			},
			// 设为封面
			saveBtn: {
				type: Boolean,
				default: false
			},
			// 删除
			rotateBtn: {
				type: Boolean,
				default: false
			},
			//循环预览
			circular: {
				type: Boolean,
				default: false
			},
			// 是否可以点踩点赞
			cmment: {
				type: Boolean,
				default: false
			},
			// 项目id
			prId: {
				type: String,
				default: ''
			},
			// prjType -->0检修，1环氧
			prjType: {
				type: Number,
				default: 0
			},
			// 图片id
			imgKey: {
				type: String,
				default: 'imgId'
			}
		},
		data() {
			return {
				swiper: false, //是否禁用
				show: false, //显示状态
				index: 0, //当前页
				deg: 0, //旋转角度
				time: 0, //定时器
				interval: 1000, //长按事件
				scale: 1, //缩放比例
				imageList: [], // 图片数据
				setopList: [], // 点踩列表
				file: 'image', // 文件类型
				imageDetail: {
					topCount: 0, // 点赞数量
					stepOnCount: 0, // 点踩数量
					top: false, // 顶
					stepOn: false // 踩
				}, // 点踩点赞数量
				sendFrom: {
					content: '', // 点踩内容
					imageId: '', // 图片编号
					isCancel: false, // 是否取消； true 取消，
					source: 1, // 来源 0红端 1绿端
					photographer: '' //拍摄人
				},
				stopFrom: {
					code: '',
					value: ''
				}, // 选择原因数据
				disabled: false // 是否打开了选择
			};
		},
		computed: {
			// 点赞颜色
			topColor() {
				return this.imageDetail.top ? '#ff0000' : '#fff';
			},
			// 点踩颜色
			stepColor() {
				return this.imageDetail.stepOn ? '#ff0000' : '#fff';
			}
		},
		methods: {
			touchmove(e) {
				console.log('/////////////////////////');
			},
			imgVideo(val) {
				// https://www.cnblogs.com/Opacity/p/6782777.html 地址
				return `<video
						id="img-preview-video"
						autoplay
						playsinline
						poster
						webkit-playsinline
						playsinline
						src='${val}' 
						style='height:100%'
					>
					</video>`;
			},
			timeupdate(e) {
				console.log(e, '**************');
			},
			//比例变化
			onScale(e) {},

			//长按事件相关内容---------开始-------------------
			//接触开始
			handletouchstart(e) {
				e.preventDefault();
				console.log('88888888888888888', e);
				var tchs = e.touches.length;
				if (tchs != 1) {
					return false;
				}
				return false;
			},
			//清除定时器
			handletouchend() {
				clearTimeout(this.time);
				if (this.time != 0) {
					//处理点击时间
				}
				return false;
			},
			//清除定时器
			handletouchmove() {
				clearTimeout(this.time);
				this.time = 0;
			},
			// 分享图片
			share() {
				// #ifndef H5
				let path = this.keyName ? this.imgdefault[this.index][this.keyName] : this.imgdefault[this.index];
				uni.showLoading({
					title: '分享中···'
				});
				const downloadTask = uni.downloadFile({
					url: path, //仅为示例，并非真实的资源
					success: res => {
						console.log(res);
						if (res.statusCode === 200) {
							uni.shareWithSystem({
								type: 'image',
								imageUrl: res.tempFilePath,
								success: () => {
									// 分享完成，请注意此时不一定是成功分享
									uni.hideLoading();
								},
								fail: () => {
									// 分享失败
									uni.hideLoading();
								}
							});
						} else {
							uni.showToast({
								title: '分享失败',
								icon: 'none'
							});
							uni.hideLoading();
						}
					},
					fail: err => {
						uni.showToast({
							title: '分享失败',
							icon: 'none'
						});
						uni.hideLoading();
					}
				});
				downloadTask.onProgressUpdate(res => {
					if (res.progress >= 100) {
						uni.hideLoading();
					}
				});
				// #endif
				// #ifdef H5
				this.save();
				// #endif
			},
			// 处理长按事件
			onLongPress(e) {
				var data = {
					index: this.index
				};
				this.$emit('longPress', data);
			},
			// 删除数据
			saveDetele() {
				this.$emit('saveDetele', this.index);
			},
			//长按事件相关内容---------结束-------------------

			//图片改变
			swiperChange(e) {
				var index = e.target.current; //更新当前图片index
				console.log(e);
				this.$nextTick(function() {
					this.scale = 1;
				});
				// 滑动图片的时候修改当前数据
				this.imageList.splice(index, 1, this.imgdefault[index]);
				this.index = index;
				// this.file = fileType(this.keyName ? this.imgdefault[index][this.keyName] : this.imgdefault[index]);
				this.$emit('swiperChange', this.index);
				this.imageComment();
			},

			//移动变化
			movableChange(e) {
				//console.log(e);
				/* if(this.old.scale <= 1){
				this.swiper=false;
			}else if(e.detail.x===0){
				this.swiper=false;
			} */
			},

			//保存
			save(e) {
				var _this = this;
				var src = this.keyName ? this.imgdefault[this.index][this.keyName] : this.imgdefault[this.index];
				//#ifdef MP-WEIXIN
				//提前向用户发起授权请求
				uni.authorize({
					scope: 'scope.writePhotosAlbum',
					success() {
						console.log('kxj-previewImage:允许储存');
						_this.downloadImg(src);
					}
				});
				//#endif

				//#ifdef APP-PLUS
				this.downloadImg(src);
				//#endif

				//#ifdef H5
				//非同源图片将直接打开
				var abtn = document.createElement('a');
				abtn.href = src;
				abtn.download = '';
				abtn.target = '_blank';
				abtn.click();
				//#endif
			},

			//下载并保存文件
			downloadImg(src) {
				//下载图片文件
				uni.showLoading({
					title: '大图提取中'
				});
				uni.downloadFile({
					url: src,
					success: function(res) {
						console.log('kxj-previewImage:下载成功');
						uni.hideLoading();
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								uni.showToast({
									title: '已保存至相册',
									duration: 1000
								});
							}
						});
					},
					fail: function() {
						uni.hideLoading();
						uni.showToast({
							title: '图片下载失败',
							icon: 'none',
							duration: 1000
						});
					}
				});
			},

			//旋转
			rotate(e) {
				this.deg = this.deg == 270 ? 0 : this.deg + 90;
			},
			//打开 e 打开当前的元素
			open(e) {
				console.log(this.imgdefault);
				if (!Array.isArray(this.imgdefault) || this.imgdefault.length <= 0) {
					uni.showToast({
						title: '没有图片信息',
						icon: 'none'
					});
					return;
				}
				uni.hideTabBar();
				// 没有船当前数组的索引默认为0
				if (typeof e != 'number') {
					e = 0;
				}
				this.index = e;
				this.imageList = this.imgdefault.map((code, index) => {
					// 图片懒加载
					return index == e ? code : this.daleultFunc();
				});
				this.show = true;
				// this.file = fileType(this.keyName ? this.imgdefault[this.index][this.keyName] : this.imgdefault[this
				// 	.index]);
				this.sendFrom.photographer = this.imgdefault[this.index].photographer || this.imgdefault[this.index]
					.createBy;
				var videoContext = uni.createVideoContext('img-preview-video');
				console.log(videoContext);
				this.imageComment();
			},
			//关闭
			close(e) {
				if (this.disabled) return;
				this.show = false;
				this.index = 0; //当前页
				this.deg = 0; //旋转角度
				this.time = 0; //定时器
				this.interval = 1000; //长按事件
				this.scale = 1; //缩放比例
				uni.showTabBar();
			},
			// 图片加载失败默认回调
			imageError(e, index) {
				console.log(e, index);
				// 图片
				this.imageList.splice(index, 1, this.daleultFunc());
				this.$emit('errorImage', index);
			},
			// 默认站位图
			daleultFunc() {
				let img = '';
				if (this.defaultImg) img = this.defaultImg;
				else img = '/static/locality/imagedefault.png';
				if (this.keyName) {
					return {
						[this.keyName]: img
					};
				} else {
					return img;
				}
			},
			// 关门弹窗
			resetting() {
				this.sendFrom.content = '';
				this.stopFrom.code = '';
				this.disabled = false;
				this.$refs.setopContentRef.colse();
			},
			// 确认
			caffirm() {
				if (!this.sendFrom.content) {
					uni.showToast({
						title: '请填写原因',
						icon: 'none'
					});
					return;
				}
				// this.addImageComment();
			},
			// 选择点踩原因
			changeStop(item) {
				this.sendFrom.content = item.value;
				this.stopFrom.code = item.code;
				if (item.code == '99') this.sendFrom.content = '';
			},
			// 点踩或者点赞
			async stopOnTopImage(type) {

				if (!this.cmment) return;
				let imageId = this.imageList[this.index];
				if (!imageId[this.imgKey]) return;
				this.sendFrom.imageId = imageId[this.imgKey];
				this.sendFrom.opType = type;
				// 点踩
				if (type == 0 && !this.imageDetail.stepOn) {
					try {
						if (this.setopList.length <= 0) {
							let res = await sysDictData({
								data: ['stop']
							});
							res.result.forEach(code => {
								if (code.dictCode == 'stop') this.setopList = code.sysDictDatas;
							});
						}
						this.$refs.setopContentRef.open({});
					} catch (e) {
						//TODO handle the exception
						this.setopList = [{
							code: '99',
							value: '其它'
						}];
						this.$refs.setopContentRef.open({});
					}
					this.disabled = true;
					return;
				}
				// this.addImageComment();
			},
			/**
			 * 时间： 2024/5/7，An
			 * 功能： 点踩点赞
			 * 接口: api/Project/Add_Image_Comment
			 * 参数： 'prjId'-->项目id,content-->点踩内容,opType 0踩，1点, imageId -->图片编号,prjType -->0检修，1环氧 isCancel 是否取消 true 取消  photographer 拍摄 人
			 */
			// addImageComment: debounce(function() {
			// 	if (!this.cmment) return;
			// 	console.log(this)
			// 	let {
			// 		imgdefault,
			// 		prId,
			// 		index
			// 	} = this;

			// 	if (!this.keyName) return;
			// 	let data = {
			// 		...this.sendFrom,
			// 		prjId: prId ? prId : imgdefault[index].prjId,
			// 		prjType: this.prjType
			// 	};
			// 	console.log(data)
			// 	// 点踩
			// 	if (this.sendFrom.opType == 0) {
			// 		if (this.imageDetail.stepOn) data.isCancel = true;
			// 		else data.isCancel = false;
			// 	}
			// 	// 点赞
			// 	if (this.sendFrom.opType == 1) {
			// 		if (this.imageDetail.top) data.isCancel = true;
			// 		else data.isCancel = false;
			// 	}
			// 	this.$http
			// 		.post({
			// 			method: 'api/Project/Add_Image_Comment',
			// 			data: data
			// 		})
			// 		.then(res => {
			// 			this.imageComment();
			// 			this.resetting();
			// 		});
			// }, 300),
			/**
			 * 时间： 2024/5/7，An
			 * 功能： 获取点踩点赞数量
			 * 接口: api/Project/Get_Image_Comment
			 * 参数：imageId -->图片编号
			 */
			imageComment() {
				// if(!this.cmment) return
				// if(!this.prId) return
				if (!this.keyName) return;
				let imageId = this.imageList[this.index];
				if (!imageId[this.imgKey]) return;
				this.$http
					.post({
						method: 'api/Project/Get_Image_Comment',
						data: {
							imageId: imageId[this.imgKey]
						}
					})
					.then(res => {
						if (res.data) this.imageDetail = res.data;
					})
					.catch(err => {
						// if (res.data)
						this.imageDetail = {
							topCount: 0, // 点赞数量
							stepOnCount: 0, // 点踩数量
							isCanDel: false,
							top: false, // 顶
							stepOn: false // 踩
						};
					});
			}
		}
	};
</script>

<!--使用scss,只在本组件生效-->
<style lang="scss" scoped>
	.ur-setop-content {
		padding: 20rpx;
	}

	.ur-screen-button {
		display: flex;
		justify-content: space-between;
		border-top: 20rpx solid #233232;
		margin: 20rpx 0;

		.ur-button-resetting {
			padding-top: 20rpx;
			text-align: center;
			width: 50%;
			color: #3a3a3a;
			font-weight: 400;
		}

		.ur-button-resetting+.ur-button-resetting {
			border-left: 20rpx solid #233232;
			color: #3a3a3a;
		}
	}

	.ur-setop-scroll {
		max-height: 950rpx;
	}

	.ur-setop-input {
		margin-bottom: 20rpx;
		background-color: #F9F9F9;
	}

	.ur-setop-content-cative {
		// background-color: $app-system-color;
		color: #2E2E45;
	}

	.ur-setop-content+.ur-setop-content {
		border-top: 1px solid rgba(100, 100, 100, 0.5);
	}

	cover-view {
		color: #fff;
		width: 100%;
		height: 90vh;
		background-color: red;
		pointer-events: auto;
		margin-top: 300px;
	}

	.previewImage {
		z-index: 999;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #000000;
		user-select: none;

		.swiper {
			width: 100%;
			height: 100%;

			.marea {
				height: 100%;
				width: 100%;
				position: fixed;
				overflow: hidden;

				.mview {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: auto;
					min-height: 100%;

					.image {
						width: 100%;
						position: relative;
					}
				}
			}
		}

		.page {
			position: absolute;
			width: 100%;
			top: 20rpx;
			text-align: center;

			.text {
				color: #fff;
				font-size: 26rpx;
			}
		}

		.ur-preview-save {
			position: fixed;
			bottom: 0;
			display: flex;
			justify-content: space-around;
			width: 100%;
			background: rgba(0, 0, 0, 0.6);
			padding-bottom: 20rpx;
		}

		.save {
			text-align: center;
			padding: 10rpx;

			.text {
				color: #fff;
			}

			.text:active {
				background-color: rgba(100, 100, 100, 0.5);
			}
		}

		.desc {
			position: absolute;
			top: 0;
			width: 100%;
			padding: 5rpx 10rpx;
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			background-color: rgba(0, 0, 0, 0.5);
			color: #fff;
			font-size: 28rpx;
			letter-spacing: 3rpx;
			user-select: none;
		}

		video {
			position: absolute;
			top: 0;
			height: 100vh;
			width: 100vw;
			object-fit: fill;
		}
	}
</style>