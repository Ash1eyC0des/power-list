const Day = require('../models/Day')

module.exports = {
	getDay: async (req, res, next) => {
		try {
			const day = await Day.findOne({
				user: req.user.id,
				day: req.body.date,
			})
			if (!day) {
				return res
					.status(404)
					.json({ success: false, message: 'No entry found.' })
			}
			return res.status(200).json({ success: true, data: day })
		} catch (err) {
			return res.status(500).json({ success: false, message: err.message })
		}
	},

	createDay: async (req, res, next) => {
		try {
			await Day.create({
				user: req.user,
				date: req.body.date,
				tasks: [
					{
						name: req.body.task1Name,
						complete: req.body.task1Complete || null,
					},
					{
						name: req.body.task2Name,
						complete: req.body.task2Complete || null,
					},
					{
						name: req.body.task3Name,
						complete: req.body.task3Complete || null,
					},
					{
						name: req.body.task4Name,
						complete: req.body.task4Complete || null,
					},
					{
						name: req.body.task5Name,
						complete: req.body.task5Complete || null,
					},
				],
				book: {
					title: req.body.bookTitle,
					author: req.body.bookAuthor,
				},
				note: req.body.note,
				win: req.body.win || null,
			})
			return res.status(200).json({ success: true, message: 'Day saved.' })
		} catch (err) {
			return res.status(500).json({ success: false, message: err.message })
		}
	},

	editDay: async (req, res, next) => {
		try {
			await Day.findOneAndUpdate(
				{ date: req.body.date },
				{
					user: req.user,
					tasks: [
						{
							name: req.body.task1Name,
							complete: req.body.task1Complete || null,
						},
						{
							name: req.body.task2Name,
							complete: req.body.task2Complete || null,
						},
						{
							name: req.body.task3Name,
							complete: req.body.task3Complete || null,
						},
						{
							name: req.body.task4Name,
							complete: req.body.task4Complete || null,
						},
						{
							name: req.body.task5Name,
							complete: req.body.task5Complete || null,
						},
					],
					book: {
						title: req.body.bookTitle,
						author: req.body.bookAuthor,
					},
					note: req.body.note,
					win: req.body.win || null,
				}
			)
			return res.status(200).json({ success: true, message: 'Day updated.' })
		} catch (err) {
			return res.status(500).json({ success: false, message: err.message })
		}
	},

	deleteDay: async (req, res) => {
		try {
			await Day.findOneAndDelete({ date: req.body.date })
			return res.status(200).json({ success: true, message: 'Day deleted.' })
		} catch (err) {
			return res.status(500).json({ success: false, message: err.message })
		}
	},
}
