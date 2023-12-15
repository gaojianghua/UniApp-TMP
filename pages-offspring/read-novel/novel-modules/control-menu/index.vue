<template>
	<u-overlay :show="show" zIndex="100" @click="close">
		<!-- 顶部导航栏 -->
		<m-navbar :borderBottom="false" unBack @pageBack="pageBack" isFixed
			:bgColor="backgroundId == 1 ? bgList[backgroundId].color : (backgroundId == 2 ? bgList[backgroundId - 2].color : bgList[backgroundId - 1].color)"
			isSlot>
			<view @click.stop class="title w-100 d-flex a-center pl-10 pr-3" :style="{
			width: `calc(100vw - ${miniProgramCapsule.width}px)`,
			marginRight: `calc(100vw - ${miniProgramCapsule.right}px + ${miniProgramCapsule.width}px)`}">
				<view class="share ml-auto" @click="sharePosters">
					<u-icon name="share-square" size="26" color="#fb7299"></u-icon>
				</view>
				<view class="d-flex a-center flex-shrink j-center ml-2">
					<u-icon v-if="detail.collect" name="star-fill" color="#fb7299" size="24"
						@click="openCollect"></u-icon>
					<u-icon v-else name="star" color="#fb7299" size="24" @click="openCollect"></u-icon>
				</view>
			</view>
		</m-navbar>
		<!-- 底部 -->
		<view class="position-fixed bottom-0 left-0 w-100 menu-bottom" @click.stop
			:style="{background: backgroundId == 1 ? bgList[backgroundId].color : (backgroundId == 2 ? bgList[backgroundId - 2].color : bgList[backgroundId - 1].color)}">
			<!-- 用于显示章节进度 -->
			<view v-if="chapterProgress >= 0"
				class="position-absolute d-flex a-center text-center rounded-1 px-3 py-1 bg-light-secondary left-half tf-half-x"
				style="top: -80rpx;"
				:style="{background: backgroundId == 1 ? bgList[backgroundId].color : (backgroundId == 2 ? bgList[backgroundId - 2].color : bgList[backgroundId - 1].color),
				color: backgroundId != 1 ? bgList[1].color : bgList[0].color}">
				{{progressTouched ? directoryList[chapterProgress].name : composeCurChild.chapterName}}
			</view>
			<!-- 章节进度条 -->
			<view class="d-flex a-center j-around px-2">
				<text @click="goPreChapter"
					:style="{color: backgroundId != 1 ? bgList[1].color : bgList[0].color}">{{$t('上一章')}}</text>
				<view class="flex-1 py-2">
					<u-slider v-model="chapterProgress" activeColor="#f27299" :block-size="20"
						:max="directoryList.length - 1" @changing="slideChanging" @change="slideChange"
						:blockColor="backgroundId != 1 ? bgList[1].color : bgList[0].color" />
				</view>
				<text @click="goNextChapter"
					:style="{color: backgroundId != 1 ? bgList[1].color : bgList[0].color}">{{$t('下一章')}}</text>
			</view>
			<view class="d-flex a-center j-around">
				<view class="d-flex a-center j-center flex-column" @click="openDirectory">
					<u-icon name="list-dot" size="26"
						:color="backgroundId != 1 ? bgList[1].color : bgList[0].color"></u-icon>
					<text class="font"
						:style="{color: backgroundId != 1 ? bgList[1].color : bgList[0].color}">{{$t('目录')}}</text>
				</view>
				<view class="d-flex a-center j-center flex-column" v-if="backgroundId != 2"
					@click="changeBackground(2)">
					<u-icon
						:name="`https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/${backgroundId == 1 ? 'hei' : 'hei-all'}.svg`"
						size="28"></u-icon>
					<text class="font"
						:style="{color: backgroundId != 1 ? bgList[1].color : bgList[0].color}">{{$t('夜间')}}</text>
				</view>
				<view class="d-flex a-center j-center flex-column" v-else @click="changeBackground(1)">
					<u-icon name="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/bai.svg"
						size="28"></u-icon>
					<text class="font"
						:style="{color: backgroundId != 1 ? bgList[1].color : bgList[0].color}">{{$t('日间')}}</text>
				</view>
				<view class="d-flex a-center j-center flex-column" @click="openSetting">
					<u-icon name="setting-fill" size="26"
						:color="backgroundId != 1 ? bgList[1].color : bgList[0].color"></u-icon>
					<text class="font"
						:style="{color: backgroundId != 1 ? bgList[1].color : bgList[0].color}">{{$t('page.设置')}}</text>
				</view>
			</view>
		</view>
	</u-overlay>
</template>

<script>
	import capsuleInit from '@/mixins/capsule-init.js'
	import {
		bgList
	} from '../options.js'
	import props from './props.js'
	export default {
		mixins: [capsuleInit],
		props,
		data() {
			return {
				bgList,
				chapterProgress: 0
			}
		},
		methods: {
			// 关闭
			close() {
				this.$emit('close')
			},
			// 变更背景
			changeBackground(i) {
				this.$emit('changeBackground', i)
			},
			// 分享
			sharePosters() {
				this.$emit('sharePosters')
			},
			// 收藏
			openCollect() {
				this.$emit('openCollect')
			},
			// 下一章
			goNextChapter() {
				this.$emit('goNextChapter')
			},
			// 上一章
			goPreChapter() {
				this.$emit('goPreChapter')
			},
			// 打开目录
			openDirectory() {
				this.$emit('openDirectory')
			},
			// 滑块变化中
			slideChanging(e) {
				this.$emit('slideChanging', e)
			},
			// 滑块变化后
			slideChange(e) {
				this.$emit('slideChange', e)
			},
			// 返回
			pageBack() {
				this.$emit('pageBack')
			},
			// 设置
			openSetting() {
				this.$emit('openSetting')
			}
		},
		watch: {
			chapterProgressValue: {
				handler(nv, ov) {
					this.chapterProgress = nv
					console.log(nv)
				},
				immediate: true,
				deep: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.share {
		padding-top: 2rpx;
	}
	.menu-bottom {
		border-radius: 30rpx 30rpx 0 0;
		padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
	}
</style>