<template>
	<scroll-view scroll-y :style="{height: height, 
	width: width,
	backgroundColor: bgColor,
	...scrollStyle
	}">
		<view v-if="isAll" :style="{backgroundColor: allChoose ? chooseColor : oneBgColor,
			height: oneHeight,
			width: oneWidth,
			...oneStyle
			}" class="d-flex a-center j-center" @click="menuAllClick">
			<span>{{$t('全部')}}</span>
		</view>
		<view style="height: 100% !important;">
			<block v-for="(item, i) in menuList" :key="i">
				<view :style="{backgroundColor: oneID == i && item.children.length == 0 ? chooseColor : oneBgColor,
				height: oneHeight,
				width: oneWidth,
				...oneStyle
				}" class="d-flex a-center j-sb px-1" :class="item.children.length == 0 ? 'j-center' : 'j-sb'"
					@click="menuClick(i,item)">
					<span>{{item.name}}</span>
					<u-icon v-if="item.children" :class="item.check ? 'rotation': 'norotation'" name="arrow-down"
						color="#fff" size="14"></u-icon>
				</view>
				<template v-if="item.check">
					<u-transition :show="item.check" mode="slide-down">
						<block v-for="(child, j) in item.children" :key="j">
							<view :style="{backgroundColor: oneID == i && twoID == j && child.children.length == 0 ? chooseColor : twoBgColor,
							height: twoHeight || oneHeight,
							width: twoWidth || oneWidth,
							...twoStyle
							}" class="d-flex a-center px-1" :class="child.children.length == 0 ? 'j-center' : 'j-sb'"
								@click.stop="menuChildClick(i,j,child)">
								<span>{{child.name}}</span>
								<u-icon v-if="child.children.length != 0"
									:class="child.check ? 'rotation': 'norotation'" name="arrow-down" color="#fff"
									size="14"></u-icon>
							</view>
							<template v-if="child.check">
								<u-transition :show="child.check" mode="slide-down">
									<block v-for="(sun, k) in child.children" :key="k">
										<view :style="{backgroundColor: oneID == i && twoID == j && threeID == k ? chooseColor : threeBgColor,
										height: threeHeight || twoHeight || oneHeight,
										width: threeWidth || twoWidth || oneHeight,
										...threeStyle
										}" class="d-flex a-center j-center" @click="menuSunClick(i,j,k,child)">
											<span>{{sun.name}}</span>
										</view>
									</block>
								</u-transition>
							</template>
						</block>
					</u-transition>
				</template>
			</block>
		</view>
	</scroll-view>
</template>

<script>
	import props from './props.js'
	export default {
		props,
		data() {
			return {
				allChoose: true,
				menuList: [],
				oneID: -1,
				twoID: -1,
				threeID: -1,
				newOneID: -1,
				newTwoID: -1,
			}
		},
		created() {
			if (this.isAll) {
				this.allChoose = true
			}
			this.menuList = this.typeList
		},
		methods: {
			// 点击全部
			menuAllClick() {
				this.$emit('menuAllClick')
			},
			// 一级分类点击
			menuClick(i, val) {
				if (val.children.lenth != 0) {
					this.newOneID = i
					if (val.check) {
						this.menuList[i].check = false
					} else {
						this.menuList[i].check = true
						if (this.isAccordion) {
							this.menuList.forEach((item, index) => {
								if (index != i) {
									item.check = false
								}
								item.children.forEach(item => item.check = false)
							})
						}
					}
				} else {
					this.oneID = i
					this.allChoose = false
				}
				this.$emit('menuClick', val)
			},
			// 二级分类点击
			menuChildClick(i, j, val) {
				if (val.children.lenth != 0) {
					this.newTwoID = j
					if (val.check) {
						this.menuList[i].children[j].check = false
					} else {
						this.menuList[i].children[j].check = true
						if (this.isAccordion) {
							this.menuList[i].children.forEach((item, index) => {
								if (index != j) {
									item.check = false
								}
							})
						}
					}
				} else {
					this.oneID = this.newOneID
					this.twoID = j
					this.allChoose = false
				}
				this.$emit('menuChildClick', val)
			},
			// 三级分类点击
			menuSunClick(i, j, k, val) {
				this.oneID = this.newOneID
				this.twoID = this.newTwoID
				this.threeID = k
				this.allChoose = false
				this.$emit('menuSunClick', val)
			},
		}
	}
</script>

<style lang="scss" scoped>
	span {
		color: #fff;
		line-height: 33rpx;
	}

	.rotation {
		transform: rotate(180deg);
		transition: all 0.2s linear;
	}

	.norotation {
		transform: rotate(0deg);
		transition: all 0.2s linear;
	}
</style>
