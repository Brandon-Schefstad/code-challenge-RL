const User = require('../models/User')
exports.postTodo = async (req, res) => {
	try {
		console.log(req.body)
		const user = await User.findOne({
			email: req.body.user,
		})
		await User.updateOne(
			{
				email: req.body.user,
			},
			{
				$push: {
					todos: {
						todo: req.body.todo,
						date: Date.now(),
						finished: req.body.finished,
					},
				},
			}
		)

		console.log(user.schema.tree.todos)
		console.log(user.todos)
		res.sendStatus(200)
	} catch {
		res.sendStatus(404)
	}
}
