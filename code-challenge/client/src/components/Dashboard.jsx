import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import AddNewToDoForm from './AddNewToDoForm'
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
		await axios.get(`/api/todo/getTodo/${user}`).then((res) => {
			setTodos(res.data)
		})
	}

	useEffect(() => {
		getTodo()
	}, [])

	let todoList
	if (todos) {
		todoList = todos.map((entry) => {
			console.log(entry.user)
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
			<div className="px-12 pt-6 py-24 max-w-[1400px] m-auto">
				<h1 className="text-4xl mb-8">Current User: {user}</h1>
				<SearchUserForm />
				<AddNewToDoForm
					setQuery={setQuery}
					setCheckBox={setCheckBox}
					checkBox={checkBox}
					query={query}
					setTodos={setTodos}
					getTodo={getTodo}
					user={user}
				/>
				<section className="grid grid-cols-3 gap-8 py-8">{todoList}</section>
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
