<template>
	<view class="page">
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.我的收藏" i18n></m-navbar>
		<view class="option d-flex a-center px-2">
			<view class="collect">
				{{$t('已收藏总量')}}：{{10}}{{$t('件')}}
			</view>
			<view :class="switchManage ? 'bg-warning text-white' : 'bg-light-secondary'" class="manage ml-auto px-2 py mr-2  rounded-1" @click="switchManageClick">
				{{switchManage ? $t('取消') : $t('管理')}}
			</view>
			<view class="bg-dark d-flex a-center j-center rounded-1"
				style="height: 54rpx; width: 54rpx;">
				<u-icon v-if="direction == 'Y'" name="list-dot" color="#fff" size="34rpx"
					@click="direction = 'X'"></u-icon>
				<u-icon v-if="direction == 'X'" name="grid" color="#fff" size="34rpx"
					@click="direction = 'Y'"></u-icon>
			</view>
		</view>
		<!-- 列表区域 -->
		<view class="w-100 px-2" :style="scrollStyle">
			<m-scroll :placeHeight="switchManage? '100rpx' : '0'" i18n :isLoading="isLoading" :scrollStyle="scrollStyle" :load="load"
				@loadmore="loadmore" bgColor="transparent" @onRefresh="onRefresh">
				<u-empty v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无收藏')"
					icon="http://cdn.uviewui.com/uview/empty/list.png">
				</u-empty>
				<view v-if="list.length != 0" class="goods-list"
					:class="direction == 'Y' ? 'd-flex flex-wrap j-sb' : ''">
					<view class="goods-item" :style="{width: direction == 'Y' ? '48.8%' : '100%'}"
						v-for="(item, i) in list" :key="i" @click.stop="openDetail(item)">
						<m-goods-card @checkClick="checkClick" @addCart="addCart" :item="item" :direction="direction" imageWidth="200rpx"
							:imageHeight="direction == 'Y' ? '300rpx' : '200rpx'" isSales
							isDesc isOldPrice isOver isVIP :isCartBtn="!switchManage" :isChecked="switchManage"></m-goods-card>
					</view>
				</view>
			</m-scroll>
		</view>
		<view v-if="switchManage" class="settlement d-flex j-sb a-center">
			<u-checkbox-group>
				<u-checkbox :label="$t('全选')" label-size="16" size="26" iconSize="22" active-color="#fb7290" shape="circle"
					@change="checkboxChange" :checked="checked"></u-checkbox>
			</u-checkbox-group>
			<view class="btn d-flex j-center a-center" @click="deleteSubmit">
				{{$t('删除')}}
			</view>
		</view>
	</view>
</template>

<script>
	import MScroll from '@/main_modules/main-ui/m-scroll/index.vue'
	import MGoodsCard from '@/main_modules/main-ui/m-goods-card/index.vue'
	import goods from '@/pages/tabbar/kind/goods.json'
	export default {
		components: {
			MScroll,
			MGoodsCard
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
				direction: 'Y',
				switchManage: false,
				checked: false
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
				data.list = goods.data
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
			// 加入购物车
			addCart(i) {
				
			},
			// 选中
			checkClick(i) {
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
			// 删除
			deleteSubmit() {
				
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
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - 44px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page{
		.option{
			background-color: #fff;
			height: 44px;
		}
		.item {
			border-radius: 8rpx;
			background-color: #fff;
		
			.left {
				height: 180rpx;
			}
		}
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
</style>
