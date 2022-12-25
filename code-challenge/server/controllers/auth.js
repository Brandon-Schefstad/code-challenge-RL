const passport = require('passport')
const validator = require('validator')
const flash = require('express-flash')
const User = require('../models/User')

function validateForm(req) {
	const validationErrors = []
	if (!validator.isEmail(req.body.email))
		validationErrors.push({ msg: 'Please enter a valid email address.' })
	if (validator.isEmpty(req.body.password))
		validationErrors.push({ msg: 'Password cannot be blank.' })

	if (validationErrors.length) {
		req.flash('errors', validationErrors)
		return false
	}
	req.body.email = validator.normalizeEmail(req.body.email, {
		gmail_remove_dots: false,
	})
	return true
}

exports.handleSignup = async (req, res, next) => {
	if (validateForm(req)) {
		const user = new User({
			email: req.body.email,
			password: req.body.password,
			todos: [],
		})
		const searchUser = await User.findOne({ email: req.body.email })
		if (!searchUser) {
			user.save((err) => {
				if (err) {
					return next(err)
				}
				console.log('unique user')
			})
			res.sendStatus(200)
		}
	}
}
exports.postLogin = (req, res, next) => {
	if (validateForm(req)) {
		passport.authenticate('local', (err, user, info) => {
			if (err) {
				console.log(err)
				return next(err)
			}
			if (!user) {
				req.flash('errors', info)
				return res.redirect('/login')
			}

			req.logIn(user, (err) => {
				if (err) {
					return next(err)
				}
				req.flash('success', { msg: 'Success! You are logged in.' })
				res.sendStatus(200)
			})
		})(req, res, next)
	}
}
