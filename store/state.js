export default {
	statusHeight: 0,
	// #ifdef APP-PLUS
	tabbarHeight: 0,
	// #endif
	// #ifndef APP-PLUS
	tabbarHeight: 50,
	// #endif
	userinfo: uni.getStorageSync('userinfo') || {},
	sysConfig: uni.getStorageSync('config') || {},
	lang: uni.getStorageSync('lang') || 'en',
	userBill: uni.getStorageSync('userBill') || {},
	phoneHeight: uni.getStorageSync('phoneHeight') || {},
	//公共的tabbar
	tabbar: [{
			"pagePath": "pages/tabbar/home/index",
			"iconPath": "/static/img/tabbar/home.svg",
			"selectedIconPath": "/static/img/tabbar/home-active.svg",
			"text": "page.首页"
		},
		{
			"pagePath": "pages/tabbar/kind/index",
			"iconPath": "/static/img/tabbar/kind.svg",
			"selectedIconPath": "/static/img/tabbar/kind-active.svg",
			"text": "page.分类"
		},
		{
			"pagePath": "pages/tabbar/media/index",
			"iconPath": "/static/img/tabbar/media.svg",
			"selectedIconPath": "/static/img/tabbar/media-active.svg",
			"text": "page.娱乐"
		},
		{
			"pagePath": "pages/tabbar/cart/index",
			"iconPath": "/static/img/tabbar/cart.svg",
			"selectedIconPath": "/static/img/tabbar/cart-active.svg",
			"text": "page.口袋"
		},
		{
			"pagePath": "pages/tabbar/mine/index",
			"iconPath": "/static/img/tabbar/mine.svg",
			"selectedIconPath": "/static/img/tabbar/mine-active.svg",
			"text": "page.我的"
		}
	]
}
