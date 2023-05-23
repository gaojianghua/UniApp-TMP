export default {
	statusHeight: uni.getStorageSync('statusHeight') || 0, //系统状态栏高度
	miniProgramCapsule: uni.getStorageSync('miniProgramCapsule') || {}, //小程序胶囊信息
	// 底部导航栏高度
	// #ifdef APP-PLUS
	tabbarHeight: 0,
	// #endif
	// #ifndef APP-PLUS
	tabbarHeight: 50,
	// #endif
	token: uni.getStorageSync('token') || '1',
	userinfo: uni.getStorageSync('userinfo') || {},
	sysConfig: uni.getStorageSync('config') || {},
	lang: uni.getStorageSync('lang') || 'en',
	userBill: uni.getStorageSync('userBill') || {},
	phoneHeight: uni.getStorageSync('phoneHeight') || {},
	//公共的tabbar
	tabbar: [{
			pagePath: 'pages/tabbar/home/index',
			iconPath: '/static/img/tabbar/home.png',
			selectedIconPath: '/static/img/tabbar/home-active.png',
			text: 'page.首页'
		},
		{
			pagePath: 'pages/tabbar/kind/index',
			iconPath: '/static/img/tabbar/kind.png',
			selectedIconPath: '/static/img/tabbar/kind-active.png',
			text: 'page.分类'
		},
		{
			pagePath: 'pages/tabbar/media/index',
			iconPath: '/static/img/tabbar/media.png',
			selectedIconPath: '/static/img/tabbar/media-active.png',
			text: 'page.娱乐'
		},
		{
			pagePath: 'pages/tabbar/cart/index',
			iconPath: '/static/img/tabbar/cart.png',
			selectedIconPath: '/static/img/tabbar/cart-active.png',
			text: 'page.购物车'
		},
		{
			pagePath: 'pages/tabbar/mine/index',
			iconPath: '/static/img/tabbar/mine.png',
			selectedIconPath: '/static/img/tabbar/mine-active.png',
			text: 'page.我的'
		}
	]
}
