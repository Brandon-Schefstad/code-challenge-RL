module.exports = {
	async handleSignUp(req, res) {
		console.log(req.body)
		res.json({ Hello: 'World' })
	},
}
