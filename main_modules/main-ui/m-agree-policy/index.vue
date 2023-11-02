<template>
	<view class="title-cet d-flex a-center j-center">
		<view class="title-agreement p d-flex a-center j-center" :style="{color: defColor}">
			<u-checkbox-group checked shape="circle" @change="checkChange" size="16" :activeColor="color" :value="check"
				placement="column">
				<u-checkbox name="check">
				</u-checkbox>
			</u-checkbox-group>
			<text class="line-h">{{i18n ? $t('我已阅读并同意') : '我已阅读并同意'}}</text>
			<text v-if="!isShowPolicy" class="line-h" :style="{color}" @click="openAgree(1)">《{{i18n ? $t('用户协议') : '用户协议'}}》</text>
			<text v-if="!isShowPolicy" class="line-h">{{i18n ? $t('与') : '与'}}</text>
			<text class="line-h" :style="{color}" @click="openAgree(2)">《{{i18n ? $t('隐私政策') : '隐私政策'}}》</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "g-agree-policy",
		props: {
			color: {
				type: String,
				default: '#f27299'
			},
			defColor: {
				type: String,
				default: '#333'
			},
			url: {
				type: String,
				default: '/pages-offspring/policy-agreement/index'
			},
			check: {
				type: Array,
				default: () => {
					return ['check']
				}
			},
			i18n: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			isShowPolicy: {
				type: Boolean,
				default: () => {
					return false
				}
			}
		},
		data() {
			return {};
		},
		methods: {
			// 选择协议
			checkChange(e) {
				this.$emit('checkChange', e)
			},
			// 进入协议页面
			openAgree(e) {
				this.$tools.Navigate.navigateTo(this.url, e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title-cet {
		.title-agreement {
			font-weight: 600;
			font-size: 24rpx;
		}
	}
</style>