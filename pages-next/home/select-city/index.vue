<!-- <template>
	<view class="page">
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.选择城市" i18n></m-navbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
</style> -->

<template>
	<div class="slot-machine">
		<div v-for="(column, index) in columns" :key="index" class="column">
			<div v-for="(num, numIndex) in numbers" :key="numIndex" class="number" :class="{ rolling: column.rolling }">
				{{ num }}
			</div>
		</div>
		<button @click="startRolling">Start</button>
		<button @click="stopRolling">Stop</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				numbers: Array.from({
					length: 10
				}, (_, i) => i), // 0-9
				columns: Array.from({
					length: 5
				}, () => ({
					rolling: false
				})),
				rollingTimeouts: []
			};
		},
		methods: {
			startRolling() {
				this.clearTimeouts();
				this.columns.forEach((column, index) => {
					setTimeout(() => {
						column.rolling = true;
					}, index * 200); // 延迟0.2秒
				});
			},
			stopRolling() {
				this.columns.forEach((column, index) => {
					const timeout = setTimeout(() => {
						column.rolling = false;
					}, index * 200); // 延迟0.2秒
					this.rollingTimeouts.push(timeout);
				});
			},
			clearTimeouts() {
				this.rollingTimeouts.forEach(timeout => clearTimeout(timeout));
				this.rollingTimeouts = [];
			}
		}
	};
</script>

<style scoped>
	.slot-machine {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.column {
		margin: 0 10px;
		overflow: hidden;
		height: 100px;
		width: 50px;
		border: 1px solid #000;
		position: relative;
	}

	.number {
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2em;
		transition: transform 0.5s ease-in-out;
	}

	.number.rolling {
		animation: roll 1s infinite linear;
	}

	@keyframes roll {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(-1000%);
		}
	}
</style>