<template>
	<view class="page">
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.消息中心" i18n></m-navbar>
		<view class="content p-3">
			<view class="card bg-white pl-3">
				<view class="card-item pr-3 d-flex a-center" v-for="(item, i) in menus" :key="i"
				@click="$tools.Navigate.navigateTo('/pages-offspring/message-list/index')">
					<u-image width="60rpx" height="60rpx" :src="item.src"></u-image>
					<view class="card-item-r w-100 d-flex a-center ml-2 py-2">
						<view class="">
							<view class="item-title">
								{{$t(item.name)}}
							</view>
							<view class="item-msg font text-ellipsis1">
								{{item.message}}
							</view>
						</view>
						<u-icon class="ml-auto" name="arrow-right" size="16"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menus: [
					{
						name: '活动通知',
						src: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/alarm.svg',
						message: '尊敬的用户：相亲活动已开发',
					},
					{
						name: '系统通知',
						src: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/alarm.svg',
						message: '尊敬的用户：小说及漫画等娱乐功能已上线',
					},
					{
						name: '服务通知',
						src: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/common/alarm.svg',
						message: '尊敬的用户：您提交的反馈已受理，我们会尽快为您解决问题',
					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.page{
		.content{
			.card{
				.card-item{
					.card-item-r{
						border-bottom: 2rpx solid #cdcdcd;
					}
				}
				.card-item:last-child{
					.card-item-r{
						border-bottom: none;
					}
				}
			}
		}
	}
</style>
