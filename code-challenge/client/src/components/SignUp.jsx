import React from 'react'

const SignUp = () => {
	return (
		<>
			<form action="/signup" method="GET">
				<label htmlFor="email">Email</label>
				<input type="text" name="email" />
				<label htmlFor="password">password</label>
				<input type="text" name="password" />
				<label htmlFor="confirm">confirm password</label>
				<input type="text" name="confirm" />
				<input type="button" value="Submit" />
			</form>
		</>
	)
}

export default SignUp
