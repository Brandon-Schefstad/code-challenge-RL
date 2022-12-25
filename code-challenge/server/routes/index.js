const express = require('express')
const router = express.Router()
const indexController = require('../controllers/index')
const authController = require('../controllers/auth')
const dashboardController = require('../controllers/dashboard')

router.post('/signup', authController.handleSignup)
router.post('/dashboard', dashboardController.loadDashboard)

module.exports = router
