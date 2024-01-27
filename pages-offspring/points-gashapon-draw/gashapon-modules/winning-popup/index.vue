<template>
	<u-overlay :show="show" mode="center" @click="()=>false">
		<view @click.stop class="dan d-flex a-center flex-column position-relative">
			<view class="d-flex a-center j-center flex-column">
				<view class="text-white font-md font-weight">
					{{$t('获奖概率')}}
				</view>
				<view class="d-flex a-center j-around mt-3" style="width: 650rpx;">
					<view class="d-flex a-center j-center flex-column" v-for="(item, i) in chanceList" :key="i">
						<u-image width="80rpx" height="80rpx" :src="item.image"></u-image>
						<view class="text-white mt-1">
							{{item.rate}}%
						</view>
					</view>
				</view>
			</view>
			<view class="transition d-flex a-center flex-column mt-10">
				<u-image width="400rpx" height="400rpx" :src="winningImg"></u-image>
				<view class="text-white d-flex flex-column font mt-5" style="width: 500rpx;">
					<span>{{$t('你可能会得到')}}:</span>
					<span class="d-flex a-center flex-column w-100" style="font-size: 26rpx; margin-top: 10rpx;">
						<p class="w-100 text-center" v-for="(item, i) in prizeTips" :key="i">
							{{item.name}} ( {{item.rate}}% )
						</p>
					</span>
				</view>
				<view style="height: 120rpx;"></view>
				<u-image @click="viewContent" width="383rpx" height="104.5rpx" src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/single0.png"></u-image>
			</view>
		</view>
	</u-overlay>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			prizeTips: {
				type: Array,
				default: () => {
					return []
				}
			},
			chanceList: {
				type: Array,
				default: () => {
					return []
				}
			},
			winningImg: {
				type: String,
				default: () => {
					return ''
				}
			}
		},
		data() {
			return {}
		},
		methods: {
			// 开蛋查看内容
			viewContent() {
				this.$emit('viewContent')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dan{
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
