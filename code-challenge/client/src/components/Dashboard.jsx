import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import useAuth from './hooks/useAuth'
import Todo from './Todo'
const Dashboard = () => {
	const [todos, setTodos] = useState([])
	const user = useAuth()
	if (!user) {
		return <Navigate to="/" replace="true" />
	}
	async function getTodo() {
		await axios.get(`/todo/getTodo/${user}`).then((res) => {
			console.log(res)
			setTodos(res.data)
			console.log(todos)
		})
	}
	let todoList
	useEffect(() => {
		getTodo()
	}, [])

	async function postTodo(e) {
		e.preventDefault()
		await axios
			.post('/todo/postTodo', {
				todo: document.getElementById('todo').value,
				finished: document.getElementById('finished').value,
				user: user,
			})
			.then((res) => {
				// console.log(res.data)
				setTodos(res.data)
				getTodo()
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

			{todos.map((todo) => {
				return (
					<Todo
						key={todo._id}
						todo={todo.todo}
						date={todo.date}
						finished={todo.finished}
						_id={todo._id}
					/>
				)
			})}
		</>
	)
}

export default Dashboard
