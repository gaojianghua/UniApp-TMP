<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="transparent" textColor="#fff" i18n value="page.欢迎注册"></m-navbar>
		<!-- 内容区域 -->
		<m-scroll-y :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
			<view class="d-flex a-center j-center flex-column h-100 py-10">
				<u-image width="120rpx" height="120rpx"
					src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/GongYueLogo.png"></u-image>
				<view class="desc line-h letter-2 mt-3 font-weight text-white">
					{{$t('宫悦商城欢迎您')}}
				</view>
				<view class="content-form mt-10 p-3">
					<view class="bottom">
						<u-input clearable :customStyle="{height: '100rpx', caretColor: '#f27299'}" type="text" border="none"
							:placeholder="$t('请输入手机号')" v-model="query.phone">
							<view slot="prefix" class="area d-flex a-center mr-3" @click="show = true">
								<span class="mr-1">+{{query.nationCode}}</span>
								<u-icon name="arrow-down-fill" color="#f27299" size="14"></u-icon>
							</view>
						</u-input>
					</view>
					<view class="bottom">
						<u-input clearable :password="isPassword" border="none" :customStyle="{height: '100rpx', caretColor: '#f27299'}"
							:placeholder="$t('请输入密码')" v-model="query.password">
							<u-icon slot="suffix" :name="eyeStr" size="20" color="#999" @click="switchEye(1)"></u-icon>
						</u-input>
					</view>
					<view class="bottom">
						<u-input clearable :password="isRePassword" border="none" :customStyle="{height: '100rpx', caretColor: '#f27299'}"
							:placeholder="$t('请再次输入密码')" v-model="query.rePassword">
							<u-icon slot="suffix" :name="reEyeStr" size="20" color="#999" @click="switchEye(2)"></u-icon>
						</u-input>
					</view>
					<view class="bottom bp">
						<u-input clearable border="none" :customStyle="{height: '100rpx', caretColor: '#f27299'}" type="number"
							:placeholder="$t('请输入验证码')" v-model="query.code">
							<view slot="suffix" class="code line-h d-flex a-center j-center main-bg-color text-white" @click="getCode">
								<u-loading-icon v-if="load" size="18" color="#f1f1f1"></u-loading-icon>
								<view class="code-text ml-1">
									{{tips}}
								</view>
							</view>
						</u-input>
						<u-code @start="start" :startText="$t('获取验证码')" changeText="x S" :endText="$t('重新获取')"
							ref="uCode" @change="codeChange"></u-code>
					</view>
					<view class="bottom">
						<u-input clearable border="none" :customStyle="{height: '100rpx', caretColor: '#f27299'}" type="text"
							:placeholder="$t('请输入邀请码(选填)')" v-model="query.inviteCode">
						</u-input>
					</view>
					<view @click="submitRegister" class="mb-4 mt-5 btons d-flex a-center j-center text-white">
						{{$t('立即注册')}}
					</view>
					<m-agree-policy i18n @checkChange="checkChange" :check="check"></m-agree-policy>
				</view>
			</view>
		</m-scroll-y>
		<!-- 弹出层 -->
		<m-popup :show="show" @close="show = false" title="请选择国家代码" i18n>
			<view class="nation">
				
			</view>
		</m-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import MAgreePolicy from '@/main_modules/main-ui/m-agree-policy/index.vue'
	import MPopup from '@/main_modules/main-ui/m-popup/index.vue'
	export default {
		components: {
			MAgreePolicy,
			MPopup
		},
		data() {
			return {
				show: false,
				load: false,
				tips: '',
				query: {
					password: '',
					phone: '',
					inviteCode: '',
					nationCode: '86'
				},
				check: [],
				isRePassword: true,
				isPassword: true,
				reEyeStr: 'eye-off',
				eyeStr: 'eye-off'
			}
		},
		onLoad(options) {
			if(!this.$check.isEmptyObject(options)) {
				this.query.inviteCode = this.$tools.Navigate.receivePageData(options)
			}
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
			},
			// 密码显隐
			switchEye(i) {
				if(i == 1) {
					if (this.eyeStr == 'eye-off') {
						this.eyeStr = 'eye-fill'
						this.isPassword = false
					}else {
						this.eyeStr = 'eye-off'
						this.isPassword = true
					}
				}else {
					if (this.reEyeStr == 'eye-off') {
						this.reEyeStr = 'eye-fill'
						this.isRePassword = false
					}else {
						this.reEyeStr = 'eye-off'
						this.isRePassword = true
					}
				}
			},
			// 获取验证码
			getCode() {
				this.load = true
				if (this.$refs.uCode.canGetCode) {
					setTimeout(() => {
						this.$refs.uCode.start();
					}, 1000);
				}
			},
			// 验证码倒计时变化
			codeChange(text) {
				this.tips = text;
			},
			// 倒计时开始
			start() {
				this.load = false
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
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

			.bottom {
				background-color: #fff;
				border-radius: 50rpx;
				padding: 0 30rpx;
				margin-top: 20rpx;
				
				.code{
					height: 70rpx;
					width: 220rpx;
					border-radius: 50rpx;
					.code-text{
						font-size: 26rpx;
					}
				}
				.code:active{
					background-color: #f2729980;
				}
			}
			.bp{
				padding-right: 18rpx;
			}
		}

		.btons {
			font-size: 30rpx;
			border-radius: 50rpx;
			height: 88rpx;
			width: 630rpx;
			background: linear-gradient(to right, #85B6CA, #F9A4A0);
		}

		.btons:active {
			background: linear-gradient(to right, #85B6CA80, #F9A4A080);
		}
		
		.nation{
			height: 600rpx;
		}
	}
</style>