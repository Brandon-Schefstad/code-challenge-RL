import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Todo from './Todo'
const AllTodos = () => {
	const [allTodos, setAllTodos] = useState(null)
	async function getAllTodos() {
		await axios.get(`/todo/getAllTodos`).then((res) => {
			setAllTodos(res.data)
			console.log(res.data)
		})
	}
	useEffect(() => {
		getAllTodos()
	}, [])
	if (allTodos) {
		return (
			<>
				<h1>All Todos!</h1>
				<button>
					<Link to="/dashboard">Back</Link>
				</button>

				{allTodos.map((entry) => {
					return (
						<Todo
							key={entry._id}
							user={entry.user}
							todo={entry.todo}
							date={entry.date}
							finished={entry.finished}
							_id={entry._id}
						/>
					)
				})}
			</>
		)
	}
}

export default AllTodos
