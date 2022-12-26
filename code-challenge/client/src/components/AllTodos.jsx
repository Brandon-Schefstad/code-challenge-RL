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
			<section className="grid grid-cols-2 gap-12 p-8">
				<h1 className={'col-start-1 text-5xl'}>All Todos!</h1>
				<button className={'col-start-2 btn w-[24rem] m-auto'}>
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
			</section>
		)
	}
}

export default AllTodos
