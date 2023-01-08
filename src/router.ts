import { Router } from 'express'

const createController = require('./todos/create')
const readController = require('./todos/read')
const updateController = require('./todos/update')
const deleteController = require('./todos/delete')

const router = Router()

router.post('/postTodo', createController.postTodo)

router.get('/todos', readController.getAllTodos)
router.get('/deletedTodos', readController.getAllDeletedTodos)
router.get('/todos/:userId', readController.getAllTodosByUser)
router.get('/todosCompleted/:userId', readController.getAllCompletedTodosByUser)

router.put('/finishTodo/:id', updateController.finishTodo)
router.put('/deleteTodo/:id', updateController.softDelete)
router.put('/updateTodo/:id', updateController.updateTodo)

router.delete('/deleteAllTodo/', deleteController.deleteAllTodos)
router.delete('/deleteUser/:userId', deleteController.deleteAllTodosByUser)
router.delete('/deleteTodo/:todoId', deleteController.hardDelete)
router.delete('/deleteUsers', deleteController.deleteAllUsers)

export default router
