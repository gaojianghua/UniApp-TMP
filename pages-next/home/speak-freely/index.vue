<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.畅所欲言" i18n></m-navbar>
		<!-- 内容区域 -->
		<!-- <m-scroll-y :isLoading="isLoading" i18n :scrollStyle="scrollStyle" :load="load" bgColor="transparent"
			@loadmore="loadmore" @onRefresh="onRefresh">
			<u-empty v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
				icon="http://cdn.uviewui.com/uview/empty/list.png">
			</u-empty>
			<view v-if="list.length != 0" class="goods-list px-2">
				<view class="goods-item"
					v-for="(item, i) in list" :key="i" @click.stop="openDetail(item)">
					
				</view>
			</view>
		</m-scroll-y> -->
		<view>
			<uni-card title="操作文件">
				<view class="audio-file-box">
					<uni-easyinput v-model="waterPath" placeholder="水印文件路径"></uni-easyinput>
					<button style="margin-left: 10px;" type="primary" @click="selectImageFile">选择水印文件</button>
				</view>
				<view class="audio-file-box">
					<uni-easyinput v-model="videoPath" placeholder="视频文件路径"></uni-easyinput>
					<button style="margin-left: 10px;" type="primary" @click="selectVideoFile">选择视频文件</button>
				</view>
				<view style="margin-bottom: 5px;"><text
						style="color: #999999; font-size: 14px;">水印请选择.png，视频请选择.mp4文件</text></view>
				<view><text style="color: #999999; font-size: 14px;">转换后的文件路径：{{dirPath}}</text></view>
			</uni-card>
			<uni-card title="视频操作">
				<button type="primary" @click="transformVideo">视频转码</button>
				<button type="primary" @click="extractVideo">从视频文件抽取视频（无声音）</button>
				<button type="primary" @click="mixAudioVideo">音视频合成</button>
				<button type="primary" @click="cutVideo">视频剪切</button>
				<button type="primary" @click="concatVideo">视频拼接</button>
				<button type="primary" @click="screenShot">视频封面</button>
				<button type="primary" @click="frame2Image">视频某一帧的图片</button>
				<button type="primary" @click="video2Image">视频转图片</button>
				<button type="primary" @click="waterMarkImage">添加水印图片</button>
				<button type="primary" @click="video2Gif">视频转成Gif</button>
				<!-- <button type="primary" @click="screenRecord">屏幕录制</button> -->
				<button type="primary" @click="image2Video">图片合成视频</button>
				<button type="primary" @click="multiVideo">多画面拼接</button>
				<button type="primary" @click="reverseVideo">视频反序倒播</button>
				<button type="primary" @click="denoiseVideo">视频降噪</button>
				<button type="primary" @click="picInPicVideo">画中画</button>
				<button type="primary" @click="videoScaleMultiple">视频倍数缩放</button>
				<button type="primary" @click="videoScaleWidthHeight">视频宽高缩放</button>
				<button type="primary" @click="videoSpeed">视频倍速播放</button>
				<button type="primary" @click="video2Yuv">视频转yuv</button>
				<button type="primary" @click="yuv2H264">YUV转H264</button>
				<button type="primary" @click="video2HLS">视频切片</button>
				<button type="primary" @click="hls2Video">切片合成视频</button>
				<button type="primary" @click="videoParams">参数调节(亮度，对比度，饱和度)</button>
				<button type="primary" @click="videoRotation">视频旋转</button>
				<button type="primary" @click="videoFlip">视频翻转</button>
				<button type="primary" @click="videoInfo">获取视频信息</button>
				<button type="primary" @click="compress">视频压缩</button>
				<button type="primary" @click="rtmpRegister">注册推流服务</button>
				<button type="primary" @click="rtmpStart">开始推流</button>
				<button type="primary" @click="rtmpClose">关闭推流</button>
				<button type="primary" @click="logStr = ''">清空日志</button>
			</uni-card>
			<uni-card class="uni-card-box" title="日志">
				<view><text style="font-size: 14px; flex-wrap: wrap;">{{logStr}}</text></view>
			</uni-card>
		</view>
	</view>
</template>

