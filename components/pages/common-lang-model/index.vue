<template>
	<m-modal :show="show" i18n title="切换语言" @cancel="close" @confirm="confirmSwitch">
		<view class="d-flex a-center pb-2 flex-column">
			<view class="lang border-2 py-1 mt-2 d-flex a-center j-center" :class="lang == item.code ? 'active text-white' : 'default main-text-color'"
				v-for="(item, i) in $store.state.langList" :key="i"
				@click="lang = item.code">
				{{$t(item.name)}}
			</view>
		</view>
	</m-modal>
</template>

<script>
	export default {
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
				lang: ''
			}
		},
		created() {
			this.lang = this.$store.state.lang
		},
		methods: {
			// 确认
			confirmSwitch() {
				this.$emit('confirmSwitch', this.lang)
			},
			// 取消
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lang {
		width: 80%;
		border-radius: 12rpx;
	}
	
	.active {
		border-color: #ffd300;
		background-color: #f27299;
	}
	
	.default {
		border-color: #f27299;
		background-color: #fff;
	}
</style>