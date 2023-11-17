<template>
	<m-scroll :isLoading="isLoading" i18n :scrollStyle="scrollStyle" :load="load" @loadmore="loadmore" bgColor="transparent"
		@onRefresh="onRefresh">
		<u-empty v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
			icon="http://cdn.uviewui.com/uview/empty/list.png">
		</u-empty>
		<view class="px-2">
			<view v-if="list.length != 0" class="item bg-white rounded-1 d-flex a-center j-sb p-2 mt-2"
				v-for="(item, i) in list" :key="i">
				<view class="d-flex a-center">
					<u-image radius="10" width="100rpx" height="100rpx" :src="item.img"></u-image>
					<view class="info ml-2 d-flex flex-column j-sb">
						<view class="info-title">
							{{item.title}}
						</view>
						<view class="info-time">
							{{item.time}}
						</view>
					</view>
				</view>
				<view class="btns border-2 rounded-1 px-3" :class="item.state == 1 ? 'main-text-color' : 'text-muted'">
					{{item.state == 1 ? '+' : '-'}}{{item.value}}
				</view>
			</view>
		</view>
	</m-scroll>
</template>

<script>
	import MScroll from '@/main_modules/main-ui/m-scroll/index.vue'
	export default {
		props: {
			current: {
				type: Number,
				default: 2
			}
		},
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
		methods: {
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
						img: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/141b53c86d1f6dc174982e6f122dcbfc.jpg',
						title: '购买燕京啤酒',
						time: '2023-12-23 10:23:09',
						state: 1,
						value: 2000
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
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - 52px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		},
		watch: {
			current: {
				handler(nv, ov) {
					if (nv === 2) {
						this.list = []
						this.isLoading = true
						this.load = 0
						let time = setTimeout(() => {
							this.getData()
							clearTimeout(time)
						}, 1200)
					}
				},
				immediate: true,
				deep: true
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