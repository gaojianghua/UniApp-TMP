<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" isTab isSlot>
			<view class="title w-100 d-flex a-center px-3" :style="{
			width: `calc(100vw - ${miniProgramCapsule.width}px)`,
			marginRight: `calc(100vw - ${miniProgramCapsule.right}px + ${miniProgramCapsule.width}px)`}">
				<view class="title-text mr-2 flex-shrink line-h">
					{{$t('购物车')}}
				</view>
				<view class="title-address d-flex a-center mr-1">
					<u-image width="50rpx" height="50rpx" src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/local.svg"></u-image>
					<text class="line-h text-ellipsis1">北大山水资源年华7幢601</text>
					<u-icon name="arrow-right" color="#999" size="15"></u-icon>
				</view>
				<!-- #ifndef MP -->
				<view v-if="$store.state.token" :class="switchManage ? 'bg-warning text-white' : 'bg-light-secondary'" class="manage flex-shrink ml-auto px-2 py mr-2  rounded-1" @click="switchManageClick">
					{{$t('管理')}}
				</view>
				<view v-if="$store.state.token" class="bg-dark d-flex a-center j-center rounded-1"
					style="height: 54rpx; width: 54rpx;">
					<u-icon v-if="direction == 'Y'" name="list-dot" color="#fff" size="34rpx"
						@click="direction = 'X'"></u-icon>
					<u-icon v-if="direction == 'X'" name="grid" color="#fff" size="34rpx"
						@click="direction = 'Y'"></u-icon>
				</view>
				<!-- #endif -->
			</view>
		</m-navbar>
		<!--内容区域 -->
		<!-- #ifndef MP -->
		<view v-if="!token" class="notopenid d-flex j-center a-center" :style="scrollStyle">
		<!-- #endif -->
		<!-- #ifdef MP -->
		<view v-if="!token" class="notopenid d-flex j-center a-center" :style="[scrollStyle]">
		<!-- #endif -->
			<view class="right d-flex j-center a-center" @click="login">
				{{$t('未登录!无法查看购物车')}}
			</view>
		</view>
		<template v-else>
			<m-scroll-y bgColor="transparent" i18n :isLoading="isLoading" :scrollStyle="scrollStyle" :load="load" @loadmore="loadmore" @onRefresh="onRefresh" mainColor="#fb7290">
				<u-empty v-if="load != 0 && list.length == 0" mode="car" :text="$t('购物车是空的')"
					icon="http://cdn.uviewui.com/uview/empty/car.png">
				</u-empty>
				<view v-if="list.length != 0" class="list px-3" :class="direction == 'Y' ? 'd-flex flex-wrap j-sb' : ''">
					<view class="list-item" :style="{width: direction == 'Y' ? '48.8%' : '100%'}" v-for="(item, i) in list" :key="i"
						@click="openDetail(item)">
						<m-goods-card @checkClick="checkClicke" @addCart="addCart" :item="item" :direction="direction" imageWidth="200rpx"
							:imageHeight="direction == 'Y' ? '300rpx' : '200rpx'" isSales
							isDesc isOldPrice isOver isVIP :isCartBtn="false" isChecked></m-goods-card>
					</view>
				</view>
			</m-scroll-y>
		</template>
		<!-- 结算区域 -->
		<view v-if="!token" class="login d-flex a-center">
			<view class="left">
				{{$t('登录查看购物车')}}
			</view>
			<view class="right py-2 px-3 d-flex ml-auto line-h j-center a-center" @click="login">
				{{$t('立即登录')}}
			</view>
		</view>
		<view v-else class="settlement d-flex j-sb a-center">
			<view class="left">
				<u-checkbox-group>
					<u-checkbox :label="$t('全选')" label-size="14" size="24" iconSize="20" active-color="#fb7290" shape="circle"
						@change="checkboxChange" :checked="checked"></u-checkbox>
				</u-checkbox-group>
			</view>
			<view class="right d-flex a-base">
				<view v-if="!switchManage" class="name mr-1">
					{{$t('合计')}}: 
				</view>
				<view v-if="!switchManage" class="money d-flex a-base">
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
				<view v-if="!switchManage" class="btn d-flex j-center a-center" @click="submit">
					{{$t('结算')}}
				</view>
				<view v-else class="btn d-flex j-center a-center" @click="show = true">
					{{$t('移除')}}
				</view>
			</view>
		</view>
		<!-- 弹框 -->
		<m-modal :show="show" i18n title="温馨提示" @cancel="show = false" @confirm="confirmDelete">
			<view class="d-flex a-center j-center">
				<view class="mt-1 text-center">
					{{$t('确定移除选中的商品吗？')}}
				</view>
			</view>
		</m-modal>
		<!-- 底部导航 -->
		<m-tabbar pagePath="pages/tabbar/cart/index" i18n></m-tabbar>
	</view>
