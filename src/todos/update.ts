import { Request, Response } from 'express'
import { prisma } from '../db'
module.exports = {
	softDelete: async (req: Request, res: Response) => {
		try {
			const deleteTodo = await prisma.todo.update({
				where: {
					id: parseInt(req.params.todoId),
				},
				data: {
					deletedAt: Date.now().toString(),
					deleted: true,
				},
			})
			if (!deleteTodo) {
				res.json({ error: 'No todo matching that ID', status: 404 })
			}
			res.json({
				finished: deleteTodo,
			})
		} catch (err) {
			res.sendStatus(500)
		}
	},
	finishTodo: async (req: Request, res: Response) => {
		try {
			const todo = await prisma.todo.findFirst({
				where: {
					id: parseInt(req.params.todoId),
				},
			})

			if (!todo) {
				res.json({ error: 'No todo matching that ID', status: 404 })
			}
			const finishedTodo = await prisma.todo.update({
				where: {
					id: parseInt(req.params.todoId),
				},
				data: {
					finished: !todo.finished,
				},
			})
			res.json({
				finished: finishedTodo,
			})
		} catch (error) {
			res.sendStatus(500)
		}
	},
	updateTodo: async (req: Request, res: Response) => {
		try {
			const todo = await prisma.todo.findFirst({
				where: {
					id: parseInt(req.params.todoId),
				},
			})

			if (!todo) {
				res.json({ error: 'No todo matching that ID', status: 404 })
			}
			const updatedTodo = await prisma.todo.update({
				where: {
					id: parseInt(req.params.todoId),
				},
				data: {
					todo: req.body.todo,
					finished: req.body.finished,
				},
			})
			res.json({
				updatedTodo: updatedTodo,
			})
		} catch (error) {
			res.sendStatus(500)
		}
	},
}
