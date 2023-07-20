import Toast from './index.vue'

export default {
	install(Vue) {
		let mToast = null;

		Vue.component(Toast.name, Toast);

		Vue.prototype.$mToast = {
			show,
			hide,
			info,
			success,
			warn,
			danger
		}

		function info(props, cb) {
			this.show({
				...props,
				type: 'primary'
			}, cb);
		}

		function success(props, cb) {
			this.show({
				...props,
				type: 'success'
			}, cb);
		}

		function warn(props, cb) {
			this.show({
				...props,
				type: 'warning'
			}, cb);
		}

		function danger(props, cb) {
			this.show({
				...props,
				type: 'danger'
			}, cb);
		}

		function show(props, cb) {
			if (!mToast) {
				const MToast = Vue.extend({
					render(h) {
						return h('m-toast', {
							props
						})
					}
				})

				mToast = new MToast();
				this.vm = mToast.$mount();
				document.body.appendChild(this.vm.$el);

				cb && cb();
			}
		}

		function hide(cb) {
			document.body.removeChild(this.vm.$el);
			mToast.$destory;
			mToast = null;
			this.vm = null;

			cb && cb();
		}
	}
}