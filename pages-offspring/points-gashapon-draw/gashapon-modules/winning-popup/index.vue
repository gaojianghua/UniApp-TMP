<template>
	<u-overlay :show="danShow" mode="center" @click="()=>false">
		<view @click.stop class="dan d-flex a-center flex-column position-relative">
			<view class="d-flex a-center j-center flex-column">
				<view class="text-white font-md font-weight">
					Probability of winning
				</view>
				<view class="d-flex a-center j-around mt-3" style="width: 650rpx;">
					<view class="d-a-j-center flex-column">
						<u-image width="80rpx" height="80rpx" src="/static/img/common/single3.png"></u-image>
						<view class="text-white mt-1">
							{{odds['3']}}%
						</view>
					</view>
					<view class="d-a-j-center flex-column">
						<u-image width="80rpx" height="80rpx" src="/static/img/common/single2.png"></u-image>
						<view class="text-white mt-1">
							{{odds['2']}}%
						</view>
					</view>
					<view class="d-a-j-center flex-column">
						<u-image width="80rpx" height="80rpx" src="/static/img/common/single1.png"></u-image>
						<view class="text-white mt-1">
							{{odds['1']}}%
						</view>
					</view>
				</view>
			</view>
			<view class="transition d-flex a-center flex-column mt-10">
				<u-image width="400rpx" height="400rpx" :src="`/static/img/common/sin${dan}.png`"></u-image>
				<view class="text-white d-flex flex-column font mt-5" style="width: 500rpx;">
					<span>You will likely get:</span>
					<span class="d-flex a-center flex-column w-100" style="font-size: 26rpx; margin-top: 10rpx;">
						<p class="w-100 text-center" v-for="(item, i) in tips" :key="i">
							{{item.name}} ( {{item.show_odds}}% )
						</p>
					</span>
				</view>
				<view style="height: 120rpx;"></view>
				<u-image @click="viewContent" width="383rpx" height="104.5rpx" src="/static/img/common/single0.png"></u-image>
			</view>
		</view>
	</u-overlay>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {

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