<script>
	const mediaPickerModule = uni.requireNativePlugin("leven-mediaPicker-MediaPickerModule");
	const commonModule = uni.requireNativePlugin("leven-ffmpeg-CommonModule");
	const module = uni.requireNativePlugin("leven-ffmpeg-VideoModule");
	export default {
		data() {
			return {
				// 水印文件
				waterPath: "",
				// 视频文件
				videoPath: "",
				//转换后文件所在目录
				dirPath: "/storage/emulated/0/DCIM/Camera/",
				// 当前选择的文件名称
				audioName: "",
				logStr: ""
			}
		},
		onLoad() {},
		methods: {
			// 选择水印文件
			selectImageFile() {
				mediaPickerModule.image({
					suffix: [".png", ".jpg"],
					maxCount: 1
				}, res => {
					this.writeLog(JSON.stringify(res))
					if (res.code == 0 && res.data && res.data.files && Array.isArray(res.data.files) && res.data
						.files.length > 0) {
						this.waterPath = res.data.files[0].path;
					}
				})
			},
			// 选择视频文件
			selectVideoFile() {
				mediaPickerModule.video({
					suffix: [".mp4"],
					maxCount: 1
				}, res => {
					this.writeLog(JSON.stringify(res))
					if (res.code == 0 && res.data && res.data.files && Array.isArray(res.data.files) && res.data
						.files.length > 0) {
						this.videoPath = res.data.files[0].path;
					}
				})
			},
			// 视频转码
			transformVideo() {
				module.transformVideo({
					//源文件
					src: this.videoPath,
					// 目标文件
					target: this.dirPath + "转码后的视频.mp4"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 抽取视频
			extractVideo() {
				module.extractVideo({
					//源文件
					src: this.videoPath,
					// 目标文件
					target: this.dirPath + "抽取后的视频.mp4"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 音视频合成
			mixAudioVideo() {
				module.mixAudioVideo({
					//视频源文件
					videoSrc: this.dirPath + "抽取后的视频.mp4",
					//音频源文件
					audioSrc: this.dirPath + "抽取音频后的音频.aac",
					// 目标文件
					target: this.dirPath + "音视频合成后的视频.mp4"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 视频剪切
			cutVideo() {
				module.cutVideo({
					//源文件
					src: this.videoPath,
					// 目标文件
					target: this.dirPath + "剪切后的视频.mp4",
					// 剪切开始时间（单位：秒）
					startTime: 0,
					// 剪切时长（单位：秒）
					duration: 5,
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 视频拼接
			concatVideo() {
				module.concatVideo({
					//源文件
					src: this.videoPath,
					// 拼接的视频
					append: this.videoPath,
					// 目标文件
					target: this.dirPath + "拼接后的视频.mp4"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 视频封面
			screenShot() {
				module.screenShot({
					//源文件
					src: this.videoPath,
					// 目标文件
					target: this.dirPath + "视频的截图.jpg",
					// 截图宽度，可以不传，默认：0（按视频宽度）
					width: 0,
					// 截图高度，可以不传，默认：0（按视频高度）
					height: 0
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 视频某一帧的图片
			frame2Image() {
				module.frame2Image({
					//源文件
					src: this.videoPath,
					// 目标文件
					target: this.dirPath + "视频某一帧的图片的截图.jpg",
					// 某一帧的时间，格式：hh:mm:ss.xxx
					time: "00:00:05.123"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 视频转图片
			video2Image() {
				module.video2Image({
					//源文件
					src: this.videoPath,
					// 目标文件夹
					target: this.dirPath + "video2Image/",
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 添加水印图片
			waterMarkImage() {
				console.log(2)
				let time = Date.now()
				module.waterMarkImage({
					//源文件
					src: this.videoPath,
					//水印文件
					water: this.waterPath,
					// 目标文件夹
					target: this.dirPath + time + "test.mp4",
					// 水印位置,1.左上角（默认），2.右上角，3.右下角，4.左下角
					position: 2
				}, res => {
					console.log(3)
					this.writeLog(JSON.stringify(res))
				})
			},
			// 视频转gif
			video2Gif() {
				module.video2Gif({
					//源文件
					src: this.videoPath,
					// 目标文件
					target: this.dirPath + "视频转gif后的图片.gif",
					//开始时间，单位：秒
					startTime: 0,
					// 时长，单位：秒
					duration: 5
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 图片转视频
			image2Video() {
				module.image2Video({
					//源文件(图片列表的文件夹)
					src: this.dirPath + "video2Image/",
					// 目标文件
					target: this.dirPath + "图片转视频后的视频.mp4",
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 多画面拼接
			multiVideo() {
				module.multiVideo({
					//源文件
					src: this.videoPath,
					//要拼接的文件
					append: this.videoPath,
					// 目标文件
					target: this.dirPath + "多画面拼接后的视频.mp4",
					// 布局方向,1.横向拼接，2.垂直拼接
					direction: 1
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 视频反序倒播
			reverseVideo() {
				module.reverseVideo({
					//源文件
					src: this.videoPath,
					// 目标文件
					target: this.dirPath + "视频反序倒播后的视频.mp4"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 视频降噪
			denoiseVideo() {
				module.denoiseVideo({
					//源文件
					src: this.videoPath,
					// 目标文件
					target: this.dirPath + "视频降噪后的视频.mp4"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 画中画
			picInPicVideo() {
				module.picInPicVideo({
					//源文件
					src: this.videoPath,
					//画中画文件
					append: this.videoPath,
					// 画中画宽度
					width: 300,
					// 画中画高度
					height: 200,
					// 画中画位置,1.左上角（默认），2.右上角，3.右下角，4.左下角
					position: 2,
					// 目标文件
					target: this.dirPath + "画中画后的视频.mp4"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 视频倍数缩放
			videoScaleMultiple() {
				module.videoScaleMultiple({
					//源文件
					src: this.videoPath,
					// 类型，1.缩小，2.放大
					type: 1,
					// 缩放的倍数
					value: 2,
					// 目标文件
					target: this.dirPath + "视频倍数缩放后的视频.mp4"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 视频宽高缩放
			videoScaleWidthHeight() {
				module.videoScaleWidthHeight({
					//源文件
					src: this.videoPath,
					// 宽度，-1.高度等比例缩放
					width: 200,
					// 高度,-1.宽度等比例缩放
					height: 300,
					// 目标文件
					target: this.dirPath + "视频宽高缩放后的视频.mp4"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 视频倍数播放
			videoSpeed() {
				module.videoSpeed({
					//源文件
					src: this.videoPath,
					// 播放速度，取值范围：[0.25,4] 小于1快速播放，大于1慢速播放
					speed: 2,
					// 目标文件
					target: this.dirPath + "视频倍数播放后的视频.mp4"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 视频转YUV
			video2Yuv() {
				module.video2Yuv({
					//源文件
					src: this.videoPath,
					// 目标文件
					target: this.dirPath + "视频转YUV后的文件.yuv"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// YUV转H264
			yuv2H264() {
				module.yuv2H264({
					//源文件
					src: this.dirPath + "视频转YUV后的文件.yuv",
					// 转换后的宽度，默认：720
					width: 720,
					// 转换后的高度，默认：1280
					height: 1280,
					// 目标文件
					target: this.dirPath + "YUV转H264后的文件.h264"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 视频切片
			video2HLS() {
				module.video2HLS({
					//源文件
					src: this.videoPath,
					// 切片时长
					splitTime: 5,
					// 目标文件
					target: this.dirPath + "hls/切片文件.m3u8"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 切片合成视频
			hls2Video() {
				module.hls2Video({
					//切片文件
					src: this.dirPath + "hls/切片文件.m3u8",
					// 目标文件
					target: this.dirPath + "切片合成的视频后的视频.mp4"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 视频参数调节
			videoParams() {
				module.videoParams({
					//源文件
					src: this.videoPath,
					// 亮度，有效值[-1.0,1.0]，默认：0
					bright: 0.1,
					//对比度，有效值[-2.0,2.0]，默认：0
					contrast: 0.9,
					// 饱和度,有效值[0,3.0]，默认：1
					saturation: 3,
					// 目标文件
					target: this.dirPath + "视频参数调节后的视频.mp4"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 视频旋转
			videoRotation() {
				module.videoRotation({
					//源文件
					src: this.videoPath,
					// 旋转类型，1.顺时针旋转画面90度，2.逆时针旋转画面90度，3.顺时针旋转画面90度再水平翻转， 0.逆时针旋转画面90度水平翻转
					transpose: 1,
					// 目标文件
					target: this.dirPath + "视频旋转后的视频.mp4"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 视频翻转
			videoFlip() {
				module.videoFlip({
					//源文件
					src: this.videoPath,
					// 翻转类型，1.水平翻转，2.垂直翻转
					type: 1,
					// 目标文件
					target: this.dirPath + "视频翻转后的视频.mp4"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 获取视频信息
			videoInfo() {
				module.videoInfo({
					//源文件
					src: this.videoPath
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 视频压缩
			compress() {
				module.compress({
					//源文件
					src: this.videoPath,
					// 目标文件
					target: this.dirPath + "压缩后的视频.mp4",
					//帧率，默认原视频帧率
					fps: 30,
					// 码率，从0～500，越大码率越低，一般18～32效果较好，默认：30
					rate: 30,
					//分辨率，原视频分辨率
					size: [720, 1080]
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 注册推流服务
			rtmpRegister() {
				module.rtmpRegister({
					url: "rtmp://195964.push.tlivecloud.com/live/leven?txSecret=cce20f82e2a2ee9a0b93e37351e095d4&txTime=65E17D25"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 开始推流
			rtmpStart() {
				module.rtmpStart({
					// path: this.dirPath + "压缩后的视频.mp4"
					path: "/storage/emulated/0/Android/data/test.leven.uniplugin.com/video/1709201750210.mp4"
				}, res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 关闭推流
			rtmpClose() {
				module.rtmpClose(res => {
					this.writeLog(JSON.stringify(res))
				})
			},
			// 写日志
			writeLog(str) {
				console.log(str);
				// let logStr = uni.$lv.date.format(null, "yyyy-mm-dd hh:MM:ss") + " " + str + "\n";
				// this.logStr = logStr + this.logStr;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {

		.goods-list {

			.goods-item {}
		}
	}
</style>