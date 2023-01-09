import { Request, Response } from 'express'
import { prisma } from '../db'
module.exports = {
	softDelete: async (req: Request, res: Response) => {
		try {
			const result = await prisma.todo.update({
				where: {
					id: parseInt(req.params.todoId),
				},
				data: {
					deletedAt: Date.now().toString(),
					deleted: true,
				},
			})
			if (!result) {
				res.sendStatus(404).json({ error: 'No todo matching that ID' })
			}
			res.json({
				todo: 'updated',
				confirmation: result,
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
				res.sendStatus(404).json({ error: 'No todo matching that ID' })
			}
			const result = await prisma.todo.update({
				where: {
					id: parseInt(req.params.todoId),
				},
				data: {
					finished: !todo.finished,
				},
			})
			res.json({
				todo: 'updated',
				confirmation: result,
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
				res.sendStatus(404).json({ error: 'No todo matching that ID' })
			}
			const result = await prisma.todo.update({
				where: {
					id: parseInt(req.params.todoId),
				},
				data: {
					todo: req.body.todo,
					finished: req.body.finished,
					deletedAt: Date.now().toString(),
				},
			})
			res.json({
				todo: 'updated',
				confirmation: result,
			})
		} catch (error) {
			res.sendStatus(500)
		}
	},
}
