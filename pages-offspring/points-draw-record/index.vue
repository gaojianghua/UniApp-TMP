<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.抽奖记录" i18n></m-navbar>
		<!-- 内容区域 -->
		<m-scroll :isLoading="isLoading" :scrollStyle="scrollStyle" :load="load" @loadmore="loadmore"
			bgColor="transparent" @onRefresh="onRefresh">
			<u-empty v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无记录')"
				icon="http://cdn.uviewui.com/uview/empty/list.png">
			</u-empty>
			<view v-if="list.length != 0" class="content px-2">
				<view class="item d-flex a-center j-sb p-2 mt-2" v-for="(item, i) in list"
					:key="i">
					<view class="left d-flex w-100 flex-column">
						<view class="item-time d-flex a-center">
							<u-icon name="clock" color="#999" size="20"></u-icon>
							<span class="item-time-text ml-1">{{item.time}}</span>
						</view>
						<view class="item-value d-flex a-center mt-1">
							<view class="item-value-notice">{{$t('恭喜中奖 ->')}}</view>
							<view class="item-value-text ml-auto">{{item.value}}</view>
						</view>
					</view>
				</view>
			</view>
		</m-scroll>
	</view>
</template>

<script>
	import MScroll from '@/main_modules/main-ui/m-scroll/index.vue'
	export default {
		components: {
			MScroll
		},
		data() {
			return {
				list: [],
				total: 0,
				load: 0,
				isLoading: true,
				istrig: true,
				query: {
					page: 1,
					limit: 20
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
						time: '2023-11-11 12:06:30',
						value: '燕京啤酒'
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
		.item {
			background-color: #fff;
			border-radius: 10rpx;
			.item-time-text{
				color: #999;
				font-size: 32rpx;
			}
			.item-value{
				.item-value-notice{
					color: #666;
					font-size: 32rpx;
				}
				.item-value-text{
					color: #f27299;
					font-size: 32rpx;
					font-weight: 500;
				}
			}
		}
	}
</style>