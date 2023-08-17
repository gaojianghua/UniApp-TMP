示例代码：
~~~vue
<template>
	<!-- #ifdef APP-PLUS -->
	<view style="width: 100vw;">
		<x-lottie style="width:100%;height:320rpx" :option="option" />
	</view>
	<!-- #endif -->
</template>

<script>
	export default {
		data() {
			return {
				option: {
					path: 'https://assets.website-files.com/643993032c9d89c8236ee1f5/6439abb308c4823eb5be7b36_animation.json',
					loop: true,
					autoplay: true
				}
			}
		}
	}
</script>
~~~