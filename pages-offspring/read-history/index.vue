<template>
	<view class="page">
		<!-- 顶部导航 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.阅读历史" i18n>
			<view slot="right" @click="openEdit"
				class="edit position-absolute top-half tf-half-y border-2 line-h rounded"
				:class="isEdit ? 'main-border-color main-text-color' : 'border-light-secondary text-light-muted'">
				{{isEdit ? $t('取消') : $t('管理')}}
			</view>
		</m-navbar>
		<!-- 切换栏 -->
		<u-subsection :list="tabs" fontSize="14" activeColor="#f27299" :current="current"
			@change="subChange"></u-subsection>
		<!-- 内容列表 -->
		<!-- #ifdef MP-WEIXIN -->
		<swiper :current="current" :style="[scrollStyle]" @change="changeSwiper">
		<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<swiper :current="current" :style="scrollStyle" @change="changeSwiper">
			<!-- #endif -->
				<swiper-item v-for="(item, i) in tabs" :key="i">
					<!-- 列表区域 -->
					<view class="w-100 h-100 px-2">
						<m-scroll-y :isLoading="item.isLoading" i18n :scrollStyle="scrollStyle" :load="item.load"
							@loadmore="loadmore" bgColor="transparent" @onRefresh="onRefresh">
							<u-empty v-if="item.load != 0 && item.list.length == 0" mode="list" :text="$t('暂无数据')"
								icon="http://cdn.uviewui.com/uview/empty/list.png">
							</u-empty>
							<template v-if="item.list.length != 0">
								<view class="item d-flex a-center j-sb p-2 mt-2" v-for="(val, index) in item.list"
									:key="index" @click="$tools.Navigate.navigateTo(`/pages-offspring/read-${current == 0 ? 'comics' : 'novel'}/index`, val)">
									<view class="mr-2">
										<u-image radius="6" width="158rpx" height="200rpx" :src="val.img"></u-image>
									</view>
									<view class="d-flex pt-1 j-sb flex-1 flex-column" style="height: 200rpx;">
										<view class="d-flex a-center">
											<view class="item-name line-h text-ellipsis1">
												{{val.name}}
											</view>
											<view class="item-mark ml-auto line-h font-weight">
												{{val.mark}}{{$t('分')}}
											</view>
										</view>
										<view class="item-intro text-ellipsis1">
											{{$t('已阅读至')}}: {{val.currentChapter}}
										</view>
										<view class="item-intro text-ellipsis1">
											{{$t('最新章节')}}: {{val.newChapter}}
										</view>
										<view class="d-flex a-center">
											<view class="item-school">
												{{val.school | numberFormat('w', 'cn', true)}}{{$t('书友在读')}}
											</view>
											<view class="ml-2 item-type">
												{{val.type}} · {{val.state == 1 ? $t('连载中') : $t('已完结')}}
											</view>
											<view v-if="isEdit" class="check-icon ml-auto"
												:class="val.isChange ? 'check-active' : ''"
												@click="checkboxChange(index)">
												<u-icon
													:name="`https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/${val.isChange ? 'tick-active' : 'tick'}.svg`"></u-icon>
											</view>
										</view>
									</view>
								</view>
							</template>
						</m-scroll-y>
					</view>
				</swiper-item>
			</swiper>
			<view v-if="isEdit" class="settlement d-flex j-sb a-center">
				<view class="d-flex a-center" @click="allCheckboxChange">
					<view class="check-icon " :class="allCheck ? 'check-active' : ''" >
						<u-icon
							:name="`https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/${allCheck ? 'tick-active' : 'tick'}.svg`"></u-icon>
					</view>
					<view class="ml-1">
						{{$t('全选')}}
					</view>
				</view>
				<view class="btn d-flex j-center a-center" @click="deleteSubmit">
					{{$t('删除')}}
				</view>
			</view>
	</view>
</template>

