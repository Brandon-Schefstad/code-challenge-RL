const express = require('express')
const router = express.Router()

const todoController = require('../controllers/todo')

router.post('/postTodo', todoController.postTodo)
router.get('/getTodo/:user', todoController.getTodo)
router.delete('/deleteTodo/:_id', todoController.deleteTodo)
router.get('/getAllTodos', todoController.getAllTodos)

module.exports = router
