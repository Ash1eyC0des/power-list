const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

// @desc    Register new user
// @route   POST /signup
// @access  Public
exports.postSignup = (req, res, next) => {
	try {
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
			return res
				.status(400)
				.json({ success: false, message: validationErrors })
		}
		req.body.email = validator.normalizeEmail(req.body.email, {
			gmail_remove_dots: false,
			all_lowercase: true,
		})

		const user = new User({
			name: { first: req.body.firstName, last: req.body.lastName },
			email: req.body.email.toLowerCase(),
			password: req.body.password,
		})

		User.findOne({ email: user.email }, (err, existingUser) => {
			if (err) {
				return next(err)
			}
			if (existingUser) {
				return res.status(409).json({
					success: false,
					message: 'Account with that email address already exists.',
				})
			}
			user.save((err) => {
				if (err) {
					return next(err)
				}
				req.logIn(user, (err) => {
					if (err) {
						return next(err)
					}
					return res
						.status(200)
						.json({ success: true, message: 'Sign up successful.' })
				})
			})
		})
	} catch (err) {
		res.status(500).json({ success: false, message: err.message })
	}
}

// @desc    Authenticate a user
// @route   POST /login
// @access  Public
exports.postLogin = (req, res, next) => {
	const validationErrors = []
	if (!validator.isEmail(req.body.email))
		validationErrors.push('Please enter a valid email address.')
	if (validator.isEmpty(req.body.password))
		validationErrors.push('Password cannot be blank.')

	if (validationErrors.length) {
		return res.status(400).json({ success: false, message: validationErrors })
	}

	req.body.email = validator.normalizeEmail(req.body.email, {
		gmail_remove_dots: false,
		all_lowercase: true,
	})

	passport.authenticate('local', (err, user, info) => {
		try {
			if (err) {
				return next(err)
			}

			if (!user) {
				return res
					.status(500)
					.json({ success: false, message: info.message })
			}

			req.logIn(user, (error) => {
				if (err) {
					return next(err)
				}

				return res
					.status(200)
					.json({ success: true, message: 'Log in successful.' })
			})
		} catch (err) {
			res.status(500).json({ success: false, message: err.message })
		}
	})(req, res, next)
}

// @desc    User logout
// @route   POST /logout
// @access  Public
exports.logout = (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return res.status(500).json({ success: false, message: err.message })
		}

		return res.status(200).json({
			success: true,
			message: 'You have been successfully logged out.',
		})
	})
}
