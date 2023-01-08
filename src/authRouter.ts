import { Router } from 'express'
import { prisma } from './db'
const { comparePasswords, createJWT, hashPassword } = require('./modules/auth')
const router = Router()

router.post('/signup', async (req, res) => {
	const hash = await hashPassword(req.body.password)
	const user = await prisma.user.create({
		data: {
			email: req.body.email,
			password: hash,
			username: req.body.username,
		},
	})

	const token = createJWT(user)
	res.json({ token })
})
router.post('/login', async (req, res) => {
	const user = await prisma.user.findFirst({
		where: { username: req.body.username },
	})

	if (user) {
		console.log(req.body.password === user.password)
		const isValid = await comparePasswords(req.body.password, user.password)
		if (!isValid) {
			res.status(401)
			res.send('Invalid username or password')
			return
		}
		const todos = await prisma.todo.findMany({
			where: {
				userId: user.id,
				deleted: false,
			},
		})
		const deletedTodos = await prisma.todo.findMany({
			where: {
				userId: user.id,
				deleted: true,
			},
		})
		const token = createJWT(user)
		res.json({
			token: token,
			todos: todos,
			userId: user.id,
			deleted: deletedTodos,
		})
	}
})

export default router
