import { Router } from 'express'
import { prisma } from './db'
// @ts-ignore
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'
const router = Router()

router.post('/signup', async (req, res) => {
	try {
		const hash = await hashPassword(req.body.password)
		const user = await prisma.user.create({
			data: {
				email: req.body.email,
				password: hash,
				username: req.body.username,
			},
		})
		const todos = await prisma.todo.findMany({
			where: {
				userId: user.id,
				deleted: false,
			},
		})
		const token = createJWT(user)
		res.json({ token: token, todos: todos, id: user.id })
	} catch (error) {
		res.send(500)
	}
})
router.post('/login', async (req, res) => {
	try {
		const user = await prisma.user.findFirst({
			where: { username: req.body.username },
		})

		if (!user) {
			res.json({ error: 'No User Found', status: 404 })
		} else {
			const isValid = await comparePasswords(req.body.password, user.password)
			if (!isValid) {
				res.status(401).send('Invalid username or password')
				return
			}
			const todos = await prisma.todo.findMany({
				where: {
					userId: user.id,
					deleted: false,
				},
			})
			const token = createJWT(user)
			res.json({
				token: token,
				todos: todos,
				userId: user.id,
			})
		}
	} catch (error) {
		res.send(500)
	}
})

export default router
