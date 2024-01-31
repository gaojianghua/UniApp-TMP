#使用须知

* 1、这个播放器是利用原生h5<video>标签来实现的，所以只支持app-vue、h5
* 2、支持视频格式有ogg、mp4、webm、m3u8、flv
* 3、支持弹幕功能
* 4、有什么不懂可以加群 1087735942

#props属性
| 属性名 | 类型 | 默认值 | 可选值 | 说明 |
| :---: | :---: | :---: | :-----: | :----------: |
| dataId | String | ---- | ---- | 唯一id（ 不传入则默认随机ID） |
| src | String | ---- | ---- | 播放链接 |
| poster | String | ---- | ---- | 封面 |
| formats | String | auto | auto/mp4/ogg/webm/m3u8/flv | 视频格式（auto只能确定拥有后缀的播放链接，没有视频后缀的链接只能指定格式播放） |
| title | String | ---- | ---- | 视频标题（全屏后在顶部展示） |
| volume | Number | 1.0 | ---- | 音量 |
| duration | Number | 0 | ---- | 播放时长（当isLive为true时表现为直播已播放时长） |
| playShow | Boolean | true | true/false | 展示播放按钮 |
| timeShow | Boolean | true | true/false | 展示播放时间 |
| volumeShow | Boolean | true | true/false | 展示静音按钮 |
| settingShow | Boolean | true | true/false | 展示设置按钮 |
| fullscreenShow | Boolean | true | true/false | 展示全屏按钮 |
| prevBtnShow | Boolean | false | true/false | 展示切换上一个视频按钮 |
| nextBtnShow | Boolean | false | true/false | 展示切换下一个视频按钮 |
| initialTime | Number | 0 | ---- | 播放初始位置 (单位是秒) |
| playbackRate | Number | 1.0 | ---- | 播放倍速 |
| autoplay | Boolean | false | true/false | 自动播放 (新版的谷歌浏览器和IOS一样也不支持自动播放了，需要让用户在页面上操作之后才能进行播放，如果一定要自动播放，只能先设置为静音，然后让用户手动将静音关闭) |
| loop | Boolean | false | true/false | 循环播放 |
| preload | String | atuo | auto（加载所有资源）/meta（只加载元数据）/none（不加载） | 预加载（autoplay设置为true时忽略此属性） |
| muted | Boolean | false | true/false | 静音 |
| controls | Boolean | true | true/false | 显示控制栏 |
| settings | String | all | all（全部显示）/barrage（弹幕控制）,playbackRate（倍速列表）,mirror（镜像画面）,capture（截取画面）,pictureInPicture（画中画） | 控制栏设置菜单显示（all表示全部显示，不想全部显示但要显示多个以逗号分隔） |
| mirror | Boolean | false | true/false | 镜像画面 |
| progressShow | Boolean | true | true/false | 展示进度条 |
| barrageShow | Boolean | true | true/false | 展示弹幕 |
| barrages | Array | ---- | ---- | 弹幕列表 |
| barrageConfig | Number | 1.0 | ---- | 弹幕配置 |
| barrageGap | Number | 0 | ---- | 弹幕显示上下间距 |
| isLive | Boolean | false | true/false | 是否是直播流 |
| flvConfig | Object | ---- | ---- | flv配置 |
| segments | Array | ---- | ---- | flv切片列表 |
| fullscreenDirection | String | landscape-primary | auto/landscape-primary/portrait-primary/landscape-secondary/portrait-secondary | 全屏时设备方向 （只支持APP） |
| generallyDirection | String | portrait-primary | auto/landscape-primary/portrait-primary/landscape-secondary/portrait-secondary | 非全屏时设备方向 （只支持APP） |
| objectFit | String | contain | contain/fill/cover/none | 当视频大小与 video 容器大小不一致时，视频的表现形式。contain：包含，fill：填充，cover：覆盖，none：不处理 |
| crossOrigin | String | ---- | anoymous/use-credentials | 该枚举属性指明抓取相关图片是否必须用到CORS（跨域资源共享）。 支持CORS的资源 可在 canvas元素中被重用，而不会被污染。允许的值如下：anonymous：跨域请求会被执行，但是不发送凭证。use-credentials：跨域请求A cross-origin request会被执行，且凭证会被发送。|
| enableBlob | Boolean | false | true/false | 将视频转化为Blob对象（仅支持mp4） |

