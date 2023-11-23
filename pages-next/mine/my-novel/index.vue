<template>
	<view class="views">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.我的小说" i18n></m-navbar>
		<!-- 内容区域 -->
		<m-scroll-y :isLoading="isLoading" i18n :scrollStyle="scrollStyle" :load="load" @loadmore="loadmore"
			bgColor="transparent" @onRefresh="onRefresh">
			<view class="content px-2 pt-2">
				<!-- 书架 -->
				<view class="book-shelf p-3 bg-white d-flex a-center j-center">
					<m-loading v-if="loadBookshelf"></m-loading>
					<u-empty textSize="12" width="70" height="70" v-if="!loadBookshelf && bookshelfList.length == 0"
						mode="list" :text="$t('书架是空的')" icon="http://cdn.uviewui.com/uview/empty/list.png">
					</u-empty>
					<view v-if="bookshelfList.length != 0" class="d-flex flex-wrap flex-1">
						<view class="item d-flex flex-column mt-3" v-for="(item, i) in bookshelfList" :key="i"
							@click="$tools.Navigate.navigateTo('/pages-next/media/read-novel/index', item)">
							<view class="item-image w-100 position-relative hidden">
								<u-image width="100%" height="200rpx" :src="item.img"></u-image>
								<view v-if="item.isChange" class="change text-white position-absolute line-h">
									{{$t('更新')}}
								</view>
								<view
									class="item-name text-white w-100 line-h mt-1 text-ellipsis1 position-absolute bottom-0 left-0">
									{{item.name}}
								</view>
							</view>
						</view>
						<view class="item update flex-shrink d-flex flex-column j-center a-center mt-3"
							@click="$tools.Navigate.navigateTo('/pages-next/media/book-shelf/index')">
							<view class="update-text line-h">
								{{$t('书架')}}
							</view>
							<u-icon class="mt-1" name="arrow-rightward" size="15" color="#111"></u-icon>
						</view>
					</view>
				</view>
				<!-- 每日精选 -->
				<view class="winnow bg-white mt-2 p-3">
					<view class="d-flex a-center">
						<view class="winnow-title line-h font-weight">
							{{$t('每日精选')}} 12 {{$t('本')}}
						</view>
						<view class="winnow-in ml-auto" @click="openChange">
							{{$t('换一换')}} {{inNum == 1 ? 3 : inNum == 2 ? 6 : inNum == 3 ? 9 : 12}}/12
						</view>
					</view>
					<view v-if="loadWinnow" class="d-flex a-center h-100 j-center">
						<m-loading></m-loading>
					</view>
					<u-empty textSize="12" width="70" height="70" v-if="!loadWinnow && winnowList.length == 0"
						mode="list" :text="$t('暂无精选内容')" icon="http://cdn.uviewui.com/uview/empty/list.png">
					</u-empty>
					<view v-if="bookshelfList.length != 0" class="d-flex flex-wrap flex-1">
						<view class="winnow-item mt-3 d-flex"
							v-for="(item, i) in winnowList.slice((inNum - 1)*3, inNum*3)" :key="i"
							@click="$tools.Navigate.navigateTo('/pages-next/media/read-novel/index', item)">
							<u-image class="mr-2" radius="6" width="158rpx" height="200rpx" :src="item.img"></u-image>
							<view class="d-flex j-sb flex-1 flex-column">
								<view class="d-flex a-center">
									<view class="item-name line-h text-ellipsis1">
										{{item.name}}
									</view>
									<view class="item-mark ml-auto font-weight">
										{{item.mark}}{{$t('分')}}
									</view>
								</view>
								<view class="item-intro text-ellipsis2">
									{{item.intro}}
								</view>
								<view class="d-flex a-center">
									<view class="item-school">
										{{item.school | numberFormat('w', 'cn', true)}}{{$t('书友在读')}}
									</view>
									<view class="ml-2 item-type">
										{{item.type}} · {{item.state == 1 ? $t('连载中') : $t('已完结')}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 猜你喜欢 -->
				<u-empty v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
					icon="http://cdn.uviewui.com/uview/empty/list.png">
				</u-empty>
				<view class="love bg-white mt-2 p-3">
					<view class="d-flex a-center">
						<view class="winnow-title line-h font-weight">
							{{$t('猜你喜欢')}}
						</view>
						<view class="winnow-in ml-auto d-flex a-center" @click="$tools.Navigate.navigateTo('/pages-next/media/novel-screen/index')">
							{{$t('分类筛选')}}
							<u-icon name="arrow-right" size="16" color="#333"></u-icon>
						</view>
					</view>
					<view class="tabs mt-2 p-1">
						<m-tabs :chooseIndex="loveCurrent" @changeTab="changeTab"
							:scrollStyle="{borderRadius: '16rpx'}" chooseBgColor="#fff" bgColor="transparent"
							:chooseTextStyle="{color: '#111'}" :slideNum="1" scrollHeight="46rpx"
							:itemStyle="{borderRadius: '8rpx', color: '#666'}"
							:tabs="tabs" keyName="name">
						</m-tabs>
					</view>
					<view class="winnow-item mt-3 d-flex" v-for="(item, i) in list" :key="i"
						@click="$tools.Navigate.navigateTo('/pages-next/media/read-novel/index', item)">
						<u-image class="mr-2" radius="6" width="158rpx" height="200rpx" :src="item.img"></u-image>
						<view class="d-flex j-sb flex-1 flex-column">
							<view class="d-flex a-center">
								<view class="item-name line-h text-ellipsis1">
									{{item.name}}
								</view>
								<view class="item-mark ml-auto font-weight">
									{{item.mark}}{{$t('分')}}
								</view>
							</view>
							<view class="item-intro text-ellipsis2">
								{{item.intro}}
							</view>
							<view class="d-flex a-center">
								<view class="item-school">
									{{item.school | numberFormat('w', 'cn', true)}}{{$t('书友在读')}}
								</view>
								<view class="ml-2 item-type">
									{{item.type}} · {{item.state == 1 ? $t('连载中') : $t('已完结')}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	import MTabs from '@/main_modules/main-ui/m-tabs/index.vue'
	import result from './data.json'
	export default {
		components: {
			MTabs
		},
		data() {
			return {
				istrig: true,
				isLock: false,
				query: {
					page: 1,
					limit: 10,
					type: 2
				},
				list: [],
				total: 0,
				load: 0,
				isLoading: true,
				loadBookshelf: true,
				loadWinnow: true,
				bookshelfList: [],
				winnowList: [],
				inNum: 1,
				loveCurrent: 0,
				tabs: []
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.getBookshelfList()
				this.getWinnowList()
				this.tabs = result.data.tabs
				this.getData()
			},
			// 获取书架数据
			getBookshelfList() {
				this.bookshelfList = result.data.bookshelfList
				this.loadBookshelf = false
			},
			// 获取精选数据
			getWinnowList() {
				this.winnowList = result.data.winnowList
				this.loadWinnow = false
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
			// 换一换
			openChange() {
				if (this.inNum == 4) {
					return this.inNum = 1
				}
				this.inNum++
			},
			// tab切换
			changeTab() {
				
			}
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
	.views {
		background-color: #f5f5f5;

		.content {
			.book-shelf {
				height: 490rpx;
				border-radius: 15rpx;

				.item {
					width: 23.5%;
					margin-right: 2%;

					.item-image {
						border-radius: 12rpx;

						.change {
							padding: 8rpx 12rpx;
							right: 0;
							top: 0;
							border-radius: 0 0 0 12rpx;
							font-size: 20rpx;
							background-color: #FF0F30;
						}
					}

					.item-name {
						padding: 10rpx 15rpx;
						background-color: #11111160;
						font-size: 26rpx;
					}
					
					.update-text{
						font-size: 26rpx;
					}
				}

				.item:nth-child(-n+4) {
					margin-top: 0 !important;
				}

				.item:nth-child(4n) {
					margin-right: 0;
				}

				.update {
					border: 2rpx solid #999;
					border-radius: 12rpx;
					box-shadow: 0 0 2rpx 2rpx #ddd;
				}
			}

			.winnow {
				height: 796rpx;
			}

			.winnow,
			.love {
				border-radius: 15rpx;

				.winnow-title {
					font-size: 36rpx;
				}

				.winnow-in {
					font-size: 28rpx;
				}

				.winnow-item {
					.item-name {
						font-size: 32rpx;
						font-weight: 400;
					}

					.item-mark {
						font-size: 32rpx;
						color: #FF9A23;
					}

					.item-intro,
					.item-type {
						color: #999;
						font-size: 24rpx;
					}

					.item-school {
						color: #0A57D0;
						font-size: 24rpx;
					}
				}
				.tabs{
					border-radius: 12rpx;
					background-color: #ddd;
				}
			}
		}
	}
</style>