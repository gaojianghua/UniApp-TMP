<template>
	<m-modal i18n :show="$store.state.timeoutShow" :title="title" @cancel="updateTimeoutShow" :isCancel="false"
		@confirm="updateTimeoutShow">
		<view class="modal d-flex a-center j-center flex-column text-danger">
			<u-icon name="info-circle" color="#dc3545" size="40"></u-icon>
			<text class="text-center mt-2">{{$t('请求超时, 请稍候重试')}}</text>
		</view>
	</m-modal>
</template>

<script>
	export default {
		name: 'g-timeout',
		data() {
			return {
				show: false,
				title: "超时"
			}
		},
		methods: {
			updateTimeoutShow() {
				this.$store.commit('updateTimeoutShow', false)
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
