const populateStudentObject = require('../utils/populateStudentObject')

module.exports = {
	searchStudentIndex: async (req, res) => {
		res.clearCookie('ID')
		res.render('searchStudent')
	},
	searchStudent: async (req, res) => {
		try {
			const studentResponseObject = await populateStudentObject(req.query.ID)
			if (!studentResponseObject) {
				res.render('searchStudent', { error: 'No Student Found!' })
			}
			res.cookie('ID', `${req.query.ID}`, { httpOnly: true })
			res.render('searchStudent', { data: studentResponseObject })
		} catch (error) {
			console.error(error)
		}
	},
}
