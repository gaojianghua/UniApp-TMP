<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" :value="value" i18n></m-navbar>
		<!-- 内容区域 -->
		<view class="pt-10 px-3 d-flex a-center j-center flex-column">
			<view class="bottom">
				<u-input :customStyle="{height: '96rpx', caretColor: '#f27299'}" type="text" border="none"
					:placeholder="$t('请输入手机号')" v-model="query.phone">
					<view slot="prefix" class="area d-flex a-center mr-3" @click="switchArea">
						<span class="mr-1">+{{areaCode}}</span>
						<u-icon name="arrow-down-fill" color="#f27299" size="14"></u-icon>
					</view>
				</u-input>
			</view>
			<view class="bottom b2 mt-3">
				<u-input :customStyle="{height: '96rpx', caretColor: '#f27299'}" type="text" border="none"
					:placeholder="$t('请输入验证码')" v-model="query.code">
					<view slot="suffix" class="code px-3 line-h py-2 main-bg-color text-white" @click="getCode">
						{{$t('获取验证码')}}
					</view>
				</u-input>
			</view>
			<view @click="switchUpdate" class="btons d-flex mt-10 a-center j-center text-white letter-2">
				{{$t(btName)}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				query: {
					phone: '',
					code: ''
				},
				areaCode: '86',
				btName: ''
			}
		},
		onLoad(options) {
			console.log(options.item)
			options.item == 1 ? this.value = 'page.绑定手机号' : this.value = 'page.更换手机号'
			options.item == 1 ? this.btName = '确认绑定' : this.btName = '确认修改'
		},
		methods: {
			// 修改手机号
			switchUpdate() {
				
			},
			// 选中区号
			switchArea() {
				
			},
			// 获取验证码
			getCode() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		background-color: #fff;
		.bottom {
			width: 600rpx;
			background-color: #f1f1f1;
			border-radius: 25rpx;
			padding: 0 30rpx;
			.code{
				border-radius: 20rpx;
			}
			.code:active{
				background-color: #f2729980;
			}
		}
		.b2{
			padding: 0 16rpx 0 30rpx;
		}
		.btons {
			font-size: 30rpx;
			border-radius: 50rpx;
			height: 88rpx;
			width: 600rpx;
			margin: 0 auto;
			background: linear-gradient(to right, #85B6CA, #F9A4A0);
		}
		
		.btons:active {
			background: linear-gradient(to right, #85B6CA80, #F9A4A080);
		}
	}
</style>
