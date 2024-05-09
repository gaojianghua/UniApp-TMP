<template>
	<view class="content">
		<web-view :src="src" @message="handlePostMessage"></web-view>
	</view>
</template>

<script>
	/* uni页面通信文档
	 * https://ask.dcloud.net.cn/article/35083
	 * 组件使用pdf.js源码修改了部分内容
	 * 只需要完成web-view监听页数并与uni通信即可
	 * @kklxx 2022/12/09修复组件通信
	 */
	import {
		computed
	} from "vue";
	export default {
		data() {
			return {
				viewerUrl: '/hybrid/html/web/viewer.html', // 注意：静态的html文件需要放在根路径下的 hybrid/html 文件夹中
				fileUrl: "", // 要访问的本地pdf的路径
				src: '', // 最终显示在web-view中的路径
				// currentPage: 1, //初始页
				totalPage: 0, //总页码
				currentReadPage: 0, //当前页码
			};
		},

		onLoad(options) {
			console.log("222", options);
			/* 设置标题 */
			let obj = this.$tools.Navigate.receivePageData(options)
			this.fileUrl = obj.url
			uni.setNavigationBarTitle({
				title: obj.goodsName
			});
			/* 初始页面 */
			this.pageInt(); //获取pdfs数据
		},

		mounted() {
			// #ifdef H5
			window.addEventListener("message", this.ReceiveMessage);
			// #endif
		},

		//页面销毁前
		beforeDestroy() {
			uni.removeStorage({ //清除pdf留下的缓存，不干扰新的pdf载入
				key: 'pdfjs.history',
				success() {
					// console.log("removeStorage", res)
				}
			})
		},

		methods: {
			//页面初始化
			pageInt() {
				this.src = `${this.viewerUrl}?file=${encodeURIComponent(this.fileUrl)}&page=` + 5;
			},
			/* 
			 *	做成监听滚动条判断更好
			 * 
			 */
			//uni 组件通信 监听
			handlePostMessage(data) {
				let arr = data.detail.data.pop()
				this.totalPage = arr[0].totalPage //总页数
				this.currentReadPage = arr[1].page + 1 //当前页数
				console.log("app:", this.totalPage, this.currentReadPage);
			},
			//h5 监听
			ReceiveMessage(event) {
				if (event.data && event.data.data && event.data.data.arg) {
					this.totalPage = event.data.data.arg[0].totalPage
					this.currentReadPage = event.data.data.arg[1].page + 1
				}
				console.log("app:", this.totalPage, this.currentReadPage);
			},

			//页面销毁前动作
			addBrowseRecord() {
				// console.log("总页数：",this.totalPage);
				// console.log("当前页数：",this.currentReadPage);
			},

		}
	};
</script>

<style lang="scss" scoped>
</style>
