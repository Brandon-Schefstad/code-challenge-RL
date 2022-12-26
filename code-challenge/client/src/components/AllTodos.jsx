import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Todo from './Todo'
const AllTodos = () => {
	const [allTodos, setAllTodos] = useState(null)
	async function getAllTodos() {
		await axios.get(`/todo/getAllTodos`).then((res) => {
			setAllTodos(res.data)
		})
	}
	useEffect(() => {
		getAllTodos()
	}, [])
	if (allTodos) {
		return allTodos.map((entry) => {
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
		})
	}
	return <div>hello</div>
}

export default AllTodos
