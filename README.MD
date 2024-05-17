<p align="center">
    <img alt="logo" src="https://gongyue-shop.oss-cn-hangzhou.aliyuncs.com/GongYueLogo.png" width="120" height="120" style="margin-bottom: 10px;">
</p>
<h3 align="center" style="margin: 30px 0 30px;font-weight: bold;font-size:40px;">UniApp TMP</h3>
<h3 align="center">兼容多平台的UniApp骨架模板</h3>

## 说明

UniApp TMP，是基于[uni-app](https://uniapp.dcloud.io/)与[uView 2.0](https://uviewui.com)的兼容多平台的项目骨架模板。集成实际业务中所需的各种封装工具，使开发者快速上手开发或项目二开。

## 目录骨架

- .env 				为环境配置目录
  * .env.dev.js		是开发环境配置
  * .env.pro.js		是生产环境配置
  * .env.test.js	是测试环境配置
  * 若是APP端请修改 package.json 中的 app-env 属性："Dev"(开发环境) "Pro"(生产环境) "Test"(测试环境)

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
  * node_script		Node脚本
    * youdao-js-trans.js	有道翻译脚本(js格式)--一般用于Vue等PC项目
    * youdao-json-trans.js	有道翻译脚本(json格式)--一般用于Uniapp项目
  * en				英文包
  * zh-Hans			简体中文包
  * zh-Hant			繁体中文包

- main_modules 		为自定义工具集成
  * main—ui			为自定义组件，基于uview-UI2.0
  * app-init		集成项目初始化需要执行的函数
  * cache			是对缓存函数的封装
  * check			是对类型判断函数的封装
  * data			特殊静态数据的收集
  * filters			是对过滤函数的封装
  * lib				是外部资源(组件或库)
  * mqtt			是对mqtt传输方式的封装
  * request			是对请求函数的封装
  * router			是自定义路由的封装
  * sdk-init		是存放第三方SDK的初始化函数
  * socket			是对websocket的封装
  * sqlite			是sqlite数据库API的封装
  * tools			是存放工具函数
  * uni-api			是分别存放uniapp各端独有的api
  * worker			是对WebWorker的封装

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

- 语言代号

英文名 | 中文名 | 代码
---------|----------|---------
英文名 | 中文名 | 代码
Arabic | 阿拉伯语 | ar
German | 德语 | de
English | 英语 | en
Spanish | 西班牙语 | es
French | 法语 | fr
Hindi | 印地语 | hi
Indonesian | 印度尼西亚语 | id
Italian | 意大利语 | it
Japanese | 日语 | ja
Korean | 韩语 | ko
Dutch | 荷兰语 | nl
Portuguese | 葡萄牙语 | pt
Russian | 俄语 | ru
hai | 泰语 | th
Vietnamese | 越南语 | vi
Chinese | 简体中文 | zh-CHS
Chinese | 繁体中文 | zh-CHT
Afrikaans | 南非荷兰语 | af
Amharic | 阿姆哈拉语 | am
Azeerbaijani | 阿塞拜疆语 | az
Belarusian | 白俄罗斯语 | be
Bulgarian | 保加利亚语 | bg
Bangla | 孟加拉语 | bn
Bosnian (Latin) | 波斯尼亚语 | bs
Catalan | 加泰隆语 | ca
Cebuano | 宿务语 | ceb
Corsican | 科西嘉语 | co
Czech | 捷克语 | cs
Welsh | 威尔士语 | cy
Danish | 丹麦语 | da
Greek | 希腊语 | el
Esperanto | 世界语 | eo
Estonian | 爱沙尼亚语 | et
Basque | 巴斯克语 | eu
Persian | 波斯语 | fa
Finnish | 芬兰语 | fi
Fijian | 斐济语 | fj
Frisian | 弗里西语 | fy
Irish | 爱尔兰语 | ga
Scots | 苏格兰盖尔语 | gd
Galician | 加利西亚语 | gl
Gujarati | 古吉拉特语 | gu
Hausa	| 豪萨语 | ha
Hawaiian | 夏威夷语 | haw
Hebrew | 希伯来语 | he
Hindi | 印地语 | hi
Croatian | 克罗地亚语 | hr
Haitian | 海地克里奥尔语 | ht
Hungarian | 匈牙利语 | hu
Armenian | 亚美尼亚语 | hy
Igbo | 伊博语 | ig
Icelandic | 冰岛语 | is
Javanese | 爪哇语 | jw
Georgian | 格鲁吉亚语 | ka
Kazakh | 哈萨克语 | kk
Khmer | 高棉语 | km
Kannada | 卡纳达语 | kn
Kurdish | 库尔德语 | ku
Kyrgyz | 柯尔克孜语 | ky
Latin | 拉丁语 | la
Luxembourgish | 卢森堡语 | lb
Lao | 老挝语 | lo
Lithuanian | 立陶宛语 | lt
Latvian | 拉脱维亚语 | lv
Malagasy | 马尔加什语 | mg
Maori | 毛利语 | mi
Macedonian | 马其顿语 | mk
Malayalam | 马拉雅拉姆语 | ml
Mongolian | 蒙古语 | mn
Marathi | 马拉地语 | mr
Malay | 马来语 | ms
Maltese | 马耳他语 | mt
Hmong | 白苗语 | mww
Myanmar (Burmese) | 缅甸语 | my
Nepali | 尼泊尔语 | ne
Dutch | 荷兰语 | nl
Norwegian | 挪威语 | no
Nyanja (Chichewa) | 齐切瓦语 | ny
Querétaro Otomi | 克雷塔罗奥托米语 | otq
Punjabi | 旁遮普语 | pa
Polish | 波兰语 | pl
Pashto | 普什图语 | ps
Romanian | 罗马尼亚语 | ro
Sindhi | 信德语 | sd
Sinhala (Sinhalese) | 僧伽罗语 | si
Slovak | 斯洛伐克语 | sk
Slovenian | 斯洛文尼亚语 | sl
Samoan | 萨摩亚语 | sm
Shona | 修纳语 | sn
Somali | 索马里语 | so
Albanian | 阿尔巴尼亚语 | sq
Serbian (Cyrillic) | 塞尔维亚语(西里尔文) | sr-Cyrl
Serbian (Latin) | 塞尔维亚语(拉丁文) | sr-Latn
Sesotho | 塞索托语 | st
Sundanese | 巽他语 | su
Swedish | 瑞典语 | sv
Kiswahili | 斯瓦希里语 | sw
Tamil | 泰米尔语 | ta
Telugu | 泰卢固语 | te
Tajik | 塔吉克语 | tg
Filipino | 菲律宾语 | tl
Klingon | 克林贡语 | tlh
Tongan | 汤加语 | to
Turkish | 土耳其语 | tr
Tahitian | 塔希提语 | ty
Ukrainian | 乌克兰语 | uk
Urdu | 乌尔都语 | ur
Uzbek | 乌兹别克语 | uz
Xhosa | 南非科萨语 | xh
Yiddish | 意第绪语 | yi
Yoruba | 约鲁巴语 | yo
Yucatec | 尤卡坦玛雅语 | yua
Cantonese (Traditional) | 粤语 | yue
Zulu | 南非祖鲁语 | zu

- QQ交流群

<p align="left">
	<img alt="logo" src="https://official-document.oss-cn-hangzhou.aliyuncs.com/IMG_7086(20230730-131307).JPG" width="150" height="150" style="margin-bottom: 10px;">
</p>