<template>
	<m-scroll :isLoading="isLoading" :scrollStyle="scrollStyle" :load="load"
		@loadmore="loadmore" bgColor="transparent" @onRefresh="onRefresh">
		<u-empty v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
			icon="http://cdn.uviewui.com/uview/empty/list.png">
		</u-empty>
		<view v-if="list.length != 0" class="item d-flex a-center j-sb p-2 mt-2" v-for="(val, index) in list" :key="index">
			<view class="left d-flex flex-column">
				<view class="title">
					{{val.title}}
				</view>
				<view class="desc">
					{{val.desc}}
				</view>
			</view>
			<u-image width="300rpx" height="180rpx" :src="val.img"></u-image>
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
						},1200)
					}
				},
				immediate: true,
				deep: true
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
