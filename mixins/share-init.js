// #ifdef APP-PLUS
import UniShare from '@/uni_modules/uni-share/js_sdk/uni-share.js';
// #endif
export default {
	data() {
		return {
			// #ifdef MP
			miniShare: {},
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
		return this.miniShare = {
			title: getCurrentPages()[0].$holder.navigationBar.titleText, // 小程序分享标题，默认当前页面标题
			path: getCurrentPages()[0].$page.fullPath, // 小程序分享页面路径，可带参数，默认当前页面路径
			imageUrl: '', // 小程序分享的图片地址，可设置为默认LOGO图标
		}
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
					href: 'https://gaojianghua.cn/pages/account/register/index?item=' + this.$store.state
						.userinfo,
					title: this.$t('宫悦商城'),
					summary: this.$t('欢迎来到宫悦商城！我们致力于为您提供便捷、安全和多样化的购物体验。宫悦商城是一个全方位的在线购物平台，汇集了各个领域的优质商品和服务。'),
					imageUrl: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/GongYueLogo.png'
				},
				menus: [{
						"img": "https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/share/wechatfriend.png",
						"text": this.$t("微信好友"),
						"share": { //当前项的分享参数配置。可覆盖公共的配置如下：分享到微信小程序，配置了type=5
							"provider": "weixin",
							"scene": "WXSceneSession"
						}
					},
					{
						"img": "https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/share/wechatmoments.png",
						"text": this.$t("微信朋友圈"),
						"share": {
							"provider": "weixin",
							"scene": "WXSceneTimeline"
						}
					},
					{
						"img": "https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/share/mp_weixin.png",
						"text": this.$t("微信小程序"),
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
						"img": "https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/share/weibo.png",
						"text": this.$t("微博"),
						"share": {
							"provider": "sinaweibo"
						}
					},
					{
						"img": "https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/share/qq.png",
						"text": "QQ",
						"share": {
							"provider": "qq"
						}
					},
					{
						"img": "https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/share/copyurl.png",
						"text": this.$t("复制"),
						"share": "copyurl"
					},
					{
						"img": "https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/share/more.png",
						"text": this.$t("更多"),
						"share": "shareSystem"
					}
				],
				cancelText: this.$t("取消分享"),
			}, e => { //callback
				console.log(this.uniShare.isShow);
				console.log(e);
			})
		},
		// APP系统分享
		appSystemShare() {
			plus.share.sendWithSystem({
				pictures: ['/static/tutu66.jpg']
			}, function() {
				console.log('分享成功');
			}, function(e) {
				console.log('分享失败：' + JSON.stringify(e));
			});
		}
		// #endif
	}
}