let envObj = null
let uniEnv = {}

// H5与MP 项目环境区分
// #ifdef H5 || MP
if (process.env.NODE_ENV === 'development') {
	envObj = require('./.env.dev.js').default
	envObj.APP_ENV = "Dev"
} else {
	if (process.env.APP_ENV == "Dev") {
		envObj = require('./.env.dev.js').default
	} else if (process.env.APP_ENV == "Pro") {
		envObj = require('./.env.pro.js').default
	} else if (process.env.APP_ENV == "Test") {
		envObj = require('./.env.test.js').default
	}
	envObj.APP_ENV = process.env.APP_ENV
}
// #endif
// APP 项目环境区分
// #ifdef APP || APP-NVUE || APP-PLUS || APP-PLUS-NVUE
import appEnv from '@/pages.json'
if (appEnv['app-env'] == "Dev") {
	envObj = require('./.env.dev.js').default
} else if (appEnv['app-env'] == "Pro") {
	envObj = require('./.env.pro.js').default
} else if (appEnv['app-env'] == "Test") {
	envObj = require('./.env.test.js').default
}
envObj.APP_ENV = appEnv['app-env']
// #endif

if (envObj) {
	for (let key in envObj) {
		uniEnv[key] = envObj[key]
	}
}

uni.uniEnv = uniEnv
export default uni.uniEnv