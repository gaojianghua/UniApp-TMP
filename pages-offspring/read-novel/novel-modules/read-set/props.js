module.exports = {
	show: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	maxFontSize: {
		type: Number,
		default: () => {
			return 60
		}
	},
	fontSize: {
		type: Number,
		default: () => {
			return 28
		}
	},
	minFontSize: {
		type: Number,
		default: () => {
			return 24
		}
	},
	lineHeight: {
		type: Number,
		default: () => {
			return 2
		}
	},
	turnType: {
		type: Number,
		default: () => {
			return 0
		}
	},
	bgId: {
		type: Number,
		default: () => {
			return 1
		}
	}

}