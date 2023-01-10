import { Request, Response } from 'express'
import { prisma } from '../db'

module.exports = {
	softDelete: async (req: Request, res: Response) => {
		try {
			if (!req.user) {
				res.json('Unauthorized')
			} else {
				const deleteTodo = await prisma.todo.update({
					where: {
						id_userId: {
							userId: req.user.id,
							id: Number(req.params.todoId),
						},
					},
					data: {
						deletedAt: Date.now().toString(),
						deleted: true,
					},
				})
				if (!deleteTodo) {
					res.status(404).json({ error: 'No todo matching that ID' })
				} else {
					res.json(deleteTodo)
				}
			}
		} catch (err) {
			console.log(err)
			res.sendStatus(500)
		}
	},

	finishTodo: async (req: Request, res: Response) => {
		try {
			if (!req.user) {
				res.json('Unauthorized')
			} else {
				const finishedTodo = await prisma.todo.update({
					where: {
						id_userId: {
							userId: req.user?.id,
							id: Number(req.params.todoId),
						},
					},
					data: {
						finished: true,
					},
				})
				if (!finishedTodo) {
					res.status(404).json({ error: 'No todo matching that ID' })
				} else {
					res.json(finishedTodo)
				}
			}
		} catch (err) {
			console.log(err)
			res.sendStatus(500)
		}
	},
	updateTodo: async (req: Request, res: Response) => {
		try {
			if (!req.user) {
				res.json('Unauthorized')
			} else {
				const updatedTodo = await prisma.todo.update({
					where: {
						id_userId: {
							userId: req.user?.id,
							id: Number(req.params.todoId),
						},
					},
					data: {
						todo: req.body.todo,
						finished: req.body.finished,
					},
				})
				if (!updatedTodo) {
					res.status(404).json({ error: 'No todo matching that ID' })
				} else {
					res.json({
						updatedTodo,
					})
				}
			}
		} catch (err) {
			console.error(err)
			res.sendStatus(500)
		}
	},
}
