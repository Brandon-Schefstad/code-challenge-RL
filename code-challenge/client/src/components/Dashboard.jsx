import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import useAuth from './hooks/useAuth'
import Todo from './Todo'
const Dashboard = () => {
	const [todos, setTodos] = useState([])
	const [checkBox, setCheckBox] = useState(false)

	const user = useAuth()
	if (!user) {
		return <Navigate to="/" replace="true" />
	}
	async function getTodo() {
		await axios.get(`/todo/getTodo/${user}`).then((res) => {
			setTodos(res.data)
		})
	}

	useEffect(() => {
		getTodo()
	}, [])

	async function postTodo(e) {
		console.log(document.querySelector('#finished').value)
		e.preventDefault()
		await axios
			.post('/todo/postTodo', {
				todo: document.getElementById('todo').value,
				finished: checkBox,
				user: user,
			})
			.then((res) => {
				setTodos(res.data)
				getTodo()
			})
	}
	let todoList
	if (todos) {
		todoList = todos.map((entry) => {
			return (
				<Todo
					key={entry._id}
					user={entry.user}
					todo={entry.todo}
					date={entry.date}
					finished={entry.finished}
					_id={entry._id}
					getTodo={getTodo}
				/>
			)
		})
		return (
			<>
				<div>{user}</div>

				<form onSubmit={postTodo}>
					<label htmlFor="todo"></label>
					<input type="text" name="todo" id="todo" />
					<label htmlFor="finished">|Finished|</label>
					<input
						type="checkbox"
						name="finished"
						id="finished"
						onClick={() => {
							setCheckBox(!checkBox)
							console.log(checkBox)
						}}
					/>
					<input type="submit" value="Add Todo" />
				</form>

				<button onClick={() => useAuth('remove')}>
					<Link to="/">Logout</Link>
				</button>
				<button>
					<Link to="/allTodos">See all Todos</Link>
				</button>
				{todoList}
			</>
		)
	}
}

export default Dashboard