</template>

<script>
	import MTabbar from '@/main_modules/main-ui/m-tabbar/index.vue'
	import MGoodsCard from '@/main_modules/main-ui/m-goods-card/index.vue'
	import goods from '@/pages/tabbar/kind/goods.json'
	import tabbarInit from '@/mixins/tabbar-init.js'
	import capsuleInit from '@/mixins/capsule-init.js'
	export default {
		mixins: [tabbarInit,capsuleInit],
		components: {
			MTabbar,
			MGoodsCard
		},
		data() {
			return {
				direction: 'Y',
				switchManage: false,
				checked: false,
				show: false,
				allPrice: '0',
				decimal: '.00',
				load: 0,
				list: [],
				isLoading: true,
				query: {
					page: 1,
					limit: 20
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
				// let {
				// 	data,
				// 	code
				// } = await getCartList(this.query)
				let code = 200
				let data = {
					list: []
				}
				data.list = goods.data
				data.total = data.list.length
				if (code == 200) {
					if (e) {
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
			// 去登录
			login() {
				this.$tools.Navigate.navigateTo('/pages/account/login/index')
			},
			// 提交结算
			submit() {

			},
			// 删除确认
			confirmDelete() {
				this.show = false
			},
			// 选中
			checkClicke(i) {
				let bool = true
				this.list.forEach((item) => {
					if(item.goodsId == i.goodsId) {
						item.check = !item.check
					}
					if(!item.check) {
						bool = item.check
					}
				})
				this.checked = bool
			},
			// 全选
			checkboxChange(e) {
				this.checked = e
				this.list.forEach((item, i) => {
					item.check = e
				})
			},
			// 管理开关
			switchManageClick() {
				this.checked = false
				if(this.switchManage) {
					this.list.forEach((item, i) => {
						item.check = false
					})
				}
				this.switchManage = !this.switchManage
			},
			// 进入商品详情页
			openDetail(i) {
				this.$tools.Navigate.navigateTo('/pages-next/common/goods-detail/index', i)
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
			},
			// 加入购物车
			addCart() {
				
			}
		},
		computed: {
			token() {
				return this.$store.state.token
			},
			scrollStyle() {
				return {height: `calc(100vh - ${this.$store.state.navbarHeight}px - 100rpx - env(safe-area-inset-bottom) - ${this.$store.state.tabbarHeight}px - ${this.$store.state.statusHeight}px)`}
			}
		},
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
			background-color: #151521;
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
				background: linear-gradient(-43deg, #FBEFD0, #FAE2A0);
				border-radius: 50rpx;
				font-size: 26rpx;
				font-weight: 500;
				color: #56360E;
				box-shadow: 0 2rpx 4rpx 4rpx #FBEFD0;
			}

			.right:active {
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
			border-top: 1rpx solid #eee;
			padding: 0 25rpx;

			.left {}

			.right {
				.name {
					font-weight: 500;
					color: #222222;
					font-size: 28rpx;
				}

				.money {

					.icon {
						font-weight: bold;
						font-size: 22rpx;
						color: #EF4868;
					}

					.integer {
						font-weight: bold;
						font-size: 36rpx;
						color: #EF4868;
						line-height: 1;
					}

					.decimal {
						font-weight: bold;
						font-size: 22rpx;
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

				.btn:active {
					background: #fb729999;
				}
			}
		}

	}
</style>