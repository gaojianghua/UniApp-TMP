<template>
	<view class="page">
		<!-- 遮罩层 -->
		<u-overlay :show="show" @click="show = false">
			<!-- 顶部导航栏 -->
			<m-navbar isFixed bgColor="#fff" isSlot>
				<view @click.stop class="title w-100 d-flex a-center pl-10 pr-3" :style="{
				width: `calc(100vw - ${miniProgramCapsule.width}px)`,
				marginRight: `calc(100vw - ${miniProgramCapsule.right}px + ${miniProgramCapsule.width}px)`}">
					<view class="title-text flex-shrink line-h">
						{{detail.name}} ( {{$t('第')}} {{runNum}} {{$t('回')}} )
					</view>
					<view class="share ml-auto" @click="sharePlacard">
						<u-icon name="share-square" size="26"></u-icon>
					</view>
					<view class="d-flex a-center flex-shrink j-center ml-2">
						<u-icon v-if="detail.collect" name="star-fill" color="#fb7299" size="24"
							@click="openCollect"></u-icon>
						<u-icon v-else name="star" color="#fb7299" size="24" @click="openCollect"></u-icon>
					</view>
				</view>
			</m-navbar>
			<view @click.stop class="controls w-100 bg-white position-fixed bottom-0 left-0 d-flex a-center j-sb px-3">
				<view class="controls-l d-flex a-center" @click="openUp">
					<u-icon name="arrow-up-fill" color="#fb7299" size="22"></u-icon>
					<view class="main-text-color">
						{{$t('上一回')}}
					</view>
				</view>
				<view class="controls-c d-flex a-center" @click="menuShow = true">
					<u-icon name="list-dot" color="#fb7299" size="22"></u-icon>
					<view class="main-text-color">
						{{$t('目录')}}
					</view>
				</view>
				<view class="controls-r d-flex a-center" @click="openDown">
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
					<view class="list-item" v-for="(item, i) in list" :key="i">
						<u-image :src="item" width="100vw" height="auto" mode="widthFix">
							<view slot="loading" class="d-flex a-center j-center">
								<u-loading-icon></u-loading-icon>
							</view>
						</u-image>
					</view>
				</view>
			</view>
		</m-scroll-y>
	</view>
</template>

<script>
	import capsuleInit from '@/mixins/capsule-init.js'
	export default {
		mixins: [capsuleInit],
		data() {
			return {
				show: false,
				detail: {},
				runNum: 1,
				load: 0,
				list: [],
				isLoading: true,
				query: {
					page: 1
				},
				istrig: true,
				chapterInfo: {}
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 初始化
			init() {
				this.getComicsInfo()
				this.getData()
			},
			// 获取漫画信息
			getComicsInfo() {
				this.detail = {
					name: '大苍守夜人',
					coverImage: 'https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/manhua/coverImage.jpg',
					desc: '见过比贵族还猖狂的家丁吗?见过比纨绔还嚣张的家丁吗?见过比帝王还霸气的家丁吗?见过勾搭自家小姐的家丁吗?见过坐拥倾城祸水的家丁吗?',
					author: '钢笔头',
					tags: ['热血', '冒险', '都市'],
					score: 9.8,
					collect: false,
					state: 1,
					allRun: 1200
				}
			},
			// 收藏
			openCollect() {
				if (this.detail.collect) {
					this.detail.collect = false
				} else {
					this.detail.collect = true
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
					runNum: this.query.page,
					lock: false,
					lockPrice: 0.34,
					vip: true
				}
				for (let i = 0; i < 10; i++) {
					data.list.push('https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/manhua/coverImage.jpg')
				}
				if (code == 200) {
					this.chapterInfo = data
					if (e) {
						this.list = this.list.concat(data.list)
					} else {
						this.list = data.list
					}
					if (this.query.page >= this.detail.allRun) {
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
				this.query.page++
				this.istrig = false
				setTimeout(() => {
					this.getData('S')
					this.istrig = true
				}, 1000)
			},
			// 下拉刷新
			onRefresh() {
				this.query.page = 1
				this.getData()
			},
			// 上一回
			openUp() {
				
			},
			// 下一回
			openDown() {
				
			},
			// 分享海报
			sharePlacard() {
				
			}
		},
		computed: {
			scrollStyle() {
				return {
					height: `calc(100vh - env(safe-area-inset-bottom))`
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page{
		.controls{
			height: calc(100rpx + env(safe-area-inset-bottom));
			padding-bottom: env(safe-area-inset-bottom);
		}
	}
</style>