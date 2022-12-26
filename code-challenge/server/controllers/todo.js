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
	const user = await User.findOne({
		email: req.params.user,
	}).populate({ path: 'todos' })

	res.send(user.todos)
}
exports.deleteTodo = async (req, res) => {
	try {
		await Todo.deleteOne({
			_id: req.params._id,
		})
		res.sendStatus(200)
	} catch {
		res.sendStatus(404)
	}
}
exports.getAllTodos = async (req, res) => {
	try {
		const todos = await Todo.find({})
		res.send(todos)
	} catch {
		res.sendStatus(404)
	}
}
