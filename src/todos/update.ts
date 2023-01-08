import { Request, Response } from 'express'
import { prisma } from '../db'
module.exports = {
	softDelete: async (req: Request, res: Response) => {
		try {
			const result = await prisma.todo.update({
				where: {
					id: parseInt(req.params.id),
				},
				data: {
					deletedAt: Date.now().toString(),
					deleted: true,
				},
			})
			res.json({
				todo: 'updated',
				confirmation: result,
			})
		} catch (err) {
			res.sendStatus(500)
		}
	},
	finishTodo: async (req: Request, res: Response) => {
		const todo = await prisma.todo.findFirst({
			where: {
				id: parseInt(req.params.id),
			},
		})

		if (todo) {
			const result = await prisma.todo.update({
				where: {
					id: parseInt(req.params.id),
				},
				data: {
					finished: !todo.finished,
				},
			})
			res.json({
				todo: 'updated',
				confirmation: result,
			})
		}
	},
	updateTodo: async (req: Request, res: Response) => {
		const todo = await prisma.todo.findFirst({
			where: {
				id: parseInt(req.params.id),
			},
		})

		if (todo) {
			const result = await prisma.todo.update({
				where: {
					id: parseInt(req.params.id),
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
		}
	},
}