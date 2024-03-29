module.exports = {
	show: {
		type: Boolean,
		default: () => {
			return false
		}
	},
	directoryList: {
		type: Array,
		default: () => {
			return []
		}
	},
	chapterProgress: {
		type: Number,
		default: () => {
			return 1
		}
	},
	detail: {
		type: Object,
		default: () => {
			return {}
		}
	},
	backgroundId: {
		type: Number,
		default: () => {
			return 0
		}
	},
	composeCurChild: {
		type: Object,
		default: () => {
			return {}
		}
	},
}