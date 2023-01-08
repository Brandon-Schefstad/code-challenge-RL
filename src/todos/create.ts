import { Request, Response } from 'express'
import { prisma } from '../db'

module.exports = {
	postTodo: async (req: Request, res: Response) => {
		console.log(req.body)
		const { todo, finished, userId } = req.body
		const result = await prisma.todo.create({
			data: {
				todo: todo,
				finished: finished,
				userId: userId,
			},
		})
		res.json(result)
	},
}
