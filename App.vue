<script>
	// #ifdef MP
	import {
		getTabbarCapsule
	} from '@/main_modules/app-init/index.js'
	// #endif
	// #ifdef H5
	import {
		getBrowserFitHeight
	} from '@/main_modules/app-init/index.js'
	// #endif
	// #ifdef APP-PLUS
	import {
		checkOpenService,
		checkOpenPermission
	} from '@/main_modules/sdk-init/index.js'
	import APPUpdate from '@/uni_modules/zhouWei-APPUpdate/js_sdk/appUpdate';
	// #endif
	import {
		setNavbarHeight,
		getAppStatusHeight,
		getAppVersion
	} from '@/main_modules/app-init/index.js'
	import global from '@/global/index.js'
	export default {
		onLaunch: function() {
			/**
			 * 全端
			 */
			// 获取手机状态栏高度
			getAppStatusHeight()
			// 设置自定义导航栏高度
			setNavbarHeight()
			// 获取应用系统信息
			getAppVersion()
			// 获取业务系统配置
			this.$store.dispatch('getSysConfig')
			
			// setTimeout(() => {
			// 	为tabbar的某一项上添加文本
			// 	uni.setTabBarBadge({
			// 		index: 1,
			// 		text: '31'
			// 	});
			// 	显示tabbar上某一项的红点
			// 	uni.showTabBarRedDot({
			// 		index: 3
			// 	});
			// }, 1000);
			
			/**
			 * APP端
			 */
			// #ifdef APP-PLUS
			APPUpdate();
			// 开屏动画
			plus.navigator.closeSplashscreen();
			// 锁定屏幕方向
			plus.screen.lockOrientation("portrait-primary");
			
			// *** unipush初始化
			// 获取唯一标识CID
			let time = setTimeout(() => {
				plus.push.getClientInfoAsync((info) => {
					global.data.cid = info["clientid"]
				})
				clearTimeout(time)
			}, 1000)
			//监听push推送通知
			plus.push.addEventListener('receive', (message) => {
				plus.nativeUI.toast('push receive');
			});
			//监听点击push通知栏
			plus.push.addEventListener('click', (message) => {
				switchTab(message.content)
			});
			// #endif

			/**
			 * 小程序端
			 */
			// #ifdef MP
			// 获取小程序胶囊信息
			getTabbarCapsule()
			// 获取小程序版本更新
			this.$multiportApi.mini.getVersionUpdate()
			// 显示小程序原生菜单分享
			this.$multiportApi.mini.showShareMenu({
				withShareTicket: false, // 是否使用带shareTicket的转发，可以在 App.onLaunch 或 App.onShow 获取到一个 shareTicket。通过调用 wx.getShareInfo 接口传入此 shareTicket 可以获取到转发信息
				title: 'GongYue Shop', // 分享标题
				content: 'GongYue Shop 是一个多元化娱乐电商平台 享受更高性价比的生活', // 分享内容
				imageUrl: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/GongYueLogo.png', // 分享图标
				path: '/pages/tabbar/home/index', // 页面 path ，必须是以 / 开头的完整路径
				success: () => {}, // 接口调用成功的回调函数
				fail: () => {}, // 接口调用失败的回调函数
				complete: () => {}, // 接口调用结束的回调函数（调用成功、失败都会执行）
			})
			// #endif

			/**
			 * H5端
			 */
			// #ifdef H5
			getBrowserFitHeight()
			this.$store.commit('updateCanvasId', this.$tools.Common.generateDeviceId())
			// #endif
		},
		onShow: function() {
			console.log('App Show');
			// this.$multiportApi.app.openAppPage('&', ':', 'id')
			// checkOpenPermission(this.globalData)
			// checkOpenService()
		},
		onHide: function() {
			console.log('App Hide');
			uni.hideToast()
		},
		globalData: global.data,
	};
</script>

<style lang="scss">
	/* #ifndef APP-NVUE */
	/* 引入uview-ui样式 */
	@import "@/uni_modules/uview-ui/index.scss";
	/* 引入官方样式库 */
	@import url("./common/uni.css");
	/* 引入原子样式库 */
	@import url("./common/main.css");
	/* 引入全局样式库 */
	@import url("./common/common.css");
	/* 引入自定义图标库 */
	@import url("./common/icon.css");
	/* #endif */
</style>