## uniapp模板

- main_modules 为自定义工具集成
* main—ui为自定义组件，基于uview-UI2.0
* app-init集成项目初始化需要执行的函数
* cache是对缓存函数的封装
* check是对类型判断函数的封装
* filters是对过滤函数的封装
* request是对请求函数的封装
* router是对路由函数的封装
* sdk-init是存放第三方SDK的初始化函数
* tools是存放工具函数
* uni-api是分别存放uniapp各端独有的api

- common 为公共css集成
* animate.css是css动画库
* common.css是用户自定义全局样式文件
* icon.css是字体图标文件
* main.css是全局原子css文件
* uni.css是uniapp初始化css文件

- pages 为一级路由栈页面
* account文件夹内是登录注册页面以及组件
* tabbar文件夹内是tabbar底部导航栏对应的页面

- pages-next 为二级路由栈页面
* 里面的文件夹对应着tabbar页面文件，用于存放由tabbar页面跳转后的二级页面
* 例：从tabbar页面的菜单点击后跳转的 “列表页面”

- pages-offspring 为三级路由栈页面
* 里面的文件应对应功能模块名称，因三级路由栈页面的入口可以会有多处，不建议对应tabbar
* 进入商品详情页的入口可能有：首页商品列表，商品列表页，用户分享的商品链接
* 例：从首页或商品列表页、用户分享的链接点击后跳转的 “商品详情页”

- static 为静态资源目录
* 资源类型应做分类存放，再基于所属页面存放对应静态资源