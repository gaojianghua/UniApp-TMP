<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" isSlot i18n>
			<view class="w-100 d-flex a-center search pl-10 pr-2" :style="{
			width: `calc(100vw - ${miniProgramCapsule.width}px)`,
			marginRight: `calc(100vw - ${miniProgramCapsule.right}px + ${miniProgramCapsule.width}px)`}">
				<!-- 搜索框 -->
				<view class="position-relative flex-1">
					<view class="position-absolute top-0 right-0 left-0 bottom-0 index-5" @click="$tools.Navigate.navigateTo('/pages-offspring/all-search/index')"></view>
					<u-search :placeholder="$t('请输入关键词')" height="60rpx" disabled :showAction="false"></u-search>
				</view>
			</view>
		</m-navbar>
		<!-- 内容区域 -->
		<m-scroll-y :isLoading="isLoading" i18n :scrollStyle="scrollStyle"
			:load="load" @loadmore="loadmore" bgColor="transparent" @onRefresh="onRefresh">
		</m-scroll-y>
	</view>
</template>

<script>
	import capsuleInit from '@/mixins/capsule-init.js'
	import result from './data.json'
	export default {
		mixins: [capsuleInit],
		data() {
			return {
				istrig: true,
				isLock: false,
				load: 0,
				isLoading: true,
				query: {
					page: 1,
					limit: 10
				},
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.getData()
			},
			// 获取数据
			getData(e) {
				// let {
				// 	data,
				// 	code,
				// 	message
				// } = await prayData(this.query)
				let {
					data,
					code,
					message
				} = result
				if (code == 200) {
					if (e) { // 加载更多
						this.list = this.list.concat(data.list)
					} else {
						this.list = data.list
						this.total = data.total
					}
					this.isTempLoad = false
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
					height: `calc(100vh - ${this.$store.state.browserFitHeight}px - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			},
			loveStyle() {
				return {
					height: this.list.length == 0 ?
						`calc(100vh - ${this.$store.state.browserFitHeight}px - 40rpx - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)` :
						'auto'
				}
			},
			navbarHeight() {
				return this.$store.state.navbarHeight
			},
			statusHeight() {
				return this.$store.state.statusHeight
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
