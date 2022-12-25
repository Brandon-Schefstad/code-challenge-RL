import axios from 'axios'
import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import useAuth from './hooks/useAuth'

const Dashboard = () => {
	const user = useAuth()
	if (!user) {
		return <Navigate to="/" replace="true" />
	}
	async function postTodo(e) {
		e.preventDefault()
		await axios
			.post('/todo/postTodo', {
				todo: document.getElementById('todo').value,
				finished: document.getElementById('finished').value,
				user: user,
			})
			.then((res) => {
				console.log(res)
			})
	}
	return (
		<>
			<div>{user}</div>
			<form onSubmit={postTodo}>
				<label htmlFor="todo"></label>
				<input type="text" name="todo" id="todo" />
				<label htmlFor="finished"></label>
				<input type="checkbox" name="finished" id="finished" />
				<input type="submit" value="Add Todo" />
			</form>

			<button onClick={() => useAuth('remove')}>
				<Link to="/">Logout</Link>
			</button>
		</>
	)
}

export default Dashboard
