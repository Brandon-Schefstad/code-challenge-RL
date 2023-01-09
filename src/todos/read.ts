import { Request, Response } from 'express'
import { prisma } from '../db'

module.exports = {
	getAllTodos: async (req: Request, res: Response) => {
		try {
			const listOfAllTodos = await prisma.todo.findMany({
				where: {
					deleted: false,
				},
			})
			if (!listOfAllTodos) {
				res.json({ error: 'No todos found', status: 404 })
			}
			res.json(listOfAllTodos)
		} catch (error) {
			res.json({ error: error, status: 500 })
		}
	},
	getOneTodo: async (req: Request, res: Response) => {
		try {
			const todo = await prisma.todo.findFirst({
				where: {
					id: parseInt(req.params.todoId),
				},
			})
			if (!todo) {
				res.json({ error: 'No todo found', status: 404 })
			}
			res.json(todo)
		} catch (error) {
			res.send(500).json({ error: error })
		}
	},
	getAllTodosByUser: async (req: Request, res: Response) => {
		try {
			const listOfTodosByUser = await prisma.todo.findMany({
				where: {
					userId: parseInt(req.params.userId),
				},
			})
			if (!listOfTodosByUser) {
				res.json({ error: 'No todos for that user', status: 404 })
			}
			res.json(listOfTodosByUser)
		} catch (error) {
			res.json({ error: error, status: 500 })
		}
	},
	getAllCompletedTodosByUser: async (req: Request, res: Response) => {
		try {
			const listOfCompletedTodos = await prisma.todo.findMany({
				where: {
					userId: parseInt(req.params.userId),
					finished: true,
				},
			})
			if (!listOfCompletedTodos) {
				res.json({ error: 'No completed todos for that user', status: 404 })
			}
			res.json(listOfCompletedTodos)
		} catch (error) {
			res.json({ error: error, status: 500 })
		}
	},
}
