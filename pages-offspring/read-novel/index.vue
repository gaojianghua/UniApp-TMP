<!-- 搜‘根据需要更改’，需要根据实际项目更改的已经列出来了 -->
<!-- 重要事项：
	1.由于阅读页截取整行的需要，请确保文本格式和本插件中的text变量所示一致，即：！！！每一行的高度要一致！！！
	  如果要加内容，例如每一章开头加上章节名:'<h1>章节名</h1>',请确保所加的内容是单行高度的整数倍！！
	2.‘仅用于计算’的样式必须和阅读页样式一致，不然显示会有问题,
	3.字体必须是偶数，否则1.5倍行距的时候会无法截取到整行
 -->

<template>
	<view style="height: 100%;">
		<!-- 仅用于计算（结构和样式请和阅读页一致） -->
		<view class="container hidden" v-for="(item, i) in compose" :key="i">
			<!-- 顶部 -->
			<view class="header" :style="{height: `calc(88rpx + ${statusHeight}px)`}">
				<!-- 章节名等内容 -->
				<view class="chapter w-100" style="height: 88rpx;"></view>
			</view>
			<!-- 小说内容 -->
			<view id="content" class="content">
				<view class="inner-box" :style="{height: `${innerHeight}px`}">
					<!-- 动态ID或者类名在DOM无宽高的情况下会消失 -->
					<view v-if="i == 0" id="preChapter" class="book-inner" v-html="item.text"
						:style="{fontSize: `${fontSize}rpx`, lineHeight: `${lineHeight*fontSize}rpx`}">
					</view>
					<view v-if="i == 1" id="curChapter" class="book-inner" v-html="item.text"
						:style="{fontSize: `${fontSize}rpx`, lineHeight: `${lineHeight*fontSize}rpx`}">
					</view>
					<view v-if="i == 2" id="nextChapter" class="book-inner" v-html="item.text"
						:style="{fontSize: `${fontSize}rpx`, lineHeight: `${lineHeight*fontSize}rpx`}">
					</view>
				</view>
			</view>
			<!-- 底部 -->
			<view class="footer" :style="{height: `calc(88rpx + env(safe-area-inset-bottom))`}"></view>
		</view>
		<!-- 封面 层级第一 -->
		<view class="cover container d-flex a-center flex-column position-relative"
			:class="`container${background - 1}`" :style="{zIndex: 11, transform: `translate${cover.pageTranslate[turnType]}`, transition: `transform ${showAnimation?turnPageTime:0}s`,
			boxShadow:showShadow&&turnType===0?'0 0 10px 0 rgba(0,0,0,.4)':''}" @touchstart="coverTouchStart"
			@touchend="coverTouchEnd" @touchmove="coverTouchMove" @touchcancel="coverTouchcancel">
			<!-- 顶部三星图案 -->
			<view class="d-flex a-center w-100 j-sb position-absolute"
				:style="{top: `calc(30rpx + ${statusHeight}px)`}">
				<view style="width: 300rpx; height: 4rpx; background: #FA9C3E80;border-radius: 0 15rpx 15rpx 0;"></view>
				<view class="d-flex a-center">
					<u-icon class="mt-1" name="star-fill" size="16" color="#33C795"></u-icon>
					<u-icon class="mb-1" name="star-fill" size="22" color="#33C795"></u-icon>
					<u-icon class="mt-1" name="star-fill" size="16" color="#33C795"></u-icon>
				</view>
				<view style="width: 300rpx; height: 4rpx; background: #FA9C3E80;border-radius: 15rpx 0 0 15rpx;"></view>
			</view>
			<view :style="{height: `calc(130rpx + ${statusHeight}px)`}"></view>
			<u-image radius="6" width="300rpx" height="400rpx" :src="detail.img"></u-image>
			<view class="font-weight font-lg mt-2">
				{{detail.name}}
			</view>
			<view class="font-sm mt text-warning">
				{{detail.author}}
			</view>
			<view class="data">
				{{$t('评分')}}: {{detail.mark}} · {{$t('推荐')}}: {{detail.recommend}} · {{$t('热度')}}: {{detail.popular}}
			</view>
			<view class="type d-flex a-center mt-2">
				<view class="type-item mr-2" v-for="(item, i) in detail.types" :key="i">
					{{item}}
				</view>
			</view>
			<view class="px-3 text-i2 text-center mt-2">
				{{detail.intro}}
			</view>
		</view>
		<!-- ************************** -->
		<!-- 顶部区域 层级第二 -->
		<view class="header w-100 position-fixed top-0 left-0 index-1"
			:style="{height: `calc(88rpx + ${statusHeight}px)`}">
			<!-- 章节名等内容 -->
			<view class="chapter d-flex a-center pl-2 w-100" style="height: 88rpx;">
				<u-icon class="mr-1" name="arrow-left" size="14" color="#111" @click="$tools.Navigate.navigateBack()"></u-icon>
				<span>{{curPage.chapterName}}</span> 
			</view>
		</view>
		<!-- 阅读页（结构和样式请和仅用于计算元素一致） -->
		<!-- 上一页 层级第三 -->
		<view class="container" :class="`container${background - 1}`" :style="{zIndex: 3, transform: `translate${prePage.pageTranslate[turnType]}`, transition: `transform ${showAnimation?turnPageTime:0}s`,
			boxShadow:showShadow&&turnType===0?'0 0 10px 0 rgba(0,0,0,.4)':''}">
			<!-- 顶部占位 -->
			<view class="header" :style="{height: `calc(88rpx + ${statusHeight}px)`}"></view>
			<!-- 外层class="content"用于计算阅读部分的高度 -->
			<view class="content">
				<!-- 内层class="inner-box"利用innerHeight将内容截取至整行，防止文字不完整的情况出现 -->
				<view class="inner-box" :style="{height: `${innerHeight}px`}" v-if="prePage.canRead">
					<!-- 最里层class="book-inner"的用于获取文本总高度，计算总页数，注意不可以overflow:hidden -->
					<view class="book-inner" v-html="prePage.text" :style="{fontSize: `${fontSize}rpx`, lineHeight: `${lineHeight*fontSize}rpx`,color: `${background == 2 ? colorList[1] : colorList[0]}`,
						transform: `translateY(-${prePage.pageNum*innerHeight}rpx)`}">
					</view>
				</view>
				<view v-else class="d-flex flex-column a-center j-center h-100" @click.stop="$tools.Navigate.navigateTo('/pages-next/mine/member-center/index')">
					<view class="px-3 main-text-color">{{$t('当前为VIP章节，请开通VIP服务后继续阅读')}}</view>
					<view class="mt-10 btns text-white d-flex a-center j-center">
						{{$t('去开通')}}
					</view>
				</view>
			</view>
		</view>
		<!-- 本页 层级第四 -->
		<view class="container" :class="`container${background - 1}`" :style="{zIndex: 2, transform: `translate${curPage.pageTranslate[turnType]}`, transition: `transform ${showAnimation?turnPageTime:0}s`,
			boxShadow:showShadow&&turnType===0?'0 0 10px 0 rgba(0,0,0,.4)':''}" @touchstart="touchStart" @touchend="touchEnd"
			@touchmove="touchMove" @touchcancel="touchcancel">
			<!-- 顶部占位 -->
			<view class="header" :style="{height: `calc(88rpx + ${statusHeight}px)`}"></view>
			<!-- 阅读区域 -->
			<view class="content">
				<view class="inner-box" :style="{height: `${innerHeight}px`}" v-if="curPage.canRead">
					<view class="book-inner" v-html="curPage.text" :style="{fontSize: `${fontSize}rpx`, lineHeight: `${lineHeight*fontSize}rpx`,color: `${background == 2 ? colorList[1] : colorList[0]}`,
						transform: `translateY(-${curPage.pageNum*innerHeight}rpx)`}">
					</view>
				</view>
				<view v-else class="d-flex flex-column a-center j-center h-100" @click.stop="$tools.Navigate.navigateTo('/pages-next/mine/member-center/index')">
					<view class="px-3 main-text-color">{{$t('当前为VIP章节，请开通VIP服务后继续阅读')}}</view>
					<view class="mt-10 btns text-white d-flex a-center j-center">
						{{$t('去开通')}}
					</view>
				</view>
			</view>
		</view>
		<!-- 下一页 层级第五 -->
		<view class="container" :class="`container${background - 1}`" :style="{zIndex: 1, transform: `translate${nextPage.pageTranslate[turnType]}`,transition: `transform ${showAnimation?turnPageTime:0}s`,
			boxShadow:showShadow&&turnType===0?'0 0 10px 0 rgba(0,0,0,.4)':''}">
			<view class="" :style="{height: statusHeight + 'px'}"></view>
			<!-- 顶部占位 -->
			<view class="header" :style="{height: `calc(88rpx + ${statusHeight}px)`}"></view>
			<!-- 阅读区域 -->
			<view class="content">
				<view class="inner-box" :style="{height: `${innerHeight}px`}" v-if="nextPage.canRead">
					<view class="book-inner" v-html="nextPage.text" :style="{fontSize: `${fontSize}rpx`, lineHeight: `${lineHeight*fontSize}rpx`,color: `${background == 2 ? colorList[1] : colorList[0]}`,
						transform: `translateY(-${nextPage.pageNum*innerHeight}rpx)`}">
					</view>
				</view>
				<view v-else class="d-flex flex-column a-center j-center h-100" @click.stop="$tools.Navigate.navigateTo('/pages-next/mine/member-center/index')">
					<view class="px-3 main-text-color">{{$t('当前为VIP章节，请开通VIP服务后继续阅读')}}</view>
					<view class="mt-10 btns text-white d-flex a-center j-center">
						{{$t('去开通')}}
					</view>
				</view>
			</view>
		</view>
		<!-- 底部区域 层级第二 -->
		<view class="footer d-flex a-center j-sb w-100 px-2 position-fixed bottom-0 left-0 index-1"
			:style="{height: `calc(88rpx + env(safe-area-inset-bottom))`}">
			<view>
				{{systemTimeStr}}
			</view>
			<view>
				{{curPage.pageNum + 1}}/{{curPage.totalPage}}
			</view>
			<view>
				<battery :level="battery.batteryLevel" :charging="battery.batteryState === 2"></battery>
			</view>
		</view>
		<!-- 遮罩层 -->
		<u-overlay :show="menuShow" zIndex="100" @click="closeMenu">
			<!-- 顶部导航栏 -->
			<m-navbar :borderBottom="false" unBack @pageBack="pageBack" isFixed
				:bgColor="background == 1 ? bgList[background].color : (background == 2 ? bgList[background - 2].color : bgList[background - 1].color)"
				isSlot>
				<view @click.stop class="title w-100 d-flex a-center pl-10 pr-3" :style="{
				width: `calc(100vw - ${miniProgramCapsule.width}px)`,
				marginRight: `calc(100vw - ${miniProgramCapsule.right}px + ${miniProgramCapsule.width}px)`}">
					<view class="title-text flex-shrink line-h main-text-color">
						{{detail.name}} ( {{$t('第')}} {{compose[0].chapterName}} {{$t('章')}} )
					</view>
					<view class="share ml-auto" @click="sharePosters">
						<u-icon name="share-square" size="26" color="#fb7299"></u-icon>
					</view>
					<view class="d-flex a-center flex-shrink j-center ml-2">
						<u-icon v-if="detail.collect" name="star-fill" color="#fb7299" size="24"
							@click="openCollect"></u-icon>
						<u-icon v-else name="star" color="#fb7299" size="24" @click="openCollect"></u-icon>
					</view>
				</view>
			</m-navbar>
			<!-- 底部 -->
			<view class="position-fixed bottom-0 left-0 w-100 menu-bottom" @click.stop
				:style="{background: background == 1 ? bgList[background].color : (background == 2 ? bgList[background - 2].color : bgList[background - 1].color)}">
				<!-- 用于显示章节进度 -->
				<view v-if="chapterProgress > 0"
					class="position-absolute d-flex a-center text-center rounded-1 px-3 py-1 bg-light-secondary left-half tf-half-x"
					style="top: -80rpx;"
					:style="{background: background == 1 ? bgList[background].color : (background == 2 ? bgList[background - 2].color : bgList[background - 1].color)}">
					{{progressTouched ? directoryList[chapterProgress].name : compose[1].chapterName}}
				</view>
				<!-- 章节进度条 -->
				<view class="d-flex a-center j-around px-2">
					<text @click="goPreChapter"
						:style="{color: background != 1 ? bgList[1].color : bgList[0].color}">{{$t('上一章')}}</text>
					<view class="flex-1 py-2">
						<u-slider v-model="chapterProgress" activeColor="#f27299" :block-size="20"
							:max="directoryList.length - 1" @changing="slideChanging" @change="slideChange"
							:blockColor="background != 1 ? bgList[1].color : bgList[0].color" />
					</view>
					<text @click="goNextChapter"
						:style="{color: background != 1 ? bgList[1].color : bgList[0].color}">{{$t('下一章')}}</text>
				</view>
				<view class="d-flex a-center j-around">
					<view class="d-flex a-center j-center flex-column" @click="openDirectory">
						<u-icon name="list-dot" size="26"
							:color="background != 1 ? bgList[1].color : bgList[0].color"></u-icon>
						<text class="font"
							:style="{color: background != 1 ? bgList[1].color : bgList[0].color}">{{$t('目录')}}</text>
					</view>
					<view class="d-flex a-center j-center flex-column" v-if="background != 2"
						@click="changeBackground(2)">
						<u-icon
							:name="`https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/${background == 1 ? 'hei' : 'hei-all'}.svg`"
							size="28"></u-icon>
						<text class="font"
							:style="{color: background != 1 ? bgList[1].color : bgList[0].color}">{{$t('夜间')}}</text>
					</view>
					<view class="d-flex a-center j-center flex-column" v-else @click="changeBackground(1)">
						<u-icon name="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/bai.svg"
							size="28"></u-icon>
						<text class="font"
							:style="{color: background != 1 ? bgList[1].color : bgList[0].color}">{{$t('日间')}}</text>
					</view>
					<view class="d-flex a-center j-center flex-column" @click="openSetting">
						<u-icon name="setting-fill" size="26"
							:color="background != 1 ? bgList[1].color : bgList[0].color"></u-icon>
						<text class="font"
							:style="{color: background != 1 ? bgList[1].color : bgList[0].color}">{{$t('page.设置')}}</text>
					</view>
				</view>
			</view>
		</u-overlay>
		<!-- 目录弹框 -->
		<directory :show="directoryShow" @close="directoryShow = false" :backgroundId="background" :directoryList="directoryList"
		:chapterProgress="chapterProgress" :detail="detail" @openSort="openSort" @openToChapter="goToChapter" />
		<!-- 阅读设置弹框 -->
		<read-set :show="setShow" :maxFontSize="maxFontSize" :minFontSize="minFontSize" :turnType="turnType"
			:bgId="background" :lineHeight="lineHeight" :fontSize="fontSize" @addSize="addSize" @subSize="subSize"
			@changeLineHeight="changeLineHeight" @changeTurnType="changeTurnType" @changeBackground="changeBackground"
			@close="setShow = false" />
		<!-- 分享海报 -->
		<c-app-share @closePoster="closePoster" @success="success" :posterShow="posterShow" :poster="poster" />
		<m-modal :show="modalShow" i18n title="温馨提示" confirmName="加入书架" @cancel="cancel" @confirm="addfavor">
			<view class="d-flex a-center j-center flex-column">
				<view class="d-flex a-center text-center j-center flex-column main-text-color letter-1">
					{{$t('喜欢这本书吗？快加入书架吧！')}}
				</view>
			</view>
		</m-modal>
	</view>
