import { Router } from 'express'

const createController = require('./todos/create')
const readController = require('./todos/read')
const updateController = require('./todos/update')
const deleteController = require('./todos/delete')

const router = Router()

router.post('/postTodo', createController.postTodo)

router.get('/todos', readController.getAllTodos)
router.get('/user/:userId', readController.getAllTodosByUser)
router.get('/userCompleted/:userId', readController.getAllCompletedTodosByUser)

router.put('/finishTodo/:todoId', updateController.finishTodo)
router.put('/deleteTodo/:todoId', updateController.softDelete)
router.put('/updateTodo/:todoId', updateController.updateTodo)

router.delete('/deleteUser/:userId', deleteController.deleteAllTodosByUser)
router.delete('/deleteTodo/:todoId', deleteController.hardDelete)

export default router
