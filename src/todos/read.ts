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
				res.status(404).json({ error: 'No todo matching that ID' })
			}
			res.json(listOfAllTodos)
		} catch (error) {
			res.sendStatus(500)
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
				res.status(404).json({ error: 'No todo matching that ID' })
			} else {
				console.log(req.user?.id === todo.userId)
				res.json(todo)
			}
		} catch (error) {
			res.sendStatus(500)
		}
	},
	getUser: async (req: Request, res: Response) => {
		try {
			const userProfile = await prisma.user.findUnique({
				where: {
					id: parseInt(req.params.userId),
				},
				include: {
					todos: true,
				},
			})
			if (!userProfile) {
				res.status(404).json({ error: 'No todo matching that ID' })
			}
			res.json(userProfile)
		} catch (error) {
			res.sendStatus(500)
		}
	},
}
