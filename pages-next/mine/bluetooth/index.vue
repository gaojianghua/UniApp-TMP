<template>
	<view class="page">
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.蓝牙" i18n>
			<template slot="right">
				<view class="manage position-absolute">
					<u-switch v-model="value" space="2" size="20" inactiveColor="#e1e1e1" activeColor="#fb7290"
						@change="change"></u-switch>
				</view>
			</template>
		</m-navbar>
		<!-- 列表区域 -->
		<m-scroll-y :isLoading="false" i18n :scrollStyle="scrollStyle" bgColor="transparent">
			<u-empty v-if="list.length == 0" mode="list" :text="$t('暂无设备')"
				icon="http://cdn.uviewui.com/uview/empty/list.png">
			</u-empty>
			<view v-if="list.length != 0" class="item d-flex a-center j-sb p-2 mt-2" v-for="(item, i) in list" :key="i">

			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: false,
				list: []
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {

			},
			// 开关
			change(e) {
				if (e) {
					
				}
			},
			// ArrayBuffer转16进度字符串示例
			ab2hex(buffer) {
			  const hexArr = Array.prototype.map.call(
			    new Uint8Array(buffer),
			    function (bit) {
			      return ('00' + bit.toString(16)).slice(-2)
			    }
			  )
			  return hexArr.join('')
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
	.page {
		.manage {
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);
			border-radius: 8rpx;
		}
	}
</style>