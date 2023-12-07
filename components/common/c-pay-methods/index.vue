<template>
	<m-popup :show="show" i18n @close="close" title="请选择支付方式">
		<view class="pay w-100 d-flex a-center flex-column">
			<view class="w-100" v-for="(item, i) in payMethodList" :key="i" @click="switchPayMethod(item)">
				<!-- #ifdef APP-PLUS -->
				<m-cell isShowR class="px-3" bbColor="#ddd" :color="item.check ? '#f27299' : '#111'" :isIcon="false"
					:item="item">
					<view slot="right-row" class="check-icon" :class="item.check ? 'check-active' : ''">
						<u-icon
							:name="`https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/${item.check ? 'tick-active' : 'tick'}.svg`"></u-icon>
					</view>
				</m-cell>
				<!-- #endif -->
				<!-- #ifndef APP-PLUS -->
				<m-cell v-if="item.code != 'Google-Purchase' && item.code != 'IOS-Purchase'" isShowR class="px-3" bbColor="#ddd" :color="item.check ? '#f27299' : '#111'" :isIcon="false"
					:item="item">
					<view slot="right-row" class="check-icon" :class="item.check ? 'check-active' : ''">
						<u-icon
							:name="`https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/${item.check ? 'tick-active' : 'tick'}.svg`"></u-icon>
					</view>
				</m-cell>
				<!-- #endif -->
			</view>
			<view @click="submitPay" class="mt-5 mb-2 btons d-flex a-center j-center text-white">
				{{$t('立即支付')}}
			</view>
		</view>
	</m-popup>
</template>

