<template>
	<u-overlay :show="show" @click="close">
		<swiper class="w-100 h-100" @change="swiperChange">
			<swiper-item class="w-100 h-100" v-for="(item, i) in mediums" :key="i">
				<movable-area class="w-100 h-100" scale-area v-if="item.type == 'image'">
					<movable-view class="w-100 h-100 d-flex a-center" direction="all" :out-of-bounds="false" :inertia="true" damping="90" friction="2"
						scale="true" scale-min="1" scale-max="4">
						<image :src="item.image" mode="widthFix" @click.stop></image>
					</movable-view>
				</movable-area>
				<!-- #ifdef APP-PLUS -->
				<view v-if="item.type == 'video'" v-html="setVideo(item.video)" @click.stop
					class="w-100 h-100"></view>
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

			}
		},
		methods: {
			// 关闭
			close() {
				this.$emit('close')
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
					}, 500)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>