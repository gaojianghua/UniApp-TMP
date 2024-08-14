<template>
	<view class="page">
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.华容道" i18n></m-navbar>
		<m-scroll-y :isLoading="false" :isCustomRefresh="false" :scrollStyle="scrollStyle">
			<view class="content d-flex flex-column a-center h-100">
					
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
