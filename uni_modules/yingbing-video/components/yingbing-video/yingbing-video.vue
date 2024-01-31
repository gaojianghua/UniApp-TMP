<template>
	<view>
		<view
		:id="'yb-video' + dataId"
		class="yb-video"
		:prop="videoProp"
		:change:prop="ybVideo.propWatcher">
			<view class="ybplayer-slots">
				<view class="ybplayer-controls-slots">
					<slot name="controls"></slot>
				</view>
				<view class="ybplayer-default-slots">
					<slot></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataId: {
				type: String,
				default () {
					let mydate = new Date()
					return 'cms' + mydate.getMinutes() + mydate.getSeconds() + mydate.getMilliseconds() + Math.round(Math.random() * 10000)
				}
			},
			//播放链接
			src: {
				type: String,
				default: ''
			},
			//标题
			title: {
				type: String,
				default: ''
			},
			//封面
			poster: {
				type: String,
				default: ''
			},
			//视频格式
			formats: {
				type: String,
				default: 'auto'
			},
			//时长（单位：s）
			duration: {
				type: Number,
				default: 0
			},
			//静音
			muted: {
				type: Boolean,
				default: false
			},
			//自动播放
			autoplay: {
				type: Boolean,
				default: false
			},
			//初始播放时间 (单位是秒)
			initialTime: {
				type: Number,
				default: 0
			},
			//是否循环播放
			loop: {
				type: Boolean,
				default: false
			},
			//预加载属性
			preload: {
				type: String,
				default: 'auto' //auto/meta/none
			},
			//设置菜单
			settings: {
				type: String,
				default: 'all'
			},
			//控制栏
			controls: {
				type: Boolean,
				default: true
			},
			//展示进度条
			progressShow: {
				type: Boolean,
				default: true
			},
			//显示上一个视频按钮
			prevBtnShow: {
				type: Boolean,
				default: false
			},
			//显示下一个视频按钮
			nextBtnShow: {
				type: Boolean,
				default: false
			},
			//显示播放按钮
			playShow: {
				type: Boolean,
				default: true
			},
			//显示播放时间
			timeShow: {
				type: Boolean,
				default: true
			},
			//显示静音按钮
			volumeShow: {
				type: Boolean,
				default: true
			},
			//显示设置按钮
			settingShow: {
				type: Boolean,
				default: true
			},
			//显示全拼按钮
			fullscreenShow: {
				type: Boolean,
				default: true
			},
			//镜像画面
			mirror: {
				type: Boolean,
				default: false
			},
			//音量
			volume: {
				type: Number,
				default: 1.0
			},
			//倍率
			playbackRate: {
				type: Number,
				default: 1.0
			},
			//展示弹幕
			barrageShow: {
				type: Boolean,
				default: false
			},
			//弹幕库
			barrages: {
				type: Array,
				default () {
					return new Array
				}
			},
			//弹幕配置
			barrageConfig: {
				type: Object,
				default () {
					return new Object
				}
			},
			//弹幕显示上下间距
			barrageGap: {
				type: Number,
				default: 0
			},
			//是否直播
			isLive: {
				type: Boolean,
				default: false
			},
			//flv配置
			flvConfig: {
				type: Object,
				default () {
					return new Object
				}
			},
			//flv切片列表
			segments: {
				type: Array,
				default () {
					return new Array
				}
			},
			//非全屏时屏幕方向 仅APP支持
			generallyDirection: {
				type: String,
				default: 'portrait-primary'
			},
			//全屏时屏幕方向 仅APP支持
			fullscreenDirection: {
				type: String,
				default: 'landscape-primary'
			},
			//当视频尺寸与视频容器大小不一致时的处理
			objectFit: {
				type: String,
				default: 'contain'
			},
			crossOrigin: {
				type: String,
				default: ''
			},
			//是否将视频转化为Blob对象,仅支持mp4
			enableBlob: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			videoProp () {
				return {
					dataId: this.dataId,
					state: this.state,
					seekTime: this.seekTime,
					src: this.src,
					barrages: this.barrages,
					poster: this.poster,
					formats: this.formats,
					title: this.title,
					controls: this.controls,
					playShow: this.playShow,
					timeShow: this.timeShow,
					volumeShow: this.volumeShow,
					settingShow: this.settingShow,
					fullscreenShow: this.fullscreenShow,
					progressShow: this.progressShow,
					autoplay: this.autoplay,
					loop: this.loop,
					initialTime: this.initialTime,
					mirror: this.mirror,
					muted: this.muted,
					duration: this.duration,
					volume: this.volume,
					prevBtnShow: this.prevBtnShow,
					nextBtnShow: this.nextBtnShow,
					playbackRate: this.playbackRate,
					barrageShow: this.barrageShow,
					preload: this.preload,
					settings: this.settings,
					barrageConfig: JSON.stringify(this.barrageConfig),
					danmu: JSON.parse(JSON.stringify(this.danmu)),
					barrageRefresh: this.barrageRefresh,
					capture: this.captureEvent,
					pictureInPicture: this.pictureInPicture,
					fullscreen: this.fullscreen,
					pictureInPicture: this.pictureInPicture,
					isLive: this.isLive,
					flvConfig: this.flvConfig,
					segments: this.segments,
					objectFit: this.objectFit,
					crossOrigin: this.crossOrigin,
					enableBlob: this.enableBlob
				}
			}
		},
		data () {
			return {
				state: 'ready',
				seekTime: -1,
				danmu: {},
				fullscreen: false,
				pictureInPicture: false,
				barrageRefresh: -1,
				captureEvent: -1
			}
		},
		created () {
			// #ifdef APP-VUE
			plus.screen.lockOrientation(this.generallyDirection);
			// #endif
		},
		beforeDestroy() {
			// #ifdef APP-VUE
			plus.screen.lockOrientation(this.generallyDirection);
			// #endif
		},
		methods: {
			//触发事件
			onCanplay (e) {
				this.$emit('canplay', e)
			},
			onCanplaythrough (e) {
				this.$emit('canplaythrough', e)
			},
			onLoadeddata (e) {
				this.$emit('loadeddata', e)
			},
			onLoadedmetadata (e) {
				this.$emit('loadedmetadata', e)
			},
			onLoadstart (e) {
				this.$emit('loadstart', e)
			},
			onPlay (e) {
				this.$emit('play', e)
			},
			onPause (e) {
				this.$emit('pause', e)
			},
			onEnded (e) {
				this.$emit('ended', e)
			},
			onSeeking (e) {
				this.$emit('seeking', e)
			},
			onSeeked (e) {
				this.$emit('seeked', e)
			},
			onWaiting (e) {
				this.$emit('waiting', e)
			},
			onPlaying (e) {
				this.$emit('playing', e)
			},
			onProgress (e) {
				this.$emit('progress', e)
			},
			onTimeupdate (e) {
				this.$emit('timeupdate', e)
			},
			onVolumechange(e) {
				this.$emit('volumeChange', e)
			},
			onRatechange (e) {
				this.$emit('rateChange', e)
			},
			onAbort (e) {
				this.$emit('abort', e)
			},
			onErr (e) {
				this.$emit('error', e)
			},
			onEnterpictureinpicture (e) {
				this.$emit('enterpictureinpicture', e)
			},
			onLeavepictureinpicture (e) {
				this.$emit('leavepictureinpicture', e)
			},
			onCaptureFinish (e) {
				this.$emit('captureFinish', e)
			},
			onControlsChange (e) {
				this.$emit('controlsChange', e)
			},
			onPrevBtnClick (e) {
				this.$emit('prevBtnClick', e)
			},
			onNextBtnClick (e) {
				this.$emit('nextBtnClick', e)
			},
			
			// 操作事件
			play () {
				this.state = 'play'
			},
			pause () {
				this.state = 'pause'
			},
			toggle () {
				this.state = 'toggle'
			},
			stop () {
				this.state = 'stop'
			},
			seek (time) {
				this.seekTime = time
			},
			capture () {
				this.captureEvent = 1
			},
			drawBarrage (danmu) {
				this.danmu = danmu
			},
			refreshBarrage () {
				this.barrageRefresh = 1
			},
			switchFullscreen () {
				this.fullscreen = !this.fullscreen
				this.switchDirection()
			},
			switchPictureInPicture () {
				this.pictureInPicture = !this.pictureInPicture
			},
			launchPictureInPicture () {
				this.pictureInPicture = true
			},
			exitPictureInPicture () {
				this.pictureInPicture = false
			},
			launchFullscreen () {
				this.fullscreen = true
				this.switchDirection()
			},
			exitFullscreen () {
				this.fullscreen = false
				this.switchDirection()
			},
			switchDirection () {
				// #ifdef APP-VUE
				if ( this.fullscreen ) {
					plus.screen.lockOrientation(this.fullscreenDirection);
				} else {
					plus.screen.lockOrientation(this.generallyDirection);
				}
				// #endif
			},
			fullscreenChange (e) {
				this.fullscreen = e.fullscreen;
				this.$emit('fullscreenChange', e)
				this.switchDirection()
			},		
			//重置变量，方便下次使用
			resetData () {
				this.seekTime = -1
				this.danmu = {}
				this.state = 'ready'
				this.barrageRefresh = -1
				this.captureEvent = -1
			}
		}
	}
