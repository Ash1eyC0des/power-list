const mongoose = require('mongoose')

const DaySchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	date: {
		type: Date,
		required: true,
	},
	tasks: [
		{
			name: { type: String, trim: true },
			complete: Boolean,
		},
	],
	book: {
		title: { type: String, trim: true },
		author: { type: String, trim: true },
	},
	note: {
		type: String,
		trim: true,
	},
	win: {
		type: Boolean,
	},
})

module.exports = mongoose.model('Day', DaySchema)
