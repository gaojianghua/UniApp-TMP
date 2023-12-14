<template>
	<view class="page">
		<!-- 遮罩层 -->
		<u-overlay :show="show" @click="show = false" zIndex="10">
			<!-- 顶部导航栏 -->
			<m-navbar unBack @pageBack="pageBack" isFixed bgColor="#fff" isSlot>
				<view @click.stop class="title w-100 d-flex a-center pl-10 pr-3" :style="{
				width: `calc(100vw - ${miniProgramCapsule.width}px)`,
				marginRight: `calc(100vw - ${miniProgramCapsule.right}px + ${miniProgramCapsule.width}px)`}">
					<view class="title-text flex-shrink line-h">
						{{detail.name}} ( {{$t('第')}} {{chapterInfo.runNum}} {{$t('回')}} )
					</view>
					<view class="share ml-auto" @click="sharePosters">
						<u-icon name="share-square" size="26" color="#fb7299"></u-icon>
					</view>
					<view class="d-flex a-center flex-shrink j-center ml-2">
						<u-icon v-if="detail.collect" name="star-fill" color="#fb7299" size="24"
							@click="openCollect"></u-icon>
						<u-icon v-else name="star" color="#fb7299" size="24" @click="openCollect"></u-icon>
					</view>
				</view>
			</m-navbar>
			<view @click.stop class="controls w-100 bg-white position-fixed bottom-0 left-0 d-flex a-center j-sb px-3">
				<view class="controls-l d-flex a-center" @click.stop="openUp">
					<u-icon name="arrow-up-fill" color="#fb7299" size="22"></u-icon>
					<view class="main-text-color">
						{{$t('上一回')}}
					</view>
				</view>
				<view class="controls-c d-flex a-center" @click.stop="openControls">
					<u-icon name="list-dot" color="#fb7299" size="22"></u-icon>
					<view class="main-text-color">
						{{$t('目录')}}
					</view>
				</view>
				<view class="controls-r d-flex a-center" @click.stop="openDown">
					<u-icon name="arrow-down-fill" color="#fb7299" size="22"></u-icon>
					<view class="main-text-color">
						{{$t('下一回')}}
					</view>
				</view>
			</view>
		</u-overlay>
		<!-- 内容区域 -->
		<m-scroll-y bgColor="transparent" i18n :isLoading="isLoading" :scrollStyle="scrollStyle" :load="load"
			@loadmore="loadmore" @onRefresh="onRefresh" mainColor="#fb7290">
			<view @click="show = true">
				<view v-if="chapterInfo.lock" class="">

				</view>
				<view v-else-if="list.length != 0">
					<view class="list-item d-flex flex-column" v-for="(item, i) in list" :key="i">
						<u-image class="d-block" :src="item" width="100vw" height="100%" mode="widthFix">
							<view slot="loading" class="d-flex a-center j-center">
								<u-loading-icon></u-loading-icon>
							</view>
						</u-image>
					</view>
				</view>
			</view>
		</m-scroll-y>
		<!-- 海报弹框 -->
		<c-app-share @closePoster="closePoster" @success="success" :posterShow="posterShow" :poster="poster" />
		<!-- 弹出层 -->
		<m-popup :show="directoryShow" i18n @close="directoryShow = false" title="目录" zIndex="10071" i18n>
			<view class="directory px-2">
				<view class="directory-top d-flex a-center j-sb">
					<view class="d-flex a-center">
						<view class="">
							{{detail.state == 1 ? $t('连载中') : $t('已完结')}}
						</view>
						<view class="ml-1">
							({{detail.allRun}})
						</view>
					</view>
					<view class="sort d-flex a-center" @click="openSort">
						<image
							:src="`https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/img/mine/${isSort ? 'asc' : 'desc'}.png`">
						</image>
					</view>
				</view>
				<m-scroll-y :isLoading="false" :intoView="intoView" :scrollTop="scrollTop" :scrollStyle="directoryStyle" :isCustomRefresh="false">
					<view :id="'item'+item.id" class="directory-item d-flex a-center" :class="{'main-text-color': item.id == query.chapterId}"
						v-for="(item, i) in chapterList" :key="i" @click="openChapter(item.id)">
						<view v-if="item.vip" class="isvip font-weight line-h mr-2">
							VIP
						</view>
						<view class="name">
							{{item.name}}
						</view>
						<u-icon v-if="item.lock" class="ml-auto" name="lock" color="#FFA16A" size="24"></u-icon>
					</view>
				</m-scroll-y>
			</view>
		</m-popup>
		<!-- 弹框 -->
		<m-modal :show="modalShow" i18n title="温馨提示" confirmName="加入书架" @cancel="cancel" zIndex="11" @confirm="openCollect">
			<view class="d-flex a-center j-center flex-column">
				<view class="d-flex a-center text-center j-center flex-column main-text-color letter-1">
					{{$t('喜欢这本书吗？快加入书架吧！')}}
				</view>
			</view>
		</m-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import CAppShare from '@/components/common/c-app-share/index.vue'
	import MPopup from '@/main_modules/main-ui/m-popup/index.vue'
	import capsuleInit from '@/mixins/capsule-init.js'
	export default {
		mixins: [capsuleInit],
		components: {
			CAppShare,
			MPopup
		},
		data() {
			return {
				show: false,
				posterShow: false,
				directoryShow: false,
				isSuccess: false,
				modalShow: false,
				detail: {},
				load: 0,
				list: [],
				chapterList: [],
				isLoading: true,
				query: {
					chapterId: 1,
					inviteCode: ''
				},
				istrig: true,
				chapterInfo: {},
				poster: {},
				time: null,
				isSort: true,
				scrollTop: 0,
				intoView: '',
				item: {}
			}
		},
		onLoad(options) {
			this.item = this.$tools.Navigate.receivePageData(options)
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.query.inviteCode = this.item.inviteCode && this.item.inviteCode
				this.getComicsInfo()
				this.getChapterList()
				this.getData()
				this.initPoster()
			},
			//初始化海报数据
			initPoster() {
				let args = {
					id: 7,
					chapterId: 50,
					inviteCode: this.userinfo.inviteCode
				}
				let shareArgs = {
					appUrl: `gongyue://pages-offspring/read-comics/index?item=${args}`,
					h5Url: `https://gongyue.gaojianghua.cn/pages-offspring/read-comics/index?item=${args}`
				}
				this.poster = {
					css: {
						width: "600rpx",
						height: "950rpx",
						borderRadius: "15rpx",
						position: "relative",
						backgroundColor: "#E5ECF4"
					},
					views: [{
							src: `${this.detail.coverImage}`,
							type: "image",
							css: {
								objectFit: "cover",
								width: "560rpx",
								height: "260rpx",
								marginLeft: "20rpx",
								marginTop: "20rpx",
								borderRadius: "15rpx",
							}
						},
						{
							text: `${this.detail.name}`,
							type: 'text',
							css: {
								marginTop: '20rpx',
								fontWeight: 'bold',
								fontSize: '32rpx',
								marginLeft: '20rpx',
								display: 'inline-block'
							}
						},
						{
							text: `${this.detail.score}`,
							type: 'text',
							css: {
								fontWeight: 'bold',
								color: '#EF930A',
								fontSize: '36rpx',
								position: "absolute",
								right: "20rpx",
								top: "300rpx",
							}
						},
						{
							text: `${this.$t('作者')}: ${this.detail.author} · ${this.detail.state == 1 ? this.$t('连载中') : this.$t('已完结')}`,
							type: 'text',
							css: {
								color: '#0A57D0',
								fontSize: '26rpx',
								width: '540rpx',
								marginTop: '10rpx',
								marginLeft: '20rpx',
							}
						},
						{
							text: `${this.$t('简介')}: ${this.detail.desc}`,
							type: 'text',
							css: {
								color: '#333',
								width: '540rpx',
								fontSize: '28rpx',
								marginTop: '10rpx',
								marginLeft: '20rpx',
								lineClamp: '9',
								lineHeight: '45rpx'
							}
						},
						{
							css: {
								width: "100%",
								height: "150rpx",
								position: "absolute",
								bottom: '0rpx',
								left: '0rpx',
								borderRadius: "15rpx",
								backgroundColor: '#fff'
							},
							views: [{
									src: `${this.userinfo.avatar}`,
									type: "image",
									css: {
										objectFit: "cover",
										width: "100rpx",
										height: "100rpx",
										position: "absolute",
										left: "20rpx",
										top: "25rpx",
										borderRadius: "50%",
									}
								},
								{
									text: `${this.$t('书友')}: ${this.userinfo.name}`,
									type: "text",
									css: {
										objectFit: "cover",
										height: "50rpx",
										width: "330rpx",
										position: "absolute",
										left: "130rpx",
										top: "25rpx",
										fontSize: '26rpx',
										lineHeight: "50rpx",
										lineClamp: "1"
									}
								}, ,
								{
									text: `${this.$t('邀请您阅读')}《${this.detail.name}》`,
									type: "text",
									css: {
										objectFit: "cover",
										height: "50rpx",
										width: "330rpx",
										position: "absolute",
										left: "130rpx",
										top: "75rpx",
										fontSize: '26rpx',
										lineHeight: "50rpx",
										lineClamp: "1"
									}
								},
								{
									text: `${this.detail.shareUrl + '?item=' + shareArgs}`,
									type: 'qrcode',
									css: {
										objectFit: "cover",
										width: "100rpx",
										height: "100rpx",
										position: "absolute",
										right: "20rpx",
										top: "25rpx"
									}
								}
							],
							type: 'view'
						},
					]
				}
			},
			// 获取漫画信息
			getComicsInfo() {
				// TODO：请求获取数据
				this.detail = {
					name: '大苍守夜人',
					coverImage: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/manhua/coverImage.jpg',
					desc: '见过比贵族还猖狂的家丁吗?见过比纨绔还嚣张的家丁吗?见过比帝王还霸气的家丁吗?见过勾搭自家小姐的家丁吗?见过坐拥倾城祸水的家丁吗?',
					author: '钢笔头',
					tags: ['热血', '冒险', '都市'],
					score: 9.8,
					collect: false,
					state: 1,
					allRun: 1200,
					shareUrl: 'https://gaojianghua.cn/pages-common/share-guide/index'
				}
			},
			// 退出当前页面
			pageBack() {
				if (this.detail.collect) {
					this.$tools.Navigate.navigateBack()
				} else {
					this.modalShow = true
				}
			},
			// 获取章节列表
			getChapterList() {
				// TODO：请求获取数据
				this.chapterList = []
				for (let i = 1; i <= 1200; i++) {
					this.chapterList.push({
						name: '天魂大陆' + i,
						id: i,
						vip: i > 15 ? true : false,
						lock: i > 20 ? true : false,
					})
				}
			},
			// 打开目录
			openControls() {
				uni.showLoading()
				this.query.chapterId > 10 ? this.intoView = 'item' + this.query.chapterId : this.intoView = 'item1'
				let time = setTimeout(() => {
					this.directoryShow = true
					uni.hideLoading()
				}, 300)
			},
			// 打开指定章节
			openChapter(i) {
				this.query.chapterId = i
				this.refreshChapter()
				this.directoryShow = false
			},
			// 收藏或者取消收藏
			async openCollect() {
				let res = {
					code: 200
				}
				// if (this.detail.collect) {
				// 	res = await delCollect({
				// 		id: this.detail.id
				// 	})
				// } else {
				// 	res = await addCollect({
				// 		id: this.detail.id
				// 	})
				// }
				if (res.code == 200) {
					if (this.detail.collect) {
						this.detail.collect = false
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: this.$t("取消收藏成功")
						})
					}else {
						this.detail.collect = true
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: this.$t("收藏成功,请在书架查看"),
							complete: () => {
								let time = setTimeout(() => {
									if (this.modalShow) {
										this.$tools.Navigate.navigateBack()
									}
									clearTimeout(time)
								}, 1000)
							}
						})
					}
				}
			},
			// 获取数据
			async getData(e) {
				// let {
				// 	data,
				// 	code
				// } = await getCartList(this.query)
				let code = 200
				let data = {
					list: [],
					runNum: this.query.chapterId,
					lock: false,
					lockPrice: 0.34,
					vip: true
				}
				for (let i = 0; i < 10; i++) {
					if(i == 0) {
						data.list.push('https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/manhua/coverImage.jpg')
					}else {
						data.list.push(`https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/manhua/${i}.jpg.jpeg`)
					}
				}
				if (code == 200) {
					this.chapterInfo = data
					if (e == 'S') {
						this.list = this.list.concat(data.list)
					} else if (e == 'A') {
						data.list.reverse().forEach((item)=> {
							this.list.unshift(item)
						})
					} else {
						this.list = data.list
					}
					if (this.query.chapterId >= this.detail.allRun) {
						return this.load = 1
					} else {
						return this.load = 2
					}
				}
			},
			// 加载更多
			loadmore() {
				if (this.load == 1 || this.istrig == false) return;
				this.load = 0
				this.query.chapterId++
				this.istrig = false
				let time = setTimeout(() => {
					this.getData('S')
					this.istrig = true
					clearTimeout(time)
				}, 1000)
			},
			// 下拉刷新
			onRefresh() {
				if (this.query.chapterId == 1) {
					return this.$refs.uToast.show({
						message: this.$t('已经是第一回了'),
						type: 'warning',
						duration: 1200
					})
				}
				this.query.chapterId--
				this.getData('A')
			},
			// 刷新章节
			refreshChapter() {
				this.isLoading = true
				this.load = 0
				this.list = []
				this.show = false
				let time = setTimeout(() => {
					this.getData()
					clearTimeout(time)
				}, 1000)
			},
			// 上一回
			openUp() {
				if (this.query.chapterId == 1) {
					return this.$refs.uToast.show({
						message: this.$t('已经是第一回了'),
						type: 'warning',
						duration: 1200
					})
				}
				this.query.chapterId--
				this.refreshChapter()
			},
			// 下一回
			openDown() {
				if (this.query.chapterId >= this.detail.allRun) {
					return this.$refs.uToast.show({
						message: this.$t('已经是最后一回了'),
						type: 'warning',
						duration: 1200
					})
				}
				this.query.chapterId++
				this.refreshChapter()
			},
			//分享海报
			sharePosters() {
				this.posterShow = true
				uni.showLoading()
				this.time = setTimeout(() => {
					if (this.isSuccess) {
						uni.$u.toast(this.$t('网络异常，请稍后重试'))
						uni.hideLoading();
					}
					clearTimeout(this.time)
				}, 6000);
			},
			//生成海报成功
			success() {
				this.isSuccess = true
				clearTimeout(this.time)
			},
			//关闭弹框
			closePoster() {
				this.isSuccess = false
				this.posterShow = false
			},
			//排序切换
			openSort() {
				this.isSort = !this.isSort
				this.chapterList = this.chapterList.reverse()
				this.scrollTop = 1
				this.$nextTick(() => {
					this.scrollTop = 0
				})
			},
			// 取消
			cancel() {
				this.modalShow = false
				this.$tools.Navigate.navigateBack()
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - env(safe-area-inset-bottom))`
				}
			},
			directoryStyle() {
				return {
					height: `calc(80vh - 88rpx - 90rpx - env(safe-area-inset-bottom))`
				}
			},
			userinfo() {
				return this.$store.state.userinfo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.controls {
			height: calc(100rpx + env(safe-area-inset-bottom));
			padding-bottom: env(safe-area-inset-bottom);
		}
		.share{
			padding-top: 2rpx;
		}
		.directory {
			height: 80vh;

			.directory-top {
				height: 88rpx;

				.sort {
					width: 45rpx;
					height: 45rpx;
				}
			}

			.directory-item {
				height: 88rpx;
				font-size: 28rpx;
				border-bottom: #eee solid 1rpx;
				.isvip {
					border-radius: 20rpx 0 20rpx 0;
					padding: 8rpx 18rpx;
					font-size: 24rpx;
					color: #A1562F;
					background: linear-gradient(270deg, #F3D1B1 0%, #E2A167 100%);
				}
			}
			
			.directory-item:last-child{
				border-bottom: none
			}
		}
		
		.list-item{
			font-size: 0;
		}
	}
</style>