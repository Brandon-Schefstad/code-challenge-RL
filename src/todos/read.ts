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
				res.sendStatus(404).json({ error: 'No todos found' })
			}
			res.json(listOfAllTodos)
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
				res.sendStatus(404).json({ error: 'No todos for that user' })
			}
			res.json(listOfTodosByUser)
		} catch (error) {
			res.send(500).json({ error: error })
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
				res.sendStatus(404).json({ error: 'No completed todos for that user' })
			}
			res.json(listOfCompletedTodos)
		} catch (error) {
			res.send(500).json({ error: error })
		}
	},
}
