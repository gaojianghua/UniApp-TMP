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
		<view class="container hidden">
			<view class="" :style="{height: $store.state.statusHeight + 'px'}"></view>
			<view class="chapter">
				章节名
			</view>
			<view id="content" class="content">
				<view class="inner-box" :style="{height: `${innerHeight}px`}">
					<view class="book-inner" id="preChapter" v-html="preChapter.text"
						:style="{fontSize: `${fontSize}px`, lineHeight: `${lineHeight*fontSize}px`}">
					</view>
				</view>
			</view>
			<view class="bottom-bar">
				显示电量、页码
			</view>
		</view>

		<view class="container hidden">
			<view class="" :style="{height: $store.state.statusHeight + 'px'}"></view>
			<view class="chapter">
				章节名
			</view>
			<view class="content">
				<view class="inner-box" :style="{height: `${innerHeight}px`}">
					<view class="book-inner" id="curChapter" v-html="curChapter.text"
						:style="{fontSize: `${fontSize}px`, lineHeight: `${lineHeight*fontSize}px`}">
					</view>
				</view>
			</view>
			<view class="bottom-bar">
				显示电量、页码
			</view>
		</view>

		<view class="container hidden">
			<view class="" :style="{height: $store.state.statusHeight + 'px'}"></view>
			<view class="chapter">
				章节名
			</view>
			<view class="content">
				<view class="inner-box" :style="{height: `${innerHeight}px`}">
					<view class="book-inner" id="nextChapter" v-html="nextChapter.text"
						:style="{fontSize: `${fontSize}px`, lineHeight: `${lineHeight*fontSize}px`}">
					</view>
				</view>
			</view>
			<view class="bottom-bar">
				显示电量、页码
			</view>
		</view>

		<!-- ************************** -->
		<!--     根据需要更改（封面）     -->
		<!-- ************************** -->
		<!-- 封面 -->
		<view class="cover container position-relative" :class="`container${background - 1}`" :style="{zIndex: 201, transform: `translate${cover.pageTranslate[turnType]}`, transition: `transform ${showAnimation?turnPageTime:0}s`,
			boxShadow:showShadow&&turnType===0?'0 0 10px 0 rgba(0,0,0,.4)':''}" @touchstart="coverTouchStart"
			@touchend="coverTouchEnd" @touchmove="coverTouchMove" @touchcancel="coverTouchcancel">
			<view class="d-flex a-center j-center position-absolute"
				:style="{top: `calc(30rpx + ${$store.state.statusHeight}px)`}">
				<view class="mr-1"
					style="width: 300rpx; height: 4rpx; background: #FA9C3E80;border-radius: 0 15rpx 15rpx 0;"></view>
				<view class="d-flex a-center">
					<u-icon class="mt-1" name="star-fill" size="16" color="#33C795"></u-icon>
					<u-icon class="mx-1 mb-1" name="star-fill" size="22" color="#33C795"></u-icon>
					<u-icon class="mt-1" name="star-fill" size="16" color="#33C795"></u-icon>
				</view>
				<view class="ml-1"
					style="width: 300rpx; height: 4rpx; background: #FA9C3E80;border-radius: 15rpx 0 0 15rpx;"></view>
			</view>
			<view :style="{height: `calc(330rpx + ${$store.state.statusHeight}px)`}"></view>
			<u-image radius="5" width="290rpx" height="400rpx" :src="detail.picx"></u-image>
			<view class="mt-3 text-center text-ellipsis2 font-weight" style="font-size: 36rpx;"
				:style="{color: `${background == 2 ? colorList[1] : colorList[0]}`}">
				{{detail.name}}
			</view>
			<view class="d-flex a-center mt-1">
				<view class="item-school">
					{{$t('作者')}}: {{detail.author}}
					<!-- {{item.school | numberFormat('w', 'cn')}}{{$t('书友在读')}} -->
				</view>
				<view class="ml-1 item-type">
					<!-- {{item.type}} · {{item.state == 1 ? $t('连载中') : $t('已完结')}} -->
					· {{detail.state}}
				</view>
			</view>
			<view class="d-flex a-base j-center mt-1">
				<u-rate allowHalf :value="detail.score / 2" disabled></u-rate>
				<view class="item-info d-inline-block font-weight ml-1">
					{{detail.score}}{{$t('分')}}
				</view>
			</view>
			<view class="mx-3 mt-5 text-center" style="width: 690rpx;"
				:style="{color: `${background == 2 ? colorList[1] : colorList[0]}`}">
				{{detail.text}}
			</view>
		</view>
		<!-- ************************** -->
		<!--****************************-->
		<!-- ************************** -->


		<!-- 阅读页（结构和样式请和仅用于计算元素一致） -->
		<!-- 上一页 -->
		<view class="container" :class="`container${background - 1}`" :style="{zIndex: 102, transform: `translate${prePage.pageTranslate[turnType]}`, transition: `transform ${showAnimation?turnPageTime:0}s`,
			boxShadow:showShadow&&turnType===0?'0 0 10px 0 rgba(0,0,0,.4)':''}">
			<view class="" :style="{height: $store.state.statusHeight + 'px'}"></view>
			<!-- 章节名 -->
			<view class="chapter">
				{{prePage.chapterName}}
			</view>

			<!-- 外层class="content"用于计算阅读部分的高度 -->
			<view class="content">
				<!-- 内层class="inner-box"利用innerHeight将内容截取至整行，防止文字不完整的情况出现 -->
				<view class="inner-box" :style="{height: `${innerHeight}px`}" v-if="prePage.canRead">
					<!-- 最里层class="book-inner"的用于获取文本总高度，计算总页数，注意不可以overflow:hidden -->
					<view class="book-inner" v-html="prePage.text" :style="{fontSize: `${fontSize}px`, lineHeight: `${lineHeight*fontSize}px`,color: `${background == 2 ? colorList[1] : colorList[0]}`,
						transform: `translateY(-${prePage.pageNum*innerHeight}px)`}">
					</view>
				</view>
				<view style="display:flex;flex-flow: column;justify-content: center;align-items: center;height: 100%;"
					v-else>
					<span>{{$t('VIP章节')}}</span>
					<view class="mt-2 text-white"
						style="padding: 5rpx 40rpx;background-color: #33C795;border-radius: 50rpx;">
						{{$t('开通VIP')}}
					</view>
				</view>

			</view>
			<view class="bottom-bar">
				<!-- 时间 -->
				<view>
					{{systemTimeStr}}
				</view>
				<!-- 页码 -->
				<view>
					{{prePage.pageNum + 1}}/{{prePage.totalPage}}
				</view>
				<!-- 电量 -->
				<view>
					<battery :level="batteryLevel" :charging="batteryState === 2"></battery>
				</view>
			</view>

		</view>

		<!-- 本页 -->
		<view class="container" :class="`container${background - 1}`" :style="{zIndex: 101, transform: `translate${curPage.pageTranslate[turnType]}`, transition: `transform ${showAnimation?turnPageTime:0}s`,
			boxShadow:showShadow&&turnType===0?'0 0 10px 0 rgba(0,0,0,.4)':''}" @touchstart="touchStart" @touchend="touchEnd"
			@touchmove="touchMove" @touchcancel="touchcancel">
			<view class="" :style="{height: $store.state.statusHeight + 'px'}"></view>
			<!-- 章节名 -->
			<view class="chapter">
				{{curPage.chapterName}}
			</view>
			<view class="content">
				<view class="inner-box" :style="{height: `${innerHeight}px`}" v-if="curPage.canRead">
					<view class="book-inner" v-html="curPage.text" :style="{fontSize: `${fontSize}px`, lineHeight: `${lineHeight*fontSize}px`,color: `${background == 2 ? colorList[1] : colorList[0]}`,
						transform: `translateY(-${curPage.pageNum*innerHeight}px)`}">
					</view>
				</view>
				<view style="display:flex;flex-flow: column;justify-content: center;align-items: center;height: 100%;"
					v-else>
					<span>{{$t('VIP章节')}}</span>
					<view class="mt-2 text-white"
						style="padding: 5rpx 40rpx;background-color: #33C795;border-radius: 50rpx;">
						{{$t('开通VIP')}}
					</view>
				</view>

			</view>
			<view class="bottom-bar">
				<!-- 时间 -->
				<view>
					{{systemTimeStr}}
				</view>
				<!-- 页码 -->
				<view>
					{{curPage.pageNum + 1}}/{{curPage.totalPage}}
				</view>
				<!-- 电量 -->
				<view>
					<battery :level="batteryLevel" :charging="batteryState === 2"></battery>
				</view>
			</view>

		</view>

		<!-- 下一页 -->
		<view class="container" :class="`container${background - 1}`" :style="{zIndex: 100, transform: `translate${nextPage.pageTranslate[turnType]}`,transition: `transform ${showAnimation?turnPageTime:0}s`,
			boxShadow:showShadow&&turnType===0?'0 0 10px 0 rgba(0,0,0,.4)':''}">
			<view class="" :style="{height: $store.state.statusHeight + 'px'}"></view>
			<!-- 章节名 -->
			<view class="chapter">
				{{nextPage.chapterName}}
			</view>
			<view class="content">
				<view class="inner-box" :style="{height: `${innerHeight}px`}" v-if="nextPage.canRead">
					<view class="book-inner" v-html="nextPage.text" :style="{fontSize: `${fontSize}px`, lineHeight: `${lineHeight*fontSize}px`,color: `${background == 2 ? colorList[1] : colorList[0]}`,
						transform: `translateY(-${nextPage.pageNum*innerHeight}px)`}">
					</view>
				</view>
				<view style="display:flex;flex-flow: column;justify-content: center;align-items: center;height: 100%;"
					v-else>
					<span>{{$t('VIP章节')}}</span>
					<view class="mt-2 text-white"
						style="padding: 5rpx 40rpx;background-color: #33C795;border-radius: 50rpx;">
						{{$t('开通VIP')}}
					</view>
				</view>

			</view>
			<view class="bottom-bar">
				<!-- 时间 -->
				<view>
					{{systemTimeStr}}
				</view>
				<!-- 页码 -->
				<view>
					{{nextPage.pageNum + 1}}/{{nextPage.totalPage}}
				</view>
				<!-- 电量 -->
				<view>
					<battery :level="batteryLevel" :charging="batteryState === 2"></battery>
				</view>
			</view>
		</view>
		<!-- 菜单层 -->
		<view class="menu" :style="{height: `100%`, width: `100%`}" v-if="menuShow" @touchend="closeMenu">
			<!-- 菜单层包含返回按钮的上半部分 -->
			<view class="menu-top" :style="{height: `${statusBarHeight + 40}px`, top: itemShow ? 0 : `-100%`}"
				@touchend.stop>
				<view :style="{height: `${statusBarHeight}px`}"></view>
				<view class="head d-flex a-center">
					<text class="iconfont back" @click="back">&#xe71a;</text>
					<view class="d-flex a-center ml-auto pr-3">
						<u-icon @click="sharePosters" class="mr-2" name="share" size="24" color="#fff"></u-icon>
						<u-icon v-if="detail.fav == 1" name="heart-fill" size="24" color="#33C795"
							@click="delfavor"></u-icon>
						<u-icon v-else name="heart" size="24" color="#fff" @click="addfavor"></u-icon>
					</view>
				</view>
			</view>
			<!-- 菜单主体 -->
			<view class="menu-bottom" :style="{bottom: itemShow ? 0 : '-100%'}" @touchend.stop>
				<!-- 用于显示章节进度 -->
				<view class="show-chapter" v-if="progressTouched">{{directoryList[chapterProgress].name}}</view>
				<view class="show-chapter" v-else>{{curChapter.chapterName}}</view>
				<!-- 章节进度条 -->
				<view class="progress-box">
					<text @click="goPreChapter">{{$t('上一章')}}</text>
					<view style="flex: 1;height: 100%;padding: 8px 0;">
						<slider :value="curChapter.chapterIndex" activeColor="#000" :block-size="20"
							:max="directoryList.length - 1" @changing="slideChanging" @change="slideChange" />
					</view>
					<text @click="goNextChapter">{{$t('下一章')}}</text>
				</view>
				<view class="items-box">
					<view class="item-box" @click="openDirectory">
						<text class="iconfont line-h" style="font-size: 25px;">&#xe601;</text>
						<text style="font-size: 13px;">{{$t('目录')}}</text>
					</view>
					<view class="item-box" v-if="background != 2" @click="changeBackground(2)">
						<text class="iconfont line-h" style="font-size: 25px;">&#xe63e;</text>
						<text style="font-size: 13px;">{{$t('夜间')}}</text>
					</view>
					<view class="item-box" v-else @click="changeBackground(tempBackground)">
						<text class="iconfont line-h" style="font-size: 25px;">&#xe64c;</text>
						<text style="font-size: 13px;">{{$t('日间')}}</text>
					</view>
					<view class="item-box" @click="openSetting">
						<text class="iconfont line-h" style="font-size: 25px;">&#xe61d;</text>
						<text style="font-size: 13px;">{{$t('设置')}}</text>
					</view>

				</view>
			</view>

			<view class="setting hideen" :style="{bottom: settingShow ? 0 : `-100%`}" @touchend.stop>
				<view class="setting-title position-relative d-flex a-center j-center main-bg-color w-100"
					style="height: 80rpx;">
					{{$t('阅读设置')}}
					<u-icon class="position-absolute" style="top: 25rpx; right: 20rpx;" name="close" size="18"
						color="#fff" @click="closeMenu"></u-icon>
				</view>
				<view class="item">
					<view class="item-name">{{$t('字号')}}</view>
					<view class="icon" @click="bigSize" v-if="fontSize<maxFontSize">A+</view>
					<view class="icon" style="color: #666; border: #666 solid 1px;" v-else>A+</view>
					<view class="text-dark mr-2">
						{{fontSize}}
					</view>
					<view class="icon" @click="smallSize" v-if="fontSize>minFontSize">A-</view>
					<view class="icon" style="color: #666;border: #666 solid 1px;" v-else>A-</view>
					<!-- <view class="icon" @click="changeFont(2)" v-if="simplified === 1">繁體</view>
					<view class="icon" @click="changeFont(1)" v-else style="border: #FF9900 solid 1px;color: #FF9900">繁體</view> -->
				</view>
				<view class="item">
					<view class="item-name">{{$t('排版')}}</view>
					<view class="type-setting" :class="{active: lineHeight === 1}" @click="changeLineHeight(1)">
						<view class="line" :class="{lineActive: lineHeight === 1}" v-for="i in 5" :key="i"></view>
					</view>
					<view class="type-setting" :class="{active: lineHeight === 1.5}" @click="changeLineHeight(1.5)">
						<view class="line" :class="{lineActive: lineHeight === 1.5}" v-for="i in 4" :key="i"></view>
					</view>
					<view class="type-setting" :class="{active: lineHeight === 2}" @click="changeLineHeight(2)">
						<view class="line" :class="{lineActive: lineHeight === 2}" v-for="i in 3" :key="i"></view>
					</view>
					<view class="type-setting" :class="{active: lineHeight === 2.5}" @click="changeLineHeight(2.5)">
						<view class="line" :class="{lineActive: lineHeight === 2.5}" v-for="i in 2" :key="i"></view>
					</view>
					<view class="type-setting" :class="{active: lineHeight === 3}" @click="changeLineHeight(3)">
						<view class="line" :class="{lineActive: lineHeight === 3}" v-for="i in 1" :key="i"></view>
					</view>
				</view>
				<view class="item">
					<view class="item-name">{{$t('翻页')}}</view>
					<view class="icon" :class="{active: turnType === 0}" style="padding: 5px 8px; width: 150rpx;"
						@click="changeTurnType(0)">{{$t('覆盖翻页')}}</view>
					<view class="icon" :class="{active: turnType === 1}" style="padding: 5px 8px;width: 150rpx;"
						@click="changeTurnType(1)">{{$t('平移翻页')}}</view>
					<view class="icon" :class="{active: turnType === 2}" style="padding: 5px 8px;width: 150rpx;"
						@click="changeTurnType(2)">{{$t('上下翻页')}}</view>
				</view>
				<view class="item">
					<view class="item-name">{{$t('背景')}}</view>
					<view class="icon roun" style="background-color: #fff;" :class="{active: background === 1}"
						@click="changeBackground(1)"></view>
					<view class="icon roun" style="background-color: #E8E2CC;" :class="{active: background === 3}"
						@click="changeBackground(3)"></view>
					<view class="icon roun" style="background-color: #BECEBF;" :class="{active: background === 4}"
						@click="changeBackground(4)"></view>
					<view class="icon roun" style="background-color: #DCE2F1;" :class="{active: background === 5}"
						@click="changeBackground(5)"></view>
					<view class="icon roun" style="background-color: #F1DFC2;" :class="{active: background === 6}"
						@click="changeBackground(6)"></view>
				</view>
			</view>

			<!-- 目录层 -->
			<view class="directory" :class="`container${background - 1}`" v-if="directoryShowBefore"
				:style="{left: directoryShow ? 0 : '-100%',color: `${background == 2 ? colorList[1] : colorList[0]}`,boxShadow:'0 0 10px 0 rgba(0,0,0,.4)'}"
				@touchend.stop>
				<view class="nation-title d-flex a-center px-2 j-sb"
					:style="{height: `calc(80rpx + ${$store.state.statusHeight}px)` , paddingTop: $store.state.statusHeight + 'px'}">
					<view class="d-flex a-center">
						<view class="text-ellipsis1" style="width: 300rpx;">{{detail.name}}</view>
						<view>({{directoryList.length}})</view>
					</view>
					<view class="d-flex a-center j-center">
						<view class="" :style="{color: isSort == 0 ? '#33C795' : '#666'}" @click="setIsSort(0)">
							{{$t('正序')}}
						</view>
						<view class="px-1" style="color: #33C795;">
							|
						</view>
						<view class="" :style="{color: isSort == 1 ? '#33C795' : '#666'}" @click="setIsSort(1)">
							{{$t('倒序')}}
						</view>
					</view>
				</view>
				<!--  :size="40"——每一栏高度为40px  :scrollHeight="windowHeight - 60"——书名的高度为60px -->
				<virtual-list :items="directoryList" :size="40" :remain="16" :active="curChapter.chapterIndex"
					:scrollHeight="windowHeight - 40 - $store.state.statusHeight">
					<template v-slot="{item,active}">
						<view class="directory-listItem" :class="{active: item.index == active}"
							@click="goToChapter(item.index)">
							<view v-if="item.vip!=='0'" class="isvip line-h text-white mr-2">
								VIP
							</view>
							<view class="name">
								{{item.name}}
							</view>
							<u-icon v-if="item.cion!=='0'" class="ml-auto" name="lock" color="#111" size="24"></u-icon>
						</view>
					</template>
				</virtual-list>
			</view>
		</view>
		<mine-app-share @closePoster="closePoster" @success="success" :posterShow="posterShow" :item="detail" />
		<m-modal :show="modalShow" i18n title="温馨提示" btnName="加入书架"  @cancel="cancel" @confirm="addfavor">
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
		requestData
	} from '@/utils/index.js'
	import {
		getNovelChapterList,
		getNovelChapterInfo,
		getNovelDetail,
		addNovelShelf,
		delNovelShelf,
	} from '@/utils/request/api/get.js'
	import battery from '@/components/battery.vue'
	import virtualList from '@/components/virtualList.vue'
	import MineAppShare from '@/components/mine-app-share/index.vue'
	import MModal from '@/main_modules/main-ui/m-modal/index.vue'
	import {
		traditionalized,
		simplized,
		dateToStr
	} from '@/utils/index.js'
	export default {
		components: {
			battery,
			virtualList,
			MineAppShare,
			MModal
		},
		data() {
			return {
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

				preChapter: { //上一章数据
					ready: false, //是否准备完毕
					chapterIndex: '',
					chapterName: '',
					text: '',
					totalPage: '',
					canRead: true
				},

				curChapter: { //本一章数据
					chapterIndex: '',
					chapterName: '',
					text: '',
					totalPage: '',
					canRead: true
				},

				nextChapter: { //下一章数据
					ready: false, //是否准备完毕
					chapterIndex: '',
					chapterName: '',
					text: '',
					totalPage: '',
					canRead: true
				},

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

				windowWidth: 0, //可用屏幕宽度
				windowHeight: 0, //可用屏幕高度
				contentHeight: 0, //阅读区域高度

				platform: '', //设备
				batteryState: '', //电池状态
				batteryLevel: 100, //电量
				systemTime: '', //系统时间
				systemTimeStr: '', //系统时间字符串
				statusBarHeight: 0, //状态栏高度
				pixelRatio: '', //设备像素比

				touchStartX: 0, // 触屏起始点x
				touchX: 0, // 瞬时触屏点x
				delta: 0, // 手指瞬时位移

				touchStartY: 0, // 触屏起始点y
				touchY: 0, // 瞬时触屏点y

				menuShow: false, //菜单栏box是否渲染
				itemShow: false, // 菜单栏动画控制
				settingShow: false, //设置栏动画控制
				directoryShow: false, //目录动画控制
				directoryShowBefore: false, // 目录渲染
				turnPageTime: .5, //翻页动画时间

				maxFontSize: 30, //最大字体大小，px
				minFontSize: 14, //最小字体大小，px
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
				isSort: 0,
				posterShow: false,
				isSuccess: false,
				time: null,
				modalShow: false
			}
		},
		onLoad(options) {
			this.query = this.$tools.Navigate.receivePageData(options)
			this.get_detail()
			this.getSystemInfo()
			this.tempBackground = uni.getStorageSync('background') == 2 ? 1 : uni.getStorageSync('background')
			// this.initPage()
		},
		onUnload() {

			// #ifdef APP-PLUS
			// 退出全屏
			plus.navigator.setFullscreen(false)
			// #endif

			// this.setStorage()
		},
		onHide() {
			// this.setStorage()
		},
		mounted() {
			this.initPage()
		},
		computed: {
			progress() { //章节的阅读进度
				if (this.curChapter.totalPage === 1) {
					return 0
				}
				return this.currentPage / (this.curChapter.totalPage - 1)
			}
		},
		methods: {
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
			async addfavor() {
				let result = requestData({
					id: this.detail.id
				})
				let {} = await addNovelShelf(result)
				this.detail.fav = 1
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: this.$t("收藏成功,请在书架查看"),
					complete: () => {
						let time = setTimeout(() => {
							if (this.modalShow) {
								uni.navigateBack()
							}
							clearTimeout(time)
						}, 1000)
					}
				});
			},
			// 取消收藏
			async delfavor() {
				let result = requestData({
					ids: this.detail.id
				})
				let {} = await delNovelShelf(result)
				this.detail.fav = 0
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: this.$t("取消收藏成功")
				});
			},
			// 设置排序
			setIsSort(id) {
				if (id == 0) {
					if (this.isSort !== 0) {
						this.directoryList = this.directoryList.reverse()
						this.isSort = 0
					}
				} else {
					if (this.isSort !== 1) {
						this.directoryList = this.directoryList.reverse()
						this.isSort = 1
					}
				}
			},
			// 获取详情
			async get_detail() {
				let result = requestData({
					id: this.query.bid
				})
				let {
					code,
					book
				} = await getNovelDetail(result)
				this.detail = book
			},
			// 获取章节内容
			async getNovelChapterInfos() {
				if (!this.query.zid) {
					this.query.zid = this.chapterList[0].id
				}
				let result = requestData(this.query)
				let {
					data,
					code
				} = await getNovelChapterInfo(result)
				this.text = data.text
			},
			// 获取章节列表
			async getNovelChapters() {
				let result = requestData({
					id: this.query.bid
				})
				let {
					list,
					code
				} = await getNovelChapterList(result)
				this.chapterList = list
				this.getNovelChapterInfos()
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
				// 		value.chapterIndex = this.curChapter.chapterIndex
				// 		value.progress = this.progress
				// 	}
				// })
				// if (!have) {
				// 	history.push({
				// 		bookId: this.bookId,
				// 		chapterIndex: this.curChapter.chapterIndex,
				// 		progress: this.progress
				// 	})
				// }
				// uni.setStorageSync('history', history)
			},

			/**
			 * 返回上一页面
			 **/
			back() {
				if (this.detail.fav == 1) {
					uni.navigateBack()
				}else {
					this.closeMenu()
					this.modalShow = true
				}
			},

			/**
			 * 获取设备信息
			 **/
			getSystemInfo() {

				const {
					windowWidth,
					windowHeight,
					statusBarHeight,
					platform,
					pixelRatio
				} = uni.getSystemInfoSync()
				//获取一些必要的设备参数
				this.statusBarHeight = statusBarHeight
				this.windowWidth = windowWidth
				this.windowHeight = windowHeight
				this.pixelRatio = pixelRatio
				this.platform = platform
				// #ifdef APP-PLUS
				// 全屏
				plus.navigator.setFullscreen(true)
				// 取消ios左滑返回
				let page = this.$mp.page.$getAppWebview()
				page.setStyle({
					popGesture: 'none'
				})

				if (this.platform === 'ios') {
					// 获取ios电量
					let UIDevice = plus.ios.import("UIDevice")
					let dev = UIDevice.currentDevice()
					if (!dev.isBatteryMonitoringEnabled()) {
						dev.setBatteryMonitoringEnabled(true)
					}
					setInterval(() => {
						this.batteryState = dev.batteryState()
						this.batteryLevel = dev.batteryLevel() * 100
					}, 1000)
				} else {
					// 获取安卓电量
					let main = plus.android.runtimeMainActivity();
					let Intent = plus.android.importClass('android.content.Intent');
					let recevier = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
						onReceive: (context, intent) => {
							let action = intent.getAction();
							if (action == Intent.ACTION_BATTERY_CHANGED) {
								this.batteryState = intent.getIntExtra("status", 0); //电池状态  
								this.batteryLevel = intent.getIntExtra("level", 0); //电量
							}
						}
					});
					let IntentFilter = plus.android.importClass('android.content.IntentFilter');
					let filter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
					main.registerReceiver(recevier, filter);
				}

				// #endif

				// 设置时间
				let date = new Date();
				this.systemTime = Date.parse(date);
				this.systemTimeStr = dateToStr(this.systemTime);
				setInterval(() => {
					this.systemTime += 60000;
					this.systemTimeStr = dateToStr(this.systemTime);
				}, 60000)

				// 获取字体、排版等信息

				/*****************************************/
				/**********    根据需要更改    ************/
				/*****************************************/

				//可能缓存在前端可能从后端拿，如果是异步注意同步处理
				this.fontSize = uni.getStorageSync('fontSize')
				if (typeof this.fontSize !== 'number') {
					this.fontSize = 16
				}
				this.simplified = uni.getStorageSync('simplified')
				if (typeof this.simplified !== 'number') {
					this.simplified = 1
				}
				this.lineHeight = uni.getStorageSync('lineHeight')
				if (typeof this.lineHeight !== 'number') {
					this.lineHeight = 1.5
				}
				this.background = uni.getStorageSync('background')
				if (typeof this.background !== 'number') {
					this.background = 1
				}
				this.turnType = uni.getStorageSync('turnType')
				if (typeof this.turnType !== 'number') {
					this.turnType = 0
				}
				let history = uni.getStorageSync('history')
				if (typeof history !== 'object') {
					history = []
				}
				history.forEach((value) => {
					if (value.bookId === this.bookId) {
						this.history = value
					}
				})

				/*****************************************/
				/*****************************************/
				/*****************************************/

			},

			/**
			 * 获取数据并计算页面
			 **/
			async initPage() {
				uni.showLoading({
					mask: true
				})
				this.cover.pageTranslate = [
					`(-100%,0)`,
					`(-100%,0)`,
					`(0,${-this.windowHeight}px)`
				]
				await this.calcHeight()
				await this.getDirectoryList()

				if (this.history.chapterIndex > this.directoryList.length - 1 || !this.history.chapterIndex) {
					this.history.chapterIndex = 0
				}
				await this.getThreeChapter(this.history.chapterIndex)

				let page = Math.floor((this.curChapter.totalPage - 1) * this.history.progress)
				this.goToPage(page)
				uni.hideLoading()

			},

			/**
			 * 计算innerHeight，用于截取至整行
			 **/
			calcHeight() {
				if (this.contentHeight) {
					let lineHeight = this.fontSize * this.lineHeight;
					// #ifdef APP-PLUS || MP-WEIXIN
					lineHeight = Math.floor(lineHeight * this.pixelRatio) / this.pixelRatio
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
								lineHeight = Math.floor(lineHeight * this.pixelRatio) / this
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

			/**
			 * 计算本章页数
			 **/
			calcCurChapter() {
				return new Promise((resolve, reject) => {
					// 此处setTimeout 100ms是为了确保元素渲染完毕从而获取正确高度，如果遇到页面页数计算不正确的情况可以增加时间试试看
					setTimeout(() => {
						const query = uni.createSelectorQuery().in(this);
						query.select('#curChapter').boundingClientRect(data => {
							let height = data.height;
							// #ifdef APP-PLUS || MP-WEIXIN

							height = Math.round(height * this.pixelRatio) / this.pixelRatio
							// #endif
							this.curChapter.totalPage = Math.ceil(height / this.innerHeight) || 1
							this.curChapter.ready = true //章节准备完毕
							resolve()
						}).exec();
					}, 100)

				})
			},

			/**
			 * 计算上一章页数,并翻页（如果有）
			 **/
			calcPreChapter() {
				return new Promise((resolve, reject) => {
					// 此处setTimeout 100ms是为了确保元素渲染完毕从而获取正确高度，如果遇到页面页数计算不正确的情况可以增加时间试试看
					setTimeout(() => {
						const query = uni.createSelectorQuery().in(this);
						query.select('#preChapter').boundingClientRect(data => {
							let height = data.height;
							// #ifdef APP-PLUS || MP-WEIXIN
							height = Math.round(height * this.pixelRatio) / this.pixelRatio
							// #endif
							this.preChapter.totalPage = Math.ceil(height / this.innerHeight) || 1
							this.preChapter.ready = true //章节准备完毕
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
					}, 100)

				})

			},

			/**
			 * 计算下一章页数,并翻页（如果有）
			 **/
			calcNextChapter() {
				return new Promise((resolve, reject) => {
					// 此处setTimeout 100ms是为了确保元素渲染完毕从而获取正确高度，如果遇到页面页数计算不正确的情况可以增加时间试试看
					setTimeout(() => {
						const query = uni.createSelectorQuery().in(this);
						query.select('#nextChapter').boundingClientRect(data => {
							let height = data.height;
							// #ifdef APP-PLUS || MP-WEIXIN
							height = Math.round(height * this.pixelRatio) / this.pixelRatio
							// #endif
							this.nextChapter.totalPage = Math.ceil(height / this.innerHeight) || 1
							this.nextChapter.ready = true //章节准备完毕
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

					}, 100)

				})

			},

			/**
			 * 触摸开始（封面）
			 **/
			coverTouchStart(e) {
				this.showAnimation = false //关掉动画，否则翻页会很慢
				this.touchX = e.touches[0].clientX
				this.touchStartX = e.touches[0].clientX
				this.touchY = e.touches[0].clientY
				this.touchStartY = e.touches[0].clientY
			},

			/**
			 * 触摸（封面）
			 **/
			coverTouchMove(e) {
				this.showShadow = true
				let delta = 0
				if (this.turnType === 0 || this.turnType === 1) { //翻页方式为‘覆盖’或者‘左右平移’
					delta = e.touches[0].clientX - this.touchStartX;

					// 限制边界
					if (delta > this.windowWidth) {
						delta = this.windowWidth
					}
					if (delta < -this.windowWidth) {
						delta = -this.windowWidth
					}

					this.delta = e.touches[0].clientX - this.touchX;
					this.touchX = e.touches[0].clientX;
				} else { //翻页方式为‘上下平移’
					delta = e.touches[0].clientY - this.touchStartY;

					// 限制边界
					if (delta > this.windowHeight) {
						delta = this.windowHeight
					}
					if (delta < -this.windowHeight) {
						delta = -this.windowHeight
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
						`(${this.windowWidth + delta}px,0)`,
						`(0,${this.windowHeight + delta}px)`
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
						`(${this.windowWidth + delta}px,0)`,
						`(0,${this.windowHeight + delta}px,)`
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

			/**
			 * 触摸结束（封面）
			 **/
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
					if (e.changedTouches[0].clientX < this.windowWidth / 3) { //点击屏幕左1/3为上一页
						// uni.showToast({
						// 	title: '已经是第一页了',
						// 	icon: 'none'
						// })
					} else if (e.changedTouches[0].clientX > this.windowWidth / 3 * 2) { //点击屏幕右1/3为下一页
						this.cover.pageTranslate = [
							`(-100%,0)`,
							`(-100%,0)`,
							`(0,${-this.windowHeight}px)`
						]
						this.curPage.pageTranslate = [
							`(0,0)`,
							`(0,0)`,
							`(0,0)`
						]
					} else if (e.changedTouches[0].clientX <= this.windowWidth / 3 * 2 && e.changedTouches[0].clientX >=
						this.windowWidth / 3) { //点击屏幕中间1/3为呼出菜单

						this.showMenu()
					}
				} else {
					if (this.next && this.delta <= 0) { //下一页
						this.cover.pageTranslate = [
							`(-100%,0)`,
							`(-100%,0)`,
							`(0,${-this.windowHeight}px)`
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
							`(${this.windowWidth}px,0)`,
							`(0,${this.windowHeight}px)`
						]
					}
				}
				this.next = false
				this.pre = false

			},

			/**
			 * 触摸取消（封面）
			 **/
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
					`(${this.windowWidth}px,0)`,
					`(0,${this.windowHeight}px)`
				]
				this.next = false
				this.pre = false
			},

			/**
			 * 触摸开始
			 **/
			touchStart(e) {
				this.showAnimation = false
				this.touchX = e.touches[0].clientX;
				this.touchStartX = e.touches[0].clientX;
				this.touchY = e.touches[0].clientY;
				this.touchStartY = e.touches[0].clientY;
			},

			/**
			 * 触摸
			 **/
			touchMove(e) {
				this.showShadow = true;
				let delta = 0
				if (this.turnType === 0 || this.turnType === 1) { //翻页方式为‘覆盖’或者‘左右平移’
					delta = e.touches[0].clientX - this.touchStartX;

					// 限制边界
					if (delta > this.windowWidth) {
						delta = this.windowWidth
					}
					if (delta < -this.windowWidth) {
						delta = -this.windowWidth
					}

					this.delta = e.touches[0].clientX - this.touchX;
					this.touchX = e.touches[0].clientX;
				} else { //翻页方式为‘上下平移’
					delta = e.touches[0].clientY - this.touchStartY;

					// 限制边界
					if (delta > this.windowHeight) {
						delta = this.windowHeight
					}
					if (delta < -this.windowHeight) {
						delta = -this.windowHeight
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
						`(${-this.windowWidth+delta}px,0)`,
						`(0,${-this.windowHeight+delta}px)`
					]
					this.curPage.pageTranslate = [
						`(${delta}px,0)`,
						`(${delta}px,0)`,
						`(0,${delta}px)`
					]
					this.nextPage.pageTranslate = [
						`(0,0)`,
						`(${this.windowWidth+delta}px,0)`,
						`(0,${this.windowHeight+delta}px)`
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
								`(${-this.windowWidth+delta}px,0)`,
								`(0,${-this.windowHeight+delta}px)`
							]
							this.curPage.pageTranslate = [
								`(${delta}px,0)`,
								`(${delta}px,0)`,
								`(0,${delta}px)`
							]
							this.nextPage.pageTranslate = [
								`(0,0)`,
								`(${this.windowWidth+delta}px,0)`,
								`(0,${this.windowHeight+delta}px)`
							]
						}
					} else if (this.nextChapter.ready) { //下一章已经准备好了
						this.nextPage = {
							ready: this.nextChapter.ready,
							chapterName: this.nextChapter.chapterName,
							text: this.nextChapter.text,
							pageNum: 0,
							totalPage: this.nextChapter.totalPage,
							pageTranslate: [
								`(0,0)`,
								`(${this.windowWidth}px,0)`,
								`(0,${this.windowHeight}px)`
							],
							canRead: this.nextChapter.canRead
						}
						this.prePage.pageTranslate = [
							`(-100%,0)`,
							`(${-this.windowWidth+delta}px,0)`,
							`(0,${-this.windowHeight+delta}px)`
						]
						this.curPage.pageTranslate = [
							`(${delta}px,0)`,
							`(${delta}px,0)`,
							`(0,${delta}px)`
						]
						this.nextPage.pageTranslate = [
							`(0,0)`,
							`(${this.windowWidth+delta}px,0)`,
							`(0,${this.windowHeight+delta}px)`
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
							`(${-this.windowWidth+delta}px,0)`,
							`(${-this.windowWidth+delta}px,0)`,
							`(0,${-this.windowHeight+delta}px)`
						]
						this.curPage.pageTranslate = [
							`(0,0)`,
							`(${delta}px,0)`,
							`(0,${delta}px)`
						]
					} else {
						this.prePage.pageTranslate = [
							`(${-this.windowWidth+delta}px,0)`,
							`(${-this.windowWidth+delta}px,0)`,
							`(0,${-this.windowHeight+delta}px)`
						]
						this.curPage.pageTranslate = [
							`(0,0)`,
							`(${delta}px,0)`,
							`(0,${delta}px)`
						]
						this.nextPage.pageTranslate = [
							`(0,0)`,
							`(${this.windowWidth+delta}px,0)`,
							`(0,${this.windowHeight+delta}px)`
						]
					}
				}
				if (!this.pre && !this.next && delta > 0) { //首次翻上一页
					this.pre = true
					if (this.prePage.ready) { //页面准备好了
						if (this.prePage.isCover) { //上一页是封面
							this.cover.pageTranslate = [
								`(${-this.windowWidth+delta}px,0)`,
								`(${-this.windowWidth+delta}px,0)`,
								`(0,${-this.windowHeight+delta}px)`
							]
							this.curPage.pageTranslate = [
								`(0,0)`,
								`(${delta}px,0)`,
								`(0,${delta}px)`
							]
						} else {
							this.prePage.pageTranslate = [
								`(${-this.windowWidth+delta}px,0)`,
								`(${-this.windowWidth+delta}px,0)`,
								`(0,${-this.windowHeight+delta}px)`
							]
							this.curPage.pageTranslate = [
								`(0,0)`,
								`(${delta}px,0)`,
								`(0,${delta}px)`
							]
							this.nextPage.pageTranslate = [
								`(0,0)`,
								`(${this.windowWidth+delta}px,0)`,
								`(0,${this.windowHeight+delta}px)`
							]
						}
					} else if (this.preChapter.ready) { //上一章已经准备好了
						this.prePage = {
							ready: this.preChapter.ready,
							chapterName: this.preChapter.chapterName,
							text: this.preChapter.text,
							pageNum: this.preChapter.totalPage - 1,
							totalPage: this.preChapter.totalPage,
							pageTranslate: [
								`(-100%,0)`,
								`(-100%,0)`,
								`(0,${-this.windowHeight}px)`
							],
							canRead: this.preChapter.canRead
						}
						this.prePage.pageTranslate = [
							`(${-this.windowWidth+delta}px,0)`,
							`(${-this.windowWidth+delta}px,0)`,
							`(0,${-this.windowHeight+delta}px)`
						]
						this.curPage.pageTranslate = [
							`(0,0)`,
							`(${delta}px,0)`,
							`(0,${delta}px)`
						]
						this.nextPage.pageTranslate = [
							`(0,0)`,
							`(${this.windowWidth+delta}px,0)`,
							`(0,${this.windowHeight+delta}px)`
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
					if (e.changedTouches[0].clientX < this.windowWidth / 3) { //点击屏幕左1/3为上一页
						this.goPrePage()
					} else if (e.changedTouches[0].clientX > this.windowWidth / 3 * 2) { //点击屏幕右1/3为下一页
						this.goNextPage()
					} else if (e.changedTouches[0].clientX <= this.windowWidth / 3 * 2 && e.changedTouches[0].clientX >=
						this.windowWidth / 3) { //点击屏幕中间1/3为呼出菜单
						if (!this.curPage.canRead && e.changedTouches[0].clientY <= this.windowHeight / 3 * 2 && e
							.changedTouches[0].clientY >= this.windowHeight / 3) {
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
							`(0,${-this.windowHeight}px)`
						]
						this.curPage.pageTranslate = [
							`(0,0)`,
							`(0,0)`,
							`(0,0)`
						]
						this.nextPage.pageTranslate = [
							`(0,0)`,
							`(${this.windowWidth}px,0)`,
							`(0,${this.windowHeight}px)`
						]
					} else if (this.pre && this.delta >= 0) { //上一页
						this.goPrePage()
					} else if (this.pre && this.delta < 0) { //取消翻页
						this.prePage.pageTranslate = [
							`(-100%,0)`,
							`(-100%,0)`,
							`(0,${-this.windowHeight}px)`
						]
						this.curPage.pageTranslate = [
							`(0,0)`,
							`(0,0)`,
							`(0,0)`
						]
						this.nextPage.pageTranslate = [
							`(0,0)`,
							`(${this.windowWidth}px,0)`,
							`(0,${this.windowHeight}px)`
						]
						this.cover.pageTranslate = [
							`(-100%,0)`,
							`(-100%,0)`,
							`(0,${-this.windowHeight}px)`
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
					`(0,${-this.windowHeight}px)`
				]
				this.curPage.pageTranslate = [
					`(0,0)`,
					`(0,0)`,
					`(0,0)`
				]
				this.nextPage.pageTranslate = [
					`(0,0)`,
					`(${this.windowWidth}px,0)`,
					`(0,${this.windowHeight}px)`
				]
				this.cover.pageTranslate = [
					`(-100%,0)`,
					`(-100%,0)`,
					`(0,${-this.windowHeight}px)`
				]
				this.next = false
				this.pre = false
			},

			/**
			 * 呼出菜单
			 **/
			showMenu() {
				// #ifdef APP-PLUS
				plus.navigator.setFullscreen(false);
				// #endif
				this.menuShow = true;
				setTimeout(() => {
					this.itemShow = true
				}, 100)
			},

			/**
			 * 关闭菜单
			 **/
			closeMenu() {
				// #ifdef APP-PLUS
				plus.navigator.setFullscreen(true);
				// #endif
				this.itemShow = false
				this.settingShow = false
				this.directoryShow = false
				setTimeout(() => {
					this.directoryShowBefore = false
					this.menuShow = false
				}, 300)
			},

			/**
			 * 关闭菜单栏，呼出设置栏
			 **/
			openSetting() {

				this.itemShow = false
				setTimeout(() => {
					this.settingShow = true
				}, 300)
			},

			/**
			 * 关闭菜单栏，呼出目录栏
			 **/
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
				this.chapterProgress = e.detail.value
			},

			/**
			 * 结束拖动进度条
			 **/
			async slideChange(e) {

				this.chapterProgress = e.detail.value
				uni.showLoading()
				await this.getThreeChapter(e.detail.value)
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
						`(${this.windowWidth}px,0)`,
						`(0,${this.windowHeight}px)`
					]
					return
				}
				if (!this.prePage.ready && !this.preChapter.ready) {
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
					this.currentPage = this.preChapter.totalPage - 1
					this.chapterRotate('pre')
				}

				let cur = [].concat(this.curPage.pageTranslate)
				let pre = [].concat(this.prePage.pageTranslate)
				this.goToPage(this.currentPage)
				this.prePage.pageTranslate = [
					`(-100%,0)`,
					`(-100%,0)`,
					`(0,${-this.windowHeight}px)`
				]
				this.curPage.pageTranslate = pre
				this.nextPage.pageTranslate = cur
				setTimeout(() => {
					// if (showChapter) {
					// 	uni.showToast({
					// 		title: this.curChapter.chapterName,
					// 		icon: 'none'
					// 	})
					// }
					this.showAnimation = true
					this.prePage.pageTranslate = [
						`(-100%,0)`,
						`(-100%,0)`,
						`(0,${-this.windowHeight}px)`
					]
					this.curPage.pageTranslate = [
						`(0,0)`,
						`(0,0)`,
						`(0,0)`
					]
					this.nextPage.pageTranslate = [
						`(0,0)`,
						`(${this.windowWidth}px,0)`,
						`(0,${this.windowHeight}px)`
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
				if (!this.nextPage.ready && !this.nextChapter.ready) {
					this.waitForNext = true
					uni.showLoading({
						title: '正在准备下一章',
						mask: true
					})
					return
				}
				this.currentPage += 1
				let showChapter = false
				if (this.currentPage === this.curChapter.totalPage) { //翻至下一章了
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
					`(${this.windowWidth}px,0)`,
					`(0,${this.windowHeight}px)`
				]
				setTimeout(() => {
					// if (showChapter) {
					// 	uni.showToast({
					// 		title: this.curChapter.chapterName,
					// 		icon: 'none'
					// 	})
					// }
					this.showAnimation = true
					this.prePage.pageTranslate = [
						`(-100%,0)`,
						`(-100%,0)`,
						`(0,${-this.windowHeight}px)`
					]
					this.curPage.pageTranslate = [
						`(0,0)`,
						`(0,0)`,
						`(0,0)`
					]
					this.nextPage.pageTranslate = [
						`(0,0)`,
						`(${this.windowWidth}px,0)`,
						`(0,${this.windowHeight}px)`
					]
				}, 50)
			},

			/**
			 * 章节轮换
			 **/
			async chapterRotate(type) {
				if (type === 'next') {
					this.preChapter = Object.assign({}, this.curChapter)
					this.curChapter = Object.assign({}, this.nextChapter)
					if (this.curChapter.chapterIndex !== this.directoryList.length - 1) { //最后一章是根据目录列表长度判断
						this.nextChapter = {
							ready: false,
							chapterIndex: this.curChapter.chapterIndex + 1,
							chapterName: this.directoryList[this.curChapter.chapterIndex + 1].name,
						}
						await this.getOneChapter(this.directoryList[this.curChapter.chapterIndex + 1].id)
						this.$set(this.nextChapter, 'text', this.tmpChapter.text)
						this.$set(this.nextChapter, 'canRead', this.tmpChapter.canRead)
						this.calcNextChapter()
					} else {
						this.nextChapter = {
							ready: true,
							isEnd: true
						}
					}
				}
				if (type === 'pre') {
					this.nextChapter = Object.assign({}, this.curChapter)
					this.curChapter = Object.assign({}, this.preChapter)
					if (this.curChapter.chapterIndex !== 0) {
						this.preChapter = {
							ready: false,
							chapterIndex: this.curChapter.chapterIndex - 1,
							chapterName: this.directoryList[this.curChapter.chapterIndex - 1].name,
						}
						await this.getOneChapter(this.directoryList[this.curChapter.chapterIndex - 1].id)
						this.$set(this.preChapter, 'text', this.tmpChapter.text)
						this.$set(this.preChapter, 'canRead', this.tmpChapter.canRead)
						this.calcPreChapter()
					} else {
						this.preChapter = {
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
				if (this.curChapter.chapterIndex === this.directoryList.length - 1) {
					uni.showToast({
						title: '已经是最后一章了',
						icon: 'none'
					})
					return
				}
				if (this.waitForNext || this.waitForPre) {
					return
				}
				if (this.nextChapter.ready) {
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
				if (this.curChapter.chapterIndex === 0) {
					uni.showToast({
						title: '这是第一章',
						icon: 'none'
					})
					return
				}
				if (this.waitForNext || this.waitForPre) {
					return
				}
				if (this.preChapter.ready) {
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
					ready: this.curChapter.ready,
					chapterName: this.curChapter.chapterName,
					text: this.curChapter.text,
					pageNum: this.currentPage,
					totalPage: this.curChapter.totalPage,
					pageTranslate: [
						`(0,0)`,
						`(0,0)`,
						`(0,0)`
					],
					canRead: this.curChapter.canRead
				}
				if (this.currentPage === 0) {
					if (this.preChapter.ready && this.preChapter.isCover) { //翻至封面了
						this.prePage = {
							ready: true,
							isCover: true,
							pageTranslate: [
								`(-100%,0)`,
								`(-100%,0)`,
								`(0,${-this.windowHeight}px)`
							]
						}
					} else {
						this.prePage = {
							ready: this.preChapter.ready,
							chapterName: this.preChapter.chapterName,
							text: this.preChapter.text,
							pageNum: this.preChapter.totalPage - 1,
							totalPage: this.preChapter.totalPage,
							pageTranslate: [
								`(-100%,0)`,
								`(-100%,0)`,
								`(0,${-this.windowHeight}px)`
							],
							canRead: this.preChapter.canRead
						}
					}
				} else {
					this.prePage = {
						ready: true,
						chapterName: this.curChapter.chapterName,
						text: this.curChapter.text,
						pageNum: this.currentPage - 1,
						totalPage: this.curChapter.totalPage,
						pageTranslate: [
							`(-100%,0)`,
							`(-100%,0)`,
							`(0,${-this.windowHeight}px)`
						],
						canRead: this.curChapter.canRead
					}
				}
				if (this.currentPage >= this.curChapter.totalPage - 1) {
					if (this.nextChapter.ready && this.nextChapter.isEnd) { //翻至最后一章了
						this.nextPage = {
							ready: true,
							isEnd: true,
							pageTranslate: [
								`(0,0)`,
								`(${this.windowWidth}px,0)`,
								`(0,${this.windowHeight}px)`
							]
						}
					} else {
						this.nextPage = {
							ready: this.nextChapter.ready,
							chapterName: this.nextChapter.chapterName,
							text: this.nextChapter.text,
							pageNum: 0,
							totalPage: this.nextChapter.totalPage,
							pageTranslate: [
								`(0,0)`,
								`(${this.windowWidth}px,0)`,
								`(0,${this.windowHeight}px)`
							],
							canRead: this.nextChapter.canRead
						}
					}
				} else {
					this.nextPage = {
						ready: true,
						chapterName: this.curChapter.chapterName,
						text: this.curChapter.text,
						pageNum: this.currentPage + 1,
						totalPage: this.curChapter.totalPage,
						pageTranslate: [
							`(0,0)`,
							`(${this.windowWidth}px,0)`,
							`(0,${this.windowHeight}px)`
						],
						canRead: this.curChapter.canRead
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
			async bigSize() {
				let progress = this.progress //记录阅读进度用于调整字体后跳转
				this.fontSize += 1
				uni.setStorageSync('fontSize', this.fontSize)
				this.calcHeight()
				await this.calcCurChapter()
				let page = Math.floor((this.curChapter.totalPage - 1) * progress)
				this.goToPage(page)
				if (this.preChapter.ready && !this.preChapter.isCover) {
					this.preChapter.ready = false
					await this.calcPreChapter()
				}
				if (this.nextChapter.ready && !this.nextChapter.isEnd) {
					this.nextChapter.ready = false
					await this.calcNextChapter()
				}



			},

			/**
			 * 缩小字体
			 **/
			async smallSize() {
				let progress = this.progress
				this.fontSize -= 1
				uni.setStorageSync('fontSize', this.fontSize)
				this.calcHeight()
				await this.calcCurChapter()
				let page = Math.floor((this.curChapter.totalPage - 1) * progress)
				this.goToPage(page)
				if (this.preChapter.ready && !this.preChapter.isCover) {
					this.preChapter.ready = false
					await this.calcPreChapter()
				}
				if (this.nextChapter.ready && !this.nextChapter.isEnd) {
					this.nextChapter.ready = false
					await this.calcNextChapter()
				}

			},

			/**
			 * 切换繁体简体
			 **/
			changeFont(type) {
				if (type === 2) { //切换为繁体
					this.preChapter.text = traditionalized(this.preChapter.text)
					this.curChapter.text = traditionalized(this.curChapter.text)
					this.nextChapter.text = traditionalized(this.nextChapter.text)
					this.prePage.text = traditionalized(this.prePage.text)
					this.curPage.text = traditionalized(this.curPage.text)
					this.nextPage.text = traditionalized(this.nextPage.text)
					this.simplified = 2
					uni.setStorageSync('simplified', 2)
				} else { //切换为简体
					this.preChapter.text = simplized(this.preChapter.text)
					this.curChapter.text = simplized(this.curChapter.text)
					this.nextChapter.text = simplized(this.nextChapter.text)
					this.prePage.text = simplized(this.prePage.text)
					this.curPage.text = simplized(this.curPage.text)
					this.nextPage.text = simplized(this.nextPage.text)
					this.simplified = 1
					uni.setStorageSync('simplified', 1)
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
					let page = Math.floor((this.curChapter.totalPage - 1) * progress)
					this.goToPage(page)
					if (this.preChapter.ready && !this.preChapter.isCover) {
						this.preChapter.ready = false
						await this.calcPreChapter()
					}
					if (this.nextChapter.ready && !this.nextChapter.isEnd) {
						this.nextChapter.ready = false
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

				/*****************************************/
				/**********    根据需要更改    ************/
				/*****************************************/

				if (showLoading) {
					uni.showLoading({
						mask: true
					})
				}
				let result = requestData({
					id: this.query.bid
				})
				let {
					list,
					code
				} = await getNovelChapterList(result)
				if (code == 1) {
					list.forEach((item, i) => {
						item.index = i
					})
					this.directoryList = list
					return
				}
				// 此处是网络连接失败的逻辑
				uni.hideLoading()
				return new Promise((resolve, reject) => {
					uni.showModal({
						title: this.$t('获取章节内容失败'),
						content: this.$t('请检查您的网络状态'),
						confirmText: this.$t('重试'),
						confirmColor: '#ffd300',
						success: async (res) => {
							if (res.confirm) {
								//用户点击了重试
								await this.getDirectoryList(true)
								resolve()
							} else if (res.cancel) {
								//用户点击取消
								this.back()
							}
						}
					})
				})
				/*****************************************/
				/*****************************************/
				/*****************************************/
			},


			/**
			 * 获取一章数据
			 **/
			async getOneChapter(chapterId, showLoading) {

				/*****************************************/
				/**********    根据需要更改    ************/
				/*****************************************/

				if (showLoading) {
					uni.showLoading({
						mask: true
					})
				}
				this.query.zid = chapterId
				let result = requestData(this.query)
				let {
					data,
					code
				} = await getNovelChapterInfo(result)
				if (code == 1) {
					if (showLoading) {
						uni.hideLoading()
					}
					if (data.vip == '0') {
						this.tmpChapter.text = data.text //模拟数据

						// 根据业务实际情况判断该用户是否可阅读,逻辑后端判断
						this.tmpChapter.canRead = true
					} else if (this.$store.state.userinfo.vip == '1') {
						this.tmpChapter.text = data.text //模拟数据
						
						// 根据业务实际情况判断该用户是否可阅读,逻辑后端判断
						this.tmpChapter.canRead = true
					}else {
						this.tmpChapter.text = '' //注意：不能阅读章节请赋值为空字符串
						
						// 根据业务实际情况判断该用户是否可阅读,逻辑后端判断
						this.tmpChapter.canRead = false
					}


					if (this.simplified === 2) { //切换为繁体  注意：这里默认数据库中是简体字
						this.tmpChapter.text = traditionalized(this.tmpChapter.text)
					}
				} else {
					// 此处是网络连接失败的逻辑
					uni.hideLoading()
					return new Promise((resolve, reject) => {
						uni.showModal({
							title: this.$t('获取章节内容失败'),
							content: this.$t('请检查您的网络状态'),
							confirmText: this.$t('重试'),
							confirmColor: '#ffd300',
							success: async (res) => {
								if (res.confirm) {
									//用户点击了重试
									await this.getOneChapter(chapterId, true)
									resolve()
								} else if (res.cancel) {
									//用户点击取消
									this.back()
								}
							}
						})
					})
				}
				/*****************************************/
				/*****************************************/
				/*****************************************/
			},
			/**
			 * 获取三章数据
			 **/
			async getThreeChapter(index) {
				if (this.query.index) {
					index = this.query.index
				}
				await this.getOneChapter(this.directoryList[index].id)
				this.curChapter = {
					chapterIndex: index,
					chapterName: this.directoryList[index].name,
					text: this.tmpChapter.text,
					canRead: this.tmpChapter.canRead
				}

				if (this.curChapter.chapterIndex !== 0) {
					await this.getOneChapter(this.directoryList[index - 1].id)
					this.preChapter = {
						chapterIndex: index - 1,
						chapterName: this.directoryList[index - 1].name,
						text: this.tmpChapter.text,
						canRead: this.tmpChapter.canRead
					}
				} else {
					this.preChapter = {
						ready: true,
						isCover: true
					}
				}

				if (this.curChapter.chapterIndex !== this.directoryList.length - 1) {
					await this.getOneChapter(this.directoryList[index + 1].id)
					this.nextChapter = {
						chapterIndex: index + 1,
						chapterName: this.directoryList[index + 1].name,
						text: this.tmpChapter.text,
						canRead: this.tmpChapter.canRead
					}
				} else {
					this.nextChapter = {
						ready: true,
						isEnd: true
					}
				}
				await this.calcCurChapter()
				await this.calcPreChapter()
				await this.calcNextChapter()
				this.query.index = ''
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
			font-size: 14px;
			color: $minor-text-color;
			height: 30px;
			width: 100%;
			line-height: 30px;
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
		}

	}

	/deep/ .uicon-star-fill {
		color: #FA9C3E !important;
	}

	.item-type {
		color: #999;
		font-size: 24rpx;
	}

	.item-info {
		color: #FA9C3E;
		font-size: 32rpx;
	}

	.item-school {
		color: #0A57D0;
		font-size: 24rpx;
	}

	.bottom-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: $minor-text-color;
		height: 30px;
		width: 100%;
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

	.menu {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 300;
		background-color: #11111160;

		// transition: all .3s;
		.menu-top {
			position: absolute;
			left: 0;
			width: 100%;
			background-color: #333;
			transition: top .3s;

			.head {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 40px;
				width: 100%;
				line-height: 40px;
				color: #fff;
			}

			.back {
				position: absolute;
				top: 0;
				left: 10px;
				font-size: 38rpx;
			}
		}

		.directory {
			position: absolute;
			top: 0;
			display: flex;
			flex-flow: column;
			width: 600rpx;
			height: 100%;
			transition: left .1s;

			.isvip {
				border-radius: 20rpx 0 20rpx 0;
				padding: 5rpx 15rpx;
				background: linear-gradient(90deg, #FF4820 0%, #FE2936 100%);
			}

			.bookname {
				padding: 20px 0 20px 10px;
				height: 60px;
				font-size: 18px;
			}

			.nation-title {
				// height: 100rpx;
			}

			.chapter-list {
				.isvip {
					border-radius: 20rpx 0 20rpx 0;
					padding: 5rpx 15rpx;
					background: linear-gradient(90deg, #FF4820 0%, #FE2936 100%);
				}
			}

			.directory-listItem {
				display: flex;
				align-items: center;
				padding-left: 20rpx;
				height: 80rpx;
				font-size: 28rpx;
				// border-bottom: #eee solid 1rpx;
			}

			.active {
				color: #33C795;
			}
		}

		.menu-bottom {
			position: absolute;
			left: 0;
			width: 100%;
			background-color: #333;
			transition: bottom .3s;
			color: #fff;

			.show-chapter {
				position: absolute;
				left: 50%;
				top: 0;
				transform: translate(-50%, -110%);
				padding: 5px 10px;
				line-height: 20px;
				border-radius: 10rpx;
				font-size: 13px;
				background-color: #333;
			}

			.progress-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 20px;
				height: 50px;
				width: 100%;
				font-size: 15px;
			}

			.items-box {
				display: flex;
				justify-content: space-around;
				align-items: center;
				height: 100rpx;
				width: 100%;

				.item-box {
					display: flex;
					flex-flow: column;
					justify-content: center;
					align-items: center;
					height: 100%;
				}
			}
		}

		.setting {
			position: absolute;
			left: 0;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			border-radius: 25rpx 25rpx 0 0;
			width: 100%;
			color: #fff;
			background-color: #fff;
			transition: all .3s linear;

			.setting-title {
				border-radius: 25rpx 25rpx 0 0;
			}

			.item {
				display: flex;
				align-items: center;
				height: 70px;

				.item-name {
					padding: 10px;
					color: #111;
					font-size: 14px;
				}

				.icon {
					margin-right: 10px;
					padding: 5px 20px;
					font-size: 15px;
					height: 32px;
					color: #111;
					line-height: 20px;
					width: auto;
					text-align: center;
					border-radius: 12rpx;
					border: #111 solid 2rpx;
				}

				.roun {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					padding: 0 !important;
				}

				.type-setting {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					margin-right: 10px;
					padding: 5px;
					height: 30px;
					width: 30px;
					border-radius: 5px;
					border: #111 solid 1px;

					.line {
						width: 100%;
						border-bottom: #111 solid 1px;
					}

					.lineActive {
						width: 100%;
						border-bottom: #33C795 solid 1px;
					}
				}

				.active {
					color: #33C795;
					border: #33C795 solid 1px;
				}
			}
		}
	}

	.cover {
		image {
			height: 400rpx;
			width: 300rpx;
			background-color: #eee;
		}
	}
</style>