<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="transparent" textColor="#fff" i18n value="page.欢迎登录"></m-navbar>
		<!-- 内容区域 -->
		<m-scroll :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
			<view class="d-flex a-center j-center flex-column pt-10">
				<u-image width="120rpx" height="120rpx"
					src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/GongYueLogo.png"></u-image>
				<view class="desc line-h letter-2 mt-3 font-weight text-white">
					{{$t('宫悦商城欢迎您')}}
				</view>
				<view class="content-form mt-10 p-3">
					<view v-if="isLoginType != 1" class="bottom">
						<u-input clearable :customStyle="{height: '100rpx', caretColor: '#f27299'}" type="text" border="none"
							:placeholder="$t('请输入手机号')" v-model="query.phone">
						</u-input>
					</view>
					<view v-if="isLoginType == 2" class="bottom">
						<u-input clearable border="none" :customStyle="{height: '100rpx', caretColor: '#f27299'}" type="number"
							:placeholder="$t('请输入验证码')" v-model="query.code">
						</u-input>
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
				<view class="more d-flex a-center j-around mt-5 w-100">
					<view class="d-flex a-center j-center flex-column" v-for="(item, i) in moreLogins" :key="i"
					@click="openMoreLogin(i)">
						<u-image :src="item.image" width="80rpx" height="80rpx" mode=""></u-image>
						<view class="more-name line-h mt-1">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
		</m-scroll>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import MScroll from '@/main_modules/main-ui/m-scroll/index.vue'
	import MAgreePolicy from '@/main_modules/main-ui/m-agree-policy/index.vue'
	import { moreLogins, loginType } from './data.js'
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
					code: ''
				},
				loginType,
				check: [],
				moreLogins,
				isLoginType: 1,
				eyeStr: 'eye-off', // eye-fill
				isPassword: true,
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.moreLogins.forEach((item) => {
					item.name = this.$t(item.name)
				})
			},
			// 同意协议
			checkChange(e) {
				this.check = e
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
						id: '86579236'
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
			openMoreLogin(i) {
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
		
		.more{
			position: fixed;
			bottom: 50rpx;
			left: 30rpx;
			width: 690rpx;
			.more-name{
				font-size: 24rpx;
				color: #666;
			}
		}
	}
</style>