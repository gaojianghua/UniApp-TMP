<template>
	<view class="page">
		<!-- 顶部导航 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.反馈记录" i18n></m-navbar>
		<!-- 内容区域 -->
		<m-scroll :isLoading="isLoading" i18n :scrollStyle="scrollStyle" :load="load" @loadmore="loadmore" bgColor="transparent"
			@onRefresh="onRefresh">
			<u-empty v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
				icon="http://cdn.uviewui.com/uview/empty/list.png">
			</u-empty>
			<view class="px-2">
				<view v-if="list.length != 0" class="item bg-white rounded-1 d-flex a-center j-sb p-2 mt-2"
					v-for="(item, i) in list" :key="i" @click="$tools.Navigate.navigateTo('/pages-offspring/feedback-detail/index', item.id)">
					<view class="left d-flex a-center">
						<u-image radius="10" width="100rpx" height="100rpx" :src="item.img"></u-image>
						<view class="info ml-2 d-flex flex-column j-sb">
							<view class="info-title text-ellipsis1">
								{{item.title}}
							</view>
							<view class="info-time">
								{{item.time}}
							</view>
						</view>
					</view>
					<view class="btns flex-shrink border-2 rounded-1 px-3"
						:class="item.state == 0 ? 'text-warning border-warning' : 'text-muted border-muted'">
						{{item.state == 0 ? $t('处理中') : $t('已回复')}}
					</view>
				</view>
			</view>
		</m-scroll>
	</view>
</template>

<script>
	import MScroll from '@/main_modules/main-ui/m-scroll/index.vue'
	import res from './data.json'
	export default {
		components: {
			MScroll
		},
		data() {
			return {
				load: 0,
				isLoading: true,
				query: {
					page: 1,
					limit: 10
				},
				list: [],
				total: 0
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
				data.list = res.data
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
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info {
		.info-time {
			color: #999;
			font-size: 26rpx;
		}
	}
</style>
