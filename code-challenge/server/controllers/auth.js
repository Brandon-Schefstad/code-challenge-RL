const passport = require('passport')
const validator = require('validator')
const flash = require('express-flash')
const User = require('../models/User')

exports.handleSignup = async (req, res, next) => {
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
			console.log('unique user')
		})
		res.sendStatus(200)
	}
}
exports.postLogin = (req, res, next) => {
	const validationErrors = []
	if (!validator.isEmail(req.body.email))
		validationErrors.push({ msg: 'Please enter a valid email address.' })
	if (validator.isEmpty(req.body.password))
		validationErrors.push({ msg: 'Password cannot be blank.' })

	if (validationErrors.length) {
		req.flash('errors', validationErrors)
		return res.redirect('login')
	}
	req.body.email = validator.normalizeEmail(req.body.email, {
		gmail_remove_dots: false,
	})

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
