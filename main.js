import App from './App.vue'
import Vue from 'vue'
import './.env'
// 多语言
import messages from './locale/index'
let i18nConfig = {
	locale: uni.getLocale(),
	messages
}
uni.setStorageSync('lang', uni.getLocale())
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
export const i18n = new VueI18n(i18nConfig)
// 直接引入实例对象进行挂载
import http from '@/main_modules/request/method.js'
import socket from '@/main_modules/socket/index.js'
import worker from '@/main_modules/worker/index.js'
import store from '@/store';
import tools from '@/main_modules/tools/index.js'
import check from '@/main_modules/check/index.js'
import multiportApi from '@/main_modules/uni-api/index.js'
Vue.prototype.$http = http
Vue.prototype.$socket = socket
Vue.prototype.$worker = worker
Vue.prototype.$store = store
Vue.prototype.$tools = tools
Vue.prototype.$check = check
Vue.prototype.$multiportApi = multiportApi
// #ifdef APP
// sqlite 只支持APP端 若要使用则必须在manifest.json的APP模块配置中勾选sqlite模块
import sqlite from '@/main_modules/sqlite/index.js'
Vue.prototype.$sqlite = sqlite
// #endif
// 通过 install 函数挂载 Vue 原型方法
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
import MToast from '@/main_modules/main-ui/m-toast/index.js'
Vue.use(MToast)
import cache from '@/main_modules/cache/index.js'
Vue.use(cache)
import MinRouter from '@/main_modules/router/index.js'
import routerIntercept from '@/main_modules/router/intercept.js'
Vue.use(MinRouter)
// 环境设置
Vue.config.productionTip = false
// 全局过滤器挂载
import filters from '@/main_modules/filters'
Object.keys(filters).forEach((item, i) => {
	Object.keys(filters[item]).forEach(key => {
		Vue.filter(key, filters[item][key])
	})
})
// 全局引入组件
import MNavbar from '@/main_modules/main-ui/m-navbar/index.vue'
Vue.component('m-navbar', MNavbar)
import MLoading from '@/main_modules/main-ui/m-loading/index.vue'
Vue.component('m-loading', MLoading)
import MModal from '@/main_modules/main-ui/m-modal/index.vue'
Vue.component('m-modal', MModal)
import MScrollY from '@/main_modules/main-ui/m-scroll-y/index.vue'
Vue.component('m-scroll-y', MScrollY)
import MTop from '@/main_modules/main-ui/m-top/index.vue'
Vue.component('m-top', MTop)
import GNetworkError from '@/components/global/g-network-error/index.vue'
Vue.component('g-network-error', GNetworkError)
import GTimeout from '@/components/global/g-timeout/index.vue'
Vue.component('g-timeout', GTimeout)
import { SvgSymbolIcon, setGlobalOption } from '@svgjs/vue2-symbol-icon';
Vue.component('symbol-icon', SvgSymbolIcon);
import './config/svg-build/svg-sprite.js'
// 全局设置，这时不支持设置 name
setGlobalOption({
  color: '#fb7290',
  disabledColor: '#6c757d',
  hoverColor: '#fb729090',
  activedColor: '#fb729090',
  placeholderColor: '#B2B2B2',
});
// 初始化 Vue 实例
App.mpType = 'app'
const app = new Vue({
	i18n,
	store,
	...App,
	routerIntercept
})
// 引入 uView 的请求封装
require('./utils/request/index')(app)
app.$mount()
// 生产环境去除打印
uni.uniEnv === 'Pro' ? console.log = () => {} : ''