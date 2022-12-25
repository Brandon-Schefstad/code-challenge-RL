import axios from 'axios'
import React, { useState } from 'react'

const SignUp = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const updateEmail = (e) => setEmail(e.target.value)
	const updatePassword = (e) => setPassword(e.target.value)
	const matchPassword = (e) => setConfirmPassword(e.target.value)

	async function postSignUp(e) {
		e.preventDefault()
		if (password === confirmPassword) {
			await axios
				.post('/signup', {
					email: email,
					password: password,
					confirmPassword: confirmPassword,
				})
				.then(function (response) {
					console.log(response.data.message)
				})
		}
	}

	return (
		<>
			<form onSubmit={postSignUp}>
				<label htmlFor="email">Email</label>
				<input type="text" name="email" onChange={updateEmail} />
				<label htmlFor="password">password</label>
				<input type="text" name="password" onChange={updatePassword} />
				<label htmlFor="confirm">confirm password</label>
				<input type="text" name="confirm" onChange={matchPassword} />
				<input type="submit" value="Submit" />
			</form>
		</>
	)
}

export default SignUp
