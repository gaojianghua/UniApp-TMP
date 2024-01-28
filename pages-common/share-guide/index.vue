<template>
	<view class="page" :style="scrollStyle">
		<!-- 顶部导航 -->
		<m-navbar isFixed bgColor="tansparent" :borderBottom="false" i18n></m-navbar>
		<!-- 内容区域 -->
		<view class="content d-flex a-center j-center flex-column"
			:style="{paddingTop: `calc(${navbarHeight}px + ${statusHeight}px)`}">
			<view class="mt-3 main-img hidden">
				<u-image width="300rpx" height="400rpx" :src="detail.img"></u-image>
			</view>
			<view class="font-weight font-lg mt-2">
				{{detail.name}}
			</view>
			<view class="font-sm mt text-warning">
				{{detail.author}}
			</view>
			<view class="data">
				{{$t('评分')}}: {{detail.mark}} · {{$t('推荐')}}: {{detail.recommend}} · {{$t('热度')}}: {{detail.popular}}
			</view>
			<view class="type d-flex a-center mt-2">
				<view class="type-item mr-2" v-for="(item, i) in detail.types" :key="i">
					{{item}}
				</view>
			</view>
			<view class="px-3 text-i2 text-center mt-2">
				{{detail.intro}}
			</view>
			<view class="btns mt-5 text-white d-flex a-center j-center" @click="openShow = true">
				{{$t('前往阅读')}}
			</view>
			<view v-if="!$check.isIncludesSomeAPP('gongyue')" class="btns mt-3 text-white d-flex a-center j-center" @click="appDownload">
				{{$t('下载APP')}}
			</view>
		</view>
		<!-- 弹框 -->
		<m-modal :show="show" i18n title="温馨提示" :isCancel="false" confirmName="复制链接" @cancel="show = false" @confirm="urlCopy">
			<view class="d-flex a-center j-center flex-column">
				<view class="d-flex a-center j-center text-center flex-column main-text-color letter-1">
					<span>{{$t('您当前使用的不是Safari浏览器')}}</span>
					<span>{{$t('请复制下方链接在Safari浏览器中打开')}}</span>
					<u-icon name="arrow-downward" size="18" color="#f27299"></u-icon>
				</view>
				<view class="mt-1 text-center text-success border-2 border-success px-2 py-1 rounded-1 initial text-break">
					{{downloadAuth.iosUrl}}
				</view>
			</view>
		</m-modal>
		<m-modal :show="openShow" i18n title="温馨提示" cancelName="浏览器" confirmName="去APP" @cancel="openRead($event, 'h5')" @confirm="openRead('app')">
			<view class="d-flex a-center j-center flex-column">
				<view class="d-flex text-center a-center j-center main-text-color">
					<span>{{$t('请选择留在浏览器或者前往APP阅读')}}</span>
				</view>
			</view>
		</m-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shareArgs: {},
				detail: {},
				show: false,
				openShow: true
			}
		},
		onLoad(options) {
			this.shareArgs = this.$tools.Navigate.receivePageData(options, true)
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.getData()
				this.getDownloadAuth()
			},
			// 获取数据
			async getData() {
				// let { data, code } = async getDetailInfo(this.shareArgs)
				let code = 200
				let data = {
					"id": 7,
					"img": "https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/141b53c86d1f6dc174982e6f122dcbfc.jpg",
					"name": "大苍守夜人",
					"mark": 9.4,
					"school": 367450,
					"types": ["玄幻", '穿越', '无敌流', '废材流'],
					"state": 2,
					"recommend": 95,
					"rank": 7,
					"intro": "这儿有只乌龟，它就是个土匪！强盗！无耻败类！别惹它！不算正统异兽的强大兽类。这儿有只乌龟，它就是个土匪！强盗！无耻败类！别惹它！不算正统异兽的强大兽类。这儿有只乌龟，它就是个土匪！强盗！无耻败类！别惹它！不算正统异兽的强大兽类。这儿有只乌龟，它就是个土匪！强盗！无耻败类！别惹它！不算正统异兽的强大兽类。",
					"author": '二十四桥明月夜',
					"popular": 367840
				}
				if (code == 200) {
					this.detail = data
				}
			},
			// 去阅读
			openRead(e, i) {
				if(e == 'S') {
					return this.openShow = false
				} else if (e == 'app') {
					if (this.$check.isIncludesSomeAPP('gongyue')) {
						location.href = this.shareArgs.appUrl
					}else {
						this.openShow = false
						this.appDownload()
					}
				} else {
					return location.href = this.shareArgs.h5Url
				}
			},
			// 获取下载权限
			getDownloadAuth() {
				/*
					是google商店下载（ 地址：https://play.google.com/store/apps/details?id=uni.Gao.GongYue）
					不是google商店下载，使用APK包直接下载（ 地址：https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/GongYue-Pro-1.0.0.apk）
				*/
				this.downloadAuth = {
					android: true,
					androidUrl: `https://play.google.com/store/apps/details?id=${this.$store.state.androidAppName}`,
					ios: true,
					iosUrl: `https://apps.apple.com/app/${this.$store.state.iosAppName}`
				}
			},
			// APP下载
			appDownload() {
				if (this.$store.state.appSystemInfo.platform == 'android') {
					this.androidDownload()
				} else {
					this.iosDownload()
				}
			},
			// 安卓端下载
			androidDownload() {
				if (this.downloadAuth.android) {
					location.href = this.downloadAuth.androidUrl
				}else{
					uni.showToast({
						title: this.$t('暂不支持Android系统'),
						icon: 'none',
						duration: 3000,
					})
				}
			},
			// IOS端下载
			iosDownload() {
				if (this.downloadAuth.ios) {
					if (this.$check.isSafari()) {
						location.href = this.downloadAuth.iosUrl
					}else {
						this.show = true
					}
				}else{
					uni.showToast({
						title: this.$t('暂不支持IOS系统'),
						icon: 'none',
						duration: 3000,
					})
				}
			},
			// IOS端拷贝URL
			urlCopy() {
				uni.setClipboardData({
					data: this.downloadAuth.iosUrl,
					showToast: false,
					success: () => {
						this.show = false
						this.$refs.uToast.show({
							message: this.$t('复制成功'),
							type: 'success',
							duration: 1200
						})
					},
					fail: () => {
						this.show = false
						this.$refs.uToast.show({
							message: this.$t('复制失败'),
							type: 'warning',
							duration: 1200
						})
					}
				})
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - ${this.$store.state.browserFitHeight}px)`
				}
			},
			navbarHeight() {
				return this.$store.state.navbarHeight
			},
			statusHeight() {
				return this.$store.state.statusHeight
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background: linear-gradient(108deg, #fff 0%, #f27299 20%, #fff 50%, #f27299 80%, #fff 100%);

		.content {
			
			.main-img{
				border-radius: 20rpx;
				box-shadow: 0 0 10rpx 10rpx #ffffff60;
			}
			.data{
				color: #555;
			}
			.type{
				
				.type-item{
					padding: 2rpx 20rpx;
					font-size: 24rpx;
					color: #666;
					background-color: #ddd;
					border-radius: 12rpx;
				}
				.type-item:last-child{
					margin-right: 0;
				}
			}
			
			.btns {
				font-size: 30rpx;
				border-radius: 18rpx;
				height: 88rpx;
				width: 630rpx;
				box-shadow: 0 0 10rpx 10rpx #ffffff30;
				background: linear-gradient(to right, #85B6CA, #F9A4A0);
			}
			
			.btns:active {
				background: linear-gradient(to right, #85B6CA80, #F9A4A080);
			}
		}
	}
</style>