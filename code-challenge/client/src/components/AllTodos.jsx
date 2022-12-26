import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Todo from './Todo'
const AllTodos = () => {
	const [allTodos, setAllTodos] = useState([])
	async function getAllTodos() {
		await axios.get(`/todo/getAllTodos`).then((res) => {
			setAllTodos(res.data)
		})
	}
	useEffect(() => {
		getAllTodos()
	}, [])

	return (
		<div>
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
		</div>
	)
}

export default AllTodos
