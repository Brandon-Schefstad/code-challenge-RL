import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import useAuth from './hooks/useAuth'
import SearchUserForm from './SearchUserForm'
import Todo from './Todo'
const Dashboard = () => {
	const [todos, setTodos] = useState([])
	const [query, setQuery] = useState([])
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
		e.preventDefault()
		await axios
			.post('/todo/postTodo', {
				todo: document.getElementById('todo').value,
				finished: checkBox,
				user: user,
				date: Date.now(),
			})
			.then((res) => {
				setTodos(res.data)

				getTodo()
				setQuery('')
			})
	}
	let todoList
	if (todos) {
		console.log(todos)
		todoList = todos.map((entry) => {
			console.log(entry.date)
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
			<div className="px-12 py-6">
				<h1 className="text-4xl mb-8">User: {user}</h1>
				<SearchUserForm />
				<form
					className="card flex flex-cols gap-2 w-[40rem] mt-8 bg-slate-600 py-8 px-16"
					onSubmit={postTodo}>
					<h2 className="text-3xl">Add a new ToDo</h2>
					<label htmlFor="todo"></label>
					<input
						className="p-2 mt-2"
						type="text"
						name="todo"
						id="todo"
						placeholder="What needs to get done?"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<section className="grid grid-cols-2">
						<label className="text-center mt-4 text-2xl" htmlFor="finished">
							Finished?
						</label>
						<input
							className="mt-4"
							type="checkbox"
							name="finished"
							id="finished"
							onClick={() => {
								setCheckBox(!checkBox)
								console.log(checkBox)
							}}
						/>
					</section>
					<input
						className="btn bg-green-400 hover:text-green-400 text-slate-900 w-[50%] m-auto mt-4"
						type="submit"
						value="Add Todo"
					/>
				</form>

				<section className="grid grid-cols-4 gap-8 py-12">{todoList}</section>
				<section className="w-80 grid grid-cols-2 gap-4 fixed bottom-8 left-8">
					<button className="btn">
						<Link to="/logout">Logout</Link>
					</button>
					<button className="btn">
						<Link to="/allTodos">See all Todos</Link>
					</button>
				</section>
			</div>
		)
	}
}

export default Dashboard
