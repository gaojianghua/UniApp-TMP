<p align="center">
    <img alt="logo" src="https://gaojianghua.oss-cn-hangzhou.aliyuncs.com/wolffyPink.png" width="120" height="120" style="margin-bottom: 10px;">
</p>
<h3 align="center" style="margin: 30px 0 30px;font-weight: bold;font-size:40px;">UniApp TMP</h3>
<h3 align="center">兼容多平台的UniApp骨架模板</h3>

## 说明

UniApp TMP，是基于[uni-app](https://uniapp.dcloud.io/)与[uView 2.0](https://uviewui.com)的兼容多平台的项目骨架模板。


## 目录骨架

- common 			为公共css集成
  * animate.css		是css动画库
  * common.css		是用户自定义全局样式文件
  * icon.css		是字体图标文件
  * main-nvue		是nvue全局原子css文件
  * main.css		是全局原子css文件
  * uni.css			是uniapp初始化css文件

- components		为自定义组件目录
  * common			是公共组件目录
  * global			是全局组件目录
  * pages			是页面组件目录

- config			为全局配置目录
  * componentConfig 是APP发起请求更新

- global			为全局资源目录
  * data.js			挂载在globalData上的全局数据

- js_sdk			为第三方SDK目录
  * permission		判断APP原生功能权限是否开启

- locale			i18n国际化语言包目录
  * en				英文包
  * zh-Hans			简体中文包

- main_modules 		为自定义工具集成
  * main—ui			为自定义组件，基于uview-UI2.0
  * app-init		集成项目初始化需要执行的函数
  * cache			是对缓存函数的封装
  * check			是对类型判断函数的封装
  * filters			是对过滤函数的封装
  * request			是对请求函数的封装
  * router			是自定义路由的封装
  * sdk-init		是存放第三方SDK的初始化函数
  * tools			是存放工具函数
  * uni-api			是分别存放uniapp各端独有的api

- mixins			抽离复用的逻辑功能
  * capsule-init	兼容小程序初始化获取小程序胶囊信息
  * share-init		初始化分享功能
  * tabbar-init		初始化tabbar

- node_modules		NPM安装的第三方包
  * dayjs			日期时间格式化包

- pages 			为一级路由栈页面
  * account			文件夹内是登录注册页面以及组件
  * tabbar			文件夹内是tabbar底部导航栏对应的页面

- pages-next 		为二级路由栈页面
  * 里面的文件夹对应着tabbar页面文件，用于存放由tabbar页面跳转后的二级页面
  * 例：从tabbar页面的菜单点击后跳转的 “列表页面”

- pages-offspring 	为三级路由栈页面
  * 里面的文件应对应功能模块名称，因三级路由栈页面的入口可以会有多处，不建议对应tabbar
  * 进入商品详情页的入口可能有：首页商品列表，商品列表页，用户分享的商品链接
  * 例：从首页或商品列表页、用户分享的链接点击后跳转的 “商品详情页”

- static 			为静态资源目录
  * 资源类型应做分类存放，再基于所属页面存放对应静态资源

- store				Vuex全局状态目录

- uni_modules		UniApp插件市场安装的第三方包
  * uni-link		原生link标签插件
  * uni-scss		scss插件包
  * uni-share		APP分享插件
  * uview-ui		Uview UI库
  * zhouWei-APPUpdate	APP更新插件

- utils				为项目工具函数目录
  * request			是uView的请求封装库