#event事件
| 事件名 | 参数 | 说明 |
| :---: | :---: | :------- |
| canplay | --- | 可以播放状态，但不保证后面可以流畅播放，视频总长度，尺寸信息可以从这里取到 （该事件只要视频发生加载就会触发，如果想在这个方法做一些操作，建议用loadedmetadata或loadeddata替代） |
| canplaythrough | --- | 可以正常播放且无需停顿和缓冲时触发。，视频总长度，尺寸信息可以从这里取到 （该事件只要视频发生加载就会触发，如果想在这个方法做一些操作，建议用loadedmetadata或loadeddata替代） |
| loadeddata | ---- | 加载视频当前帧时触发，视频总长度，尺寸信息可以从这里取到 |
| loadedmetadata | ---- | 元素据加载完毕，视频总长度，尺寸信息可以从这里取到 |
| loadstart | ---- | 开始加载视频时触发 |
| play | --- | 播放事件 |
| pause | --- | 暂停事件 |
| stop | --- | 停止事件 |
| ended | --- | 自然播放结束事件 |
| error | --- | 播放错误事件 |
| abort | --- | 播放中断事件 |
| timeupdate | --- | 播放进度更新事件 |
| waiting | --- | 加载中事件，当视频因为数据不足，需要停下来加载时会触发 |
| playing | --- | 继续播放事件，当视频因为数据不足停下来成功加载到数据之后继续播放时触发 |
| seeking | --- | 进行跳转进度操作事件 |
| seeked | --- | 完成跳转进度操作事件 |
| volumeChange | --- | 音量改变事件 |
| rateChange | --- | 播放倍速改变事件 |
| fullscreenChange | --- | 全屏切换事件（type为requestfullscreen表示为全屏API调用的全屏type为cssfullscreen表示css模拟的全屏） |
| controlsChange | --- | 控制栏显示\消失事件（仅在controls为true时有效） |
| enterpictureinpicture | --- | 进入画中画模式（仅支持H5）|
| leavepictureinpicture | --- | 退出画中画模式（仅支持H5）|
| captureFinish | --- | 截图完成事件（H5会返回blob类型和base64图片，app只返回base64）|
| prevBtnClick | --- | 点击切换上一个视频按钮事件 |
| nextBtnClick | --- | 点击切换下一个视频按钮事件 |

#内置方法
| 方法名 | 参数 | 说明 |
| :---: | :---: | :------- |
| play | --- | 播放 |
| pause | --- | 暂停 |
| toggle | --- | 播放/暂停 |
| stop | --- | 停止（注销视频） |
| seek | --- | 跳转位置（单位是s） |
| drawBarrage | --- | 绘制弹幕 |
| capture | --- | 截取画面 |
| switchFullscreen | --- | 开启/退出全屏（部分手机不允许用户直接调用全屏API，插件自动使用css模拟全屏替代） |
| launchFullscreen | --- | 开启全屏（部分手机不允许用户直接调用全屏API，插件自动使用css模拟全屏替代） |
| exitFullscreen | --- | 退出全屏 |
| switchPictureInPicture | --- | 切换画中画（仅支持H5） |
| launchPictureInPicture | --- | 开启画中画（仅支持H5） |
| exitPictureInPicture | --- | 退出画中画（仅支持H5） |


#弹幕（barrage）
| 属性名 | 类型  | 说明 |
| :---: | :---: | :------ |
| key | String | 弹幕的唯一标识 |
| time | Number | 弹幕出现的时间(单位：秒) |
| text | String | 弹幕文本内容 |
| fontSize | Number | 弹幕大小(单位：像素) |
| color | String | 弹幕颜色 |

