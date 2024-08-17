module.exports = {
	value: {
		type: String,
		default: ''
	},
	isLang: {
		type: Boolean,
		default: false
	},
	showNavbar: {
		type: Boolean,
		default: true
	},
	isSlot: {
		type: Boolean,
		default: false
	},
	borderBottom: {
		type: Boolean,
		default: true
	},
	isTab: {
		type: Boolean,
		default: false
	},
	bgColor: {
		type: String,
		default: '#151521'
	},
	iconColor: {
		type: String,
		default: '#fff'
	},
	textColor: {
		type: String,
		default: '#fff'
	},
	textStyle: {
		type: Object,
		default: () => {
			return {}
		}
	},
	textDirection: {
		type: String,
		default: 'center'	// left | center
	},
	i18n: {
		type: Boolean,
		default: false
	},
	isFixed: {
		type: Boolean,
		default: false
	},
	unBack: {
		type: Boolean,
		default: false
	},
}