<template>
	<view class="single w-100 position-fixed bottom-0 left-0 d-flex a-center py-1" :style="{backgroundColor: bgColor}">
		<view :style="{width: `calc(100% / ${tabs.length})`, height: '100%'}"
			class="single-item d-flex a-center j-center flex-column" 
			v-for="(item, i) in tabs" :key="i"
			@click="tabClick(item, i)">
			<image :style="{width: iconWidth, height: iconHeight}" mode="aspectFit" lazy-load
				:src="current == i ? item.selectedIconPath : item.iconPath"></image>
			<view class="item-name line-h mt-1" :style="{fontSize: size, color: current == i ? selectColor : color}">
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
				current: 0,
			}
		},
		methods: {
			// tab点击事件
			tabClick(item, i) {
				this.current = i
				this.$emit('switchTab', item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.single {
		height: calc(52px + env(safe-area-inset-bottom));

		.single-item {
			
		}
	}
</style>