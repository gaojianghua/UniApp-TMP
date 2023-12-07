<template>
	<u-popup round="20" :show="show" @close="close">
		<view class="area">
			<view class="tit d-flex a-center j-center text-white position-relative" style="height: 100rpx;">
				<span>{{$t('选择国家代码')}}</span>
				<u-icon @click="close" class="position-absolute" style="right: 30rpx; top: 30rpx;"
					name="close" size="20" color="#ddd"></u-icon>
			</view>
			<view class="p-2">
				<u-search v-model="keyword" :placeholder="$t('国家 | 代码')" height="60rpx"
					:showAction="false" @search="searchText"></u-search>
			</view>
			<m-scroll :isLoading="false" :isCustomRefresh="false" :scrollStyle="{height: '60vh'}">
				<view class="" v-for="(item, i) in (keyword ? tempList : areaList)" :key="i" @click="switchArea(item)">
					<m-cell class="px-3" bbColor="#ddd" color="#111" :isIcon="false" keyName="zh_tw" :item="item">
						{{item.callingcode}}
					</m-cell>
				</view>
			</m-scroll>
		</view>
	</u-popup>
</template>

<script>
	import MScroll from '@/main_modules/main-ui/m-scroll/index.vue'
	import MCell from '@/main_modules/main-ui/m-cell/index.vue'
	export default {
		components: {
			MScroll,
			MCell
		},
		props: {
			show: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			areaList: {
				type: Array,
				default: () => {
					return []
				}
			},
		},
		data() {
			return {
				keyword: '',
				tempList: []
			}
		},
		methods: {
			switchArea(i) {
				this.$emit('switchArea', i)
			},
			close() {
				this.$emit('close')
			},
			searchText(i) {
				if(this.$check.isNumber(i * 1)) {
					let arr = []
					this.areaList.forEach((item) => {
						if (item.callingcode == i) {
							arr.push(item)
						}
					})
					this.tempList = arr
				}else{
					let arr = []
					this.areaList.forEach((item) => {
						if (item.zh_tw.indexOf(i) != -1) {
							arr.push(item)
						}
					})
					this.tempList = arr
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tit{
		border-radius: 40rpx 40rpx 0 0;
		background-color: #33C795;
	}
</style>