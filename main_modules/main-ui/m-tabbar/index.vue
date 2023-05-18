<template>
	<view class="main">
		<view class="tabbar">
			<view class="tabbar-item" v-for="(item,index) in $store.state.tabbar" :key="index" @tap="changeTab(item)">
				<view :class="[ 'item', item.pagePath == pagePath ? 'active' : '' ] ">
					<view class="tabbar-bd">
						<view class="tabbar-icon">
							<!-- //判断tabbar点击过后的图片路径 -->
							<image lazy-load v-if="item.pagePath == pagePath" class="icon-img"
								:src="item.selectedIconPath" mode="aspectFit"></image>
							<image lazy-load v-else class="icon-img" mode="aspectFit" :src="item.iconPath"></image>
						</view>
					</view>
					<!-- //判断tabbar点击前后的样式 -->
					<view class="tabbar-label">
						{{i18n ? $t(item.text) : item.text}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			pagePath: {
				type: String,
				default: ''
			},
			i18n: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// page: '',
				showPage: false,
				containerHeight: 400
			};
		},
		watch: {
			pagePath: {
				handler(pagePath) {
					// console.log('pagePath监听===val', pagePath)
				},
				immediate: true
			}
		},
		mounted() {
			// 根据自己的业务需求判断条件为true，替换即可,根据权限设置的tabbar	
			//第三个参数为插入项,第一个参数为第一项位置，第二个参数为要删除几个。
			// if (true) {
			// 	this.tabbar.splice(3, 0, {
			// 			"pagePath": "pages/wareHouse/wareHouse",
			// 			"iconPath": "/static/cart.png",
			// 			"selectedIconPath": "/static/cartSelected.png",
			// 			"text": "出入库"
			// 		}
			// 	)
			// }
		},
		methods: {
			changeTab(item) {
				this.page = item.pagePath;
				uni.switchTab({
					url: '/' + this.page,
				});
			},
		}
	}
</script>

<style lang="scss">
	.main {
		.tabbar {
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 999;
			width: 100%;
			height: calc(100rpx + env(safe-area-inset-bottom));
			display: flex;
			justify-content: space-around;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			background-color: #151515;

			.tabbar-item {
				display: block;
				line-height: 24rpx;
				font-size: 24rpx;
				text-align: center;
				width: 20%;

				.item {
					width: 100%;
					height: auto;
					padding: 12rpx 0;
					
					.tabbar-label {
						color: #999;
					}

					&.active {
						// background-color: #33333336;
						// border-radius: 8rpx;

						.tabbar-label {
							color: #fb7299;
						}
					}
				}
			}

			.tabbar-icon {
				height: 24px;
				line-height: 24px;
				text-align: center;
			}

			.icon {
				display: inline-block;
			}

			.tabbar-label {
				line-height: 24rpx;
				font-size: 24rpx;
				color: #000000;
				margin-top: 10rpx;

				// &.active {
				// 	color: #fff;
				// }
			}

			.icon-img {
				height: 24px;
				width: 24px;
			}
		}
	}
</style>