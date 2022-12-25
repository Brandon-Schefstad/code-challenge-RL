import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
	let navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const updateEmail = (e) => setEmail(e.target.value)
	const updatePassword = (e) => setPassword(e.target.value)

	async function postLogin(e) {
		e.preventDefault()
		await axios
			.post('/login', {
				email: email,
				password: password,
			})
			.then((res) => {
				console.log(res)
				navigate('/dashboard')
			})
	}

	return (
		<>
			<form onSubmit={postLogin}>
				<label htmlFor="email">Email</label>
				<input type="text" name="email" onChange={updateEmail} />
				<label htmlFor="password">password</label>
				<input type="text" name="password" onChange={updatePassword} />

				<input type="submit" value="Submit" />
			</form>
		</>
	)
}

export default Login
