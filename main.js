import App from './App.vue'
import Vue from 'vue'
// 通过 install 函数挂载 Vue 原型方法
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
import cache from '@/main_modules/cache/index.js'
Vue.use(cache)
import MinRouter from '@/main_modules/router/index.js'
import routerIntercept from '@/main_modules/router/intercept.js'
Vue.use(MinRouter)
// 直接引入实例对象进行挂载
import http from '@/main_modules/request/method.js'
import socket from '@/main_modules/socket/index.js'
import store from '@/store';
import tools from '@/main_modules/tools/index.js'
import check from '@/main_modules/check/index.js'
import multiportApi from '@/main_modules/uni-api/index.js'
Vue.prototype.$http = http
Vue.prototype.$socket = socket
Vue.prototype.$store = store
Vue.prototype.$tools = tools
Vue.prototype.$check = check
Vue.prototype.$multiportApi = multiportApi
Vue.config.productionTip = false
//多语言
import messages from './locale/index'
let i18nConfig = {
	locale: uni.getLocale(),
	messages
}
uni.setStorageSync('lang', uni.getLocale())
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
export const i18n = new VueI18n(i18nConfig)
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
import MTop from '@/main_modules/main-ui/m-top/index.vue'
Vue.component('m-top', MTop)

App.mpType = 'app'
const app = new Vue({
	store,
	i18n,
	...App,
	routerIntercept
})
// 引入 uView 的请求封装
require('./utils/request/index')(app)
app.$mount()
