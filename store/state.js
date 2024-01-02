export default {
	/**
	 * 系统相关数据
	**/
	statusHeight: uni.getStorageSync('statusHeight') || 0, //系统状态栏高度
	miniProgramCapsule: uni.getStorageSync('miniProgramCapsule') || {}, //小程序胶囊信息
	navbarHeight: uni.getStorageSync('navbarHeight') || 44, //自定义顶部导航栏高度
	// #ifdef APP-PLUS
	tabbarHeight: 0,	// APP端底部导航栏高度
	// #endif
	// #ifndef APP-PLUS
	tabbarHeight: 50,	// 除了APP的其他端底部导航栏高度
	// #endif
	browserFitHeight: uni.getStorageSync('browserFitHeight') || 0, //兼容浏览器多出的高度
	lang: uni.getStorageSync('lang') || 'en',	//国际化多语言
	langList: uni.getStorageSync('langList') || [], //国际化多语言列表
	moneySymbol: uni.getStorageSync('moneySymbol') || '￥',	//货币符号
	appSystemInfo: uni.getStorageSync('appSystemInfo') || {}, //应用系统信息
	androidAppName: 'uni.Gao.GongYue', // Android端APP包名
	iosAppName: 'uni.Gao.GongYue', // IOS端APP包名
	/**
	 * 自定义 tabbar 数据
	**/
	tabbar: [{
			pagePath: 'pages/tabbar/home/index',
			iconPath: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/tabbar/home.png',
			selectedIconPath: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/tabbar/home-active.png',
			text: 'page.首页'
		},
		{
			pagePath: 'pages/tabbar/kind/index',
			iconPath: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/tabbar/kind.png',
			selectedIconPath: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/tabbar/kind-active.png',
			text: 'page.分类'
		},
		{
			pagePath: 'pages/tabbar/media/index',
			iconPath: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/tabbar/media.png',
			selectedIconPath: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/tabbar/media-active.png',
			text: 'page.视频'
		},
		{
			pagePath: 'pages/tabbar/cart/index',
			iconPath: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/tabbar/cart.png',
			selectedIconPath: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/tabbar/cart-active.png',
			text: 'page.购物车'
		},
		{
			pagePath: 'pages/tabbar/mine/index',
			iconPath: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/tabbar/mine.png',
			selectedIconPath: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/tabbar/mine-active.png',
			text: 'page.我的'
		}
	],
	/**
	 * 实际业务相关数据
	**/
	token: uni.getStorageSync('token') || '',	// 登录凭证
	userinfo: uni.getStorageSync('userinfo') || {},		// 用户信息
	sysConfig: uni.getStorageSync('config') || {},		// 业务系统配置
	liveCity: uni.getStorageSync('liveCity') || '武汉',		// 所在城市
	contacts: uni.getStorageSync('contacts') || [],		// 通讯录数据
	cartList: uni.getStorageSync('cartList') || [],		// 购物车数据
	shippingAddress: [], // 收货地址
	historyList: uni.getStorageSync('historyList') || [], // 搜索历史记录
	orderHistoryList: uni.getStorageSync('orderHistoryList') || [], // 订单搜索历史记录
	allHistoryList: uni.getStorageSync('allHistoryList') || [], // 娱乐搜索历史记录
}
