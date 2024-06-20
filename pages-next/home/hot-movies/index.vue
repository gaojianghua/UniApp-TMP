<template>
	<view class="page">
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.热门影视" i18n></m-navbar>
		<!-- 内容区域 -->
		<m-scroll-y :isLoading="isLoading" i18n :scrollStyle="scrollStyle" :load="load" bgColor="transparent"
			@loadmore="loadmore" @onRefresh="onRefresh">
			<u-empty v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无热搜商品')"
				icon="http://cdn.uviewui.com/uview/empty/list.png">
			</u-empty>
			<view v-if="list.length != 0" class="goods-list d-flex j-sb flex-wrap px-2">
				<view class="goods-item d-flex a-center j-center bg-success mt-2"
					v-for="(item, i) in list" :key="i" @click.stop="openDetail(item)">
					{{item.id}}
				</view>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	import result from '@/my.json'
	export default {
		data() {
			return {
				list: [],
				isLoading: true,
				load: 0,
				query: {
					page: 1,
					limit: 10
				},
				total: 0,
				istrig: true,
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
				// } = await getData(this.query)
				let code = 200
				let data = {
					list: []
				}
				data.list = result.data
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
			// 进入详情页
			openDetail(i) {
				this.$tools.Navigate.navigateTo('/pages-offspring/hot-movies-detail/index', i)
			},
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.browserFitHeight}px - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page{
		
		.goods-list{
			
			.goods-item{
				width: 48%;
				height: 250rpx;
			}
		}
	}
</style>
