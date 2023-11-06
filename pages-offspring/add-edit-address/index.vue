<template>
	<view class="page">
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
				<view class="bottom">
					<u-input :customStyle="{height: '100rpx', caretColor: '#f27299'}" type="text" border="none"
						:placeholder="$t('名字')" v-model="item.name">
					</u-input>
				</view>
			</view>
			<view class="d-flex a-center j-sb py-2 border-top px-3">
				<span>{{$t('手机号码')}}</span>
				<view class="bottom">
					<u-input :customStyle="{height: '100rpx', caretColor: '#f27299'}" type="text" border="none"
						:placeholder="$t('手机号码')" v-model="item.phone">
					</u-input>
				</view>
			</view>
			<view class="d-flex a-center j-sb py-2 border-top px-3">
				<span>{{$t('所在地区')}}</span>
				<view class="bottom hidden" @click="cityShow = true">
					<u-input :readonly="cityShow" 
						:customStyle="{height: '100rpx', caretColor: '#f27299'}"
						type="text" border="none" :placeholder="$t('省、市、区、街道')" v-model="city">
						<view slot="suffix" class="pl-2 py-2" @click.stop="openLocation">
							<u-icon name="map-fill" size="22" color="#f27299"></u-icon>
						</view>
					</u-input>
				</view>
			</view>
			<view class="d-flex a-center j-sb py-2 border-top px-3">
				<span>{{$t('详细地址')}}</span>
				<view class="bottom d-flex a-center py-2">
					<u-textarea :customStyle="{caretColor: '#f27299', padding: '0', backgroundColor: '#f1f1f1'}"
						border="none" v-model="item.address" :placeholder="$t('小区楼栋/乡村名称')">
					</u-textarea>
					<view class="pl-2 py-2" @click="openMic">
						<u-icon name="mic" size="22" color="#f27299"></u-icon>
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
		<m-modal :show="show" title="确认移除" @cancel="show = false" @confirm="confirmRemoveCity">
			<view class="d-flex a-center j-center">
				{{$t('确定移除此地址吗？')}}
			</view>
		</m-modal>
		<m-modal :show="saveShow" title="确认保存" @cancel="saveShow = false" @confirm="submitSave">
			<view class="d-flex a-center j-center">
				{{isEdit ? $t('确定修改此地址吗？') : $t('确定添加此地址吗？')}}
			</view>
		</m-modal>
		<!-- 弹出层 -->
		<u-popup round="20" closeable :show="cityShow" @close="cityShow = false">
			<view class="popup">
				<view class="title d-flex a-center pt-1 j-center">
					{{$t('请选择所在地区')}}
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import MModal from '@/main_modules/main-ui/m-modal/index.vue'
	export default {
		components: {
			MModal
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
				saveShow: false,
				isEdit: false,
				city: '',
				cityShow: false
			}
		},
		onLoad(options) {
			this.item = this.$tools.Navigate.receivePageData(options)
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
		methods: {
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
							list.splice(i-1, 1, this.item)
						}
					})
				} else {
					list.push(this.item)
				}
				this.$store.commit('updateShippingAddress', list)
				console.log(this.$store.state.shippingAddress)
				this.saveShow = false
				this.$tools.Navigate.navigateBack()
			},
			// 定位获取地址
			openLocation() {
				console.log('location')
			},
			// 通过语音输入
			openMic() {
				console.log('mic')
			},
			// 设为默认地址
			checkboxChange(e) {
				this.item.isDefault = !this.item.isDefault
				this.item.check = e
			},
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
				width: 70%;
				background-color: #f1f1f1;
				border-radius: 50rpx;
				padding: 0 30rpx;
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
		
		.popup{
			height: 80vh;
			.title{
				height: 88rpx;
			}
		}
	}
</style>