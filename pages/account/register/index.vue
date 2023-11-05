<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="transparent" textColor="#fff" i18n value="page.欢迎注册"></m-navbar>
		<!-- 内容区域 -->
		<m-scroll :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
			<view class="d-flex a-center j-center flex-column pt-10">
				<u-image width="120rpx" height="120rpx"
					src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/GongYueLogo.png"></u-image>
				<view class="desc line-h letter-2 mt-3 font-weight text-white">
					{{$t('宫悦商城欢迎您')}}
				</view>
				<view class="content-form mt-10 p-3">
					<view class="bottom">
						<u-input :customStyle="{height: '100rpx', caretColor: '#f27299'}" type="text" border="none"
							:placeholder="$t('请输入手机号')" v-model="query.phone">
							<span slot="prefix" class="iconfont icon-shouji"></span>
						</u-input>
					</view>
					<view class="bottom">
						<u-input border="none" :customStyle="{height: '100rpx', caretColor: '#f27299'}" type="password"
							:placeholder="$t('请输入密码')" v-model="query.password">
							<span slot="prefix" class="iconfont icon-mima"></span>
						</u-input>
					</view>
					<view class="bottom">
						<u-input border="none" :customStyle="{height: '100rpx', caretColor: '#f27299'}" type="password"
							:placeholder="$t('请再次输入密码')" v-model="query.rePassword">
							<span slot="prefix" class="iconfont icon-mima"></span>
						</u-input>
					</view>
					<view class="bottom">
						<u-input border="none" :customStyle="{height: '100rpx', caretColor: '#f27299'}" type="password"
							:placeholder="$t('请输入验证码')" v-model="query.code">
							<span slot="prefix" class="iconfont icon-mima"></span>
							<view slot="suffix" class="code">
								
							</view>
						</u-input>
					</view>
					<view class="bottom">
						<u-input border="none" :customStyle="{height: '100rpx', caretColor: '#f27299'}" type="text"
							:placeholder="$t('请输入邀请码(选填)')" v-model="query.inviteCode">
							<span slot="prefix" class="iconfont icon-mima"></span>
						</u-input>
					</view>
					<view @click="submitRegister" class="mb-4 mt-5 btons d-flex a-center j-center text-white">
						{{$t('立即注册')}}
					</view>
					<m-agree-policy i18n @checkChange="checkChange" :check="check"></m-agree-policy>
				</view>
			</view>
		</m-scroll>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import MScroll from '@/main_modules/main-ui/m-scroll/index.vue'
	import MAgreePolicy from '@/main_modules/main-ui/m-agree-policy/index.vue'
	export default {
		components: {
			MScroll,
			MAgreePolicy
		},
		data() {
			return {
				query: {
					password: '',
					phone: '',
					inviteCode: ''
				},
				check: []
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				
			},
			// 同意协议
			checkChange(e) {
				this.check = e
			},
			// 注册
			submitRegister() {
				if(this.check.length == 0) {
					return this.$refs.uToast.show({
						message: this.$t('请阅读并同意用户协议与隐私政策'),
						type: 'warning',
						duration: 1500
					})
				}
				if(!this.query.phone) {
					return this.$refs.uToast.show({
						message: this.$t('请输入手机号'),
						type: 'warning',
						duration: 1500
					})
				}
				if(!this.query.password) {
					return this.$refs.uToast.show({
						message: this.$t('请输入密码'),
						type: 'warning',
						duration: 1500
					})
				}
				if(!this.query.inviteCode) {
					this.query.inviteCode = '10001'
				}
				
				this.$refs.uToast.show({
					message: this.$t('注册成功'),
					type: 'success',
					duration: 1200,
					complete: () => this.$tools.Navigate.navigateBack()
				})
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - 2rpx - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page {
		background: url('/static/img/common/login-bg.jpg') no-repeat;
		background-size: cover;

		.desc {
			font-size: 38rpx;
			text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.5);
		}

		.content-form {
			width: 690rpx;
			background-color: #ffffff80;
			border: 2rpx solid #fff;
			border-radius: 20rpx;
			margin-top: 200rpx;

			.bottom {
				background-color: #fff;
				border-radius: 50rpx;
				padding: 0 30rpx;
				margin-top: 20rpx;
			}
		}

		.btons {
			font-size: 30rpx;
			border-radius: 50rpx;
			height: 88rpx;
			width: 630rpx;
			margin: 0 auto;
			background: linear-gradient(to right, #85B6CA, #F9A4A0);
		}

		.btons:active {
			background: linear-gradient(to right, #85B6CA80, #F9A4A080);
		}
	}
</style>