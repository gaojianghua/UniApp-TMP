<!-- 步进器组件 -->
<template>
    <u-number-box v-model="value" @change="numberChange">
        <view
            slot="minus"
            class="minus d-flex a-center j-center rounded-circle"
        >
            <u-icon
                name="minus"
                size="12"
            ></u-icon>
        </view>
        <text
            slot="input"
            style="width: 70rpx;text-align: center;"
            class="px-1"
        >{{value}}</text>
        <view
            slot="plus"
            class="plus main-bg-color d-flex a-center j-center rounded-circle"
        >
            <u-icon
                name="plus"
                color="#FFFFFF"
                size="12"
            ></u-icon>
        </view>
    </u-number-box>
</template>

<script>
	import props from './props.js'
	export default {
		name: "m-number-box",
		props,
		data() {
			return {
				value: 1
			};
		},
		methods: {
			// 输入框内容变化
			numberChange(i) {
				this.$emit('numberChange', i)
			}
		},
		watch: {
			num: {
				handler(nval, oval) {
					this.value = nval
				},
				immediate: true
			}
		},
		computed: {
			statusHeight() {
				return this.$store.state.statusHeight
			}
		}
	}
</script>

<style lang="scss">
	.minus {
		width: 44rpx;
		height: 44rpx;
		border-width: 2rpx;
		border-color: #E6E6E6;
		border-style: solid;
	}

	.plus {
		width: 44rpx;
		height: 44rpx;
	}
</style>