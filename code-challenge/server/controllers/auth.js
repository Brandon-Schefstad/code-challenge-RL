const passport = require('passport')
const validator = require('validator')
const flash = require('express-flash')
const User = require('../models/User')

module.exports = {
	async handleSignup(req, res, next) {
		const validationErrors = []
		if (!validator.isEmail(req.body.email))
			validationErrors.push({ msg: 'Please enter a valid email address.' })
		if (!validator.isLength(req.body.password, { min: 8 }))
			validationErrors.push({
				msg: 'Password must be at least 8 characters long',
			})
		if (req.body.password !== req.body.confirmPassword)
			validationErrors.push({ msg: 'Passwords do not match' })

		if (validationErrors.length) {
			console.log(validationErrors)
			return res.redirect('/signup')
		}
		req.body.email = validator.normalizeEmail(req.body.email, {
			gmail_remove_dots: false,
		})

		const user = new User({
			email: req.body.email,
			password: req.body.password,
			todos: [],
		})

		const searchUser = await User.findOne({ email: req.body.email })
		console.log(searchUser)
		if (!searchUser) {
			user.save((err) => {
				if (err) {
					return next(err)
				}
			})
			res.json({ message: 'end' })
		}
	},
}
