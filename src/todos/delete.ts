import { Request, Response } from 'express'
import { prisma } from '../db'
module.exports = {
	deleteAllTodosByUser: async (req: Request, res: Response) => {
		await prisma.todo.deleteMany({
			where: {
				userId: parseInt(req.params.userId),
			},
		})
		res.sendStatus(200)
	},
	hardDelete: async (req: Request, res: Response) => {
		console.log('hard delete')
		console.log(req.params)
		const todo = await prisma.todo.delete({
			where: {
				id: parseInt(req.params.todoId),
			},
		})
		res.json({ todoDeleted: todo })
	},
}
