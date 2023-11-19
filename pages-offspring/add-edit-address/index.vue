<template>
	<view class="page" @click="pageClick">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" :value="value" i18n>
			<template v-if="isEdit" :slot="'right'">
				<view class="manage position-absolute bg-warning text-white" @click="show = true">
					{{$t('删除')}}
				</view>
			</template>
		</m-navbar>
		<!-- 内容区域 -->
		<view class="content mt-1 bg-white">
			<view class="d-flex a-center j-sb border-top py-2 px-3">
				<span>{{$t('收货人')}}</span>
				<view class="bottom flex-shrink">
					<u-input :customStyle="{height: '100rpx', caretColor: '#f27299'}" type="text" border="none"
						:placeholder="$t('名字')" v-model="item.name">
					</u-input>
				</view>
			</view>
			<view class="d-flex a-center j-sb py-2 border-top px-3">
				<span>{{$t('手机号码')}}</span>
				<view class="bottom flex-shrink">
					<u-input :customStyle="{height: '100rpx', caretColor: '#f27299'}" type="text" border="none"
						:placeholder="$t('手机号码')" v-model="item.phone">
					</u-input>
				</view>
			</view>
			<view class="d-flex a-center j-sb py-2 border-top px-3">
				<span>{{$t('所在地区')}}</span>
				<view class="bottom flex-shrink position-relative" @click.stop="cityShow = true">
					<u-input :readonly="cityShow" :customStyle="{height: '100rpx', caretColor: '#f27299', overflow: 'auto'}" type="text"
						border="none" :placeholder="$t('省、市、区、街道')" :value="city | showHeadTail('市', 14, '...')">
						<view slot="suffix" class="py-2" @click.stop="openLocation">
							<u-icon name="map-fill" size="22" color="#f27299"></u-icon>
						</view>
					</u-input>
					<view @click.stop :class="locaShow == 1 ? 'active' : locaShow == 0 ? 'default' : ''"
						class="poi px-3 hidden position-absolute left-0 w-100 index-5 bg-white">
						<u-gap height="20rpx" bgColor="#fff"></u-gap>
						<m-scroll-y :isLoading="false" :isCustomRefresh="false" :scrollStyle="{height: '460rpx'}">
							<view class="poi-notice">
								{{$t('根据定位获取附近地址')}}
							</view>
							<view class="mt-2" v-for="(item, i) in locationCitys" :key="i" @click.stop="openLocationItem(item)">
								<view class="poi-title main-text-color">
									{{item.title}}
								</view>
								<view class="poi-address">
									{{item.province}}{{item.city}}{{item.area}}{{item.street}}{{item.address}}
								</view>
							</view>
						</m-scroll-y>
						<u-gap height="20rpx" bgColor="#fff"></u-gap>
					</view>
				</view>
			</view>
			<view class="d-flex a-center j-sb py-2 border-top px-3">
				<span>{{$t('详细地址')}}</span>
				<view class="bottom flex-shrink d-flex a-center py-2">
					<u-textarea :customStyle="{caretColor: '#f27299', padding: '0', backgroundColor: '#f1f1f1'}"
						border="none" v-model="item.address" :placeholder="$t('小区楼栋/乡村名称')">
					</u-textarea>
					<view class="pl-2 py-2" @click="micShow = true">
						<u-icon name="mic" size="22" :color="micShow ? '#888' : '#f27299'"></u-icon>
					</view>
				</view>
			</view>
			<view class="d-flex a-center j-sb py-2 border-top px-3">
				<span>{{$t('设为默认地址')}}</span>
				<u-checkbox-group v-model="item.check" @change="checkboxChange">
					<u-checkbox :checked="item.isDefault" label-size="12" size="18" iconSize="14" active-color="#fb7290"
						shape="circle"></u-checkbox>
				</u-checkbox-group>
			</view>
		</view>
		<!-- 保存收货地址按钮 -->
		<view class="position-fixed bottom-0 left-0 p-3 bg-white w-100">
			<view @click="saveShow = true" class="btons d-flex a-center j-center text-white letter-2">
				{{$t('保存')}}
			</view>
		</view>
		<!-- 弹框 -->
		<m-modal :show="show" i18n title="确认移除" @cancel="show = false" @confirm="confirmRemoveCity">
			<view class="d-flex a-center j-center">
				{{$t('确定移除此地址吗？')}}
			</view>
		</m-modal>
		<m-modal :show="saveShow" i18n title="确认保存" @cancel="saveShow = false" @confirm="submitSave">
			<view class="d-flex a-center j-center">
				{{isEdit ? $t('确定修改此地址吗？') : $t('确定添加此地址吗？')}}
			</view>
		</m-modal>
		<!-- 弹出层 -->
		<m-popup :show="cityShow" i18n @close="cityShow = false" title="请选择所在地区" i18n>
			<view class="city">

			</view>
		</m-popup>
		<c-app-speech-recognition @speechEnd="speechEnd" :show="micShow"
			@close="micShow = false"></c-app-speech-recognition>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import MPopup from '@/main_modules/main-ui/m-popup/index.vue'
	import CAppSpeechRecognition from '@/components/common/c-app-speech-recognition/index.vue'
	export default {
		components: {
			MPopup,
			CAppSpeechRecognition
		},
		data() {
			return {
				value: '',
				item: {
					name: '',
					phone: '',
					address: '',
					isDefault: false,
					check: [],
					province: '',
					city: '',
					area: '',
					street: ''
				},
				show: false,
				locaShow: 2,
				saveShow: false,
				isEdit: false,
				city: '',
				cityShow: false,
				micShow: false,
				locationCitys: []
			}
		},
		onLoad(options) {
			this.item = this.$tools.Navigate.receivePageData(options)
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.initAddOrEdit()
				this.getLocationList()
			},
			// 区分添加或者编辑
			initAddOrEdit() {
				if (this.$check.isEmptyObject(this.item)) {
					this.value = 'page.添加收货地址'
					this.isEdit = false
					this.city = ''
				} else {
					this.value = 'page.编辑收货地址'
					this.isEdit = true
					this.city = this.item.province + ' ' + this.item.city + ' ' + this.item.area + (this.item.street ? ' ' +
						this.item.street : '')
				}
			},
			// 确认移除地址
			confirmRemoveCity() {
				let list = this.$store.state.shippingAddress
				list.forEach((item, i) => {
					if (this.item.id == item.id) {
						list.splice(i, 1)
					}
				})
				this.$store.commit('updateShippingAddress', list)
				this.show = false
				this.$tools.Navigate.navigateBack()
			},
			// 提交保存
			submitSave() {
				let list = this.$store.state.shippingAddress
				if (this.isEdit) {
					list.forEach((item, i) => {
						if (this.item.id == item.id) {
							list.splice(i, 1)
							list.splice(i - 1, 1, this.item)
						}
					})
				} else {
					list.push(this.item)
				}
				this.$store.commit('updateShippingAddress', list)
				this.saveShow = false
				this.$tools.Navigate.navigateBack()
			},
			// 定位获取地址
			getLocationList() {
				// 获取定位
				uni.getLocation({
					isHighAccuracy: true,
					geocode: true,
					success: (e) => {
						console.log(e)
						let arr = []
						for (let i = 0; i < 10; i++) {
							arr.push({
								id: i,
								title: '藏龙星天地',
								province: '湖北省',
								city: '武汉市',
								area: '江夏区',
								street: '江夏区经济开发区藏龙岛街道',
								address: '藏龙东街'
							})
						}
						this.locationCitys = arr
					}
				})
			},
			// 点击某项附近地址
			openLocationItem(i) {
				Object.keys(this.item).forEach((item) => {
					if (i[item]) {
						item == 'address' ? this.item[item] = (i.address + i.title) : this.item[item] = i[item]
					}
				})
				this.city = this.item.province + ' ' + this.item.city + ' ' + this.item.area + (this.item.street ? ' ' +
					this.item.street : '')
				this.locaShow = 0
			},
			// 点击页面其他区域
			pageClick() {
				this.locaShow == 1 ? this.locaShow = 0 : ''
			},
			// 打开附近地址
			openLocation() {
				this.locaShow != 1 ? this.locaShow = 1 : this.locaShow = 0
			},
			// 关闭语音识别
			speechEnd(i) {
				this.item.address = i
			},
			// 设为默认地址
			checkboxChange(e) {
				this.item.isDefault = !this.item.isDefault
				this.item.check = e
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.manage {
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);
			padding: 0 20rpx;
			border-radius: 8rpx;
		}

		.content {
			.bottom {
				width: 75%;
				background-color: #f1f1f1;
				border-radius: 50rpx;
				padding: 0 30rpx;

				.poi {
					display: none;
					border-radius: 16rpx;
					.poi-notice{
						font-size: 26rpx;
						color: #999;
						line-height: 32rpx;
					}
					.poi-title{
						font-size: 28rpx;
						line-height: 34rpx;
					}
					.poi-address{
						font-size: 24rpx;
						line-height: 32rpx;
						color: #999;
					}
				}

				.active {
					display: block;
					animation: active 0.3s linear forwards;

					@keyframes active {
						0% {
							height: 0;
							bottom: 0;

						}

						100% {
							height: 500rpx;
							bottom: -500rpx;
							box-shadow: 0 0 4rpx 4rpx #f1f1f1;
						}
					}
				}

				.default {
					display: block;
					animation: default 0.3s linear forwards;

					@keyframes default {
						0% {
							height: 500rpx;
							bottom: -500rpx;
						}

						100% {
							height: 0;
							bottom: 0;
							box-shadow: none;
							display: none;
						}
					}
				}
			}
		}

		.btons {
			font-size: 30rpx;
			border-radius: 50rpx;
			height: 88rpx;
			width: 690rpx;
			margin: 0 auto;
			background: linear-gradient(to right, #85B6CA, #F9A4A0);
		}

		.btons:active {
			background: linear-gradient(to right, #85B6CA80, #F9A4A080);
		}

		.city {
			height: 600rpx;
		}

		.mic {
			height: 600rpx;
		}
	}
</style>