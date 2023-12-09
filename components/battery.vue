<template>
	<view class="battery-container">
		<view class="battery-body">
			<view class="battery" :style="{width: `${level}%`}"></view>
			<text class="iconfont charging" v-if="charging">&#xe625;</text>
		</view>
		<view class="battery-head"></view>
	</view>
</template>

<script>
	export default {
		props:{
			level: {
				type: Number,
				default: 0
			},
			charging: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return { 
			}
		},
		mounted() {
		},
		methods: {
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.battery-container{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 25px;
		height: 10px;
		.battery-body{
			position: relative;
			padding: 1px;
			width: 22px;
			height: 100%;
			border-radius: 1px;
			border: $minor-text-color solid 1px;
			.battery{
				height: 100%;
				background-color: $minor-text-color;
			}
			.charging{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				height: 12px;
				line-height: 12px;
				font-size: 15px;
				color: #333;
			}
		}
		.battery-head{
			width: 2px;
			height: 6px;
			background-color: $minor-text-color;
		}
	}
</style>
