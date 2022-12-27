const Student = require('../../models/Student')
module.exports = {
	deleteStudent: async (req, res) => {
		try {
			await Student.deleteOne({
				ID: req.body.ID,
			})
			res.redirect('/dashboard')
		} catch (error) {
			res.redirect('/dashboard')
		}
	},
}
