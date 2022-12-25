const express = require('express')
const router = express.Router()

const todoController = require('../controllers/todo')

router.post('/postTodo', todoController.postTodo)

module.exports = router
