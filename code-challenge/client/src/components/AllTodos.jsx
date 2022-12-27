import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Todo from './Todo'
const AllTodos = () => {
	const [allTodos, setAllTodos] = useState(null)
	async function getAllTodos() {
		await axios.get(`/api/todo/getAllTodos`).then((res) => {
			setAllTodos(res.data)
		})
	}
	useEffect(() => {
		getAllTodos()
	}, [])
	if (allTodos) {
		return (
			<section className="grid grid-cols-3 gap-8 p-8">
				<Link to="/dashboard">
					<button className={'col-start-2 btn w-[12rem] m-auto'}>Back</button>
				</Link>
				<h1 className={'col-span-3 m-auto text-5xl mb-8 mt-[-2rem] text-left'}>
					All Todos!
				</h1>

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
			</section>
		)
	}
}

export default AllTodos
