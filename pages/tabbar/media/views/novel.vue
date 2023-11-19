<template>
	<view class="views" >
		<view class="w-100 bg-white" :style="{height: `${$store.state.navbarHeight}px`}"></view>
		<m-scroll-y :isLoading="isLoading" i18n :scrollStyle="scrollStyle" :load="load" @loadmore="loadmore"
			bgColor="transparent" @onRefresh="onRefresh">
			<view class="content px-2 pt-2">
				<!-- 书架 -->
				<view class="book-shelf p-3 bg-white d-flex a-center">
					<m-scroll-x :isLoading="loadBookshelf" :load="0" mainColor="#f27299" :isCustomRefresh="false">
						<u-empty textSize="12" width="70" height="70" v-if="!loadBookshelf && bookshelfList.length == 0" mode="list" :text="$t('书架是空的')"
							icon="http://cdn.uviewui.com/uview/empty/list.png">
						</u-empty>
						<view class="scroll-row-item" v-for="(item, i) in bookshelfList" :key="i" @click="$tools.Navigate.navigateTo('/pages-next/media/read-novel/index', item.id)">
							<view class="d-flex flex-column">
								<view class="item-image position-relative hidden">
									<u-image width="100rpx" height="130rpx" :src="item.img"></u-image>
									<view v-if="item.isChange" class="change text-white position-absolute line-h">
										{{$t('更新')}}
									</view>
								</view>
								<view class="item-name line-h mt-1 text-ellipsis1">
									{{item.name}}
								</view>
							</view>
						</view>
					</m-scroll-x>
					<view class="update flex-shrink d-flex a-center pl-3" @click="$tools.Navigate.navigateTo('/pages-next/media/book-shelf/index')">
						<view class="update-text line-h">
							{{$t('书架')}}
						</view>
						<u-icon name="arrow-rightward" size="14" color="#111"></u-icon>
					</view>
				</view>
				<!-- 每日精选 -->

				<!-- 排行榜 -->

				<!-- 猜你喜欢 -->
				<u-empty v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
					icon="http://cdn.uviewui.com/uview/empty/list.png">
				</u-empty>
				<view v-if="list.length != 0" class="item bg-white d-flex a-center j-sb p-2 rounded mt-2" v-for="(val, index) in list"
					:key="index">
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
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	import MScrollX from '@/main_modules/main-ui/m-scroll-x/index.vue'
	export default {
		props: {
			current: {
				type: [Number, String],
				default: 1
			}
		},
		components: {
			MScrollX
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
				loadBookshelf: true,
				bookshelfList: []
			}
		},
		methods: {
			// 初始化
			init() {
				this.getData()
				this.getBookshelfList()
			},
			// 获取书架数据
			getBookshelfList() {
				let list = []
				for (let i = 0; i < 10; i++) {
					if (i < 3) {
						list.push({
							id: i,
							img: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/141b53c86d1f6dc174982e6f122dcbfc.jpg',
							name: '大苍守夜人',
							isChange: false,
							chapterNum: 0
						})
					}else {
						list.push({
							id: i,
							img: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/141b53c86d1f6dc174982e6f122dcbfc.jpg',
							name: '妖龙古帝',
							isChange: true,
							chapterNum: 6
						})
					}
				}
				this.bookshelfList = list
				this.loadBookshelf = false
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
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.tabbarHeight}px - ${this.$store.state.statusHeight}px)`
				}
			}
		},
		watch: {
			current: {
				handler(nv, ov) {
					if (nv === 1) {
						this.list = []
						this.bookshelfList = []
						this.isLoading = true
						this.loadBookshelf = true
						this.load = 0
						let time = setTimeout(() => {
							this.init()
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
	.views {
		background-color: #f5f5f5;
		
		.content{
			.book-shelf{
				height: 226rpx;
				border-radius: 12rpx;
				
				.scroll-row{
					width: 83.2%;
					/deep/ .u-empty__text {
						margin-top: 0 !important;
					}
					.scroll-row-item{
						margin-right: 20rpx;
						.item-image{
							border-radius: 12rpx;
							.change{
								padding: 6rpx 8rpx;
								right: 0;
								top: 0;
								border-radius: 0 0 0 12rpx;
								font-size: 20rpx;
								background-color: #FF0F30;
							}
						}
						.item-name{
							width: 100rpx;
							font-size: 26rpx;
						}
					}
					
					.scroll-row-item:last-child{
						margin-right: 0;
					}
				}
				
				.update{
					
				}
			}
		}
	}
</style>