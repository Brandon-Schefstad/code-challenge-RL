const express = require('express')
const router = express.Router()
const indexController = require('../controllers/index')
const authController = require('../controllers/auth')

router.get('/', indexController.renderIndexPage)

module.exports = router
