<template>
	<m-popup :show="show" i18n @close="close" title="阅读设置" i18n zIndex="10080">
		<view class="read p-3" @click.stop @touchend.stop>
			<view class="item d-flex a-center">
				<view class="item-name font-md main-text-color mr-3">{{$t('字号')}}</view>
				<view class="rounded-1 px-2 border-2"
				:class="fontSize >= maxFontSize ? 'text-light-muted border-light-secondary' : 'main-border-color main-text-color'" @click="addSize">A+</view>
				<view class="text-dark mx-2">
					{{fontSize}}
				</view>
				<view class="rounded-1 px-2 border-2"
				:class="fontSize <= minFontSize ? 'text-light-muted border-light-secondary' : 'main-border-color main-text-color'" @click="subSize">A-</view>
			</view>
			<view class="item mt-5 d-flex a-center">
				<view class="item-name font-md main-text-color mr-3">{{$t('排版')}}</view>
				<view class="type-setting mr-3 d-flex a-center j-around flex-column p-1 border-2 border-dark" 
					:class="lineHeight == item.height ? 'main-border-color' : ''" 
					@click="changeLineHeight(item.height)"
					v-for="(item, i) in lineList" :key="i">
					<view class="line bg-dark" 
					:class="[lineHeight == item.height ? 'main-bg-color' : '', (j % 2 == 0) ? 'w-100' : 'w-50']" 
					v-for="j in item.num" :key="j"></view>
				</view>
			</view>
			<view class="item mt-5 d-flex a-center">
				<view class="item-name font-md main-text-color mr-3">{{$t('翻页')}}</view>
				<view class="py font rounded-1 px-2 border-2 mr-3 border-dark text-dark" 
					:class="turnType == item.turnType ? 'main-border-color main-text-color' : ''"
					v-for="(item, i) in turnTypeList" :key="i"
					@click="changeTurnType(item.turnType)">{{$t(item.turnName)}}</view>
			</view>
			<view class="item mt-5 d-flex a-center">
				<view class="item-name font-md main-text-color mr-3">{{$t('背景')}}</view>
				<view class="bg rounded-circle border-2 mr-3 border-light-secondary"
					v-for="(item, i) in bgList" :key="i"
					:style="{backgroundColor: item.color}" 
					:class="bgId == item.id ? 'main-border-color' : ''"
					@click="changeBackground(item.id)"></view>
			</view>
		</view>
	</m-popup>
</template>

<script>
	import MPopup from '@/main_modules/main-ui/m-popup/index.vue'
	import props from './props.js'
	import { lineList, turnTypeList, bgList } from '../options.js'
	export default {
		props,
		components: {
			MPopup
		},
		data() {
			return {
				lineList,
				turnTypeList,
				bgList
			}
		},
		methods: {
			// 增加字号
			addSize() {
				this.$emit('addSize')
			},
			// 减少字号
			subSize() {
				this.$emit('subSize')
			},
			// 切换排版
			changeLineHeight(i) {
				this.$emit('changeLineHeight', i)
			},
			// 切换翻页模式
			changeTurnType(i) {
				this.$emit('changeTurnType', i)
			},
			// 切换背景主题
			changeBackground(i) {
				this.$emit('changeBackground', i)
			},
			// 关闭
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.read{
		.item{
			.item-name{
				
			}
			.type-setting {
				height: 60rpx;
				width: 60rpx;
				border-radius: 12rpx;
				
				.line{
					height: 2rpx;
					border-radius: 20rpx;
				}
				
			}
			
			.bg{
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
</style>