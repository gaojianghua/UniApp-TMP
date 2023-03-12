<template>
	<swiper :current="tabIndex" :style="{
		height: height,
		width: width
	}" @change="changeSwiper">
		<swiper-item v-for="(item, i) in tabs" :key="i">
			<!-- 列表区域 -->
			<view class="w-100 h-100">
				<slot />
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		props: {
			tabs: {
				type: Array,
				default: () => {
					return []
				}
			},
			chooseIndex: {
				type: Number,
				default: 0
			},
			height: {
				type: String,
				default: 'calc(100vh - 44px - 70rpx)'
			},
			width: {
				type: String,
				default: '100vw'
			}
		},
		data() {
			return {
				tabIndex: 0
			}
		},
		created() {
			this.tabIndex = this.chooseIndex
		},
		methods: {
			//滑动切换选项卡
			changeSwiper(e) {
				this.$emit('changeSwiper', e.detail.current)
			}
		},
		watch: {
			chooseIndex(newVal, oldVal) {
				this.tabIndex = newVal
			}
		},
	}
</script>

<style lang="scss" scoped>

</style>
