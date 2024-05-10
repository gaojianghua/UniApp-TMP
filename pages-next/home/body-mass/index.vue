<template>
	<view class="page">
		<m-navbar bgColor="transparent" textColor="#fff" value="page.BMI指数" i18n></m-navbar>
		<!-- 内容区域 -->
		<m-scroll-y :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
			<view class="content d-flex flex-column a-center p-2">
				<view class="rounded-1 p-3 bg-white form w-100">
					<view class="d-flex a-center j-around">
						<view class="d-flex a-center" @click="query.sex = 1">
							<view class="check-icon d-flex a-center j-center">
								<u-icon v-if="query.sex == 1"
									name="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/tick.svg"></u-icon>
							</view>
							<view class="ml-2">
								{{$t('男')}}
							</view>
						</view>
						<view class="d-flex a-center" @click="query.sex = 0">
							<view class="check-icon d-flex a-center j-center">
								<u-icon v-if="query.sex == 0"
									name="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/tick.svg"></u-icon>
							</view>
							<view class="ml-2">
								{{$t('女')}}
							</view>
						</view>
					</view>
					<view class="bottom mt-3 position-relative">
						<u-input clearable border="none" type="select"
							:customStyle="{height: '100rpx', caretColor: '#f27299'}" :placeholder="$t('请选择生日')"
							v-model="query.age">
							<u-icon name="arrow-right" color="#999" slot="suffix"></u-icon>
						</u-input>
						<view class="position-absolute top-0 bottom-0 left-0 right-0" @click="show = true"></view>
					</view>
					<view class="bottom mt-3">
						<u-input clearable border="none" type="number"
							:customStyle="{height: '100rpx', caretColor: '#f27299'}" :placeholder="$t('请输入体重')"
							v-model="query.weight">
							<view class="text-danger font-md" slot="suffix">
								KG
							</view>
						</u-input>
					</view>
					<view class="bottom mt-3">
						<u-input clearable border="none" type="number"
							:customStyle="{height: '100rpx', caretColor: '#f27299'}" :placeholder="$t('请输入身高')"
							v-model="query.height">
							<view class="text-danger font-md" slot="suffix">
								CM
							</view>
						</u-input>
					</view>
				</view>
				<view class="rounded-1 result w-100 py-2 d-flex a-center j-around bg-white mt-2">
					<view class="d-flex a-center">
						<span class="text-white">{{$t('BMI值')}}:</span>
						<span class="ml-2 font-lg line-h-sm" :style="{color: setColor}">{{result}}</span>
					</view>
					<view class="d-flex a-center">
						<span class="text-white">{{$t('体脂率')}}:</span>
						<span class="ml-2 font-lg line-h-sm" :style="{color: setColor}">{{fat}}</span>
					</view>
				</view>
				<view @click="submitBMI" class="mt-2 w-100 btons d-flex a-center j-center text-white">
					{{$t('提交')}}
				</view>
			</view>
		</m-scroll-y>
		<u-datetime-picker :minDate="new Date().getTime() - (100 * 365 * 24 * 60 * 60 * 1000)" :maxDate="new Date().getTime()" :title="$t('选择生日')" @cancel="show = false" @confirm="confirm" :cancelText="$t('取消')" :confirmText="$t('确认')" @close="show = false" closeOnClickOverlay cancelColor="#fff" confirmColor="#fff" :show="show" v-model="value" mode="date"></u-datetime-picker>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				value: Number(new Date()),
				result: 0,
				fat: 0,
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
					weight: '',
					age: '',
					sex: 1
				},
				year: ''
			}
		},
		methods: {
			// 选择年龄确认
			confirm(e) {
				this.show = false
				this.query.age = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.year = uni.$u.timeFormat(e.value, 'yyyy')
			},
			// BMI计算提交
			submitBMI() {
				if (!this.query.height) {
					return this.$refs.uToast.show({
						message: this.$t('请输入身高'),
						type: 'warning',
						duration: 1500
					})
				}
				if (!this.query.weight) {
					return this.$refs.uToast.show({
						message: this.$t('请输入体重'),
						type: 'warning',
						duration: 1500
					})
				}
				let height = this.query.height / 100
				this.result = (this.query.weight / (height * height)).toFixed(2)
				
				let currentYear = uni.$u.timeFormat(Number(new Date()), 'yyyy')
				let age = currentYear - this.year
				this.fat = (1.2 * this.result + 0.23 * age - 5.4 - 10.8 * this.query.sex).toFixed(2)
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.browserFitHeight}px - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			},
			setColor() {
				if (this.result < 18.5) {
					return this.colors[0]
				}
				if (this.result >= 18.5 && this.result < 24) {
					return this.colors[1]
				}
				if (this.result >= 24 && this.result < 27) {
					return this.colors[2]
				}
				if (this.result >= 27 && this.result < 30) {
					return this.colors[3]
				}
				if (this.result >= 30 && this.result < 40) {
					return this.colors[4]
				}
				if (this.result >= 40) {
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
		
		/deep/ .u-popup__content{
			border-radius: 35rpx 35rpx 0 0;
			overflow: hidden;
		}
		
		/deep/ .u-toolbar{
			height: 90rpx;
			background-color: #fb7299;
		}
		
		/deep/ .u-toolbar__title{
			color: #fff;
		}

		.content {
			
			.check-icon {
				width: 46rpx;
				height: 46rpx;
				border: 4rpx solid #f27299;
				border-radius: 10rpx;
			}
			
			.check-active {
				border: 6rpx solid #f2729980;
				background-color: #f27299;
			}
			
			.form {
				background-color: #ffffff80;
				border: 2rpx solid #fff;
				border-radius: 20rpx;
			}

			.result {
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