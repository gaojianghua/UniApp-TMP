<template>
	<view class="single w-100 position-fixed bottom-0 left-0 d-flex a-center" :style="{backgroundColor: bgColor, borderTop: `2rpx solid ${borderColor}`}">
		<view :style="{width: `calc(100% / ${tabs.length})`, height: '52px'}"
			class="single-item d-flex a-center j-center flex-column" v-for="(item, i) in tabs" :key="i"
			@click="tabClick(item, i)">
			<image :style="{width: iconWidth, height: iconHeight}" mode="aspectFit" lazy-load
				:src="index == i ? item.selectedIconPath : item.iconPath"></image>
			<view class="item-name line-h mt-1" :style="{fontSize: size, color: index == i ? selectColor : color}">
				{{i18n ? $t(item.text) : item.text}}
			</view>
		</view>
	</view>
</template>

<script>
	import props from './props.js'
	export default {
		props,
		data() {
			return {
				index: 0
			}
		},
		methods: {
			// tab点击事件
			tabClick(item, i) {
				this.index = i
				this.$emit('switchTab', item)
			}
		},
		watch: {
			current: {
				handler(nv, ov) {
					this.index = nv
				},
				deep: true,
				immediate: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.single {
		padding-bottom: env(safe-area-inset-bottom);

		.single-item {}
	}
</style>