#弹幕配置（barrageConfig）
| 属性名 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :------ |
| duration | Number | -1 | 弹幕动画的循环周期，-1 表示不循环播放 |
| speed | Number | 150 | 弹幕的运动速度 |
| fontSize | Number | 24 | 文字大小（单位：像素） |
| fontFamily | String | 'Microsoft Yahei' | 字体 |
| textShadowBlur | Number | 0.5 | 字体阴影扩散，有效值 >= 0 |
| opacity | Number | 1 | 透明度，有效值 0-1 |
| defaultColor | String | '#ffffff' | 默认颜色，与 CSS 颜色属性一致 |
| lineHeight | Number | 5 | 行间距 |
| overlap | Boolean | true | 防重叠 |
| playbackRate | Number | 1 | 播放倍速 |
| initialTime | Number | 0 | 播放初始时间 |

#flv切片列表（segments）
| 属性名 | 类型 | 说明 |
| :---: | :---: | :------ |
| duration | Number | 必填字段，表示段持续时间（以毫秒为单位 |
| filesize | Number | 可选字段，以字节为单位指示段文件大小 |
| url | String | 必填字段，指示段文件URL |

#flv配置（flvConfig）
| 属性名 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :------ |
| cors | Boolean | ---- | 是否启用CORS进行http提取 |
| withCredentials | Boolean | ---- | 是否对Cookie进行http提取 |
| hasAudio | Boolean | ---- | 流是否有音频轨道 |
| hasVideo | Boolean | ---- | 流中是否有视频轨道 |
| duration | Number | ---- | 总媒体持续时间（以毫秒为单位） |
| filesize | Number | ---- | 媒体文件的总文件大小，以字节为单位 |
| enableWorker | Boolean | false | 启用分离的线程进行转换（暂时不稳定） |
| enableWorker | Boolean | false | 启用分离的线程进行转换（暂时不稳定） |
| enableStashBuffer | Boolean | true | 启用IO隐藏缓冲区。如果您需要实时（最小延迟）进行实时流播放，则设置为false，但是如果网络抖动，则可能会停顿 |
| stashInitialSize | Number | 384KB | 表示IO暂存缓冲区的初始大小。默认值为384KB。指出合适的尺寸可以改善视频负载/搜索时间 |
| isLive | Boolean | false | 同样要isLive在MediaDataSource，如果忽略已经在MediaDataSource结构集合 |
| lazyLoad | Boolean | true | 如果有足够的数据可播放，则中止http连接 |
| lazyLoadMaxDuration | Number | 3 * 60 | 指示要保留多少秒的数据lazyLoad |
| lazyLoadRecoverDuration | Number | 30 | 指示lazyLoad恢复时间边界，以秒为单位 |
| deferLoadAfterSourceOpen | Boolean | true | 在MediaSourcesourceopen事件触发后加载。在Chrome上，在后台打开的标签页可能不会触发sourceopen事件，除非切换到该标签页 |
| autoCleanupSourceBuffer | Boolean | false | 对SourceBuffer进行自动清理 |
| autoCleanupMaxBackwardDuration | Number | 3 * 60 | 当向后缓冲区持续时间超过此值（以秒为单位）时，请对SourceBuffer进行自动清理 |
| autoCleanupMinBackwardDuration | Number | 2 * 60 | 指示进行自动清除时为反向缓冲区保留的持续时间（以秒为单位） |
| fixAudioTimestampGap | Boolean | true | 当检测到较大的音频时间戳间隙时，请填充无声音频帧，以避免A / V不同步 |
| accurateSeek | Boolean | false | 精确查找任何帧，不限于视频IDR帧，但可能会慢一些。可用的Chrome > 50，FireFox和Safari |
| seekType | String | 'range' | 'range'使用范围请求进行查找，或'param'在url中添加参数以指示请求范围 |
| seekParamStart | String | 'bstart' | 指示的搜索起始参数名称 seekType = 'param' |
| seekParamEnd | String | 'bend' | 指示的搜索结束参数名称 seekType = 'param' |
| rangeLoadZeroStart | Boolean | false | Range: bytes=0-如果使用范围查找，则发送首次负载 |
| customSeekHandler | Object | ---- | 指示自定义搜索处理程序 |
| reuseRedirectedURL | Boolean | false | 重复使用301/302重定向的url进行子序列请求，例如搜索，重新连接等 |
| referrerPolicy | String | 'no-referrer-when-downgrade' | 指示使用FetchStreamLoader时的推荐人策略 |
| headers | Object | ---- | 指示将添加到请求的其他标头 |

