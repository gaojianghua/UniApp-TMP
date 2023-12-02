<template>
	<view class="item">
		<view class="item-top d-flex a-center">
			<u-avatar :src="item.avatar"></u-avatar>
			<view class="ml-2 line-h">
				{{item.title}}
			</view>
			<view class="ml-auto">
				<u-icon name="more-dot-fill" size="40rpx"></u-icon>
			</view>
		</view>
		<view class="item-row">
			<view class="item-desc line-h-md py-2">
				{{item.desc}}
			</view>
			<template v-if="item.type == 'video'">
				<video class="w-100" :src="item.video"></video>
			</template>
			<template v-if="item.type == 'image'">
				<u-image width="100%" height="auto" :src="item.image" mode="widthFix"></u-image>
			</template>
		</view>
		<view class="item-bottom d-flex a-center j-sb mt-3">
			<view class="d-flex a-center">
				<u-image width="40rpx" height="40rpx" src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/home/praise.png"></u-image>
				<view class="ml-1 line-h">
					{{item.praise}}
				</view>
			</view>
			<view class="d-flex a-center">
				<u-image width="40rpx" height="40rpx" src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/home/collect.png"></u-image>
				<view class="ml-1 line-h">
					{{item.collect}}
				</view>
			</view>
			<view class="d-flex a-center">
				<u-image width="40rpx" height="40rpx" src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/home/comment.png"></u-image>
				<view class="ml-1 line-h">
					{{item.comment}}
				</view>
			</view>
			<view class="d-flex a-center" @click="uniAppShare">
				<u-image width="40rpx" height="40rpx" src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/home/share.png"></u-image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			default: () => {
				return {}
			},
			required: true
		},
		data() {
			return {}
		},
		methods: {
			// 分享点击事件
			uniAppShare() {
				this.$emit('uniAppShare', this.item.id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		background-color: #fff;
		border-radius: 12rpx;
		padding: 20rpx;
		margin-top: 20rpx;

		&:first-child {
			margin-top: 0rpx;
		}

		.item-row {
			.item-desc {
				white-space: normal;
			}
		}
	}
</style>