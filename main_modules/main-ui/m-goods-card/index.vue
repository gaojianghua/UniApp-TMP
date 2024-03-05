<template>
	<view class="card rounded-1 bg-white mt-2 w-100 rounded-1 hidden">
		<view class="item d-flex" :class="direction == 'Y' ? 'flex-column' : 'a-center p-2'">
			<view class="item-image position-relative flex-shrink" :style="{
				width: direction == 'Y' ? '100%' : imageWidth, 
				height: imageHeight
			}">
				<u-image class="w-100 h-100" width="100%" :height="imageHeight" :src="item.image" mode="aspectFit"></u-image>
				<view v-if="isVIP" class="vip-mark position-absolute top-0 right-0 px-2">
					VIP
				</view>
				<slot name="image-vip" />
				<view v-if="isOver"
					class="over-desc d-flex initial a-center text-white position-absolute bottom-0 left-0 text-ellipsis1">
					{{item.goodsDesc}}
				</view>
				<slot name="image-over" />
			</view>
			<slot v-if="isRowSlot" name="row" />
			<view v-else :style="{
				height: imageHeight
			}" class="item-info flex-1 d-flex flex-column" :class="direction == 'Y' ? 'j-center p-1' : 'j-sb pl-2'">
				<view class="item-name text-ellipsis1 initial">
					{{item.goodsName}}
				</view>
				<view v-if="isDesc" class="item-desc text-ellipsis1">
					{{item.goodsDesc}}
				</view>
				<view v-if="isSales" class="item-tags mt-1 d-flex a-center">
					<view class="item-tags-child px-1">
						销量：{{item.sales | numberFormat('k')}}件
					</view>
					<view class="ml-auto">
						<slot name="item-number-box" />
					</view>
				</view>
				<slot name="item-tags" />
				<view class="item-bottom d-flex a-end mt-1">
					<view class="d-flex a-base">
						<view class="item-price line-h d-flex a-base font-weight" :class="priceRight ? 'ml-auto' : ''">
							<span class="price-ident">{{$store.state.moneySymbol}}</span>
							<span class="price-int">{{item.presentPrice.toFixed(2) | extractAmount('int')}}</span>
							<span class="price-double">{{item.presentPrice.toFixed(2) | extractAmount('point')}}</span>
						</view>
						<view v-if="isOldPrice" class="item-oldPrice line-h font-weight ml-1">
							<span class="oldPrice-ident">{{$store.state.moneySymbol}}</span>
							<span class="oldPrice-int">{{item.oriPrice.toFixed(2) | extractAmount('int')}}</span>
							<span class="oldPrice-double">{{item.oriPrice.toFixed(2) | extractAmount('point')}}</span>
						</view>
					</view>
					<view v-if="isCartBtn"
						class="item-cart d-flex a-center j-center rounded-circle main-bg-color ml-auto"
						@click.stop="addCart">
						<u-icon name="shopping-cart-fill" color="#ffdddd" size="20"></u-icon>
					</view>
					<view v-if="isChecked" class="ml-auto">
						<u-checkbox-group >
							<u-checkbox shape="circle" activeColor="#fb7299" size="26" iconSize="18" :checked="item.check" @change="checkClick">
							</u-checkbox>
						</u-checkbox-group>
					</view>
					<slot name="bottom-btn" />
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
			return {};
		},
		methods: {
			addCart() {
				this.$emit('addCart', this.item)
			},
			checkClick() {
				this.$emit('checkClick', this.item)
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.card {

		.item {
			.item-image {

				.vip-mark {
					font-size: 24rpx;
					font-weight: 500;
					color: #74300B;
					border-radius: 0 0 0 20rpx;
					background: linear-gradient(90deg, #FF4C20 0%, #FFD131 100%);
				}

				.over-desc {
					height: 52rpx;
					width: 100%;
					line-height: 52rpx;
					font-size: 24rpx;
					padding-left: 16rpx;
					background-color: rgba(1, 1, 1, .6)
				}
			}

			.item-info {
				.item-name {
					font-size: 28rpx;
					font-weight: 500;
				}

				.item-desc {
					font-size: 24rpx;
					color: #999;
				}

				.item-tags {
					.item-tags-child {
						font-size: 22rpx;
						color: #666;
						background-color: #c2c2c2;
						border-radius: 4rpx;
					}

				}

				.item-bottom {
					/deep/ .u-checkbox__icon-wrap {
						margin-right: 0 !important;
					}

					.item-price {
						color: #FF4C20;

						.price-ident {
							font-size: 26rpx;
						}

						.price-int {
							font-size: 46rpx;
						}

						.price-double {
							font-size: 26rpx;
						}
					}

					.item-oldPrice {
						color: #999;
						position: relative;

						.oldPrice-ident {
							font-size: 22rpx;
						}

						.oldPrice-int {
							font-size: 30rpx;
						}

						.oldPrice-double {
							font-size: 22rpx;
						}
					}

					.item-oldPrice::before,
					.item-oldPrice::after {
						content: "";
						position: absolute;
						left: 5%;
						right: 0;
						width: 90%;
						height: 4rpx;
						background-color: rgba(1, 1, 1, .4);
					}

					.item-oldPrice::before {
						top: 50%;
						transform: skew(0deg, 15deg);
					}

					.item-oldPrice::after {
						top: 50%;
						transform: skew(0deg, -15deg);
					}

					.item-cart {
						height: 50rpx;
						width: 50rpx;
					}

					.item-cart:active {
						background-color: #fb729980;
					}

					.item-tags {
						font-size: 22rpx;
						color: #666;
						background-color: #c2c2c2;
						border-radius: 4rpx;
					}
				}
			}
		}
	}
</style>