</template>

<script>
	import {
		compose
	} from './data.js'
	import battery from '@/components/battery.vue'
	import virtualList from '@/components/virtualList.vue'
	import CAppShare from '@/components/common/c-app-share/index.vue'
	import ReadSet from '@/components/pages/novel-mudules/read-set/index.vue'
	import Directory from '@/components/pages/novel-mudules/directory/index.vue'
	import MCell from '@/main_modules/main-ui/m-cell/index.vue'
	import capsuleInit from '@/mixins/capsule-init.js'
	import {
		lineList,
		turnTypeList,
		bgList
	} from '@/components/pages/novel-mudules/options.js'
	import {
		traditionalized,
		simplized,
		dateToStr,
		simpPYStr
	} from '@/utils/index.js'
	export default {
		mixins: [capsuleInit],
		components: {
			battery,
			virtualList,
			CAppShare,
			ReadSet,
			Directory,
			MCell
		},
		data() {
			return {
				lineList,
				turnTypeList,
				bgList,
				scrollTop: 0,
				intoView: '',
				bookName: '我是书名',
				bookId: 1,
				history: { //本书历史记录
					chapterIndex: 0,
					progress: 0
				},
				text: '',
				directoryList: [], //目录列表
				currentPage: 0, //当前页

				innerHeight: 0, //截取至整行的最大高度

				tmpChapter: { //暂存章节内容
					text: '',
					canRead: true
				},

				cover: { //封面的状态
					pageTranslate: ['', '', ''], //页面位移，三个数对应三种翻页方式
				},

				prePage: { //上一页数据
					ready: false, //是否准备完毕
					chapterName: '',
					text: '',
					pageNum: '',
					totalPage: 1,
					pageTranslate: ['', '', ''], //页面位移，三个数对应三种翻页方式
					canRead: true
				},

				curPage: { //本页数据
					ready: false, //是否准备完毕
					chapterName: '',
					text: '',
					pageNum: 1,
					totalPage: 1,
					pageTranslate: ['', '', ''], //页面位移，三个数对应三种翻页方式
					canRead: true
				},

				nextPage: { //下一页数据
					ready: false, //是否准备完毕
					chapterName: '',
					text: '',
					pageNum: '',
					totalPage: '',
					pageTranslate: ['', '', ''], //页面位移，三个数对应三种翻页方式
					canRead: true
				},


				next: false, //用户是否正在翻下一页
				pre: false, //用户是否正在翻上一页

				waitForNext: false, //是否正在等待下一页准备完毕后跳转
				waitForPre: false, //是否正在等待上一页准备完毕后跳转
				waitForNextChapter: false, //是否正在等待下一章准备完毕后跳转
				waitForPreChapter: false, //是否正在等待上一章准备完毕后跳转

				showAnimation: false, //是否开启动画
				showShadow: false, //是否显示页面阴影
				contentHeight: 0, //阅读区域高度
				battery: {
					batteryState: '', //电池状态
					batteryLevel: 100, //电量
				},
				systemTime: '', //系统时间
				systemTimeStr: '', //系统时间字符串

				touchStartX: 0, // 触屏起始点x
				touchX: 0, // 瞬时触屏点x
				delta: 0, // 手指瞬时位移

				touchStartY: 0, // 触屏起始点y
				touchY: 0, // 瞬时触屏点y

				menuShow: false, //菜单栏box是否渲染
				itemShow: false, // 菜单栏动画控制
				setShow: false, //设置栏动画控制
				directoryShow: false, //目录动画控制
				directoryShowBefore: false, // 目录渲染
				turnPageTime: .5, //翻页动画时间

				maxFontSize: 60, //最大字体大小，px
				minFontSize: 24, //最小字体大小，px
				turnType: 0, //翻页方式
				fontSize: '', //字体大小，
				simplified: '', //是否简体
				lineHeight: '', //行高，注意是fontSize的倍数
				background: '', //背景
				colorList: ['#000', '#fff'], //与背景对应的字体颜色

				chapterProgress: 0, //‘章节进度条’的参数
				progressTouched: false, //是否正在点击‘章节进度条’
				query: {},
				detail: {},
				tempBackground: 8,
				isSort: true,
				posterShow: false,
				isSuccess: false,
				time: null,
				modalShow: false,
				poster: {},
				menuTime: 0
			}
		},
		onLoad(options) {
			this.query = this.$tools.Navigate.receivePageData(options)
			this.init()
		},
		mounted() {
			this.initPage()
		},
		methods: {
			// 初始化
			init() {
				this.initPoster()
				this.getNovelInfo()
				this.getSystemInfo()
				// this.tempBackground = uni.getStorageSync('background') == 2 ? 1 : uni.getStorageSync('background')
			},
			//初始化海报数据
			initPoster() {
				let args = {
					id: 7,
					chapterId: 50,
					inviteCode: this.userinfo.inviteCode
				}
				let shareArgs = {
					appUrl: `gongyue://pages-offspring/read-comics/index?item=${args}`,
					h5Url: `https://gongyue.gaojianghua.cn/pages-offspring/read-comics/index?item=${args}`
				}
				this.poster = {
					css: {
						width: "600rpx",
						height: "950rpx",
						borderRadius: "15rpx",
						position: "relative",
						backgroundColor: "#E5ECF4"
					},
					views: [{
							src: `${this.detail.coverImage}`,
							type: "image",
							css: {
								objectFit: "cover",
								width: "560rpx",
								height: "260rpx",
								marginLeft: "20rpx",
								marginTop: "20rpx",
								borderRadius: "15rpx",
							}
						},
						{
							text: `${this.detail.name}`,
							type: 'text',
							css: {
								marginTop: '20rpx',
								fontWeight: 'bold',
								fontSize: '32rpx',
								marginLeft: '20rpx',
								display: 'inline-block'
							}
						},
						{
							text: `${this.detail.score}`,
							type: 'text',
							css: {
								fontWeight: 'bold',
								color: '#EF930A',
								fontSize: '36rpx',
								position: "absolute",
								right: "20rpx",
								top: "300rpx",
							}
						},
						{
							text: `${this.$t('作者')}: ${this.detail.author} · ${this.detail.state == 1 ? this.$t('连载中') : this.$t('已完结')}`,
							type: 'text',
							css: {
								color: '#0A57D0',
								fontSize: '26rpx',
								width: '540rpx',
								marginTop: '10rpx',
								marginLeft: '20rpx',
							}
						},
						{
							text: `${this.$t('简介')}: ${this.detail.desc}`,
							type: 'text',
							css: {
								color: '#333',
								width: '540rpx',
								fontSize: '28rpx',
								marginTop: '10rpx',
								marginLeft: '20rpx',
								lineClamp: '9',
								lineHeight: '45rpx'
							}
						},
						{
							css: {
								width: "100%",
								height: "150rpx",
								position: "absolute",
								bottom: '0rpx',
								left: '0rpx',
								borderRadius: "15rpx",
								backgroundColor: '#fff'
							},
							views: [{
									src: `${this.userinfo.avatar}`,
									type: "image",
									css: {
										objectFit: "cover",
										width: "100rpx",
										height: "100rpx",
										position: "absolute",
										left: "20rpx",
										top: "25rpx",
										borderRadius: "50%",
									}
								},
								{
									text: `${this.$t('书友')}: ${this.userinfo.name}`,
									type: "text",
									css: {
										objectFit: "cover",
										height: "50rpx",
										width: "330rpx",
										position: "absolute",
										left: "130rpx",
										top: "25rpx",
										fontSize: '26rpx',
										lineHeight: "50rpx",
										lineClamp: "1"
									}
								}, ,
								{
									text: `${this.$t('邀请您阅读')}《${this.detail.name}》`,
									type: "text",
									css: {
										objectFit: "cover",
										height: "50rpx",
										width: "330rpx",
										position: "absolute",
										left: "130rpx",
										top: "75rpx",
										fontSize: '26rpx',
										lineHeight: "50rpx",
										lineClamp: "1"
									}
								},
								{
									text: `${this.detail.shareUrl + '?item=' + shareArgs}`,
									type: 'qrcode',
									css: {
										objectFit: "cover",
										width: "100rpx",
										height: "100rpx",
										position: "absolute",
										right: "20rpx",
										top: "25rpx"
									}
								}
							],
							type: 'view'
						},
					]
				}
			},
			// 取消
			cancel() {
				this.modalShow = false
				uni.navigateBack()
			},
			//分享海报
			sharePosters() {
				this.posterShow = true
				uni.showLoading()
				this.time = setTimeout(() => {
					if (this.isSuccess) {
						uni.$u.toast(this.$t('网络异常，请稍后重试'))
						uni.hideLoading();
					}
					clearTimeout(this.time)
				}, 6000);
			},
			//生成海报成功
			success() {
				this.isSuccess = true
				clearTimeout(this.time)
			},
			//关闭弹框
			closePoster() {
				this.isSuccess = false
				this.posterShow = false
			},
			// 收藏
			async openCollect() {
				let res = {
					code: 200
				}
				// if (this.detail.collect) {
				// 	res = await delCollect({
				// 		id: this.detail.id
				// 	})
				// } else {
				// 	res = await addCollect({
				// 		id: this.detail.id
				// 	})
				// }
				if (res.code == 200) {
					if (this.detail.collect) {
						this.detail.collect = false
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: this.$t("取消收藏成功")
						})
					} else {
						this.detail.collect = true
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: this.$t("收藏成功,请在书架查看"),
							complete: () => {
								let time = setTimeout(() => {
									if (this.modalShow) {
										this.$tools.Navigate.navigateBack()
									}
									clearTimeout(time)
								}, 1000)
							}
						})
					}
				}
			},
			//排序切换
			openSort() {
				this.directoryList = this.directoryList.reverse()
				this.scrollTop = 1
				this.$nextTick(() => {
					this.scrollTop = 0
				})
			},
			// 获取小说信息
			getNovelInfo() {
				// TODO：请求获取数据
				this.detail = {
					"id": 7,
					"img": "https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/141b53c86d1f6dc174982e6f122dcbfc.jpg",
					"name": "大苍守夜人",
					"mark": 9.4,
					"school": 367450,
					"types": ["玄幻", '穿越', '无敌流', '废材流'],
					"state": 2,
					"recommend": 95,
					"collect": false,
					"rank": 7,
					"intro": "这儿有只乌龟，它就是个土匪！强盗！无耻败类！别惹它！不算正统异兽的强大兽类。这儿有只乌龟，它就是个土匪！强盗！无耻败类！别惹它！不算正统异兽的强大兽类。这儿有只乌龟，它就是个土匪！强盗！无耻败类！别惹它！不算正统异兽的强大兽类。这儿有只乌龟，它就是个土匪！强盗！无耻败类！别惹它！不算正统异兽的强大兽类。",
					"author": '二十四桥明月夜',
					"popular": 367840
				}
			},

			setStorage() {
				// let history = uni.getStorageSync('history')
				// if (typeof history !== 'object') {
				// 	history = []
				// }
				// let have = false
				// history.forEach((value) => {
				// 	if (value.bookId === this.bookId) {
				// 		have = true
				// 		value.chapterIndex = this.compose[1].chapterIndex
				// 		value.progress = this.progress
				// 	}
				// })
				// if (!have) {
				// 	history.push({
				// 		bookId: this.bookId,
				// 		chapterIndex: this.compose[1].chapterIndex,
				// 		progress: this.progress
				// 	})
				// }
				// uni.setStorageSync('history', history)
			},
			// 退出当前页面
			pageBack() {
				if (this.detail.collect) {
					this.$tools.Navigate.navigateBack()
				} else {
					this.modalShow = true
				}
			},
			// 获取设备信息
			getSystemInfo() {
				// #ifdef APP-PLUS
				// 取消ios左滑返回
				this.$mp.page.$getAppWebview().setStyle({
					popGesture: 'none'
				})
				let time = setInterval(() => {
					this.battery = this.$multiportApi.app.getBatteryLevel()
					clearTimeout(time)
				}, 1000)
				// #endif
				// 设置时间
				let date = new Date();
				this.systemTime = Date.parse(date);
				this.systemTimeStr = dateToStr(this.systemTime);
				setInterval(() => {
					this.systemTime += 60000;
					this.systemTimeStr = dateToStr(this.systemTime);
				}, 60000)
				// 获取字体、排版等信息(可能缓存在前端可能从后端拿，如果是异步注意同步处理)
				this.fontSize = uni.getStorageSync('fontSize')
				if (!this.$check.isNumber(this.fontSize)) {
					this.fontSize = 16
				}
				this.simplified = uni.getStorageSync('simplified')
				if (!this.$check.isNumber(this.simplified)) {
					this.simplified = 1
				}
				this.lineHeight = uni.getStorageSync('lineHeight')
				if (!this.$check.isNumber(this.lineHeight)) {
					this.lineHeight = 1.5
				}
				this.background = uni.getStorageSync('background')
				if (!this.$check.isNumber(this.background)) {
					this.background = 1
				}
				this.turnType = uni.getStorageSync('turnType')
				if (!this.$check.isNumber(this.turnType)) {
					this.turnType = 0
				}
				let history = uni.getStorageSync('history')
				if (!this.$check.isNumber(history)) {
					history = []
				}
				history.forEach((value) => {
					if (value.bookId === this.bookId) {
						this.history = value
					}
				})
			},
			// 获取数据并计算页面
			async initPage() {
				uni.showLoading({
					mask: true
				})
				this.cover.pageTranslate = [
					`(-100%,0)`,
					`(-100%,0)`,
					`(0,${-this.appSystemInfo.windowHeight}px)`
				]
				await this.calcHeight()
				await this.getDirectoryList()
				if (this.history.chapterIndex > this.directoryList.length - 1 || !this.history.chapterIndex) {
					this.history.chapterIndex = 0
				}
				await this.getThreeChapter(this.history.chapterIndex)
				let page = Math.floor((this.compose[1].totalPage - 1) * this.history.progress)
				this.goToPage(page)
				uni.hideLoading()
			},
			// 计算innerHeight，用于截取至整行
			calcHeight() {
				if (this.contentHeight) {
					let lineHeight = this.fontSize * this.lineHeight;
					// #ifdef APP-PLUS || MP-WEIXIN
					lineHeight = Math.floor(lineHeight * this.appSystemInfo.pixelRatio) / this.appSystemInfo.pixelRatio
					// #endif
					let lineNum = Math.floor((this.contentHeight + Math.floor((lineHeight - this.fontSize) / 2)) /
						lineHeight)
					this.innerHeight = lineNum * lineHeight
				} else {
					return new Promise((resolve, reject) => {
						this.$nextTick(() => {
							const query = uni.createSelectorQuery().in(this);
							query.select('#content').boundingClientRect(data => {
								let height = data.height;
								this.contentHeight = height;
								let lineHeight = this.fontSize * this.lineHeight;

								// #ifdef APP-PLUS || MP-WEIXIN
								lineHeight = Math.floor(lineHeight * this.appSystemInfo
										.pixelRatio) / this
									.pixelRatio
								// #endif
								let lineNum = Math.floor((height + Math.floor((lineHeight - this
									.fontSize) / 2)) / lineHeight)
								this.innerHeight = lineNum * lineHeight
								resolve()
							}).exec();
						})
					})
				}
			},
			// 计算本章页数
			calcCurChapter() {
				return new Promise((resolve, reject) => {
					// 此处setTimeout 100ms是为了确保元素渲染完毕从而获取正确高度，如果遇到页面页数计算不正确的情况可以增加时间试试看
					let time = setTimeout(() => {
						const query = uni.createSelectorQuery().in(this);
						query.select('#curChapter').boundingClientRect(data => {
							let height = data.height;
							// #ifdef APP-PLUS || MP-WEIXIN
							height = Math.round(height * this.appSystemInfo.pixelRatio) / this
								.appSystemInfo.pixelRatio
							// #endif
							console.log(data.height, Math.ceil(height / this.innerHeight))
							this.compose[1].totalPage = Math.ceil(height / this.innerHeight) || 1
							this.compose[1].ready = true //章节准备完毕
							resolve()
						}).exec();
						clearTimeout(time)
					}, 100)
				})
			},
			// 计算上一章页数,并翻页（如果有）
			calcPreChapter() {
				return new Promise((resolve, reject) => {
					// 此处setTimeout 100ms是为了确保元素渲染完毕从而获取正确高度，如果遇到页面页数计算不正确的情况可以增加时间试试看
					let time = setTimeout(() => {
						const query = uni.createSelectorQuery().in(this);
						query.select('#preChapter').boundingClientRect(data => {
							let height = data.height;
							// #ifdef APP-PLUS || MP-WEIXIN
							height = Math.round(height * this.appSystemInfo.pixelRatio) / this
								.appSystemInfo.pixelRatio
							// #endif
							this.compose[0].totalPage = Math.ceil(height / this.innerHeight) || 1
							this.compose[0].ready = true //章节准备完毕
							if (this.waitForPre) { //发生在用户翻至上一章，但是上一章数据未准备完毕时
								uni.hideLoading() //把loading关掉
								this.waitForPre = false;
								//页面准备完毕
								this.goPrePage()
							}
							if (this.waitForPreChapter) {
								uni.hideLoading()
								this.waitForPreChapter = false
								this.goPreChapter()
							}
							resolve()
						}).exec();
						clearTimeout(time)
					}, 100)
				})
			},
			// 计算下一章页数,并翻页（如果有）
			calcNextChapter() {
				return new Promise((resolve, reject) => {
					// 此处setTimeout 100ms是为了确保元素渲染完毕从而获取正确高度，如果遇到页面页数计算不正确的情况可以增加时间试试看
					let time = setTimeout(() => {
						const query = uni.createSelectorQuery().in(this);
						query.select('#nextChapter').boundingClientRect(data => {
							let height = data.height;
							// #ifdef APP-PLUS || MP-WEIXIN
							height = Math.round(height * this.appSystemInfo.pixelRatio) / this
								.appSystemInfo.pixelRatio
							// #endif
							this.compose[2].totalPage = Math.ceil(height / this.innerHeight) || 1
							this.compose[2].ready = true //章节准备完毕
							if (this.waitForNext) { //发生在用户翻至下一章，但是下一章数据未准备完毕时
								uni.hideLoading() //把loading关掉
								this.waitForNext = false;
								//页面准备完毕
								this.goNextPage()
							}
							if (this.waitForNextChapter) {
								uni.hideLoading()
								this.waitForNextChapter = false
								this.goNextChapter()
							}
							resolve()
						}).exec();
						clearTimeout(time)
					}, 100)
				})
			},
			// 触摸开始（封面）
			coverTouchStart(e) {
				this.showAnimation = false //关掉动画，否则翻页会很慢
				this.touchX = e.touches[0].clientX
				this.touchStartX = e.touches[0].clientX
				this.touchY = e.touches[0].clientY
				this.touchStartY = e.touches[0].clientY
			},
			// 触摸（封面）
			coverTouchMove(e) {
				this.showShadow = true
				let delta = 0
				if (this.turnType === 0 || this.turnType === 1) { //翻页方式为‘覆盖’或者‘左右平移’
					delta = e.touches[0].clientX - this.touchStartX;
					// 限制边界
					if (delta > this.appSystemInfo.windowWidth) {
						delta = this.appSystemInfo.windowWidth
					}
					if (delta < -this.appSystemInfo.windowWidth) {
						delta = -this.appSystemInfo.windowWidth
					}
					this.delta = e.touches[0].clientX - this.touchX;
					this.touchX = e.touches[0].clientX;
				} else { //翻页方式为‘上下平移’
					delta = e.touches[0].clientY - this.touchStartY;
					// 限制边界
					if (delta > this.appSystemInfo.windowHeight) {
						delta = this.appSystemInfo.windowHeight
					}
					if (delta < -this.appSystemInfo.windowHeight) {
						delta = -this.appSystemInfo.windowHeight
					}
					this.delta = e.touches[0].clientY - this.touchY;
					this.touchY = e.touches[0].clientY;
				}
				if (this.next) { //首次翻下一页之后
					// 限制边界
					if (delta > 0) {
						delta = 0
					}
					this.cover.pageTranslate = [
						`(${delta}px,0)`,
						`(${delta}px,0)`,
						`(0,${delta}px)`
					]
					this.curPage.pageTranslate = [
						`(0,0)`,
						`(${this.appSystemInfo.windowWidth + delta}px,0)`,
						`(0,${this.appSystemInfo.windowHeight + delta}px)`
					]
				}
				if (!this.pre && !this.next && delta < 0) { //首次翻下一页
					this.next = true
					this.cover.pageTranslate = [
						`(${delta}px,0)`,
						`(${delta}px,0)`,
						`(0,${delta}px)`
					]
					this.curPage.pageTranslate = [
						`(0,0)`,
						`(${this.appSystemInfo.windowWidth + delta}px,0)`,
						`(0,${this.appSystemInfo.windowHeight + delta}px,)`
					]
				}
				if (this.pre) { //首次右滑后，由于是封面不做任何操作
					return
				}
				if (!this.pre && !this.next && delta > 0) { //首次右滑
					this.pre = true
					// uni.showToast({
					// 	title: '已经是第一页了',
					// 	icon: 'none'
					// })
				}
			},
			// 触摸结束（封面）
			coverTouchEnd(e) {
				this.showAnimation = true
				this.showShadow = false
				let delta = 0
				if (this.turnType === 0 || this.turnType === 1) { //翻页方式为‘覆盖’或者‘左右平移’
					delta = e.changedTouches[0].clientX - this.touchStartX;
				} else { //翻页方式为‘上下平移’
					delta = e.changedTouches[0].clientY - this.touchStartY;
				}
				if (delta === 0) {
					if (e.changedTouches[0].clientX < this.appSystemInfo.windowWidth / 3) { //点击屏幕左1/3为上一页
						// uni.showToast({
						// 	title: '已经是第一页了',
						// 	icon: 'none'
						// })
					} else if (e.changedTouches[0].clientX > this.appSystemInfo.windowWidth / 3 * 2) { //点击屏幕右1/3为下一页
						this.cover.pageTranslate = [
							`(-100%,0)`,
							`(-100%,0)`,
							`(0,${-this.appSystemInfo.windowHeight}px)`
						]
						this.curPage.pageTranslate = [
							`(0,0)`,
							`(0,0)`,
							`(0,0)`
						]
					} else if (e.changedTouches[0].clientX <= this.appSystemInfo.windowWidth / 3 * 2 && e.changedTouches[0]
						.clientX >=
						this.appSystemInfo.windowWidth / 3) { //点击屏幕中间1/3为呼出菜单
						this.showMenu()
					}
				} else {
					if (this.next && this.delta <= 0) { //下一页
						this.cover.pageTranslate = [
							`(-100%,0)`,
							`(-100%,0)`,
							`(0,${-this.appSystemInfo.windowHeight}px)`
						]
						this.curPage.pageTranslate = [
							`(0,0)`,
							`(0,0)`,
							`(0,0)`
						]
					} else if (this.next && this.delta > 0) { //取消翻页
						this.cover.pageTranslate = [
							`(0,0)`,
							`(0,0)`,
							`(0,0)`
						]
						this.curPage.pageTranslate = [
							`(0,0)`,
							`(${this.appSystemInfo.windowWidth}px,0)`,
							`(0,${this.appSystemInfo.windowHeight}px)`
						]
					}
				}
				this.next = false
				this.pre = false
			},
			// 触摸取消（封面）
			coverTouchcancel() {
				// 取消翻页
				this.showAnimation = false
				this.showShadow = false
				this.cover.pageTranslate = [
					`(0,0)`,
					`(0,0)`,
					`(0,0)`
				]
				this.curPage.pageTranslate = [
					`(0,0)`,
					`(${this.appSystemInfo.windowWidth}px,0)`,
					`(0,${this.appSystemInfo.windowHeight}px)`
				]
				this.next = false
				this.pre = false
			},
			// 触摸开始
			touchStart(e) {
				this.showAnimation = false
				this.touchX = e.touches[0].clientX;
				this.touchStartX = e.touches[0].clientX;
				this.touchY = e.touches[0].clientY;
				this.touchStartY = e.touches[0].clientY;
			},
			// 触摸
			touchMove(e) {
				this.showShadow = true;
				let delta = 0
				if (this.turnType === 0 || this.turnType === 1) { //翻页方式为‘覆盖’或者‘左右平移’
					delta = e.touches[0].clientX - this.touchStartX;
					// 限制边界
					if (delta > this.appSystemInfo.windowWidth) {
						delta = this.appSystemInfo.windowWidth
					}
					if (delta < -this.appSystemInfo.windowWidth) {
						delta = -this.appSystemInfo.windowWidth
					}
					this.delta = e.touches[0].clientX - this.touchX;
					this.touchX = e.touches[0].clientX;
				} else { //翻页方式为‘上下平移’
					delta = e.touches[0].clientY - this.touchStartY;
					// 限制边界
					if (delta > this.appSystemInfo.windowHeight) {
						delta = this.appSystemInfo.windowHeight
					}
					if (delta < -this.appSystemInfo.windowHeight) {
						delta = -this.appSystemInfo.windowHeight
					}
					this.delta = e.touches[0].clientY - this.touchY;
					this.touchY = e.touches[0].clientY;
				}
				if (this.next && this.nextPage.ready) { //首次翻下一页之后
					if (this.nextPage.isEnd) {
						return
					}
					// 限制边界
					if (delta > 0) {
						delta = 0
					}
					this.prePage.pageTranslate = [
						`(-100%,0)`,
						`(${-this.appSystemInfo.windowWidth+delta}px,0)`,
						`(0,${-this.appSystemInfo.windowHeight+delta}px)`
					]
					this.curPage.pageTranslate = [
						`(${delta}px,0)`,
						`(${delta}px,0)`,
						`(0,${delta}px)`
					]
					this.nextPage.pageTranslate = [
						`(0,0)`,
						`(${this.appSystemInfo.windowWidth+delta}px,0)`,
						`(0,${this.appSystemInfo.windowHeight+delta}px)`
					]
				}
				if (!this.pre && !this.next && delta < 0) { //首次翻下一页
					this.next = true
					if (this.nextPage.ready) { //页面准备好了
						if (this.nextPage.isEnd) {
							/*****************************************/
							/**********    根据需要更改    ************/
							/*****************************************/
							uni.showToast({
								title: '跳转推荐页',
								icon: 'none'
							})
							/*****************************************/
							/*****************************************/
							/*****************************************/
						} else {
							this.prePage.pageTranslate = [
								`(-100%,0)`,
								`(${-this.appSystemInfo.windowWidth+delta}px,0)`,
								`(0,${-this.appSystemInfo.windowHeight+delta}px)`
							]
							this.curPage.pageTranslate = [
								`(${delta}px,0)`,
								`(${delta}px,0)`,
								`(0,${delta}px)`
							]
							this.nextPage.pageTranslate = [
								`(0,0)`,
								`(${this.appSystemInfo.windowWidth+delta}px,0)`,
								`(0,${this.appSystemInfo.windowHeight+delta}px)`
							]
						}
					} else if (this.compose[2].ready) { //下一章已经准备好了
						this.nextPage = {
							ready: this.compose[2].ready,
							chapterName: this.compose[2].chapterName,
							text: this.compose[2].text,
							pageNum: 0,
							totalPage: this.compose[2].totalPage,
							pageTranslate: [
								`(0,0)`,
								`(${this.appSystemInfo.windowWidth}px,0)`,
								`(0,${this.appSystemInfo.windowHeight}px)`
							],
							canRead: this.compose[2].canRead
						}
						this.prePage.pageTranslate = [
							`(-100%,0)`,
							`(${-this.appSystemInfo.windowWidth+delta}px,0)`,
							`(0,${-this.appSystemInfo.windowHeight+delta}px)`
						]
						this.curPage.pageTranslate = [
							`(${delta}px,0)`,
							`(${delta}px,0)`,
							`(0,${delta}px)`
						]
						this.nextPage.pageTranslate = [
							`(0,0)`,
							`(${this.appSystemInfo.windowWidth+delta}px,0)`,
							`(0,${this.appSystemInfo.windowHeight+delta}px)`
						]
					}
				}
				if (this.pre && this.prePage.ready) { //首次翻上一页之后

					// 限制边界
					if (delta < 0) {
						delta = 0
					}

					if (this.prePage.isCover) { //上一页是封面
						this.cover.pageTranslate = [
							`(${-this.appSystemInfo.windowWidth+delta}px,0)`,
							`(${-this.appSystemInfo.windowWidth+delta}px,0)`,
							`(0,${-this.appSystemInfo.windowHeight+delta}px)`
						]
						this.curPage.pageTranslate = [
							`(0,0)`,
							`(${delta}px,0)`,
							`(0,${delta}px)`
						]
					} else {
						this.prePage.pageTranslate = [
							`(${-this.appSystemInfo.windowWidth+delta}px,0)`,
							`(${-this.appSystemInfo.windowWidth+delta}px,0)`,
							`(0,${-this.appSystemInfo.windowHeight+delta}px)`
						]
						this.curPage.pageTranslate = [
							`(0,0)`,
							`(${delta}px,0)`,
							`(0,${delta}px)`
						]
						this.nextPage.pageTranslate = [
							`(0,0)`,
							`(${this.appSystemInfo.windowWidth+delta}px,0)`,
							`(0,${this.appSystemInfo.windowHeight+delta}px)`
						]
					}
				}
				if (!this.pre && !this.next && delta > 0) { //首次翻上一页
					this.pre = true
					if (this.prePage.ready) { //页面准备好了
						if (this.prePage.isCover) { //上一页是封面
							this.cover.pageTranslate = [
								`(${-this.appSystemInfo.windowWidth+delta}px,0)`,
								`(${-this.appSystemInfo.windowWidth+delta}px,0)`,
								`(0,${-this.appSystemInfo.windowHeight+delta}px)`
							]
							this.curPage.pageTranslate = [
								`(0,0)`,
								`(${delta}px,0)`,
								`(0,${delta}px)`
							]
						} else {
							this.prePage.pageTranslate = [
								`(${-this.appSystemInfo.windowWidth+delta}px,0)`,
								`(${-this.appSystemInfo.windowWidth+delta}px,0)`,
								`(0,${-this.appSystemInfo.windowHeight+delta}px)`
							]
							this.curPage.pageTranslate = [
								`(0,0)`,
								`(${delta}px,0)`,
								`(0,${delta}px)`
							]
							this.nextPage.pageTranslate = [
								`(0,0)`,
								`(${this.appSystemInfo.windowWidth+delta}px,0)`,
								`(0,${this.appSystemInfo.windowHeight+delta}px)`
							]
						}
					} else if (this.compose[0].ready) { //上一章已经准备好了
						this.prePage = {
							ready: this.compose[0].ready,
							chapterName: this.compose[0].chapterName,
							text: this.compose[0].text,
							pageNum: this.compose[0].totalPage - 1,
							totalPage: this.compose[0].totalPage,
							pageTranslate: [
								`(-100%,0)`,
								`(-100%,0)`,
								`(0,${-this.appSystemInfo.windowHeight}px)`
							],
							canRead: this.compose[0].canRead
						}
						this.prePage.pageTranslate = [
							`(${-this.appSystemInfo.windowWidth+delta}px,0)`,
							`(${-this.appSystemInfo.windowWidth+delta}px,0)`,
							`(0,${-this.appSystemInfo.windowHeight+delta}px)`
						]
						this.curPage.pageTranslate = [
							`(0,0)`,
							`(${delta}px,0)`,
							`(0,${delta}px)`
						]
						this.nextPage.pageTranslate = [
							`(0,0)`,
							`(${this.appSystemInfo.windowWidth+delta}px,0)`,
							`(0,${this.appSystemInfo.windowHeight+delta}px)`
						]
					}
				}

			},

			/**
			 * 触摸结束
			 **/
			touchEnd(e) {
				this.showAnimation = true
				this.showShadow = false
				let delta = 0
				if (this.turnType === 0 || this.turnType === 1) {
					delta = e.changedTouches[0].clientX - this.touchStartX;
				} else {
					delta = e.changedTouches[0].clientY - this.touchStartY;
				}
				if (delta < 0.8 && delta > -0.8) { //部分手机点击屏幕时无法做到delta===0
					if (e.changedTouches[0].clientX < this.appSystemInfo.windowWidth / 3) { //点击屏幕左1/3为上一页
						this.goPrePage()
					} else if (e.changedTouches[0].clientX > this.appSystemInfo.windowWidth / 3 * 2) { //点击屏幕右1/3为下一页
						this.goNextPage()
					} else if (e.changedTouches[0].clientX <= this.appSystemInfo.windowWidth / 3 * 2 && e.changedTouches[0]
						.clientX >=
						this.appSystemInfo.windowWidth / 3) { //点击屏幕中间1/3为呼出菜单
						if (!this.curPage.canRead && e.changedTouches[0].clientY <= this.appSystemInfo.windowHeight / 3 *
							2 && e
							.changedTouches[0].clientY >= this.appSystemInfo.windowHeight / 3) {
							this.$tools.Navigate.navigateTo('/pages/tabbar/mine/vip/noVip')
						} else {
							this.showMenu()
						}
					}
				} else {
					if (this.next && this.delta <= 0) { //下一页
						this.goNextPage()
					} else if (this.next && this.delta > 0) { //取消翻页
						this.prePage.pageTranslate = [
							`(-100%,0)`,
							`(-100%,0)`,
							`(0,${-this.appSystemInfo.windowHeight}px)`
						]
						this.curPage.pageTranslate = [
							`(0,0)`,
							`(0,0)`,
							`(0,0)`
						]
						this.nextPage.pageTranslate = [
							`(0,0)`,
							`(${this.appSystemInfo.windowWidth}px,0)`,
							`(0,${this.appSystemInfo.windowHeight}px)`
						]
					} else if (this.pre && this.delta >= 0) { //上一页
						this.goPrePage()
					} else if (this.pre && this.delta < 0) { //取消翻页
						this.prePage.pageTranslate = [
							`(-100%,0)`,
							`(-100%,0)`,
							`(0,${-this.appSystemInfo.windowHeight}px)`
						]
						this.curPage.pageTranslate = [
							`(0,0)`,
							`(0,0)`,
							`(0,0)`
						]
						this.nextPage.pageTranslate = [
							`(0,0)`,
							`(${this.appSystemInfo.windowWidth}px,0)`,
							`(0,${this.appSystemInfo.windowHeight}px)`
						]
						this.cover.pageTranslate = [
							`(-100%,0)`,
							`(-100%,0)`,
							`(0,${-this.appSystemInfo.windowHeight}px)`
						]
					}
				}
				this.next = false
				this.pre = false

			},

			/**
			 * 取消触摸
			 **/
			touchcancel() {
				//取消翻页,重置页面
				this.showAnimation = false
				this.showShadow = false
				this.prePage.pageTranslate = [
					`(-100%,0)`,
					`(-100%,0)`,
					`(0,${-this.appSystemInfo.windowHeight}px)`
				]
				this.curPage.pageTranslate = [
					`(0,0)`,
					`(0,0)`,
					`(0,0)`
				]
				this.nextPage.pageTranslate = [
					`(0,0)`,
					`(${this.appSystemInfo.windowWidth}px,0)`,
					`(0,${this.appSystemInfo.windowHeight}px)`
				]
				this.cover.pageTranslate = [
					`(-100%,0)`,
					`(-100%,0)`,
					`(0,${-this.appSystemInfo.windowHeight}px)`
				]
				this.next = false
				this.pre = false
			},
			// 呼出菜单
			showMenu() {
				// #ifdef APP-PLUS
				plus.navigator.setFullscreen(false);
				// #endif
				this.menuShow = true;
				this.menuTime = new Date().getTime()
				setTimeout(() => {
					this.itemShow = true
				}, 100)
			},
			// 关闭菜单
			closeMenu() {
				console.log(123)
				if (new Date().getTime() - this.menuTime < 500) return
				// #ifdef APP-PLUS
				plus.navigator.setFullscreen(true);
				// #endif
				this.itemShow = false
				this.setShow = false
				this.directoryShow = false
				setTimeout(() => {
					this.directoryShowBefore = false
					this.menuShow = false
				}, 300)
			},
			// 关闭菜单栏，呼出设置栏
			openSetting() {
				this.itemShow = false
				setTimeout(() => {
					this.setShow = true
				}, 300)
			},
			// 关闭菜单栏，呼出目录栏
			openDirectory() {
				// #ifdef APP-PLUS
				plus.navigator.setFullscreen(true);
				// #endif
				this.itemShow = false
				this.directoryShowBefore = true
				setTimeout(() => {
					this.directoryShow = true
				}, 300)
			},

			/**
			 * 拖动进度条
			 **/
			slideChanging(e) {
				this.progressTouched = true
				this.chapterProgress = e
			},

			/**
			 * 结束拖动进度条
			 **/
			async slideChange(e) {
				this.chapterProgress = e
				uni.showLoading()
				await this.getThreeChapter(e)
				this.progressTouched = false
				this.goToPage(0)
				uni.hideLoading()
			},

			/**
			 * 上一页,页面轮换
			 **/
			goPrePage() {
				if (this.prePage.isCover) { //如果是首页
					this.cover.pageTranslate = [
						`(0,0)`,
						`(0,0)`,
						`(0,0)`
					]
					this.curPage.pageTranslate = [
						`(0,0)`,
						`(${this.appSystemInfo.windowWidth}px,0)`,
						`(0,${this.appSystemInfo.windowHeight}px)`
					]
					return
				}
				if (!this.prePage.ready && !this.compose[0].ready) {
					this.waitForPre = true
					uni.showLoading({
						title: '正在准备上一章',
						mask: true
					})
					return
				}
				let showChapter = false
				this.currentPage -= 1
				if (this.currentPage === -1) { //翻至上一章了
					showChapter = true
					this.currentPage = this.compose[0].totalPage - 1
					this.chapterRotate('pre')
				}

				let cur = [].concat(this.curPage.pageTranslate)
				let pre = [].concat(this.prePage.pageTranslate)
				this.goToPage(this.currentPage)
				this.prePage.pageTranslate = [
					`(-100%,0)`,
					`(-100%,0)`,
					`(0,${-this.appSystemInfo.windowHeight}px)`
				]
				this.curPage.pageTranslate = pre
				this.nextPage.pageTranslate = cur
				setTimeout(() => {
					// if (showChapter) {
					// 	uni.showToast({
					// 		title: this.compose[1].chapterName,
					// 		icon: 'none'
					// 	})
					// }
					this.showAnimation = true
					this.prePage.pageTranslate = [
						`(-100%,0)`,
						`(-100%,0)`,
						`(0,${-this.appSystemInfo.windowHeight}px)`
					]
					this.curPage.pageTranslate = [
						`(0,0)`,
						`(0,0)`,
						`(0,0)`
					]
					this.nextPage.pageTranslate = [
						`(0,0)`,
						`(${this.appSystemInfo.windowWidth}px,0)`,
						`(0,${this.appSystemInfo.windowHeight}px)`
					]
				}, 50)
			},


			/**
			 * 下一页,页面轮换
			 **/
			goNextPage() {
				if (this.nextPage.isEnd) { //如果翻至本书末尾

					/*****************************************/
					/**********    根据需要更改    ************/
					/*****************************************/
					uni.showToast({
						title: '跳转推荐页',
						icon: 'none'
					})
					/*****************************************/
					/*****************************************/
					/*****************************************/
					return
				}
				if (!this.nextPage.ready && !this.compose[2].ready) {
					this.waitForNext = true
					uni.showLoading({
						title: '正在准备下一章',
						mask: true
					})
					return
				}
				this.currentPage += 1
				let showChapter = false
				if (this.currentPage === this.compose[1].totalPage) { //翻至下一章了
					showChapter = true
					this.currentPage = 0
					this.chapterRotate('next')
				}

				let cur = [].concat(this.curPage.pageTranslate)
				let next = [].concat(this.nextPage.pageTranslate)
				this.goToPage(this.currentPage)
				this.prePage.pageTranslate = cur
				this.curPage.pageTranslate = next
				this.nextPage.pageTranslate = [
					`(0,0)`,
					`(${this.appSystemInfo.windowWidth}px,0)`,
					`(0,${this.appSystemInfo.windowHeight}px)`
				]
				setTimeout(() => {
					// if (showChapter) {
					// 	uni.showToast({
					// 		title: this.compose[1].chapterName,
					// 		icon: 'none'
					// 	})
					// }
					this.showAnimation = true
					this.prePage.pageTranslate = [
						`(-100%,0)`,
						`(-100%,0)`,
						`(0,${-this.appSystemInfo.windowHeight}px)`
					]
					this.curPage.pageTranslate = [
						`(0,0)`,
						`(0,0)`,
						`(0,0)`
					]
					this.nextPage.pageTranslate = [
						`(0,0)`,
						`(${this.appSystemInfo.windowWidth}px,0)`,
						`(0,${this.appSystemInfo.windowHeight}px)`
					]
				}, 50)
			},

			/**
			 * 章节轮换
			 **/
			async chapterRotate(type) {
				if (type === 'next') {
					this.compose[0] = Object.assign({}, this.compose[1])
					this.compose[1] = Object.assign({}, this.compose[2])
					if (this.compose[1].chapterIndex !== this.directoryList.length - 1) { //最后一章是根据目录列表长度判断
						this.compose[2] = {
							ready: false,
							chapterIndex: this.compose[1].chapterIndex + 1,
							chapterName: this.directoryList[this.compose[1].chapterIndex + 1].name,
						}
						await this.getOneChapter(this.directoryList[this.compose[1].chapterIndex + 1].id)
						this.$set(this.compose[2], 'text', this.tmpChapter.text)
						this.$set(this.compose[2], 'canRead', this.tmpChapter.canRead)
						this.calcNextChapter()
					} else {
						this.compose[2] = {
							ready: true,
							isEnd: true
						}
					}
				}
				if (type === 'pre') {
					this.compose[2] = Object.assign({}, this.compose[1])
					this.compose[1] = Object.assign({}, this.compose[0])
					if (this.compose[1].chapterIndex !== 0) {
						this.compose[0] = {
							ready: false,
							chapterIndex: this.compose[1].chapterIndex - 1,
							chapterName: this.directoryList[this.compose[1].chapterIndex - 1].name,
						}
						await this.getOneChapter(this.directoryList[this.compose[1].chapterIndex - 1].id)
						this.$set(this.compose[0], 'text', this.tmpChapter.text)
						this.$set(this.compose[0], 'canRead', this.tmpChapter.canRead)
						this.calcPreChapter()
					} else {
						this.compose[0] = {
							ready: true,
							isCover: true
						}
					}
				}
			},


			/**
			 * 跳转下一章
			 **/
			goNextChapter() {
				if (this.compose[1].chapterIndex === this.directoryList.length - 1) {
					uni.showToast({
						title: '已经是最后一章了',
						icon: 'none'
					})
					return
				}
				if (this.waitForNext || this.waitForPre) {
					return
				}
				if (this.compose[2].ready) {
					this.chapterRotate('next')
					this.goToPage(0)
				} else {
					uni.showLoading({
						title: '正在准备下一章'
					})
					this.waitForNextChapter = true
				}

			},

			/**
			 * 跳转上一章
			 **/
			goPreChapter(page) {
				if (this.compose[1].chapterIndex === 0) {
					uni.showToast({
						title: '这是第一章',
						icon: 'none'
					})
					return
				}
				if (this.waitForNext || this.waitForPre) {
					return
				}
				if (this.compose[0].ready) {
					this.chapterRotate('pre')
					this.goToPage(0)
				} else {
					uni.showLoading({
						title: '正在准备上一章'
					})
					this.waitForPreChapter = true
				}
			},


			/**
			 * 根据页码跳转
			 **/
			goToPage(page) {
				this.currentPage = page
				this.showAnimation = false
				this.curPage = {
					ready: this.compose[1].ready,
					chapterName: this.compose[1].chapterName,
					text: this.compose[1].text,
					pageNum: this.currentPage,
					totalPage: this.compose[1].totalPage,
					pageTranslate: [
						`(0,0)`,
						`(0,0)`,
						`(0,0)`
					],
					canRead: this.compose[1].canRead
				}
				if (this.currentPage === 0) {
					if (this.compose[0].ready && this.compose[0].isCover) { //翻至封面了
						this.prePage = {
							ready: true,
							isCover: true,
							pageTranslate: [
								`(-100%,0)`,
								`(-100%,0)`,
								`(0,${-this.appSystemInfo.windowHeight}px)`
							]
						}
					} else {
						this.prePage = {
							ready: this.compose[0].ready,
							chapterName: this.compose[0].chapterName,
							text: this.compose[0].text,
							pageNum: this.compose[0].totalPage - 1,
							totalPage: this.compose[0].totalPage,
							pageTranslate: [
								`(-100%,0)`,
								`(-100%,0)`,
								`(0,${-this.appSystemInfo.windowHeight}px)`
							],
							canRead: this.compose[0].canRead
						}
					}
				} else {
					this.prePage = {
						ready: true,
						chapterName: this.compose[1].chapterName,
						text: this.compose[1].text,
						pageNum: this.currentPage - 1,
						totalPage: this.compose[1].totalPage,
						pageTranslate: [
							`(-100%,0)`,
							`(-100%,0)`,
							`(0,${-this.appSystemInfo.windowHeight}px)`
						],
						canRead: this.compose[1].canRead
					}
				}
				if (this.currentPage >= this.compose[1].totalPage - 1) {
					if (this.compose[2].ready && this.compose[2].isEnd) { //翻至最后一章了
						this.nextPage = {
							ready: true,
							isEnd: true,
							pageTranslate: [
								`(0,0)`,
								`(${this.appSystemInfo.windowWidth}px,0)`,
								`(0,${this.appSystemInfo.windowHeight}px)`
							]
						}
					} else {
						this.nextPage = {
							ready: this.compose[2].ready,
							chapterName: this.compose[2].chapterName,
							text: this.compose[2].text,
							pageNum: 0,
							totalPage: this.compose[2].totalPage,
							pageTranslate: [
								`(0,0)`,
								`(${this.appSystemInfo.windowWidth}px,0)`,
								`(0,${this.appSystemInfo.windowHeight}px)`
							],
							canRead: this.compose[2].canRead
						}
					}
				} else {
					this.nextPage = {
						ready: true,
						chapterName: this.compose[1].chapterName,
						text: this.compose[1].text,
						pageNum: this.currentPage + 1,
						totalPage: this.compose[1].totalPage,
						pageTranslate: [
							`(0,0)`,
							`(${this.appSystemInfo.windowWidth}px,0)`,
							`(0,${this.appSystemInfo.windowHeight}px)`
						],
						canRead: this.compose[1].canRead
					}
				}
			},

			/**
			 * 跳转到指定章节
			 **/
			async goToChapter(index) {
				this.progressTouched = false
				this.closeMenu()
				uni.showLoading()
				await this.getThreeChapter(index)
				this.goToPage(0)
				uni.hideLoading()
			},

			/**
			 * 加大字体
			 **/
			async addSize() {
				if (this.fontSize >= this.maxFontSize) return
				let progress = this.progress //记录阅读进度用于调整字体后跳转
				this.fontSize += 1
				uni.setStorageSync('fontSize', this.fontSize)
				this.calcHeight()
				await this.calcCurChapter()
				let page = Math.floor((this.compose[1].totalPage - 1) * progress)
				this.goToPage(page)
				if (this.compose[0].ready && !this.compose[0].isCover) {
					this.compose[0].ready = false
					await this.calcPreChapter()
				}
				if (this.compose[2].ready && !this.compose[2].isEnd) {
					this.compose[2].ready = false
					await this.calcNextChapter()
				}
			},

			/**
			 * 缩小字体
			 **/
			async subSize() {
				if (this.fontSize <= this.minFontSize) return
				let progress = this.progress
				this.fontSize -= 1
				uni.setStorageSync('fontSize', this.fontSize)
				this.calcHeight()
				await this.calcCurChapter()
				let page = Math.floor((this.compose[1].totalPage - 1) * progress)
				this.goToPage(page)
				if (this.compose[0].ready && !this.compose[0].isCover) {
					this.compose[0].ready = false
					await this.calcPreChapter()
				}
				if (this.compose[2].ready && !this.compose[2].isEnd) {
					this.compose[2].ready = false
					await this.calcNextChapter()
				}
			},
			/**
			 * 改变行距
			 **/
			async changeLineHeight(lineHeight) {
				let progress = this.progress
				if (lineHeight === this.lineHeight) {
					return
				} else {
					this.lineHeight = lineHeight;
					uni.setStorageSync('lineHeight', this.lineHeight)
					this.calcHeight()
					await this.calcCurChapter()
					let page = Math.floor((this.compose[1].totalPage - 1) * progress)
					this.goToPage(page)
					if (this.compose[0].ready && !this.compose[0].isCover) {
						this.compose[0].ready = false
						await this.calcPreChapter()
					}
					if (this.compose[2].ready && !this.compose[2].isEnd) {
						this.compose[2].ready = false
						await this.calcNextChapter()
					}

				}
			},


			/**
			 * 改变翻页方式
			 **/
			changeTurnType(turnType) {
				if (turnType === this.turnType) {
					return
				} else {
					this.showAnimation = false
					this.turnType = turnType;
					uni.setStorageSync('turnType', this.turnType)
				}
			},

			/**
			 * 改变背景
			 **/
			changeBackground(background) {
				if (background != 2) {
					this.tempBackground = background
				}
				if (background === this.background) {
					return
				} else {
					this.background = background;
					uni.setStorageSync('background', this.background)
				}
			},

			/**
			 * 获取目录
			 **/
			async getDirectoryList(showLoading) {
				if (showLoading) {
					uni.showLoading({
						mask: true
					})
				}
				// let {
				// 	data,
				// 	code
				// } = await getNovelChapterList()
				let code = 200
				if (code == 200) {
					this.directoryList = []
					for (let i = 1; i <= 1200; i++) {
						this.directoryList.push({
							name: '天魂大陆' + i,
							id: i,
							vip: i > 15 ? true : false,
							lock: i > 20 ? true : false,
						})
					}
				} else {
					// 此处是网络连接失败的逻辑
					uni.hideLoading()
					return new Promise((resolve, reject) => {
						uni.showModal({
							title: this.$t('获取章节内容失败'),
							content: this.$t('请检查您的网络状态'),
							confirmText: this.$t('重试'),
							confirmColor: '#f27299',
							success: async (res) => {
								if (res.confirm) {
									//用户点击了重试
									await this.getDirectoryList(true)
									resolve()
								} else if (res.cancel) {
									//用户点击取消
									this.$tools.Navigate.navigateBack()
								}
							}
						})
					})
				}
			},
			/**
			 * 获取一章数据
			 **/
			async getOneChapter(chapterId, showLoading) {
				if (showLoading) {
					uni.showLoading({
						mask: true
					})
				}

				// this.query.zid = chapterId
				// let {
				// 	data,
				// 	code
				// } = await getNovelChapterInfo(this.query)
				let data = {
					vip: chapterId >= 15 ? true : false,
					text: simpPYStr()
				}
				let code = 200
				if (code == 200) {
					if (showLoading) {
						uni.hideLoading()
					}
					if (!data.vip) {
						this.tmpChapter.text = data.text //模拟数据

						// 根据业务实际情况判断该用户是否可阅读,逻辑后端判断
						this.tmpChapter.canRead = true
					} else if (this.userinfo.vip) {
						this.tmpChapter.text = data.text //模拟数据

						// 根据业务实际情况判断该用户是否可阅读,逻辑后端判断
						this.tmpChapter.canRead = true
					} else {
						this.tmpChapter.text = '' //注意：不能阅读章节请赋值为空字符串

						// 根据业务实际情况判断该用户是否可阅读,逻辑后端判断
						this.tmpChapter.canRead = false
					}
					if (this.simplified === 2) { //切换为繁体  注意：这里默认数据库中是简体字
						this.tmpChapter.text = traditionalized(this.tmpChapter.text)
					}
				} else {
					console.log(3)
					// 此处是网络连接失败的逻辑
					uni.hideLoading()
					return new Promise((resolve, reject) => {
						uni.showModal({
							title: this.$t('获取章节内容失败'),
							content: this.$t('请检查您的网络状态'),
							confirmText: this.$t('重试'),
							confirmColor: '#f27299',
							success: async (res) => {
								if (res.confirm) {
									//用户点击了重试
									await this.getOneChapter(chapterId, true)
									resolve()
								} else if (res.cancel) {
									//用户点击取消
									this.$tools.Navigate.navigateBack()
								}
							}
						})
					})
				}
			},
			/**
			 * 获取三章数据
			 **/
			async getThreeChapter(index) {
				await this.getOneChapter(this.directoryList[index].id)
				this.compose[1] = {
					chapterIndex: index,
					chapterName: this.directoryList[index].name,
					text: this.tmpChapter.text,
					canRead: this.tmpChapter.canRead
				}
				if (this.compose[1].chapterIndex !== 0) {
					await this.getOneChapter(this.directoryList[index - 1].id)
					this.compose[0] = {
						chapterIndex: index - 1,
						chapterName: this.directoryList[index - 1].name,
						text: this.tmpChapter.text,
						canRead: this.tmpChapter.canRead
					}
				} else {
					this.compose[0] = {
						ready: true,
						isCover: true
					}
				}
				if (this.compose[1].chapterIndex !== this.directoryList.length - 1) {
					await this.getOneChapter(this.directoryList[index + 1].id)
					this.compose[2] = {
						chapterIndex: index + 1,
						chapterName: this.directoryList[index + 1].name,
						text: this.tmpChapter.text,
						canRead: this.tmpChapter.canRead
					}
				} else {
					this.compose[2] = {
						ready: true,
						isEnd: true
					}
				}
				console.log(this.compose)
				await this.calcCurChapter()
				await this.calcPreChapter()
				await this.calcNextChapter()
			}
		},
		computed: {
			progress() { //章节的阅读进度
				if (this.compose[1].totalPage === 1) {
					return 0
				}
				return this.currentPage / (this.compose[1].totalPage - 1)
			},
			compose() {
				return compose
			},
			appSystemInfo() {
				return this.$store.state.appSystemInfo
			},
			userinfo() {
				return this.$store.state.userinfo
			},
			statusHeight() {
				return this.$store.state.statusHeight
			},
			navbarHeight() {
				return this.$store.state.navbarHeight
			}
		}

	}
