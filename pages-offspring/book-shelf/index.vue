<template>
	<view class="page">
		<!-- 顶部导航 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" :value="value" i18n></m-navbar>
		<!-- 操作栏 -->
		<view class="operate d-flex a-center px-3">
			<view class="screen d-flex a-center position-relative" @click="scrrenShow = true">
				<view class="screen-name mr-1">
					{{screenList[currentScreen].name}}
				</view>
				<u-icon name="arrow-down" color="#111" size="16"></u-icon>
			</view>
			<view class="history d-flex ml-auto mr-3 a-center position-relative"
			@click="$tools.Navigate.navigateTo('/pages-offspring/read-history/index', pageInfo)">
				<view class="history-name mr-1">
					{{$t('阅读历史')}}
				</view>
				<u-icon name="clock" color="#111" size="18"></u-icon>
			</view>
			<u-icon name="more-dot-fill" color="#111" size="20" @click="menuShow = true"></u-icon>
		</view>
		<!-- 内容区域 -->
		<m-scroll-y :isLoading="isLoading" i18n :scrollStyle="scrollStyle" :load="load" bgColor="transparent"
			@loadmore="loadmore" @onRefresh="onRefresh">
			<u-empty v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
				icon="http://cdn.uviewui.com/uview/empty/list.png">
			</u-empty>
			<view v-if="list.length != 0" class="goods-list d-flex flex-wrap px-3">
				<view class="goods-item d-flex flex-column mt-5" v-for="(item, i) in list" :key="i" 
				@click="$tools.Navigate.navigateTo(`/pages-offspring/read-${pageInfo}/index`, item)">
					<view class="position-relative w-100">
						<u-image radius="12" width="100%" height="240rpx" :src="item.img"></u-image>
					</view>
					<view class="goods-name font-md text-ellipsis1">
						{{item.name}}
					</view>
					<view class="goods-desc font text-light-muted line-h text-ellipsis1">
						{{item.unreadNum > 0 ? item.unreadNum + $t('章未读') : $t('已读至最新章节')}}
					</view>
				</view>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	import { screenList } from './data.js'
	import result from './data.json'
	export default {
		data() {
			return {
				value: '',
				screenList,
				currentScreen: 0,
				isLoading: true,
				load: 0,
				query: {
					page: 1,
					limit: 10,
					type: 0
				},
				list: [],
				total: 0,
				istrig: true,
				scrrenShow: false,
				menuShow: false,
				pageInfo: ''
			}
		},
		onLoad(options) {
			this.pageInfo = this.$tools.Navigate.receivePageData(options)
			this.value = this.pageInfo == 'novel' ? 'page.小说书架' : 'page.漫画书架'
			this.query.type = this.pageInfo == 'novel' ? 2 : 1
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
				// } = await getSearchData(this.query)
				let code = 200
				let data = {
					list: []
				}
				data.list = result.data.list
				data.total = result.data.total
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
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - 88rpx - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page{
		background-color: #fff;
		.operate{
			height: 88rpx;
			border-bottom: 1rpx solid #f1f1f1;
		}
		
		.goods-list{
			.goods-item{
				width: 26%;
				margin-right: 11%;
				.goods-name{
					line-height: 70rpx;
				}
			}
			
			.goods-item:nth-child(3n){
				margin-right: 0;
			}
			
			.goods-item:nth-child(1),
			.goods-item:nth-child(2),
			.goods-item:nth-child(3)
			{
				margin-top: 30rpx;
			}
		}
	}
</style>