#插槽slots
| 名称 | 说明 |
| :---: | :------ |
| default | 默认插槽（该插槽的内容不随控制栏一起消失/显示） |
| controls | 控制栏插槽（该插槽的内容会随控制栏一起消失/显示，仅在controls为ture时有效） |

#快速开始
```html
	<!-- 引入播放器 -->
	<yingbing-video src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/a876efc0-4f35-11eb-97b7-0dc4655d6e68.mp4">
	</yingbing-video>
```

#自动播放
```html
	<!-- 新版的chrome浏览器和IOS一样，用户未进行任何操作时不能播放视频和音频，如果一定要自动播放，需要设置为静音模式，再让用户手动关闭静音 -->
	<yingbing-video autoplay muted src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/a876efc0-4f35-11eb-97b7-0dc4655d6e68.mp4"/>
```

#添加弹幕列表
```html
	<!-- 引入播放器 -->
	<yingbing-video :barrages="barrages" barrage-show src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/a876efc0-4f35-11eb-97b7-0dc4655d6e68.mp4"/>
```
```javascript
export default {
	data() {
		return {
			barrages: [{
				key: 'fctc651a9pm2j20bia8j',
				time: 1,
				text: '这是新增的一条弹幕',
				fontSize: 24,
				color: '#0ff',
			},{
				key: 'fctc651a9pm2j20bia8j',
				time: 1,
				text: '这是新增的一条弹幕',
				fontSize: 24,
				color: '#0ff',
			}]
		}
	}
}
```

#绘制弹幕
```html
	<!-- 引入播放器 -->
	<yingbing-video ref="video" barrage-show src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/a876efc0-4f35-11eb-97b7-0dc4655d6e68.mp4"/>
```
```javascript
export default {
	onReady () {
		setTimeout (() => {
			this.$refs.video.drawBarrage({
				text: '这是绘制的实时弹幕',
				color: '#ff0033',
				fontSize: 20,
				time: 12//不传time 则根据当前播放进度绘制弹幕出现时间
			})
		}, 5000)
	}
}
```

#截取画面
```html
	<!-- 引入播放器 -->
	<yingbing-video ref="video" @captureFinish="onCaptureFinish" src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/a876efc0-4f35-11eb-97b7-0dc4655d6e68.mp4"/>
	<button @tap="capture">截图</button>
```
```javascript
export default {
	methods: {
		capture () {
			this.$refs.video.capture()
		},
		//截图完成事件
		onCaptureFinish (e) {
			console.log(e)
		}
	}
}
```

#切换视频
```html
	<!-- 引入播放器 并显示切换下一个视频按钮 -->
	<yingbing-video next-btn-show @nextBtnClick="onNextBtnclick" :src="src"/>
```
```javascript
export default {
	data () {
		src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/a876efc0-4f35-11eb-97b7-0dc4655d6e68.mp4'
	},
	methods: {
		//切换下一个视频
		onNextBtnclick () {
			this.src = 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/a876efc0-4f35-11eb-97b7-0dc4655d6e68.mp4'
		}
	}
}
```

#使用插槽
```html
	<yingbing-video src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/a876efc0-4f35-11eb-97b7-0dc4655d6e68.mp4">
		<!-- 默认插槽 -->
		<div>加载中</div>
		<!-- 控制栏插槽 -->
		<template #controls>
			<div style="position:absolute;top:0;left:0;right:0;">视频标题</div>
		</template>
	</yingbing-video>
```