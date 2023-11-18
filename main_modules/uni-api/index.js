// #ifdef APP-PLUS
import app from './module/app.js'
// #endif
// #ifdef H5
import h5 from './module/h5.js'
// #endif
// #ifdef MP
import mini from './module/mini.js'
// #endif

export default {
	// #ifdef APP-PLUS
	app
	// #endif
	// #ifdef H5
	h5
	// #endif
	// #ifdef MP
	mini
	// #endif
}

