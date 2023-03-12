const {
	http
} = uni.$u


/**
 * get请求
 */
// 注销账号
export const cancellation = (params, config = {}) => http.get('/user/cancellation', {
	params
}, config)

// 退出登录
export const logOut = (params, config = {}) => http.get('/api/user/logout', {
	params
}, config)

// 获取首页数据列表--详情
export const getHomeDataDetail = (params, config = {}) => http.get('/home/homepage/details', {
	params
}, config)

// 获取用户信息
export const getUserInfo = (params, config = {}) => http.get('/api/user/info', {
	params
}, config)

// 获取商品详情
export const getGoodsDetails = (params, config = {}) => http.get('/api/goods/info', {
	params
}, config)

// 获取商品列表
export const getGoodsLists = (params, config = {}) => http.get('/api/goods/lists', {
	params
}, config)

// 获取商品分类
export const getGoodsType = (params, config = {}) => http.get('/api/goods/type', {
	params
}, config)

// 语言列表
export const getLanguages = (params, config = {}) => http.get('/api/common/lang', {
	params
}, config)

// 获取我的产品列表
export const getMyProductList = (params, config = {}) => http.get('/api/order/lists', {
	params
}, config)

// 获取银行卡列表
export const getBankCardList = (params, config = {}) => http.get('/api/card/lists', {
	params
}, config)

// 删除银行卡
export const removeBankCard = (params, config = {}) => http.get('/api/card/unbind', {
	params
}, config)

// 获取分享链接
export const getShareLink = (params, config = {}) => http.get('/api/user/shareLink', {
	params
}, config)

// 获取用户账单
export const getUserBill = (params, config = {}) => http.get('/api/user/bill', {
	params
}, config)

// 获取收益明细
export const getIncomeDetail = (params, config = {}) => http.get('/api/user/incomeDetail', {
	params
}, config)

// 获取钱包明细
export const getWalletDetail = (params, config = {}) => http.get('/api/user/walletDetail', {
	params
}, config)

// 获取积分明细
export const getPointsDetail = (params, config = {}) => http.get('/api/user/scoreDetail', {
	params
}, config)

// 获取订单收益明细
export const getOrderIncomeDetail = (params, config = {}) => http.get('/api/order/incomeDetail', {
	params
}, config)

// 获取配置
export const getSysConfig = (params, config = {}) => http.get('/api/common/sysConfig', {
	params
}, config)

// 获取首页banner图
export const getBannerList = (params, config = {}) => http.get('/api/common/adList', {
	params
}, config)

// 获取提现列表
export const getWithdrawList = (params, config = {}) => http.get('/api/user/withdrawList', {
	params
}, config)

// 获取我的团队列表
export const getMyTeamList = (params, config = {}) => http.get('/api/user/myTeam', {
	params
}, config)

// 在线联系方式
export const getOnlineService = (params, config = {}) => http.get('/api/user/onlineService', {
	params
}, config)

// 获取资讯列表
export const getInformationList = (params, config = {}) => http.get('/api/common/articleList', {
	params
}, config)

// 获取资讯详情
export const getInformationDetail = (params, config = {}) => http.get('/api/common/articleInfo', {
	params
}, config)

/**
 * post请求
 */
// 获取APP版本号
export const getVersion = (params, config = {}) => http.post('/api/Version/getVersionInfo', params, config)

// 注册
export const register = (params, config = {}) => http.post('/api/user/register', params, config)

// 登录
export const login = (params, config = {}) => http.post('/api/user/login', params, config)

// 修改密码
export const updatePassword = (params, config = {}) => http.post('/api/user/changePwd', params, config)

// 获取首页数据列表
export const getHomeData = (params, config = {}) => http.post('/api/Ad/getAdByTag', params, config)

//统一支付接口
export const openAllPayment = (params, config = {}) => http.post('/payment/pay', params, config)

// 购买商品
export const purchaseOrder = (params, config = {}) => http.post('/api/order/pay', params, config)

// 发送验证码邮件
export const sendVerCode = (params, config = {}) => http.post('/api/common/sendems', params, config)

// 新增银行卡
export const addBankCard = (params, config = {}) => http.post('/api/card/create', params, config)

// 设置支付密码
export const setPayPassword = (params, config = {}) => http.post('/api/user/setPayPwd', params, config)

// 修改支付密码
export const updatePayPassword = (params, config = {}) => http.post('/api/user/changePayPwd', params, config)

// 使用兑换码
export const useRedemptionCode = (params, config = {}) => http.post('/api/user/exchangeCode', params, config)

// 提现
export const carrywithdraw = (params, config = {}) => http.post('/api/user/withdraw', params, config)

// 修改用户信息
export const updateUserinfo = (params, config = {}) => http.post('/api/user/setInfo', params, config)
