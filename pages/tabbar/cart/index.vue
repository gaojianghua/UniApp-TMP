<template>
	<view class="page">
		<!-- 顶部栏 -->
		<view class="title d-flex a-center px-3">
			<view class="title-text mr-1">
				购物袋
			</view>
			<view class="title-address d-flex a-center">
				<u-image width="50rpx" height="50rpx" src="/static/img/common/local.svg"></u-image>
				<text>北大山水资源年华7幢601</text>
				<u-icon style="margin-bottom: 5rpx;" name="arrow-right" color="#999" size="15"></u-icon>
			</view>
			<view class="title-admin ml-auto" @click="management">
				管理
			</view>
		</view>
		<!--内容区域 -->
		<view v-if="!$store.state.token" class="notopenid d-flex j-center a-center"
			:style="{height: `calc(100vh - 190rpx - ${$store.state.tabbarHeight}px - ${$store.state.statusHeight}px)`}">
			<view class="right d-flex j-center a-center" @click="login">
				未登录!无法查看购物袋
			</view>
		</view>
		<template v-else>
			<m-scroll bgColor="transparent" :isLoading="isLoading" :scrollStyle="{height: `calc(100vh - 190rpx - ${$store.state.tabbarHeight}px - ${$store.state.statusHeight}px)`,
				backgroundColor: 'transparent'}" :load="load" @loadmore="loadmore" @onRefresh="onRefresh" mainColor="#fb7290">
				<u-empty v-if="load != 0 && list.length == 0" mode="car" text="购物袋是空的"
					icon="http://cdn.uviewui.com/uview/empty/car.png">
				</u-empty>
				<view v-if="list.length != 0" class="list">
					<view class="list-item d-flex px-3" v-for="(item, i) in list" :key="i"
						@click="enterListDetail(item)">
					</view>
				</view>
			</m-scroll>
		</template>
		<!-- 结算区域 -->
		<view v-if="!$store.state.token" class="login d-flex a-center main-bg-color">
			<view class="left">
				登录查看购物袋
			</view>
			<view class="right d-flex ml-auto j-center a-center" @click="login">
				立即登录
			</view>
		</view>
		<view v-else class="settlement d-flex j-sb a-center">
			<view class="left">
				<u-checkbox-group>
					<u-checkbox label="全选" label-size="14" size="22" active-color="#fb7290" shape="circle"
						@change="checkboxChange" v-model="checked"></u-checkbox>
				</u-checkbox-group>
			</view>
			<view class="right d-flex a-base">
				<view class="name mr-1">
					合计: 
				</view>
				<view class="money d-flex a-base">
					<view class="icon">
						￥
					</view>
					<view class="integer">
						{{allPrice}}
					</view>
					<view class="decimal">
						{{decimal}}
					</view>
				</view>
				<view class="btn d-flex j-center a-center" @click="submit">
					结算
				</view>
			</view>
		</view>
		<!-- 底部导航 -->
		<m-tabbar :pagePath="$store.state.tabbar[3].pagePath" i18n></m-tabbar>
	</view>
</template>

<script>
	import MTabbar from '@/main_modules/main-ui/m-tabbar/index.vue'
	import MScroll from '@/main_modules/main-ui/m-scroll/index.vue'
	export default {
		components: {
			MTabbar,
			MScroll
		},
		data() {
			return {
				checked: false,
				allPrice: '0',
				decimal: '.00',
				load: 0,
				list: [],
				isLoading: true,
				query: {
					pageNum: 1,
					pageSize: 10
				},
				total: 0,
				istrig: true
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
				this.load = 3
				// let {
				// 	data,
				// 	code
				// } = await getCartList(this.query)
				// if (code == 200) {
				// 	if (e) {
				// 		this.list = this.list.concat(data.list)
				// 	} else {
				// 		this.list = data.list
				// 		this.total = data.total
				// 		if (this.list.length == 0) {
				// 			this.isLoading = false
				// 		}
				// 		this.load = 1
				// 	}
				// 	if (this.query.pageNum * this.query.pageSize >= this.total) {
				// 		return this.load = 1
				// 	} else {
				// 		return this.load = 2
				// 	}
				// }
			},
			// 全选变化事件
			checkboxChange(e) {
				console.log(e)
			},
			// 去登录
			login() {

			},
			// 提交结算
			submit() {

			},
			// 管理
			management() {
				
			},
			// 查看详情
			enterListDetail(i) {
				
			},
			// 加载更多
			loadmore() {
				if (this.load == 1 || this.istrig == false) return;
				this.load = 0
				this.infoQuery.page++
				this.istrig = false
				setTimeout(() => {
					this.getData('S')
					this.istrig = true
				}, 1000)
			},
			// 下拉刷新
			onRefresh() {
				this.query.page = 1
				this.getData()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.title {
			height: 90rpx;

			.title-text {
				font-size: 36rpx;
				font-weight: bold;
			}

			.title-address {
				text {
					margin-left: 6rpx;
					font-size: 28rpx;
					color: #999;
				}
			}

			.title-admin {
				font-size: 30rpx;
			}
		}

		.notopenid {
			.right {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #56360E;
				line-height: 48rpx;
			}
		}

		.login {
			width: 100%;
			height: 100rpx;
			padding: 0 30rpx;
			position: fixed;
			left: 0;
			bottom: calc(100rpx + env(safe-area-inset-bottom));

			.left {
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				font-size: 30rpx;
				letter-spacing: 2rpx;
			}

			.right {
				width: 147rpx;
				height: 52rpx;
				background: linear-gradient(-43deg, #FBEFD0, #FAE2A0);
				border-radius: 30rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #56360E;
				line-height: 48rpx;
			}
			.right:active{
				background: linear-gradient(-43deg, #FBEFD099, #FAE2A099);
			}
		}

		.settlement {
			position: fixed;
			bottom: calc(100rpx + env(safe-area-inset-bottom));
			left: 0;
			width: 100%;
			height: 100rpx;
			background: #FFFFFF;
			border-top: 1rpx solid #f5f5f5;
			padding: 0 25rpx;

			.left {}

			.right {
				.name {
					font-weight: 500;
					color: #222222;
					font-size: 24rpx;
				}

				.money {

					.icon {
						font-weight: bold;
						font-size: 18rpx;
						color: #EF4868;
					}

					.integer {
						font-weight: bold;
						font-size: 32rpx;
						color: #EF4868;
						line-height: 1;
					}

					.decimal {
						font-weight: bold;
						font-size: 18rpx;
						color: #EF4868;
					}
				}

				.btn {
					width: 150rpx;
					height: 58rpx;
					background: linear-gradient(-43deg, #EF4860, #fb7290);
					border-radius: 30rpx;
					font-weight: 500;
					color: #FFFFFF;
					font-size: 25rpx;
					margin-left: 25rpx;
					box-shadow: 0 5rpx 10rpx #fb7290;
				}
				.btn:active{
					background: #fb729999;
				}
			}
		}

	}
</style>