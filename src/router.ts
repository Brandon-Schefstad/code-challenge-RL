import { Router } from 'express'

const createController = require('./todos/create')
const readController = require('./todos/read')
const updateController = require('./todos/update')

const router = Router()
// POST
// Add New Todo
router.post('/postTodo', createController.postTodo)

// GET
// Find a single Todo
router.get('/todos/:todoId', readController.getOneTodo)
// Find all Todos
router.get('/todos', readController.getAllTodos)
// Find a user's profile
router.get('/user/:userId', readController.getUser)

// PUT
// Mark a Todo as finished
router.put('/finishTodo/:todoId', updateController.finishTodo)
// Soft Delete Todo
router.put('/deleteTodo/:todoId', updateController.softDelete)
// Update a Todo
router.put('/updateTodo/:todoId', updateController.updateTodo)

export default router
