<script>
	// #ifdef MP
	import {
		getTabbarCapsule
	} from '@/main_modules/app-init/index.js'
	// #endif
	import {
		getAppStatusHeight
	} from '@/main_modules/app-init/index.js'
	// #ifdef APP-PLUS
	import {
		checkOpenService,
		checkOpenPermission
	} from '@/main_modules/sdk-init/index.js'
	import APPUpdate from '@/uni_modules/zhouWei-APPUpdate/js_sdk/appUpdate';
	// #endif
	import {
		getPhoneHeight
	} from '@/main_modules/app-init/index.js'
	export default {
		onLaunch: function() {
			//获取手机状态栏高度
			getAppStatusHeight()
			// #ifdef APP-PLUS
			APPUpdate();
			//开屏动画
			plus.navigator.closeSplashscreen();
			//锁定屏幕方向
			plus.screen.lockOrientation("portrait-primary");
			// #endif
			// #ifdef MP
			//获取小程序胶囊信息
			getTabbarCapsule()
			// #endif
			// 公共的
			getPhoneHeight()
			// #ifndef MP
			uni.preloadPage({
				url: '/pages/tabbar/home/index'
			})
			uni.preloadPage({
				url: '/pages/tabbar/kind/index'
			})
			uni.preloadPage({
				url: '/pages/tabbar/media/index'
			})
			uni.preloadPage({
				url: '/pages/tabbar/cart/index'
			})
			uni.preloadPage({
				url: '/pages/tabbar/mine/index'
			})
			// #endif
			//隐藏原生底部导航
			uni.hideTabBar({
				animation: false
			})
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
		},
		onShow: function() {
			console.log('App Show');
			// checkOpenPermission(this.globalData)
			// checkOpenService()
		},
		onHide: function() {
			console.log('App Hide');
			uni.hideToast()
		},
		globalData: {
			location: {
				latitude: 30.30191704644097,
				longitude: 120.1115673828125
			},
			address: {},
		},
	};
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	/* 引入官方样式库 */
	/* #ifndef APP-NVUE */
	@import url("./common/uni.css");
	/* 引入animate动画库 */
	@import url("./common/animate.css");
	/* #endif */
	/* 引入free样式库 */
	@import url("./common/main.css");
	/* 引入全局样式库 */
	@import url("./common/common.css");
	/* 引入自定义图标库 */
	/* #ifndef APP-NVUE */
	@import url("./common/icon.css");
	/* #endif */
</style>
