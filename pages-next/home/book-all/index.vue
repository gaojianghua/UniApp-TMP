<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" isSlot>
			<view class="w-100 search px-2" :style="{
			width: `calc(100vw - ${miniProgramCapsule.width}px - 60rpx - 30rpx)`,
			marginRight: `calc(100vw - ${miniProgramCapsule.right}px + ${miniProgramCapsule.width}px)`}">
				<u-search :placeholder="$t('请输入关键词')" height="60rpx" v-model="query.search" :showAction="false"
					@search="startSearch" @change="searchChange"></u-search>
			</view>
		</m-navbar>
		<!-- 内容区域 -->
		<m-scroll-y :isLoading="isLoading" i18n :scrollStyle="scrollStyle" :load="load" bgColor="transparent"
			@loadmore="loadmore" @onRefresh="onRefresh">
			<u-empty v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无热搜商品')"
				icon="http://cdn.uviewui.com/uview/empty/list.png">
			</u-empty>
			<view v-if="list.length != 0" class="goods-list px-2"
				:class="direction == 'Y' ? 'd-flex flex-wrap j-sb' : ''">
				<view class="goods-item" :style="{width: direction == 'Y' ? '48.8%' : '100%'}"
					v-for="(item, i) in list" :key="i" @click.stop="openDetail(item)">
					<m-goods-card @addCart="addCart" :item="item" :direction="direction" imageWidth="200rpx"
						:imageHeight="direction == 'Y' ? '300rpx' : '200rpx'" isSales isDesc isOldPrice isOver isVIP
						isCartBtn></m-goods-card>
				</view>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	import MGoodsCard from '@/main_modules/main-ui/m-goods-card/index.vue'
	import capsuleInit from '@/mixins/capsule-init.js'
	import result from './data.json'
	export default {
		mixins: [capsuleInit],
		components: {
			MGoodsCard
		},
		data() {
			return {
				hotList: [],
				list: [],
				direction: 'Y',
				isLoading: true,
				load: 0,
				query: {
					page: 1,
					limit: 10,
					search: ''
				},
				total: 0,
				istrig: true,
				isSearchResult: false
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
				data.list = result.data.hotSearchGoods
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
			// 开始搜索
			startSearch(e) {
				this.list = []
				this.isLoading = true
				this.query.page = 1
				this.getData()
			},
			// 搜索内容变化
			searchChange(e) {
				
			},
			// 进入详情页
			openDetail(i) {
				this.$tools.Navigate.navigateTo('/pages-offspring/book-view/index', i)
			},
			// 加入购物车
			addCart(i) {

			}
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
	.page {

		.search {
			margin-left: 100rpx;
		}

		.history {
			.history-title {
				font-size: 32rpx;
			}

			.history-list {
				.history-item {
					border-radius: 6rpx;

				}
			}
		}

		.hot {
			.hot-title {
				font-size: 32rpx;
			}
		}
	}
</style>
