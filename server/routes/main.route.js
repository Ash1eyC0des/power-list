const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const daysController = require('../controllers/days.controller')
const { ensureAuth } = require('../middleware/auth')

//Main Routes
// router.get("/", homeController.getIndex);
// router.get("/profile", ensureAuth, postsController.getProfile);

//Routes for user login/signup
router.post('/signup', userController.postSignup)
router.post('/login', userController.postLogin)
router.post('/logout', userController.logout)

module.exports = router
