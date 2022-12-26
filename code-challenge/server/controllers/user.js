const User = require('../models/User')

exports.getSingleUser = async (req, res) => {
	console.log(req.params)
	const user = await User.findOne({
		email: req.params.email,
	}).populate({ path: 'todos' })
	console.log(user)
	res.send(user)
}
