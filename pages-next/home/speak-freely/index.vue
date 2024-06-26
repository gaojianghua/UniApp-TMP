<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.畅所欲言" i18n></m-navbar>
		<!-- 内容区域 -->
		<m-scroll-y :isLoading="isLoading" i18n :scrollStyle="scrollStyle" :load="load" bgColor="transparent"
			@loadmore="loadmore" @onRefresh="onRefresh">
			<u-empty v-if="load != 0 && list.length == 0" mode="list" :text="$t('暂无数据')"
				icon="http://cdn.uviewui.com/uview/empty/list.png">
			</u-empty>
			<view v-if="list.length != 0" class="goods-list px-2">
				<view class="goods-item"
					v-for="(item, i) in list" :key="i" @click.stop="openDetail(item)">
					
				</view>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.page{
		
		.goods-list{
			
			.goods-item{
				
			}
		}
	}
</style>