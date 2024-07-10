<template>
	<u-overlay :show="show" @click="close">
		<swiper class="w-100 h-100" @change="swiperChange" :disable-touch="disableTouch">
			<swiper-item class="w-100 h-100" v-for="(item, i) in mediums" :key="i" 
			@touchstart="touchstart" 
			@transitionend="transitionend"
			@touchend="touchend"
			@touchmove="touchmove"
			>
				<movable-area class="h-100" style="width: 750rpx;" scale-area v-if="item.type == 'image'">
					<movable-view class="w-100 h-100 d-flex a-center" direction="all" :inertia="true"
						damping="90" scale scale-min="1" scale-max="4" @change="movableChange" @scale="movableScale">
						<image style="width: 750rpx;" :src="item.image" mode="widthFix" @click.stop></image>
					</movable-view>
				</movable-area>
				<!-- #ifdef APP-PLUS -->
				<view v-if="item.type == 'video'" v-html="setVideo(item.video)" @click.stop class="w-100 h-100"></view>
				<!-- #endif -->
				<!-- #ifndef APP-PLUS -->
				<video v-if="item.type == 'video'" :src="item.video" :autoplay="true" :controls="false"
					:enable-progress-gesture="false" :show-fullscreen-btn="false" :show-center-play-btn="false"
					:vslide-gesture-in-fullscreen="false" :vslide-gesture="false" />
				<!-- #endif -->
			</swiper-item>
		</swiper>
	</u-overlay>
</template>

<script>
	import props from './props.js'
	export default {
		props,
		data() {
			return {
				disableTouch: false, // 是否禁用滑动
				scale: 1
			}
		},
		methods: {
			
			touchstart(e) {
				// console.log(e)
			},
			transitionend(e) {
				// console.log(e)
			},
			touchend(e) {
				// console.log(e)
			},
			touchmove(e) {
				// console.log(e)
			},
			// 关闭
			close() {
				this.disableTouch = false
				this.$emit('close')
			},
			// 拖拽变化事件
			movableChange(e) {
				
				const {
					x,
					y
				} = e.detail;
				const scaledWidth = 750 * this.scale;
				console.log(scaledWidth, x, uni.$u.getPx(scaledWidth - 750 + 'rpx'))
				// if () {
				// 	this.disableTouch = false;
				// } else {
				// 	this.disableTouch = true;
				// }
			},
			// 缩放变换事件
			movableScale(e) {
				this.scale = e.detail.scale;
				if (e.detail.scale > 1) {
					this.disableTouch = true;
				} else {
					this.disableTouch = false;
				}
				console.log(e)
			},
			// 设置视频
			setVideo(i) {
				return `<video autoplay
						playsinline
						poster
						webkit-playsinline
						playsinline
						style='height:100%; width: 100%' src="${i}" ></video>`
			},
			// 滑动变化
			swiperChange(i) {
				if (this.mediums[i.detail.current + 1] && this.mediums[i.detail.current + 1].type == 'video') {
					let time = setTimeout(() => {
						this.mediums[i.detail.current + 1].type = ''
						let date = setTimeout(() => {
							this.mediums[i.detail.current + 1].type = 'video'
							clearTimeout(date)
						}, 500)
						clearTimeout(time)
					}, 350)
				}
				if (this.mediums[i.detail.current - 1] && this.mediums[i.detail.current - 1].type == 'video') {
					let time = setTimeout(() => {
						this.mediums[i.detail.current - 1].type = ''
						let date = setTimeout(() => {
							this.mediums[i.detail.current - 1].type = 'video'
							clearTimeout(date)
						}, 500)
						clearTimeout(time)
					}, 350)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>