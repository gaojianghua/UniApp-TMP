<template>
	<view @click="$emit('click')">
		<view class="lottie-con" ref="lottie">
		</view>
		<view :prop="option" :callMethod="callMethod" :change:callMethod="Lottie.changeMethod"
			:change:prop="Lottie.update">
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			option: {
				default: null
			}
		},
		data() {
			return {
				callMethod: {
					name: "play",
					args: []
				}
			}
		},
		methods: {
			stop() {
				this.$set(this.callMethod, 'name', 'stop')
				this.$set(this.callMethod, 'args', [])
			},
			play() {
				this.$set(this.callMethod, 'name', 'play')
				this.$set(this.callMethod, 'args', [])
			},
			pause() {
				this.$set(this.callMethod, 'name', 'pause')
				this.$set(this.callMethod, 'args', [])

			},
			setSpeed(speed) {
				this.$set(this.callMethod, 'name', 'setSpeed')
				this.$set(this.callMethod, 'args', [speed || 1])
			},

			goToAndStop(value, isFrame) {
				this.$set(this.callMethod, 'name', 'goToAndStop')
				this.$set(this.callMethod, 'args', [value, isFrame || false])
			},

			goToAndPlay(value, isFrame) {
				this.$set(this.callMethod, 'name', 'goToAndPlay')
				this.$set(this.callMethod, 'args', [value, isFrame || false])
			},
			setDirection(direction) {
				this.$set(this.callMethod, 'name', 'setDirection')
				this.$set(this.callMethod, 'args', [direction || 1])
			},
			playSegments(segments, forceFlag) {
				this.$set(this.callMethod, 'name', 'playSegments')
				this.$set(this.callMethod, 'args', [segments, forceFlag])
			},

			setSubframe(useSubFrames) {
				this.$set(this.callMethod, 'name', 'setSubframe')
				this.$set(this.callMethod, 'args', [useSubFrames])
			},

			destroy() {
				this.$set(this.callMethod, 'name', 'destroy')
				this.$set(this.callMethod, 'args', [])
			},
			getDuration(isFrame) {
				return isFrame ? this.totalFrames : this.totalFrames / this.frameRate;
			},
			emitMsg(msg) {
				this.$emit(msg.name, msg.params);
			},
			emitData(data) {
				this[data.name] = data.value;
			}
		}
	}
</script>
<script module="Lottie" lang="renderjs">
	import lottie from "./js/lottie.js"
	export default {
		data() { 
			return {
				lottieObj:null
			}
		},
		methods: {
			update(newVal) {
				
			},
			changeMethod(method) {
				try{
					this.lottieObj[method.name](...method.args);
				}catch(e){
					//TODO handle the exception
				}
			},
			isHttp(url) {
				return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(url)
			},
			init(newVal) {
				lottie.destroy();
				
				this.$nextTick(() => {
					// console.log(this.$refs.lottie)
					this.lottieObj = lottie.loadAnimation({
						container: this.$refs.lottie, // 包含动画的dom元素
						renderer: 'svg', //渲染出来的是什么格式
						loop: (newVal.loop === undefined ? true : newVal.loop), //循环播放
						autoplay: (newVal.autoplay === undefined ? true : newVal.autoplay), //自动播放
						animationData: !this.isHttp(newVal.path) ? newVal.path : undefined, // 动画json的路径
						path: this.isHttp(newVal.path) ? newVal.path : undefined
					});
	
					// this.lottieObj.addEventListener('complete', () => {
					// 	this.$ownerInstance.callMethod('emitMsg', {
					// 		name: 'complete',
					// 		params: arguments
					// 	})
					// })
					if(newVal.speed){
						setTimeout(()=>{
							this.lottieObj.setSpeed(newVal.speed);
						},150);
					}
				})
			}
		},
		destroyed() {
			this.lottieObj.destroy();
		},
		mounted() {
			this.init(this.option)
		}
	}
</script>

<style scoped>
	.lottie-con {
		width: 100%;
		height: 100%;
	}
</style>
