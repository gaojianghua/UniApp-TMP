<template>
	<view class="page">
		<!-- 	<swiper class="h-100" vertical :style="scrollStyle">
			<swiper-item class="h-100" v-for="(item, i) in list" :key="i">
				<video class="h-100 w-100" :src="item.video"></video>
			</swiper-item>
		</swiper> -->
		<symbol-icon size="50" sizeUnit="rpx" name="ria" />
		<symbol-icon name="gril" />
		<symbol-icon name="o" />
		<!-- 底部导航栏 -->
		<m-tabbar pagePath="pages/tabbar/media/index" i18n></m-tabbar>
	</view>
</template>

<script>
	import MTabbar from '@/main_modules/main-ui/m-tabbar/index.vue'
	import tabbarInit from '@/mixins/tabbar-init.js'
	export default {
		mixins: [tabbarInit],
		components: {
			MTabbar
		},
		data() {
			return {
				istrig: true,
				isLock: false,
				query: {
					page: 1,	
					limit: 20,
					type: 2
				},
				list: [],
				total: 0,
				load: 0,
				isLoading: true,
				mp: null
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				this.getData()
			},
			// 获取数据
			async getData(e) {
				// let {
				// 	data,
				// 	code,
				// 	message
				// } = await prayData(this.query)
				let code = 200
				let data = {
					list: []
				}
				for (let i = 0; i < 10; i++) {
					data.list.push({
						pic: 'https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/0.jpg',
						video: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
						title: 'haha',
						desc: 'nishidsahhda'
					})
				}
				data.total = data.list.length
				if (code == 200) {
					if (e) { // 加载更多
						this.list = this.list.concat(data.list)
					} else {
						this.list = data.list
						this.total = data.total
					}
					if (this.query.page * this.query.limit >= this.total) {
						return this.load = 1
					} else {
						return this.load = 2
					}
				}
			},
			// 下拉刷新
			onRefresh() {
				this.query.page = 1
				this.getData()
			},
			// 加载更多
			loadmore() {
				if (this.load == 1 || this.istrig == false) return;
				this.load = 0
				this.query.page++
				this.istrig = false
				let time = setTimeout(() => {
					this.getData('S')
					this.istrig = true
					clearTimeout(time)
				}, 1000)
			},
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.browserFitHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.tabbarHeight}px)`
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.m-player{
		height: calc(100% - 100rpx - env(safe-area-inset-bottom)) !important;
		width: 100% !important;
	}
</style>