<template>
	<m-modal :show="show" :i18n="i18n" :title="title" @cancel="show=false" :isCancel="false" confirmName="查看解决方案"
		@confirm="enterNetwork">
		<view class="modal d-flex a-center j-center flex-column text-danger">
			<view class="iconfont icon-wangluoguzhang"></view>
			<text class="text-center">{{i18n ? $t('网络异常, 请检查您的网络设置') : '网络异常, 请检查您的网络设置'}}</text>
		</view>
	</m-modal>
</template>

<script>
	export default {
		name: 'g-network-error',
		props: {
			i18n: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				show: false,
				title: "网络异常"
			}
		},
		created() {
			this.isNetworkCanUse(usable => {
				this.show = !usable;
			});
			uni.onNetworkStatusChange(res => {
				this.show = !res.isConnected;
			});
		},
		methods: {
			isNetworkCanUse(callback) {
				uni.getNetworkType({
					success: res => {
						if (res.networkType === '2g' || res.networkType === 'none') {
							callback(false);
						} else {
							callback(true);
						}
					},
					fail() {
						callback(false);
					}
				});
			},
			enterNetwork() {
				this.$emit('enterNetwork');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modal {
		.iconfont {
			font-size: 80rpx !important;
			line-height: 1;
			margin: 20rpx 0;
		}
	}
</style>
