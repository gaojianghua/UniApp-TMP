<template>
	<view class="tabs">
		<view class="d-flex a-center j-sb flex-wrap" :style="tabsStyle" v-if="tabs.length > packUpNum">
			<template v-if="stretchState">
				<view v-for="(item, i) in tabs" :key="i">
					<view :style="[current == i ? activeTabsItemStyle : {}, tabsItemStyle]" class="text-center px-2 mt-2" :class="{active: current == i}"
						@click="openTabsItem(item, i)">{{i18n ? $t(item.name) : item.name}}</view>
				</view>
			</template>
			<template v-else>
				<view v-for="(item, i) in tabs.slice(0, packUpNum - 1)" :key="i">
					<view :style="[current == i ? activeTabsItemStyle : {}, tabsItemStyle]" class="text-center px-2 mt-2" :class="{active: current == i}"
						@click="openTabsItem(item, i)">{{i18n ? $t(item.name) : item.name}}</view>
				</view>
			</template>
			<view v-if="unfoldImage" :style="switchBtnStyle" class="ml-auto px-2 mt-2" @click="switchBtn">
				<u-image :width="imageWidth" :height="imageHeight" :src="stretchState ? noUnfoldImage : unfoldImage"></u-image>
			</view>
			<view v-else :style="switchBtnStyle" class="text-center px-2 mt-2 ml-auto" @click="switchBtn">
				{{stretchState ? $t('收起') : $t('展开')}}
			</view>
		</view>
		<view class="tabs" v-else>
			<view v-for="(item, i) in tabs" :key="i">
				<view :style="[current == i ? activeTabsItemStyle : {}, tabsItemStyle]" class="px-2"
					@click="openTabsItem(item, i)">
					{{i18n ? $t(item.name) : item.name}}
				</view>
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
				stretchState: false,
				current: 0
			}
		},
		methods: {
			// 切换收起展开
			switchBtn() {
				this.stretchState = !this.stretchState
			},
			// 点击某一项tab
			openTabsItem(item, i) {
				this.current = i
				this.$emit('openTabsItem', item)
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>