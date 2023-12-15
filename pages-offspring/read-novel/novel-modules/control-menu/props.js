module.exports = {
	show: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	backgroundId: {
		type: Number,
		default: () => {
			return 0
		}
	},
	detail: {
		type: Object,
		default: () => {
			return {}
		}
	},
	chapterProgressValue: {
		type: Number,
		default: () => {
			return 1
		}
	},
	progressTouched: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	composeCurChild: {
		type: Object,
		default: () => {
			return {}
		}
	},
	directoryList: {
		type: Array,
		default: () => {
			return []
		}
	}
}