<script>
	import MPopup from '@/main_modules/main-ui/m-popup/index.vue'
	import MCell from '@/main_modules/main-ui/m-cell/index.vue'
	import methods from '@/pages-common/data/payMethods.json'
	// #ifdef APP-PLUS
	const googlePurchase = uni.requireNativePlugin("sn-googlepay5");
	// #endif
	export default {
		components: {
			MPopup,
			MCell
		},
		props: {
			show: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			vipInfo: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				payMethodList: [],
				query: {
					code: ''
				},
				googlePurchaseQuery: {
					orderId: ''
				},
				linkPayURL: ''
			}
		},
		created() {
			this.getPayMethodList()
		},
		methods: {
			// 获取支付方式列表
			getPayMethodList() {
				// let {
				// 	data,
				// 	code
				// } = await getPayMethodList()
				// if (code == 200) {
				// 	this.payMethodList = data.list
				// }
				this.payMethodList = methods.data.payMethodList
				this.payMethodList.forEach((item, i) => {
					this.payMethodList[i].check = false
				})
			},
			// 选中支付方式
			switchPayMethod(item) {
				this.query.code = item.check ? '' : item.code
				this.payMethodList.forEach((row, i) => {
					if (item.code == row.code) {
						row.check = !row.check
					} else {
						row.check = false
					}
				})
				this.payMethodList.reverse().reverse()
			},
			// 关闭
			close() {
				this.$emit('close')
			},
			// 立即支付
			async submitPay() {
				uni.showLoading()
				// 生成订单
				// let {
				// 	data,
				// 	code
				// } = await createOrder(this.query)
				let code = 200
				let data = {
					orderId: 100,
					linkPayURL: 'https://gaojianghua.cn/', // H5外链支付链接
				}
				if (code == 200) {
					this.googlePurchaseQuery.orderId = data.orderId
					this.linkPayURL = data.linkPayURL && data.linkPayURL
					// 支付方式
					switch (this.query.code) {
						// #ifdef APP-PLUS
							// 谷歌支付
						case 'Google-Pay':
							this.googlePay()
							break;
							// 谷歌内购
						case 'Google-Purchase':
							this.googlePurchase()
							break;
							// 苹果内购
						case 'IOS-Purchase':
							this.iosPurchase()
							break;
							// 微信支付
						case 'WeChat-Pay':
							this.wechatPay()
							break;
							// 支付宝支付
						case 'ALI-Pay':
							this.aliPay()
							break;
							// #endif
							// H5外链支付
						case 'Link-Pay':
							this.linkPay()
							break;
					}
				}
				uni.hideLoading()
			},
			// 谷歌支付
			googlePay() {
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
					plus.payment.request(provider, statement, (result) => {
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
					}, (e) => {
						uni.showToast({
							title: e.message || '付款失敗',
							icon: "none",
						});
						console.log("支付失败： " + JSON.stringify(e));
						return
					})
				});
			},
			// 谷歌内购
			googlePurchase() {
				googlePurchase.init({}, (e) => {
					if (e.code == 0) {
						// 初始化成功
					} else {
						// 初始化失败
					}
				});
				// adjust归因统计
				const adjust = uni.requireNativePlugin("sn-adjust");
				adjust.trackEvent({
					eventToken: "", // 必填, 其余都是可选
					callbackId: "gongyue-pay"
				});
				// 查询商品
				googlePurchase.querySku({
						inapp: [this.vipInfo.id]
					},
					(e) => {
						if (e.code == 0) { // 0 获取商品成功
							if (e.list.length > 0) {
								// 开始支付
								googlePurchase.pay({
										productId: this.vipInfo.id // 商品id
									},
									(e) => {
										if (e.code == 0) {
											// 支付成功
											let original = e.data[0].original
											// 消费商品
											googlePurchase.consume(
												{
													// 来自支付结果的original.purchaseToken (或 original.token)
													purchaseToken: original.purchaseToken
												},
												(e) => {
													if (e.code == 0) {
														// 消耗成功
														this.googlePurchaseQuery = {
															...this.googlePurchaseQuery,
															...original
														}
														// 商品支付校验（后端接口）
														this.openGooglePayVerify()
													} else {
														// 消耗失败
														uni.showToast({
															icon: 'none',
															title: this.$t('消耗商品失败')
														})
													}
												},
											);
										} else {
											// 支付失败
											const adjust = uni.requireNativePlugin("sn-adjust");
											adjust.trackEvent({
												eventToken: "", // 必填, 其余都是可选
												callbackId: "gongyue-pay-fail"
											});
											uni.showToast({
												title: this.$t('支付失败'),
												icon: "none",
											});
										}
									}
								);
							} else {
								uni.showToast({
									title: this.$t('查询商品失败'),
									icon: "none",
								});
							}
						} else {
							//查询失败
							uni.showToast({
								title: this.$t('查询商品失败'),
								icon: "none",
							});
						}
					}
				);
			},
			// 苹果内购
			iosPurchase() {

			},
			// 微信支付
			wechatPay() {

			},
			// 支付宝支付
			aliPay() {

			},
			// H5外链支付
			linkPay() {
				// #ifdef APP-PLUS
				plus.runtime.openURL(this.linkPayURL)
				// #endif
				// #ifndef APP-PLUS
				location.href = this.linkPayURL
				// #endif
				this.payCallback()
			},
			// 支付完成回调
			payCallback() {
				this.$emit('payCallback')
			},
			// 谷歌内购支付校验
			async openGooglePayVerify() {
				let {
					code,
					msg
				} = await googlePurchaseVerify(this.googlePurchaseQuery)
				if (code == 200) {
					const adjust = uni.requireNativePlugin("sn-adjust");
					adjust.trackEvent({
						eventToken: "", // 必填, 其余都是可选
						callbackId: "gongyue-pay-success"
					});
					this.payCallback()
				} else {
					uni.showToast({
						title: msg,
						icon: "none",
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pay {
		padding-bottom: env(safe-area-inset-bottom);

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

		.check-icon {
			padding: 6rpx;
			border: 4rpx solid #f27299;
			border-radius: 10rpx;
		}

		.check-active {
			border: 4rpx solid #f2729980;
			background-color: #f27299;
		}
	}
</style>