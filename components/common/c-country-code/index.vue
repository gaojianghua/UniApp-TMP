<template>
	<m-popup :show="show" i18n @close="close" title="请选择国际区号">
		<view class="area">
			<view class="p-2">
				<u-search v-model="keyword" :placeholder="$t('国家 | 区号')" height="60rpx"
					:showAction="false" @search="searchText"></u-search>
			</view>
			<m-scroll-y :intoView="intoView" :isLoading="false" :isCustomRefresh="false" :scrollStyle="{height: '60vh'}">
				<view :id="'item' + i" v-for="(item, i) in (keyword ? tempList : areaList)" :key="i" @click="switchArea(item)">
					<m-cell isShowR class="px-3" bbColor="#ddd" :color="item.countryCode == active ? '#f27299' : '#111'" :isIcon="false" 
					:keyName="$i18n.locale" :item="item">
						<view slot="right-row" :style="{color: item.countryCode == active ? '#f27299' : '#111'}">
							{{item.countryCode}}
						</view>
					</m-cell>
				</view>
			</m-scroll-y>
		</view>
	</m-popup>
</template>

<script>
	import MPopup from '@/main_modules/main-ui/m-popup/index.vue'
	import MCell from '@/main_modules/main-ui/m-cell/index.vue'
	import code from '@/pages-common/data/code.json'
	export default {
		components: {
			MCell,
			MPopup
		},
		props: {
			show: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			active: {
				type: String,
				default: () => {
					return ''
				}
			}
		},
		data() {
			return {
				keyword: '',
				tempList: [],
				areaList: code.data,
				intoView: ''
			}
		},
		methods: {
			// 选中国际区号
			switchArea(i) {
				this.$emit('switchArea', i)
			},
			// 关闭
			close() {
				this.$emit('close')
			},
			// 搜索
			searchText(i) {
				if(this.$check.isNumber(i * 1)) {
					let arr = []
					this.areaList.forEach((item) => {
						if (item.countryCode == i) {
							arr.push(item)
						}
					})
					this.tempList = arr
				}else{
					let arr = []
					this.areaList.forEach((item) => {
						if (item[this.$i18n.locale].indexOf(i) != -1) {
							arr.push(item)
						}
					})
					this.tempList = arr
				}
			}
		},
		watch: {
			show(nv, ov) {
				if (nv) {
					this.areaList.forEach((item, i) => {
						if(this.active == item.countryCode) {
							this.intoView = 'item' + i
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>