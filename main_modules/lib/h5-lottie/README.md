示例代码：
~~~vue
<template>
	<!-- #ifdef H5 -->
	<view id="lottie"></view>
	<!-- #endif -->
</template>

<script>
	// #ifdef H5
	import {loadAnimation} from './lottie-web.min.js'
	// #endif
	export default {
		data() {
			return {
				option: {
					path: 'https://assets.website-files.com/643993032c9d89c8236ee1f5/6439abb308c4823eb5be7b36_animation.json',
					loop: true,
					autoplay: true
				}
			}
		},
		mounted() {
			// #ifdef H5
			const container = document.getElementById('lottie');
			loadAnimation({
				container,
				renderer: 'svg',
				...this.option
			});
			// #endif
		}
	}
</script>
~~~