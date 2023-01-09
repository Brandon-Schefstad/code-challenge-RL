import { Request, Response } from 'express'
import { prisma } from '../db'
module.exports = {
	deleteAllTodosByUser: async (req: Request, res: Response) => {
		try {
			await prisma.todo.deleteMany({
				where: {
					userId: parseInt(req.params.userId),
				},
			})
			res.sendStatus(200)
		} catch (error) {
			res.sendStatus(500)
		}
	},
	hardDelete: async (req: Request, res: Response) => {
		try {
			const deletedTodo = await prisma.todo.delete({
				where: {
					id: parseInt(req.params.todoId),
				},
			})
			if (!deletedTodo) {
				res.sendStatus(404)
			}
			res.json({ deletedTodo: deletedTodo })
		} catch (error) {
			res.sendStatus(500)
		}
	},
}
