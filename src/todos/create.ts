import { Request, Response } from 'express'
import { prisma } from '../db'

module.exports = {
	postTodo: async (req: Request, res: Response) => {
		try {
			if (!req.user) {
				res.json('Unauthorized')
			} else {
				const { todo, finished } = req.body
				const newTodo = await prisma.todo.create({
					data: {
						todo: todo,
						finished: finished,
						userId: req.user.id,
					},
				})
				res.json(newTodo)
			}
		} catch (error) {
			res.sendStatus(500)
		}
	},
}
