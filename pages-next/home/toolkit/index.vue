<template>
	<view class="page">
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.工具大全" i18n></m-navbar>
		<m-scroll-y :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
			<view class="content d-flex flex-column a-center h-100">
				<view class="bg-white w-100 d-flex a-center" v-for="(item, i) in list" :key="i" @click="openPages(item.path)">
					<m-cell class="w-100 px-2" i18n :item="item"></m-cell>
				</view>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	import MCell from '@/main_modules/main-ui/m-cell/index.vue'
	export default {
		components: {
			MCell
		},
		data() {
			return {
				list: [
					{
						name: 'page.电子签名',
						path: '/pages-offspring/tools-signature/index'
					}
				]
			}
		},
		methods: {
			// 进入工具页面
			openPages(i) {
				this.$tools.Navigate.navigateTo(i)
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.browserFitHeight}px - ${this.$store.state.navbarHeight}px - env(safe-area-inset-bottom) - ${this.$store.state.statusHeight}px)`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>