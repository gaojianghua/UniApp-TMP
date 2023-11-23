<template>
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
		}" class="scroll-row-item mr-2 px-2" v-for="(item, i) in tabs" :key="i" @click="changeTab(item, i)" :id="'tab'+i">
			<view class="h-100 line-h d-flex flex-column a-center j-center">
				<text :style="tabIndex === i ? chooseTextStyle : textStyle">{{item[keyName]}}</text>
				<view v-if="tabIndex === i">
					<slot />
				</view>
			</view>
		</view>
	</scroll-view>
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
		created() {
			this.tabIndex = this.chooseIndex
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
			chooseIndex(newVal, oldVal) {
				this.tabIndex = newVal
				this.scrollInto = 'tab' + (newVal - this.slideNum)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-row-item:last-child{
		margin-right: 0 !important;
	}
</style>