<script>
	import {
		tabs
	} from './data.js'
	import result from './data.json'
	export default {
		data() {
			return {
				tabs,
				current: 0,
				istrig: true,
				isLock: false,
				query: {
					page: 1,
					limit: 10,
					type: 1
				},
				isEdit: false,
				allCheck: false,
				ids: [],
				pageInfo: ''
			}
		},
		onLoad(args) {
			this.pageInfo = this.$tools.Navigate.receivePageData(args)
			this.current = this.pageInfo == 'novel' ? 1 : 0
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.getData()
			},
			// 获取数据
			async getData(e) {
				this.query.type = this.current + 1
				this.query.page = this.tabs[this.current].page
				// let {
				// 	data,
				// 	code,
				// 	message
				// } = await prayData(this.query)
				let code = 200
				let data = {
					list: []
				}
				data.list = result.data.list
				data.total = result.data.total
				if (code == 200) {
					if (e) { // 加载更多
						this.tabs[this.current].list = this.tabs[this.current].list.concat(data.list)
					} else {
						this.tabs[this.current].list = data.list
						this.tabs[this.current].total = data.total
					}
					if (this.tabs[this.current].page * this.query.limit >= this.tabs[this.current].total) {
						return this.tabs[this.current].load = 1
					} else {
						return this.tabs[this.current].load = 2
					}
				}
			},
			// 下拉刷新
			onRefresh() {
				this.tabs[this.current].page = 1
				this.getData()
			},
			// 加载更多
			loadmore() {
				if (this.tabs[this.current].load == 1 || this.tabs[this.current].istrig == false) return;
				this.tabs[this.current].load = 0
				this.tabs[this.current].page++
				this.tabs[this.current].istrig = false
				let time = setTimeout(() => {
					this.getData('S')
					this.tabs[this.current].istrig = true
					clearTimeout(time)
				}, 1000)
			},
			// 初始化状态
			initStatus() {
				this.ids = []
				this.isEdit = false
				this.allCheck = false
				this.tabs[this.current].list = this.tabs[this.current].list.map(item => ({ ...item, isChange: false }))
			},
			// 点击切换tabs
			subChange(i) {
				this.isLock = true
				this.current = i
				this.initStatus()
				if (this.tabs[this.current].list.length == 0) {
					this.tabs[this.current].isLoading = true
					this.tabs[this.current].page = 1
					let time = setTimeout(() => {
						this.getData()
						clearTimeout(time)
					}, 1000)
				}
				this.isLock = false
			},
			// 滑动切换tabs
			changeSwiper(i) {
				if (this.isLock) return
				this.current = i.detail.current
				this.initStatus()
				if (this.tabs[this.current].list.length == 0) {
					this.tabs[this.current].isLoading = true
					this.tabs[this.current].page = 1
					let time = setTimeout(() => {
						this.getData()
						clearTimeout(time)
					}, 1000)
				}
			},
			// 编辑
			openEdit() {
				this.isEdit = !this.isEdit
			},
			// 勾选
			checkboxChange(i) {
				this.tabs[this.current].list[i].isChange = !this.tabs[this.current].list[i].isChange
				this.allCheck = this.tabs[this.current].list.every(item => item.isChange === true);
				this.ids = this.tabs[this.current].list.filter(item => item.isChange === true).map(item => item.id);
			},
			// 全选
			allCheckboxChange() {
				this.allCheck = !this.allCheck
				this.tabs[this.current].list = this.tabs[this.current].list.map(item => ({ ...item, isChange: this.allCheck }));
				this.ids = this.tabs[this.current].list.filter(item => item.isChange === true).map(item => item.id);
			},
			// 删除
			deleteSubmit() {
				
			}
		},
		computed: {
			scrollStyle() {
				let str = this.isEdit ? '100rpx' : '0rpx'
				return {
					height: `calc(100vh - ${str} - ${this.$store.state.navbarHeight}px - 32px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page {
		.settlement {
			position: fixed;
			bottom: env(safe-area-inset-bottom);
			left: 0;
			width: 100%;
			height: 100rpx;
			background: #FFFFFF;
			border-top: 1rpx solid #f5f5f5;
			padding: 0 25rpx;

			.btn {
				width: 150rpx;
				height: 58rpx;
				background: linear-gradient(-43deg, #EF4860, #fb7290);
				border-radius: 14rpx;
				font-weight: 500;
				color: #FFFFFF;
				font-size: 25rpx;
				margin-left: 25rpx;
			}

			.btn:active {
				background: #fb729999;
			}
		}

		.edit {
			right: 20rpx;
			font-size: 24rpx;
			padding: 8rpx 20rpx;
		}

		.item {
			border-radius: 8rpx;
			background-color: #fff;

			.item-name {
				font-size: 30rpx;
				font-weight: 400;
				line-height: 38rpx;
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

			.item-info {
				color: #999;
				font-size: 28rpx;
			}

			.item-school {
				color: #0A57D0;
				font-size: 24rpx;
			}

			.item-name-rank {
				font-size: 32rpx;
				padding: 12rpx 12rpx 0 15rpx;
			}

		}

		.check-icon {
			border: 4rpx solid #f27299;
			border-radius: 10rpx;
		}

		.check-active {
			border: 4rpx solid #f2729980;
			background-color: #f27299;
		}
	}
</style>