<template>
	<!-- #ifdef MP-WEIXIN -->
	<swiper :current="tabIndex" :style="[swiperStyle]" @change="changeSwiper">
	<!-- #endif -->
	<!-- #ifndef MP-WEIXIN -->
	<swiper :current="tabIndex" :style="swiperStyle" @change="changeSwiper">
	<!-- #endif -->
		<swiper-item v-for="(item, i) in tabs" :key="i">
			<!-- 列表区域 -->
			<view class="w-100 h-100">
				<slot name="default" :item="item" />
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
			swiperStyle: {
				type: Object,
				default: () => {
					return {
						height: 'calc(100vh - 44px - 70rpx)',
						width: '100vw'
					}
				}
			},
			chooseIndex: {
				type: Number,
				default: 0
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