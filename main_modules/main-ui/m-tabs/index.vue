<template>
	<!-- #ifndef MP -->
	<scroll-view :style="{
	 	height: scrollHeight,
	 	width: scrollWidth,
	 	backgroundColor: scrollBgColor,
	 	...scrollStyle
	 }" scroll-x class="scroll-row" scroll-anchoring :scroll-into-view="scrollInto" :scroll-with-animation="true">
		<view :style="{
			height: scrollHeight || height,
			width: width,
			backgroundColor: tabIndex === i ? chooseBgColor : bgColor,
			...itemStyle
		}" class="scroll-row-item tabs-item px-4" v-for="(item, i) in tabs" :key="i" @click="changeTab(item, i)" :id="'tab'+i">
			<view class="h-100 line-h d-flex flex-column a-center j-center">
				<text :style="tabIndex === i ? chooseTextStyle : textStyle">{{item[keyName]}}</text>
				<view v-if="tabIndex === i" class="ts-all-l">
					<slot />
				</view>
			</view>
		</view>
	</scroll-view>
	<!-- #endif -->
	<!-- #ifdef MP -->
	<scroll-view :style="[{
	 	height: scrollHeight,
	 	width: scrollWidth,
	 	backgroundColor: scrollBgColor
	 }, scrollStyle]" scroll-x class="scroll-row" scroll-anchoring :scroll-into-view="scrollInto" :scroll-with-animation="true">
		<view :style="[{
			height: scrollHeight || height,
			width: width,
			backgroundColor: tabIndex === i ? chooseBgColor : bgColor
		}, itemStyle]" class="scroll-row-item tabs-item px-4" v-for="(item, i) in tabs" :key="i" @click="changeTab(item, i)" :id="'tab'+i">
			<view class="h-100 line-h d-flex flex-column a-center j-center">
				<text :style="[tabIndex === i ? chooseTextStyle : textStyle]">{{item[keyName]}}</text>
				<view v-if="tabIndex === i" class="ts-all-l">
					<slot />
				</view>
			</view>
		</view>
	</scroll-view>
	<!-- #endif -->
</template>

<script>
	import props from './props.js'
	export default {
		props,
		data() {
			return {
				scrollInto: '',
				tabIndex: 0
			}
		},
		methods: {
			//切换选项卡
			changeTab(item, e) {
				if (this.tabIndex === e) {
					return;
				}
				this.tabIndex = e
				this.scrollInto = 'tab' + (e - this.slideNum)
				this.$emit('changeTab', {
					...item,
					index: e
				})
			}
		},
		watch: {
			chooseIndex: {
				handler(newVal, oldVal) {
					this.tabIndex = newVal
					this.scrollInto = 'tab' + newVal
				},
				immediate: true,
				deep: true
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>