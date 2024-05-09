<template>
	<view class="page">
		<m-navbar bgColor="transparent" textColor="#fff" value="page.BMI指数" i18n></m-navbar>
		<!-- 内容区域 -->
		<m-scroll-y :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
			<view class="content d-flex flex-column a-center p-2">
				<view class="rounded-1 p-3 bg-white form w-100">
					<view class="bottom">
						<u-input clearable border="none" type="number" :customStyle="{height: '100rpx', caretColor: '#f27299'}"
							:placeholder="$t('请输入体重')" v-model="query.weight">
							<view class="text-danger font-md" slot="suffix">
								KG
							</view>
						</u-input>
					</view>
					<view class="bottom mt-3">
						<u-input clearable border="none" type="number" :customStyle="{height: '100rpx', caretColor: '#f27299'}"
							:placeholder="$t('请输入身高')" v-model="query.height">
							<view class="text-danger font-md" slot="suffix">
								CM
							</view>
						</u-input>
					</view>
				</view>
				<view class="rounded-1 result w-100 py-2 d-flex a-center j-center bg-white mt-2">
					<span class="text-white">{{$t('计算结果')}}:</span>
					<span class="ml-2 font-lg line-h-sm" :style="{color: setColor}">{{result}}</span>
				</view>
				<view @click="submitBMI" class="mt-2 w-100 btons d-flex a-center j-center text-white">
					{{$t('提交')}}
				</view>
			</view>
		</m-scroll-y>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result: 0,
				colors: [
					'#0000FF',
					'#00FF00',
					'#FFFF00',
					'#FFA500',
					'#FF4500',
					'#FF0000'
				],
				query: {
					height: '',
					weight: ''
				}
			}
		},
		methods: {
			// BMI计算提交
			submitBMI() {
				if(!this.query.height) {
					return this.$refs.uToast.show({
						message: this.$t('请输入身高'),
						type: 'warning',
						duration: 1500
					})
				}
				if(!this.query.weight) {
					return this.$refs.uToast.show({
						message: this.$t('请输入体重'),
						type: 'warning',
						duration: 1500
					})
				}
				let height = this.query.height / 100
				this.result = (this.query.weight / (height * height)).toFixed(2)
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.browserFitHeight}px - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			},
			setColor() {
				if(this.result < 18.5) {
					return this.colors[0]
				}
				if(this.result >= 18.5 && this.result < 24) {
					return this.colors[1]
				}
				if(this.result >= 24 && this.result < 27) {
					return this.colors[2]
				}
				if(this.result >= 27 && this.result < 30) {
					return this.colors[3]
				}
				if(this.result >= 30 && this.result < 40) {
					return this.colors[4]
				}
				if(this.result >= 40) {
					return this.colors[5]
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background: url('https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/login-bg.jpg') no-repeat;
		background-size: 100% 100%;
		.content {
			.form{
				background-color: #ffffff80;
				border: 2rpx solid #fff;
				border-radius: 20rpx;
			}
			.result{
				background-color: #00000080;
				border: 2rpx solid #fff;
				border-radius: 20rpx;
			}
			.btons {
				font-size: 30rpx;
				border-radius: 20rpx;
				height: 88rpx;
				background: linear-gradient(to right, #85B6CA, #F9A4A0);
			}

			.btons:active {
				background: linear-gradient(to right, #85B6CA80, #F9A4A080);
			}
			
			.bottom {
				background-color: #fff;
				border-radius: 50rpx;
				padding: 0 30rpx;
			}
		}
	}
</style>