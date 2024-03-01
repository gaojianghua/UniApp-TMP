<template>
	<view class="page">
		<!-- 顶部导航栏 -->
		<m-navbar bgColor="#fff" textColor="#fb7299" value="page.修改密码" i18n></m-navbar>
		<!-- 内容区域 -->
		<view class="pt-10 px-3 d-flex a-center j-center flex-column">
			<view class="bottom">
				<u-input :customStyle="{height: '88rpx', caretColor: '#f27299'}" type="password" border="none"
					:placeholder="$t('原密码')" v-model="query.oldPassword">
				</u-input>
			</view>
			<view class="bottom mt-3">
				<u-input :customStyle="{height: '88rpx', caretColor: '#f27299'}" type="password" border="none"
					:placeholder="$t('新密码')" v-model="query.newPassword">
				</u-input>
			</view>
			<view class="bottom mt-3">
				<u-input :customStyle="{height: '88rpx', caretColor: '#f27299'}" type="password" border="none"
					:placeholder="$t('确认密码')" v-model="query.rePassword">
				</u-input>
			</view>
			<view @click="switchUpdate" class="btons d-flex mt-10 a-center j-center text-white letter-2">
				{{$t('page.修改密码')}}
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import { item } from '../../main_modules/main-ui/m-cell/props'
	export default {
		data() {
			return {
				query: {
					oldPassword: '',
					newPassword: '',
					rePassword: ''
				}
			}
		},
		onLoad() {
			
		},
		methods: {
			// 提交修改密码
			switchUpdate() {
				if(!this.query.oldPassword) {
					return this.$refs.uToast.show({
						message: this.$t('请输入原密码'),
						type: 'warning',
						duration: 1500
					})
				}
				if(!this.query.newPassword) {
					return this.$refs.uToast.show({
						message: this.$t('请输入新密码'),
						type: 'warning',
						duration: 1500
					})
				}
				if(!this.query.rePassword) {
					return this.$refs.uToast.show({
						message: this.$t('请再次输入新密码'),
						type: 'warning',
						duration: 1500
					})
				}
				if(this.query.newPassword !== this.query.rePassword) {
					return this.$refs.uToast.show({
						message: this.$t('两次新密码不一致'),
						type: 'warning',
						duration: 1500
					})
				}
				
				this.$refs.uToast.show({
					message: this.$t('修改密码成功'),
					type: 'success',
					duration: 1200,
					complete: () => Object.keys(this.query).forEach(item => this.query[item] = '')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		background-color: #fff;
		.bottom {
			width: 600rpx;
			background-color: #f1f1f1;
			border-radius: 25rpx;
			padding: 0 30rpx;
		}
		.btons {
			font-size: 30rpx;
			border-radius: 50rpx;
			height: 88rpx;
			width: 600rpx;
			background: linear-gradient(to right, #85B6CA, #F9A4A0);
		}
		
		.btons:active {
			background: linear-gradient(to right, #85B6CA80, #F9A4A080);
		}
	}
</style>
