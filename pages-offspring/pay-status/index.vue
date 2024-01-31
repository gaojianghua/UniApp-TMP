<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar unBack @pageBack="pageBack" bgColor="#transparent" :borderBottom="false" textColor="#fff"
			:value="value" i18n></m-navbar>
		<view class="content pt-10 d-flex a-center flex-column">
			<view v-if="loading == 0" class="ruen d-flex flex-column a-center j-center">
				<view class="d-flex a-center j-center font-weight"
					style="background-color: #33333360; font-size: 70rpx; color: #adadad; width: 200rpx; height: 200rpx; border-radius: 50%;">
					{{text}}
				</view>
				<view style="color: #989898;" class="mt-5">
					{{$t('付款倒计时。。。')}}
				</view>
			</view>
			<u-image v-else-if="loading == 1" width="160rpx" height="160rpx"
				:src="`${$store.state.domain}/img/common/lose.svg`"></u-image>
			<u-image v-else width="160rpx" height="160rpx" :src="`${$store.state.domain}/img/common/success.svg`"></u-image>
			<view v-if="loading != 0" class="mt-10 font" :style="{color: loading == 2 ? '#31D331' : '#F62A2B'}">
				{{$t('订单号')}}: {{query.trade_no}}
			</view>
			<view v-if="loading != 0" class="mt-2 font-md" :style="{color: loading == 2 ? '#31D331' : '#F62A2B'}">
				{{loading == 2 ? $t('page.支付成功') : $t('page.支付失败')}}
			</view>
			<view v-if="loading != 0" @click="$tools.Navigate.reLaunch('/pages/tabbar/home/index')"
				class="text-white d-flex a-center j-center mt-10 main-bg-color"
				style="border-radius: 50rpx; width: 360rpx; height: 80rpx;">
				{{$t('回到首页')}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getPayReturn
	} from '@/utils/request/api/get.js'
	export default {
		data() {
			return {
				value: 'page.付款中',
				query: {
					trade_no: ''
				},
				loading: 0,
				text: 10,
				time: null,
				obj: {}
			}
		},
		onLoad(args) {
			this.query.trade_no = args.trade_no
			this.obj = {
				vid: args.vid ? args.vid : 0,
				mid: args.mid ? args.mid : 0,
				vtime: args.vtime ? args.vtime : 1,
				amount: args.amount ? args.amount : 0,
			}
			this.getData()
			this.time = setInterval(() => {
				if (this.text == 0) {
					this.loading = 1
					this.value = 'page.支付失败'
					clearInterval(this.time)
				}
				this.text--
			}, 1000)
		},
		methods: {
			async getData() {
				let {
					code,
					data
				} = await getPayReturn(this.query)
				if (code == 200) {
					this.loading = 2
					this.value = 'page.支付成功'
					fbq(
						'track', 'Purchase', {
							content_type: 'product',
							contents: [{
								'id': this.query.trade_no,
								'quantity': 1,
							}],
							value: this.obj.amount,
							currency: 'USD'
						}
					);
				} else {
					this.loading = 1
					this.value = 'page.支付失败'
				}
				clearInterval(this.time)
			},
			// 返回
			pageBack() {
				if (this.obj.mid != 0) {
					this.$tools.Navigate.reLaunch('/pages-common/detail/index', this.obj)
				} else {
					this.$tools.Navigate.reLaunch('/pages/tabbar/home/index')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {}
</style>