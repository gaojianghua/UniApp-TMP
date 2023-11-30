<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.手机号" i18n></m-navbar>
		<!-- 内容区域 -->
		<view class="pt-10 px-3 d-flex a-center j-center flex-column">
			<view class="notice">
				{{$t('当前绑定手机号')}}
			</view>
			<view class="phone">
				{{$store.state.userinfo.phone | phoneDesensitization}}
			</view>
			<view @click="$tools.Navigate.navigateTo('/pages-offspring/bind-update-phone/index', 2)" class="btons d-flex mt-10 a-center j-center text-white letter-2">
				{{$t('修改手机号')}}
			</view>
		</view>
	</view>
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
	.page{
		background-color: #fff;
		.notice{
			color: #666;
		}
		.phone{
			font-size: 70rpx;
			font-weight: 500;
			color: #343434;
		}
		.btons {
			font-size: 30rpx;
			border-radius: 50rpx;
			height: 88rpx;
			width: 600rpx;
			background: linear-gradient(to right, #85B6CA, #F9A4A0);
		}
		
		.btons:active {
			background: linear-gradient(to right, #85B6CA80, #F9A4A080);
		}
	}
</style>
