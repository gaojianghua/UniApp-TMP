<template>
	<view class="page">
		<m-scroll :isLoading="false" :scrollStyle="scrollStyle" :isCustomRefresh="false">
			<m-navbar :isSticky="false" :borderBottom="false" iconColor="#fff"
				:textStyle="{fontWeight: '500', fontSize: '32rpx'}" bgColor="tansparent" i18n value="page.会员中心">
			</m-navbar>
			<view class="bg-box" :style="{height: `calc(340rpx + ${$store.state.navbarHeight}px)`}">
				<view class="bg-card d-flex pl-3">
					<view class="rounded-circle border border-white" style="width: 126rpx; height: 126rpx;">
						<u-image width="124rpx" height="124rpx" radius="50"
							src="/static/img/common/avatar.png"></u-image>
					</view>
					<view class="ml-2 d-flex flex-column j-center" style="height: 124rpx;">
						<view class="vipinfo-t d-flex a-center">
							<u-image width="40rpx" height="40rpx" src="/static/img/mine/vip-icon.png"></u-image>
							<view class="text-white ml-1 line-h">
								{{$store.state.userinfo.nichen || $store.state.userinfo.name || $t('游客')}}</view>
						</view>
						<view v-if="$store.state.userinfo.vip=='1'" class="info-desc mt-1">
							{{$store.state.userinfo.viptime}}{{$t('到期')}}
						</view>
						<view v-else class="info-desc mt-1">
							{{$t('激活会员权限')}}
						</view>
					</view>
				</view>
			</view>
			<u-gap height="134rpx"></u-gap>
			<view class="up m-4">
				<view class="d-flex a-center j-center">
					<u-image width="52rpx" height="20rpx" src="/static/img/mine/left.png"></u-image>
					<view class="up-title mx-2">
						{{$t('会员权益')}}
					</view>
					<u-image width="52rpx" height="20rpx" src="/static/img/mine/right.png"></u-image>
				</view>
				<view class="up-list d-flex a-center j-sb mt-4">
					<view class="up-itemTwo d-flex flex-column a-center j-center" v-for="(item, i) in equitylist"
						:key="i">
						<u-image radius="50" width="80rpx" height="80rpx" :src="item.icon"></u-image>
						<view class="item-name text-white mt-1">
							{{$t(item.name)}}
						</view>
					</view>
				</view>
			</view>
			<view class="up m-6">
				<view class="d-flex a-center j-center">
					<u-image width="52rpx" height="20rpx" src="/static/img/mine/left.png"></u-image>
					<view class="up-title mx-2">
						{{$t('会员充值')}}
					</view>
					<u-image width="52rpx" height="20rpx" src="/static/img/mine/right.png"></u-image>
				</view>
				<view class="up-change ml-3 d-flex a-center mt-4">
					<scroll-view class="scroll-row" scroll-x>
						<view class="up-data scroll-row-item mr-2" v-for="(item, i) in vipList" :key="i"
							@click="selectVip(item, i)" :class="i == vipIndex ? 'up-active': ''">
							<view class="up-i">
								<view class="item-name" :class="vipIndex == i ? 'item-active': ''">
									{{item.name}}
								</view>
								<view class="item-desc mt-1" :class="vipIndex == i ? 'item-action': ''">
									{{$t('享受会员')}}
								</view>
								<view class="item-price d-flex a-center flex-column j-center mt-5">
									<span class="price line-h" :class="vipIndex == i ? 'price-active': ''">{{item.rmb}}</span>
									<span class="syml mt-1" :class="vipIndex == i ? 'syml-active': ''">{{$store.state.sybml}}</span>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</m-scroll>
		<view class="bottombox position-fixed bottom-0 left-0 p-3 w-100">
			<view class="bottombox-ri d-flex a-center flex-column j-center" @click="openVIP">
				<view class="bottombox-name line-h">
					{{$t('开通会员')}}
				</view>
				<view v-if="vipList[vipIndex]" class="bottombox-price line-h mt-1">
					{{vipList[vipIndex].name}} {{$store.state.sybml}} {{vipList[vipIndex].rmb}}
				</view>
			</view>
		</view>
		<m-modal :show="show" i18n title="温馨提示" @cancel="show = false" btnName="去完善" @confirm="$tools.Navigate.navigateTo('/pages/tabbar/mine/uinfo/uinfo')">
			<view class="d-flex a-center text-center j-center">
				{{$t('为了保障您的账户安全，请尽快完善您的个人信息 (绑定手机号/邮箱)。')}}
			</view>
		</m-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import MNavbar from '@/main_modules/main-ui/m-navbar/index.vue'
	import MScroll from '@/main_modules/main-ui/m-scroll/index.vue'
	import MModal from '@/main_modules/main-ui/m-modal/index.vue'
	import {
		requestData
	} from '@/utils/index.js'
	import {
		getOpenVIP,
		getVIPData,
		getUserInfo,
		createOrder
	} from '@/utils/request/api/get.js'
	import {
		equitylist,
	} from './data.js'
	// #ifdef APP-PLUS
	var googlePay = uni.requireNativePlugin("sn-googlepay5");
	// #endif
	export default {
		components: {
			MNavbar,
			MScroll,
			MModal
		},
		data() {
			return {
				vipList:[],
				equitylist,
				vipIndex: 0,
				query: {
					day: '',
					rmb: '',
					pay: '',
					type: 'vip'
				},
				req: false,
				verifyQuery: {
					dd: ''
				},
				show: false
			}
		},
		onLoad() {
			this.init()
		},
		onShow() {
			this.getUserinfo()
		},
		methods: {
			init() {
				this.vipData()
				// #ifdef APP-PLUS
				googlePay.init({}, (e) => {
					console.log('init', e);
					if (e.code == 0) {
						// 初始化成功
					} else {
						// 初始化失败
					}
				});
				// #endif
			},
			async vipData() {
				let result = requestData({})
				let {
					viplist
				} = await getVIPData(result)
				this.query.day = viplist[this.vipIndex].day
				this.query.rmb = viplist[this.vipIndex].rmb
				this.vipList = viplist
			},
			async getUserinfo(e) {
				let result = requestData({})
				let {
					user,
					code
				} = await getUserInfo(result)
				if(code == 1) {
					this.$store.commit('updateUserinfo', user)
					uni.setStorageSync('userinfo', user)
					if(e) {
						if (!user.email || !user.mobile) {
							this.show = true
						}
					}
				}
			},
			// 开通VIP
			async openVIP() {
				if (this.req) return
				this.req = true
				this.$refs.uToast.show({
					type: 'loading',
					message: "loading",
					duration: 15000
				})
				let result = requestData(this.query)
				let {
					code,
					payurl
				} = await getOpenVIP(result)
				let str = 'purchase' // google，h5，purchase
				switch (str) {
					// H5网页支付
					case 'h5':
						this.h5Pay(payurl)
						break;
						// google支付
					case 'google':
						this.googlePay()
						break;
						// google内购
						// #ifdef APP-PLUS
					case 'purchase':
						this.generateOrder()
						break;
						// #endif
				}
				this.getUserinfo()
				this.$refs.uToast.hide()
				this.req = false
			},
			// 生成订单
			async generateOrder() {
				let result = requestData(this.query)
				let {
					dd
				} = await createOrder(result)
				this.verifyQuery.dd = dd
				this.googlePurchase()
			},
			// 谷歌内购
			googlePurchase() {
				// #ifdef APP-PLUS
				const adjust = uni.requireNativePlugin("sn-adjust");
				adjust.trackEvent({
					eventToken: "rkzgpc", // 必填, 其余都是可选
					callbackId: "flash-pay"
				});
				// #endif
				let pId = this.viplist[this.vipIndex].productId;
				googlePay.querySku({
						inapp: [pId]
					},
					(e) => {
						if (e.code == 0) {
							console.log('querySku', e.list);
							if (e.list.length > 0) {
								var pd = e.list[0];
								googlePay.pay({
										productId: pId // 产品id
									},
									(e) => {
										if (e.code == 0) {
											// 支付成功
											console.log('pay result', e);
											let original = e.data[0].original
											googlePay.consume({
													purchaseToken: original
														.purchaseToken, // 来自支付结果的original.purchaseToken (或 original.token)
												},
												(e) => {
													if (e.code == 0) {
														// 确认成功
														this.verifyQuery = {
															...this.verifyQuery,
															...original
														}
														this.openGooglePayVerify()
													} else {
														// 确认失败
													}
												},
											);
										} else {
											// 支付失败
											// #ifdef APP-PLUS
											const adjust = uni.requireNativePlugin("sn-adjust");
											adjust.trackEvent({
												eventToken: "1dlblo", // 必填, 其余都是可选
												callbackId: "flash-pay-fail"
											});
											// #endif
										}
									}
								);
							} else {
								console.log('未查询到产品');
							}
						} else {
							//查询失败
							console.log('querySku fail', e);
						}
					}
				);
			},
			// 谷歌内购支付验证
			async openGooglePayVerify() {
				let result = requestData(this.verifyQuery)
				let {code, msg} = await googlePayVerify(result)
				if (code == 1) {
					this.getUserinfo(true)
				}else{
					uni.showToast({
						title: msg,
						icon: "none",
					});
				}
				// #ifdef APP-PLUS
				const adjust = uni.requireNativePlugin("sn-adjust");
				adjust.trackEvent({
					eventToken: "pmrruo", // 必填, 其余都是可选
					callbackId: "flash-pay-success"
				});
				// #endif
			},
			// h5网页支付
			h5Pay(payurl) {
				// #ifdef APP-PLUS
				plus.runtime.openURL(payurl)
				// #endif
				// #ifdef H5
				location.href = payurl
				// #endif
			},
			// 谷歌支付
			googlePay() {
				// #ifdef APP-PLUS
				let orderId = 'SN2354656764'
				let price = '0.01'
				plus.payment.getChannels((providers) => {
					let provider = providers.find(function(e) {
						console.log('支持的支付方式：' + JSON.stringify(e))
						return e.id === "google-pay";
					});
					if (!provider) {
						uni.showToast({
							title: 'Google Play服务不可用',
							icon: "none",
						});
						return
					}
					let paymentMethodType = "PAYPAL"; // CARD, PAYPAL
					let cardPaymentMethodConfig = {
						environment: 3, // 必填 1 是product  3是test
						paymentMethodType: paymentMethodType, //必填 CARD、PAYPAL
						// existingPaymentMethodRequired: false, //可选 如果设置为true同时已经准备好了支付allowedPaymentMethods中的付款方式，isReadyToPay就会返回true。

						currencyCode: "USD", //必填
						countryCode: "US", //在欧洲经济区必填
						transactionId: orderId, //当你想要接收googlepay回调的时候必填 （订单ID）
						totalPriceStatus: "FINAL", //必填  NOT_CURRENTLY_KNOWN、ESTIMATED、FINAL
						totalPrice: price, //必填 满足正则格式^[0-9]+(\.[0-9][0-9])?$
						// totalPriceLabel: "100heelo", //可选
						// checkoutOption: "DEFAULT", //可选 DEFAULT、COMPLETE_IMMEDIATE_PURCHASE

						// merchantName: "", //可选
						// emailRequired: true, //可选
						// shippingAddressRequired: true, //可选
						// shippingPhoneNumberRequired: false, //可选
						// allowedCountryCodes: ["US", "GB"], //可选
						allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"], //必填
						allowedCardNetworks: ["AMEX", "DISCOVER", "JCB", "MASTERCARD",
							"VISA"
						], //必填
						// allowPrepaidCards: false, //可选
						// allowCreditCards:false,//可选  
						assuranceDetailsRequired: true, //可选
						// billingAddressRequired: true, //可选
						// billingAddressParametersFormat: "FULL", //可选 MIN
						// phoneNumberRequired: false, //可选
						tokenizationSpecificationType: "PAYMENT_GATEWAY", //必填 PAYMENT_GATEWAY、DIRECT
						gateway: "example", //PAYMENT_GATEWAY时必填
						gatewayMerchantId: "exampleGatewayMerchantId", //PAYMENT_GATEWAY时必填
						// protocolVersion: "", //DIRECT时必填
						// publicKey: "", //DIRECT时必填
						// buildTokenizationSpecification:{//可选，此字段是为了方便开发者自定义构造tokenizationSpecification参数,设置此字段时，会覆盖掉`tokenizationSpecificationType`、`gateway`、`gatewayMerchantId`、`protocolVersion`、`publicKey`字段。(HBuilderX 3.5.1+支持)
						// 	"type":"PAYMENT_GATEWAY",
						// 	"parameters":{
						// 		"gateway":"custom-gateway",
						// 		"gatewayMerchantId":"mock-gatewayMerchantId"
						// 	}
						// }
					};


					let paypalPaymentMethodConfig = {
						environment: 3, // 必填 1 是product  3是test
						paymentMethodType: paymentMethodType, //必填 CARD、PAYPAL
						existingPaymentMethodRequired: false, //可选 如果设置为true同时已经准备好了支付allowedPaymentMethods中的付款方式，isReadyToPay就会返回true。

						currencyCode: "USD", //必填
						countryCode: "US", //在欧洲经济区必填
						transactionId: orderId, //当你想要接收googlepay回调的时候必填
						totalPriceStatus: "FINAL", //必填  NOT_CURRENTLY_KNOWN、ESTIMATED、FINAL
						totalPrice: price, //必填 满足正则格式^[0-9]+(\.[0-9][0-9])?$
						// totalPriceLabel: "100heelo", //可选
						// checkoutOption: "DEFAULT", //可选 DEFAULT、COMPLETE_IMMEDIATE_PURCHASE

						merchantName: "Example Merchant", //可选
						emailRequired: true, //可选
						shippingAddressRequired: true, //可选
						shippingPhoneNumberRequired: false, //可选
						allowedCountryCodes: ["US", "GB"], //可选
						merchantId: "MVHSBANAS6KSE", //必填
					};

					let statement;

					if (paymentMethodType === "CARD") {
						statement = {
							...cardPaymentMethodConfig
						};
					} else {
						statement = {
							...paypalPaymentMethodConfig
						};
					}

					// console.log('statement', JSON.stringify(statement));
					// console.log('provider', provider);
					// uni.showLoading({title: '支付中'})
					plus.payment.request(provider, statement, (result) => {
						// this.$emit('paySuccess')
						console.log("支付成功 :" + JSON.stringify(result));
						let token = JSON.parse(result.rawdata)
						console.log(JSON.parse(result.rawdata))
						// console.log('token', token.paymentMethodData.tokenizationData.token)
						// uni.showLoading({
						// 	title: '支付中'
						// })
						// googlepayNotify({
						// 	order_no: this.order_no,
						// 	token: token.paymentMethodData.tokenizationData.token
						// }).then((res) => {
						// 	uni.hideLoading()
						// 	// console.log('res' + JSON.stringify(res))
						// 	// if (res.code !== 200) {
						// 	// 	uni.showToast({
						// 	// 		title: res.message || '付款失敗',
						// 	// 		icon: "none",
						// 	// 	});
						// 	// 	return false
						// 	// }
						// 	console.log('支付成功！！！')
						// 	this.$emit('paySuccess')
						// 	this.openPages()
						// })
						// uni.hideToast()
						// console.log("支付成功 :" + JSON.stringify(result));
					}, (e) => {
						uni.showToast({
							title: e.message || '付款失敗',
							icon: "none",
						});
						console.log("支付失败： " + JSON.stringify(e));
						return
					})
				});
				// #endif
				// #ifdef H5
				uni.showToast({
					title: 'H5不支持該支付方式，請先下載APP',
					icon: "none",
				});
				// #endif
			},
			selectVip(item, i) {
				this.query.day = item.day
				this.query.rmb = item.rmb
				this.vipIndex = i
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background: linear-gradient(180deg, #0E0908 0%, #1A1818 100%);

		.bg-box {
			background: url('/static/img/mine/vip-bg.png') no-repeat;
			background-size: cover;
			border-radius: 0 0 40rpx 40rpx;
			position: relative;

			.bg-card {
				background: url('/static/img/mine/vip-card.png') no-repeat;
				background-size: cover;
				width: calc(100% - 60rpx);
				position: absolute;
				height: 341rpx;
				bottom: -134rpx;
				left: 30rpx;
				padding-top: 48rpx;

				.vipinfo-t {
					font-size: 40rpx;
					font-family: Arial, Arial;
					font-weight: bold;
					line-height: 40rpx;
					background: linear-gradient(146deg, #4E281A 0%, #A05D49 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;

					.vipinfo-level {
						background: linear-gradient(90deg, #FDEDCC 0%, #FCCC8C 52%, #F2A82B 100%);
						height: 40rpx;
						width: 92rpx;
						border-radius: 8rpx;
						font-size: 20rpx;
						color: #74300B;
						border: 4rpx solid #FFCA95;
					}
				}

				.info-desc {
					font-size: 24rpx;
					font-weight: 400;
					background: #3E1D04;
					line-height: 48rpx;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}
		}

		.up {
			.up-title {
				font-size: 30rpx;
				font-weight: 500;
				background: #F2E6D8;
				line-height: 36rpx;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}

			.up-list {
				.up-item {
					width: 184rpx;
					height: 230rpx;
					border-radius: 12rpx;
					border: 1rpx solid #E7E7E7;
				}

				.up-itemTwo {
					width: 25%;

					.item-name {
						font-size: 26rpx;
						color: #999;
					}
				}
			}

			.up-change {
				padding: 0 32rpx;
				width: 690rpx;
				height: 492rpx;
				background: linear-gradient(180deg, #34302F 0%, rgba(53, 49, 48, 0.21) 100%);
				box-shadow: 0 -2rpx 4rpx 0 #8C867F;
				border-radius: 40rpx;

				.up-data {
					margin-right: 24rpx;
					padding: 48rpx 32rpx;
					width: 268rpx;
					height: 336rpx;
					background: linear-gradient(180deg, rgba(89, 70, 41, 0.8) 0%, rgba(88, 68, 41, 0) 35%, rgba(88, 68, 41, 0) 64%, rgba(88, 68, 41, 0.8) 100%);
					border-radius: 12rpx;
					border: 2rpx solid #FFE0C2;

					.up-i {
						.item-name{
							font-weight: bold;
							background: #E5CC91;
							line-height: 32rpx;
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
						}
						.item-active{
							background: #5D3717;
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
						}
						.item-desc{
							font-size: 24rpx;
							font-weight: 400;
							background: #E5CC91;
							line-height: 24rpx;
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
						}
						.item-action{
							background: #5D3717;
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
						}
						.item-price{
							.price{
								font-weight: bold;
								background: #FFE0C2;
								line-height: 66rpx;
								-webkit-background-clip: text;
								-webkit-text-fill-color: transparent;
								font-size: 56rpx;
								font-family: Arial, Arial;
								
							}
							.price-active{
								background: #290D00;
								-webkit-background-clip: text;
								-webkit-text-fill-color: transparent;
							}
							.syml{
								font-size: 24rpx;
								font-weight: 400;
								background: #E5CC91;
								line-height: 24rpx;
								-webkit-background-clip: text;
								-webkit-text-fill-color: transparent;
							}
							.syml-active{
								background: #5D3717;
								-webkit-background-clip: text;
								-webkit-text-fill-color: transparent;
							}
						}
					}
				}
				.up-data:last-child{
					margin-right: 0 !important;
				}

				.up-active {
					background: linear-gradient(180deg, #FFE3C2 0%, #FFD7C0 100%);
				}
			}
		}

		.bottombox {
			.bottombox-ri {
				height: 100rpx;
				background: linear-gradient(180deg, #F8ECCA 0%, #EFBF89 37%, #EFBF89 65%, #F8ECCA 100%);
				border-radius: 12rpx;

				.bottombox-name {
					font-size: 30rpx;
					font-family: Arial, Arial;
					font-weight: bold;
					background: #744201;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}

				.bottombox-price {
					font-size: 24rpx;
					font-family: Arial, Arial;
					font-weight: 400;
					background: #744201;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}
		}
	}
</style>