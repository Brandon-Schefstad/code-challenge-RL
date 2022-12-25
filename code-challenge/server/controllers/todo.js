const Todo = require('../models/Todo')
const User = require('../models/User')
exports.postTodo = async (req, res) => {
	try {
		console.log('postTodos')
		const user = await User.findOne({
			email: req.body.user,
		})
		const todo = await Todo.create({
			user: user._id,
			todo: req.body.todo,
			date: Date.now(),
			finished: req.body.finished,
		})
		await user.updateOne({
			$push: { todos: todo },
		})

		res.send(user.todos)
	} catch {
		res.sendStatus(404)
	}
}
exports.getTodo = async (req, res) => {
	console.log(req.params)
	const user = await User.findOne({
		email: req.params.user,
	}).populate({ path: 'todos' })
	console.log(user)
	res.send(user.todos)
}
exports.deleteTodo = async (req, res) => {
	console.log(req)
}
