// #ifdef APP-PLUS
import UniShare from '@/uni_modules/uni-share/js_sdk/uni-share.js';
// #endif
export default {
	data() {
		return {
			// #ifdef MP
			miniShare: {
				title: this.$holder.navigationBar.titleText,	// 小程序分享标题，默认当前页面标题
				path: this.$page.fullPath,	// 小程序分享页面路径，可带参数，默认当前页面路径
				imageUrl: '',	// 小程序分享的图片地址，可设置为默认LOGO图标
			},
			// #endif
			// #ifdef APP-PLUS
			uniShare: new UniShare(),
			// #endif
		}
	},
	// #ifdef MP
	onShareAppMessage(res) {
		if (res.from === 'button') { // 来自页面内分享按钮
			console.log(res.target)
		}
		return this.miniShare
	},
	// #endif
	// #ifdef APP-PLUS
	onBackPress({
		from
	}) {
		console.log(from);
		if (from == 'backbutton') {
			this.$nextTick(function() {
				this.uniShare.hide()
			})
			return this.uniShare.isShow;
		}
	},
	// #endif
	methods: {
		// #ifdef APP-PLUS
		uniAppShare() {
			this.uniShare.show({
				content: { //公共的分享参数配置  类型（type）、链接（herf）、标题（title）、summary（描述）、imageUrl（缩略图）
					type: 0,
					href: 'https://uniapp.dcloud.io/',
					title: '标题',
					summary: '描述',
					imageUrl: 'https://img-cdn-aliyun.dcloud.net.cn/stream/icon/__UNI__HelloUniApp.png'
				},
				menus: [{
						"img": "/static/app-plus/sharemenu/wechatfriend.png",
						"text": "微信好友",
						"share": { //当前项的分享参数配置。可覆盖公共的配置如下：分享到微信小程序，配置了type=5
							"provider": "weixin",
							"scene": "WXSceneSession"
						}
					},
					{
						"img": "/static/app-plus/sharemenu/wechatmoments.png",
						"text": "微信朋友圈",
						"share": {
							"provider": "weixin",
							"scene": "WXSceneTimeline"
						}
					},
					{
						"img": "/static/app-plus/sharemenu/mp_weixin.png",
						"text": "微信小程序",
						"share": {
							provider: "weixin",
							scene: "WXSceneSession",
							type: 5,
							miniProgram: {
								id: '123',
								path: '/pages/list/detail',
								webUrl: '/#/pages/list/detail',
								type: 0
							},
						}
					},
					{
						"img": "/static/app-plus/sharemenu/weibo.png",
						"text": "微博",
						"share": {
							"provider": "sinaweibo"
						}
					},
					{
						"img": "/static/app-plus/sharemenu/qq.png",
						"text": "QQ",
						"share": {
							"provider": "qq"
						}
					},
					{
						"img": "/static/app-plus/sharemenu/copyurl.png",
						"text": "复制",
						"share": "copyurl"
					},
					{
						"img": "/static/app-plus/sharemenu/more.png",
						"text": "更多",
						"share": "shareSystem"
					}
				],
				cancelText: this.$t ? this.$t("取消分享") : "取消分享",
			}, e => { //callback
				console.log(this.uniShare.isShow);
				console.log(e);
			})
		},
		// #endif
	}
}