</script>

<style lang="scss" scoped>
	page {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.hidden {
		opacity: 0;
	}

	.share {
		padding-top: 2rpx;
	}

	.action {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;

		.item {
			flex: 1;
			height: 100%;
		}
	}

	.container {
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		padding: 0px 20px;
		height: 100%;
		width: 100%;
		background-color: #fff;
		overflow: hidden;

		.chapter {
			font-size: 28rpx;
			color: #999;
		}

		.content {
			flex: 1 1 auto;
			overflow: hidden;

			.inner-box {
				overflow: hidden;

				.book-inner {
					text-indent: 2em;
					text-align: justify;
				}
			}
			.btns {
				font-size: 30rpx;
				border-radius: 50rpx;
				height: 88rpx;
				width: 630rpx;
				background: linear-gradient(to right, #85B6CA, #F9A4A0);
			}
			
			.btns:active {
				background: linear-gradient(to right, #85B6CA80, #F9A4A080);
			}
		}
	}

	/deep/ .uicon-star-fill {
		color: #f27299 !important;
	}

	.item-type {
		color: #999;
		font-size: 24rpx;
	}

	.item-info {
		color: #FA9C3E;
		font-size: 32rpx;
	}

	.container0 {
		background-color: #fff;
	}

	.container1 {
		background-color: #000;
	}

	.container2 {
		background-color: #E8E2CC;
	}

	.container3 {
		background-color: #BECEBF;
	}

	.container4 {
		background-color: #DCE2F1;
	}

	.container5 {
		background-color: #F1DFC2;
	}

	.cover {

		.data {
			color: #555;
		}

		.type {

			.type-item {
				padding: 2rpx 20rpx;
				font-size: 24rpx;
				color: #666;
				background-color: #ddd;
				border-radius: 12rpx;
			}

			.type-item:last-child {
				margin-right: 0;
			}
		}
	}

	.menu-bottom {
		border-radius: 30rpx 30rpx 0 0;
		padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
	}
</style>