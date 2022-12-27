import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const navigate = useNavigate()

	const updateEmail = (e) => setEmail(e.target.value)
	const updatePassword = (e) => setPassword(e.target.value)
	const matchPassword = (e) => setConfirmPassword(e.target.value)
	async function postSignUp(e) {
		console.log('sign up')
		e.preventDefault()
		if (password === confirmPassword) {
			await axios
				.post('https://backend-for-rl.cyclic.app/signup', {
					email: email,
					password: password,
					confirmPassword: confirmPassword,
				})
				.then(function (response) {
					console.log(response)
					window.localStorage.setItem('User', email)
					window.localStorage.setItem('_id', response.data._id)
					navigate('/dashboard')
				})
		}
	}
	const inputStyling = 'input input-bordered w-full max-w-sm'
	return (
		<div className="grid w-[80rem] m-auto text-4xl card card-compact bg-gray-600 py-20 my-20">
			<form
				className="grid grid-cols-2 w-[60rem] gap-12 m-auto  place-self-center"
				onSubmit={postSignUp}>
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
				<label htmlFor="confirm">Confirm Password</label>
				<input
					className={inputStyling}
					type="text"
					name="confirm"
					onChange={matchPassword}
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

export default SignUp
