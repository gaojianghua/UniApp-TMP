const moreLogins = [{
	image: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/qq.png',
	name: 'QQ登录',
	schema: 'mqq://'
}, {
	image: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/wechatfriend.png',
	name: '微信登录',
	schema: 'weixin://'
}, {
	image: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/weibo.png',
	name: '微博登录',
	schema: 'sinaweibo://'
}]

const loginType = [
	{
		id: 1,
		name: '一键登录'
	},{
		id: 2,
		name: '验证码登录'
	},{
		id: 3,
		name: '密码登录'
	}
]

module.exports = {
	moreLogins,
	loginType
}