<template>
	<u-overlay :show="show" @click="close" zIndex="10">
		<!-- 顶部导航栏 -->
		<m-navbar unBack @pageBack="pageBack" isFixed bgColor="#fff" isSlot>
			<view @click.stop class="title w-100 d-flex a-center pl-10 pr-3" :style="{
			width: `calc(100vw - ${miniProgramCapsule.width}px)`,
			marginRight: `calc(100vw - ${miniProgramCapsule.right}px + ${miniProgramCapsule.width}px)`}">
				<view class="title-text flex-shrink line-h">
					{{detail.name}} ( {{$t('第')}} {{chapterInfo.runNum}} {{$t('回')}} )
				</view>
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
		<view @click.stop class="controls w-100 bg-white position-fixed bottom-0 left-0 d-flex a-center j-sb px-3">
			<view class="controls-l d-flex a-center" @click.stop="openUp">
				<u-icon name="arrow-up-fill" color="#fb7299" size="22"></u-icon>
				<view class="main-text-color">
					{{$t('上一回')}}
				</view>
			</view>
			<view class="controls-c d-flex a-center" @click.stop="openControls">
				<u-icon name="list-dot" color="#fb7299" size="22"></u-icon>
				<view class="main-text-color">
					{{$t('目录')}}
				</view>
			</view>
			<view class="controls-r d-flex a-center" @click.stop="openDown">
				<u-icon name="arrow-down-fill" color="#fb7299" size="22"></u-icon>
				<view class="main-text-color">
					{{$t('下一回')}}
				</view>
			</view>
		</view>
	</u-overlay>
</template>

<script>
	import capsuleInit from '@/mixins/capsule-init.js'
	export default {
		mixins: [capsuleInit],
		props: {
			show: {
				type: Boolean,
				default: false
			},
			detail: {
				type: Object,
				default: () => {
					return {}
				}
			},
			chapterInfo: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {}
		},
		methods: {
			// 关闭
			close() {
				this.$emit('close')
			},
			// 收藏
			openCollect() {
				this.$emit('openCollect')
			},
			// 上一章
			openUp() {
				this.$emit('openUp')
			},
			// 打开目录
			openControls() {
				this.$emit('openControls')
			},
			// 下一章
			openDown() {
				this.$emit('openDown')
			},
			// 返回
			pageBack() {
				this.$emit('pageBack')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.share{
		padding-top: 2rpx;
	}
	.controls {
		height: calc(100rpx + env(safe-area-inset-bottom));
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>