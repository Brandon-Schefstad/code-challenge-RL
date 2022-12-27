import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import useAuth from './hooks/useAuth'

const Login = () => {
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const updateEmail = (e) => setEmail(e.target.value)
	const updatePassword = (e) => setPassword(e.target.value)

	async function postLogin(e) {
		e.preventDefault()
		await axios
			.post('/api/auth/login', {
				email: email,
				password: password,
			})
			.then((res) => {
				console.log(res)
				window.localStorage.setItem('User', email)
				window.localStorage.setItem('_id', res.data)
				navigate('/dashboard')
			})
	}
	const inputStyling = 'input input-bordered w-full max-w-sm'
	return (
		<div className="grid w-[80rem] m-auto text-4xl card card-compact bg-gray-600 py-20 my-20">
			<form
				className="grid grid-cols-2 w-[60rem] gap-12 m-auto  place-self-center"
				onSubmit={postLogin}>
				<label htmlFor="email">Email</label>
				<input
					className={inputStyling}
					type="text"
					name="email"
					onChange={updateEmail}
				/>
				<label htmlFor="password">Password</label>
				<input
					className={inputStyling}
					type="text"
					name="password"
					onChange={updatePassword}
				/>

				<input
					className={
						'col-span-2 btn py-2 m-auto w-[40rem] border-2 border-solid border-rose-300 text-2xl mt-8'
					}
					type="submit"
					value="Submit"
				/>
			</form>
		</div>
	)
}

export default Login
