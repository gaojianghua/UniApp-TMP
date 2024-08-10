<template>
	<m-popup :show="show" i18n @close="close" title="选择模板">
		<view class="p-2">
			<m-scroll-y :isLoading="false" :isCustomRefresh="false" :scrollStyle="{height: '60vh'}">
				
			</m-scroll-y>
		</view>
	</m-popup>
</template>

<script>
	import MPopup from '@/main_modules/main-ui/m-popup/index.vue'
	export default {
		components: {
			MPopup
		},
		props: {
			show: {
				type: Boolean,
				default: () => {
					return false
				}
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			// 关闭
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>