</script>
<!-- #ifdef APP-VUE || H5 -->
<script lang="renderjs" type="module" module="ybVideo">
	let myVideo
	import YBPlayer from "../modules/ybplayer.js"
	export default {
		data () {
			return {
				dp: null,
				dom: null,
				observe: null
			}
		},
		mounted () {
			this.initDom.bind(this)
			this.dom = document.getElementById('yb-video' + this.videoProp.dataId)
			// let links = document.getElementsByTagName('link')
			// let linkarr = []
			// for ( let i = 0; i < links.length; i++ ) {
			// 	if ( links[i].getAttribute('data-id') ) linkarr.push(links[i].getAttribute('data-id'))
			// }
			// if ( linkarr.indexOf('ybcss') == -1 ) {
			// 	const link = document.createElement('LINK')
			// 	link.setAttribute('data-id', 'ybcss')
			// 	link.rel = 'stylesheet'
			// 	link.href = './uni_modules/yingbing-video/static/yingbing-video/ybplayer.css'
			// 	document.head.appendChild(link)
			// }
			window.Hls = require("../modules/hls.min.js")
			window.flvjs = require("../modules/flv.min.js")
			window.YBBarrage = require("../modules/ybbarrage.js")
			this.switchVideo()
		},
		beforeDestroy() {
			if ( this.dp ) {
				this.dp.stop()
				this.dp = null
			}
		},
		methods: {
			initDom() {
				myVideo = ybVideo.init(document.getElementById('yb-video' + this.videoProp.dataId));
				// 观测更新的数据在 view 层可以直接访问到
				myVideo.setOption(this.videoProp);
			},
			propWatcher (newVal, oldVal={}) {
				if ( newVal.src != oldVal.src ) {
					if ( this.dp ) {
						this.dp.setConfig('src', newVal.src)
					} else {
						this.switchVideo()
					}
				}
				if ( JSON.stringify(newVal.segments) != JSON.stringify(newVal.segments) ) {
					if ( newVal.segments.length > 0 ) {
						if ( this.dp ) {
							this.dp.setConfig('segments', newVal.segments)
						} else {
							this.switchVideo()
						}
					}
				}
				if ( this.dp ) {
					if ( newVal.state != oldVal.state ) {
						if ( newVal.state == 'play' ) {
							this.dp.play()
						}
						if ( newVal.state == 'pause' ) {
							this.dp.pause()
						}
						if ( newVal.state == 'toggle' ) {
							this.dp.toggle()
						}
						if ( newVal.state == 'stop' ) {
							this.dp.stop()
							this.dp = null
						}
						this.triggerMethod('resetData')
					}
					if ( newVal.barrages.length > 0 && oldVal.barrages && oldVal.barrages.length == 0 ) {
						this.dp.setBarrages(newVal.barrages)
					}
					if ( newVal.seekTime != oldVal.seekTime ) {
						if ( newVal.seekTime > -1 ) {
							this.dp.seek(newVal.seekTime)
							this.triggerMethod('resetData')
						}
					}
					if ( newVal.barrageShow != oldVal.barrageShow ) {
						this.dp.setConfig('barrageShow', newVal.barrageShow)
					}
					if ( newVal.barrageConfig != oldVal.barrageConfig ) {
						this.dp.setConfig('barrageConfig',JSON.parse(newVal.barrageConfig))
					}
					if ( newVal.title != oldVal.title ) {
						this.dp.setConfig('title', newVal.title)
					}
					if ( newVal.playbackRate != oldVal.playbackRate ) {
						this.dp.setConfig('playbackRate', newVal.playbackRate)
					}
					if ( newVal.duration != oldVal.duration ) {
						this.dp.setConfig('duration', newVal.duration)
					}
					if ( newVal.volume != oldVal.volume ) {
						this.dp.setConfig('volume', newVal.volume)
					}
					if ( newVal.poster != oldVal.poster ) {
						this.dp.setConfig('poster', newVal.poster)
					}
					if ( newVal.controls != oldVal.controls ) {
						this.dp.setConfig('controls', newVal.controls)
					}
					if ( newVal.muted != oldVal.muted ) {
						this.dp.setConfig('muted', newVal.muted)
					}
					if ( newVal.progressShow != oldVal.progressShow ) {
						this.dp.setConfig('progressShow', newVal.progressShow)
					}
					if ( newVal.prevBtnShow != oldVal.prevBtnShow ) {
						this.dp.setConfig('prevBtnShow', newVal.prevBtnShow)
					}
					if ( newVal.nextBtnShow != oldVal.nextBtnShow ) {
						this.dp.setConfig('nextBtnShow', newVal.nextBtnShow)
					}
					if ( newVal.playShow != oldVal.playShow ) {
						this.dp.setConfig('playShow', newVal.playShow)
					}
					if ( newVal.timeShow != oldVal.timeShow ) {
						this.dp.setConfig('timeShow', newVal.timeShow)
					}
					if ( newVal.volumeShow != oldVal.volumeShow ) {
						this.dp.setConfig('volumeShow', newVal.volumeShow)
					}
					if ( newVal.settingShow != oldVal.settingShow ) {
						this.dp.setConfig('settingShow', newVal.settingShow)
					}
					if ( newVal.fullscreenShow != oldVal.fullscreenShow ) {
						this.dp.setConfig('fullscreenShow', newVal.fullscreenShow)
					}
					if ( newVal.loop != oldVal.loop ) {
						this.dp.setConfig('loop', newVal.loop)
					}
					if ( newVal.autoplay != oldVal.autoplay ) {
						this.dp.setConfig('autoplay', newVal.autoplay)
					}
					if ( newVal.preload != oldVal.preload ) {
						this.dp.setConfig('preload', newVal.preload)
					}
					if ( newVal.settings != oldVal.settings ) {
						this.dp.setConfig('settings', newVal.settings)
					}
					if ( JSON.stringify(newVal.danmu) != JSON.stringify(oldVal.danmu) ) {
						if ( newVal.danmu?.text ) {
							this.dp.drawBarrage(newVal.danmu)
						}
						this.triggerMethod('resetData')
					}
					if ( newVal.barrageRefresh != oldVal.barrageRefresh ) {
						if ( newVal.barrageRefresh > 0 ) {
							this.dp.refreshBarrage()
						}
						this.triggerMethod('resetData')
					}
					if ( newVal.capture != oldVal.capture ) {
						if ( newVal.capture > 0 ) {
							this.dp.capture()
						}
						this.triggerMethod('resetData')
					}
					if ( newVal.pictureInPicture != oldVal.pictureInPicture ) {
						this.dp.setConfig('pictureInPicture', newVal.pictureInPicture)
					}
					if ( newVal.mirror != oldVal.mirror ) {
						this.dp.setConfig('mirror', newVal.mirror)
					}
					if ( newVal.objectFit != oldVal.objectFit ) {
						this.dp.setConfig('objectFit', newVal.objectFit)
					}
					if ( newVal.objectFit != oldVal.objectFit ) {
						this.dp.setConfig('objectFit', newVal.objectFit)
					}
					if ( newVal.crossOrigin != oldVal.crossOrigin ) {
						this.dp.setConfig('crossOrigin', newVal.crossOrigin)
					}
					if ( newVal.enableBlob != oldVal.enableBlob ) {
						this.dp.setConfig('enableBlob', newVal.enableBlob)
					}
					if ( newVal.initialTime != oldVal.initialTime ) {
						this.dp.setConfig('initialTime', newVal.initialTime)
					}
					if ( newVal.fullscreen != oldVal.fullscreen ) {
						if ( newVal.fullscreen ) {
							this.dp.lanuchFullscreen()
						} else {
							this.dp.exitFullscreen()
						}
					}
				}
			},
			switchVideo () {
				if ( this.videoProp.src || this.videoProp.segments.length > 0 ) {
					if ( !this.dp && this.dom ) {
						this.dp = new YBPlayer({
							container: this.dom,
							src: this.videoProp.src,
							poster: this.videoProp.poster,
							title: this.videoProp.title,
							formats: this.videoProp.formats,
							controls: this.videoProp.controls,
							autoplay: this.videoProp.autoplay,
							loop: this.videoProp.loop,
							mirror: this.videoProp.mirror,
							preload: this.videoProp.preload,
							settings: this.videoProp.settings,
							duration: this.videoProp.duration,
							muted: this.videoProp.muted,
							progressShow: this.videoProp.progressShow,
							prevBtnShow: this.videoProp.prevBtnShow,
							nextBtnShow: this.videoProp.nextBtnShow,
							playShow: this.videoProp.playShow,
							timeShow: this.videoProp.timeShow,
							volumeShow: this.videoProp.volumeShow,
							settingShow: this.videoProp.settingShow,
							fullscreenShow: this.videoProp.fullscreenShow,
							initialTime: this.videoProp.initialTime,
							volume: this.videoProp.volume,
							playbackRate: this.videoProp.playbackRate,
							objectFit: this.videoProp.objectFit,
							crossOrigin: this.videoProp.crossOrigin,
							enableBlob: this.videoProp.enableBlob,
							pictureInPicture: this.videoProp.pictureInPicture,
							barrages: this.videoProp.barrages,
							barrageGap: this.videoProp.barrageGap,
							barrageShow: this.videoProp.barrageShow,
							barrageConfig: this.videoProp.barrageConfig,
							segments: this.videoProp.segments,
							flvConfig: this.videoProp.flvConfig,
							isLive: this.videoProp.isLive,
							enableBlob: this.videoProp.enableBlob
						})
						this.dp.on('canplay', e => {
							this.triggerMethod('onCanplay', e)
						})
						this.dp.on('canplaythrough', e => {
							this.triggerMethod('onCanplaythrough', e)
						})
						this.dp.on('loadeddata', e => {
							this.triggerMethod('onLoadeddata', e)
						})
						this.dp.on('loadedmetadata', e => {
							this.triggerMethod('onLoadedmetadata', e)
						})
						this.dp.on('loadstart', e => {
							this.triggerMethod('onLoadstart', e)
						})
						this.dp.on('play', e => {
							this.triggerMethod('onPlay', e)
						})
						this.dp.on('pause', e => {
							this.triggerMethod('onPause', e)
						})
						this.dp.on('ended', e => {
							this.triggerMethod('onEnded', e)
						})
						this.dp.on('seeking', e => {
							this.triggerMethod('onSeeking', e)
						})
						this.dp.on('seeked', e => {
							this.triggerMethod('onSeeked', e)
						})
						this.dp.on('timeupdate', e => {
							this.triggerMethod('onTimeupdate', e)
						})
						this.dp.on('waiting', e => {
							this.triggerMethod('onWaiting', e)
						}),
						this.dp.on('playing', e => {
							this.triggerMethod('onPlaying', e)
						})
						this.dp.on('progress', e => {
							this.triggerMethod('onProgress', e)
						})
						this.dp.on('abort', e => {
							this.triggerMethod('onAbort', e)
						})
						this.dp.on('error', e => {
							this.triggerMethod('onErr', e)
						})
						this.dp.on('volumechange', e => {
							this.triggerMethod('onVolumechange', e)
						})
						this.dp.on('ratechange', e => {
							this.triggerMethod('onRatechange', e)
						})
						this.dp.on('enterpictureinpicture', e => {
							this.triggerMethod('onEnterpictureinpicture', e)
						})
						this.dp.on('leavepictureinpicture', e => {
							this.triggerMethod('onLeavepictureinpicture', e)
						})
						this.dp.on('fullscreenChange', e => {
							this.triggerMethod('fullscreenChange', e)
						})
						this.dp.on('captureFinish', e => {
							// #ifdef H5
							this.triggerMethod('onCaptureFinish', e)
							// #endif
							// #ifndef H5
							this.triggerMethod('onCaptureFinish', e.base64)
							// #endif
						})
						this.dp.on('controlsChange', e => {
							this.triggerMethod('onControlsChange', e)
						})
						this.dp.on('prevBtnClick', e => {
							this.triggerMethod('onPrevBtnClick', e)
						})
						this.dp.on('nextBtnClick', e => {
							this.triggerMethod('onNextBtnClick', e)
						})
					}
				}
			},
			triggerMethod (name, args) {
				// #ifndef H5
				// UniViewJSBridge.publishHandler('onWxsInvokeCallMethod', {
				//   cid: this._$id,
				//   method: name,
				//   args: args
				// })
				this.$ownerInstance.callMethod(name, args)
				// #endif
				// #ifdef H5
				this[name](args)
				// #endif
			}
		}
	}
</script>
<!-- #endif -->

<style>
	@import url(/uni_modules/yingbing-video/components/modules/ybplayer.css);
	.yb-video {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 100%;
		background: inherit;
		background-color: inherit;
		background-image: inherit;
	}
</style>
