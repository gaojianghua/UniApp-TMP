import {
	router
} from './index.js'

// 全局路由拦截器
router.beforeEach((to, from, next) => {
	next()
})

export default router
