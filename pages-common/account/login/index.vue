<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="transparent" textColor="#fff" i18n value="page.欢迎登录"></m-navbar>
		<!-- 内容区域 -->
		<m-scroll-y :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
			<view class="d-flex a-center j-center flex-column pt-10 h-100">
				<u-image width="120rpx" height="120rpx"
					src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/GongYueLogo.png"></u-image>
				<view class="desc line-h letter-2 mt-3 font-weight text-white">
					{{$t('宫悦商城欢迎您')}}
				</view>
				<view class="content-form mt-10 p-3">
					<view v-if="isLoginType != 1" class="bottom">
						<u-input clearable :customStyle="{height: '100rpx', caretColor: '#f27299'}" type="text" border="none"
							:placeholder="$t('请输入手机号')" v-model="query.phone">
							<view slot="prefix" class="area d-flex a-center mr-3" @click="show = true">
								<span class="mr-1">+{{query.countryCode}}</span>
								<u-icon name="arrow-down-fill" color="#f27299" size="14"></u-icon>
							</view>
						</u-input>
					</view>
					<view v-if="isLoginType == 2" class="bottom bp">
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
					<view v-if="isLoginType == 3" class="bottom">
						<u-input clearable :password="isPassword" border="none" :customStyle="{height: '100rpx', caretColor: '#f27299'}"
							:placeholder="$t('请输入密码')" v-model="query.password">
							<u-icon slot="suffix" :name="eyeStr" size="20" color="#999" @click="switchEye"></u-icon>
						</u-input>
					</view>
					<view v-if="isLoginType != 1" class="notice my-4 text-center" @click="$tools.Navigate.navigateTo('/pages/account/register/index')">
						{{$t('还没有账号？立即注册 ->')}}
					</view>
					<view @click="submitLogin" class="mb-4 btons d-flex a-center j-center text-white">
						{{isLoginType == 1 ? $t('同意协议并一键登录') : $t('立即登录')}}
					</view>
					<m-agree-policy i18n @checkChange="checkChange" :check="check"></m-agree-policy>
					<view class="d-flex a-center j-sb mt-3">
						<view class="notice" 
						v-for="(item, i) in loginType" 
						:key="i" 
						:class="isLoginType == (i+1) ? 'active' : ''"
						@click="isLoginType = item.id">
							{{$t(item.name)}}
						</view>
					</view>
				</view>
				<view class="more pb-5 d-flex a-center j-around mt-auto pt-10 w-100">
					<view class="d-flex a-center j-center flex-column" v-for="(item, i) in moreLogins" :key="i"
					@click="openMoreLogin(item, i)">
						<u-image :src="item.image" width="80rpx" height="80rpx" mode=""></u-image>
						<view class="more-name line-h mt-1">
							{{$t(item.name)}}
						</view>
					</view>
				</view>
			</view>
		</m-scroll-y>
		<!-- 弹出层 -->
		<c-country-code @switchArea="switchArea" :show="show" @close="show = false" :active="query.countryCode"/>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import MAgreePolicy from '@/main_modules/main-ui/m-agree-policy/index.vue'
	import CCountryCode from '@/components/common/c-country-code/index.vue'
	import { moreLogins, loginType } from './data.js'
	export default {
		components: {
			MAgreePolicy,
			CCountryCode
		},
		data() {
			return {
				show: false,
				load: false,
				tips: '',
				query: {
					password: '',
					phone: '',
					code: '',
					countryCode: '86',
					inviteCode: ''
				},
				loginType,
				check: [],
				moreLogins,
				isLoginType: 1,
				eyeStr: 'eye-off', // eye-fill
				isPassword: true,
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
			// 选中国际区号
			switchArea(i) {
				this.query.countryCode = i.countryCode
				this.show = false
			},
			// 登录
			submitLogin() {
				if (this.isLoginType != 1) {
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
					if(this.isLoginType == 2 && !this.query.code) {
						return this.$refs.uToast.show({
							message: this.$t('请输入密码'),
							type: 'warning',
							duration: 1500
						})
					}
					if(this.isLoginType == 3 && !this.query.password) {
						return this.$refs.uToast.show({
							message: this.$t('请输入密码'),
							type: 'warning',
							duration: 1500
						})
					}
				}else {
					this.check = ['check']
				}
				let data = {
					userinfo: {
						name: '高江华',
						id: '86579236',
						points: 20808,
						phone: '15257184434',
						email: '',
						avatar: 'https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/home/wolffy.png',
						inviteCode: '86E7B8',
						isVIP: true,
						VIPExpirationTime: '2025-12-12'
					},
					token: 'sa1sd123asd456qdw456'
				}
				uni.setStorageSync('userinfo', data.userinfo)
				uni.setStorageSync('token', data.token)
				this.$store.commit('updateUserinfo', data.userinfo)
				this.$store.commit('updateToken', data.token)
				this.$refs.uToast.show({
					message: this.$t('登录成功'),
					type: 'success',
					duration: 1200,
					complete: () => this.$tools.Navigate.navigateBack()
				})
			},
			// 其他登录
			openMoreLogin(item, i) {
				// #ifdef APP-PLUS
				plus.runtime.openURL(item.schema)
				// #endif
				// #ifdef H5
				location.href = item.schema
				// #endif
				if(i == 0) {
					
				}else if (i == 1) {
					
				}else {
					
				}
			},
			// 密码显隐
			switchEye() {
				if (this.eyeStr == 'eye-off') {
					this.eyeStr = 'eye-fill'
					this.isPassword = false
				}else {
					this.eyeStr = 'eye-off'
					this.isPassword = true
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
		background: url('https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/login-bg.jpg') no-repeat;
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
			
			.notice{
				font-size: 24rpx;
				color: #666;
				text-decoration: underline;
			}
			.active{
				color: #f27299;
			}

			.bottom {
				background-color: #fff;
				border-radius: 50rpx;
				padding: 0 30rpx;
				margin-top: 20rpx;
				
				.code {
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
		
		.more{
			width: 690rpx;
			.more-name{
				font-size: 24rpx;
				color: #666;
			}
		}
		
		.nation{
			height: 600rpx;
		}
	}
</style>