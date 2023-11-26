<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" isSlot>
			<view class="w-100 search pr-2" :style="{
			width: `calc(100vw - ${miniProgramCapsule.width}px)`,
			marginRight: `${miniProgramCapsule.width}px`}">
				<!-- 搜索框 -->
				<u-search :placeholder="$t('请输入关键词')" focus height="60rpx" v-model="query.search" :showAction="false"
					@search="startSearch" @change="searchChange"></u-search>
			</view>
		</m-navbar>
		<!-- 内容区域 -->
		<m-scroll-y :isLoading="isLoading" i18n :scrollStyle="scrollStyle" :load="load" bgColor="transparent"
			@loadmore="loadmore" @onRefresh="onRefresh">
			<view v-if="$store.state.allHistoryList && $store.state.allHistoryList.length != 0 && !isSearchResult"
				class="history px-3 pt-2">
				<view class="d-flex a-center j-sb">
					<view class="history-title font-weight">
						{{$t('搜索历史')}}
					</view>
					<u-icon name="trash-fill" size="24" color="#fb7299" @click="clearHistory"></u-icon>
				</view>
				<view class="history-list d-flex flex-wrap">
					<view class="history-item px-2 mt-2 mr-2 main-bg-color text-white"
						v-for="(item, i) in $store.state.allHistoryList" :key="i" @click="searchHistoryItem(item)">
						{{item}}
					</view>
				</view>
			</view>
			<view v-if="isSearchResult" class="hot p-3">
				<u-empty v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
					icon="http://cdn.uviewui.com/uview/empty/list.png">
				</u-empty>
				<view v-if="list.length != 0" class="goods-list">
					<view class="goods-item" v-for="(item, i) in list" :key="i" @click.stop="openDetail(item)">
						<view class="">
							
						</view>
					</view>
				</view>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	import capsuleInit from '@/mixins/capsule-init.js'
	import result from './data.json'
	export default {
		mixins: [capsuleInit],
		components: {
		},
		data() {
			return {
				isLoading: false,
				load: 0,
				query: {
					page: 1,
					limit: 10,
					search: ''
				},
				list: [],
				total: 0,
				istrig: true,
				isSearchResult: false
			}
		},
		methods: {
			// 获取搜索数据
			getSearchData(e) {
				// let {
				// 	data,
				// 	code,
				// 	message
				// } = await getSearchData(this.query)
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
				this.getSearchData()
			},
			// 加载更多
			loadmore() {
				if (this.load == 1 || this.istrig == false) return;
				this.load = 0
				this.query.page++
				this.istrig = false
				let time = setTimeout(() => {
					this.getSearchData('S')
					this.istrig = true
					clearTimeout(time)
				}, 1000)
			},
			// 开始搜索
			startSearch(e) {
				if (!this.$store.state.allHistoryList.includes(e) && e) {
					let arr = this.$store.state.allHistoryList
					arr.push(e)
					this.$store.commit('updateAllHistoryList', arr)
					uni.setStorageSync('allHistoryList', arr)
				}
				this.isSearchResult = true
				this.list = []
				this.isLoading = true
				this.query.page = 1
				this.getSearchData()
			},
			// 搜索内容变化
			searchChange(e) {
				if (!e) {
					this.isSearchResult = false
				}
			},
			// 清空历史
			clearHistory() {
				this.$store.commit('updateAllHistoryList', [])
				uni.setStorageSync('allHistoryList', [])
			},
			// 进入订单详情页
			openDetail(i) {
				// this.$tools.Navigate.navigateTo('/pages-offspring/order-detail/index', i)
			},
			// 点击历史记录
			searchHistoryItem(i) {
				this.query.search = i
				this.startSearch()
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
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
	}
</style>