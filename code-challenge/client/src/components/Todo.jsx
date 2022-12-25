import axios from 'axios'
import React from 'react'

const Todo = ({ todo, date, finished, _id }) => {
	async function deleteTodo() {
		await axios.delete('/todo/deleteTodo', { _id: _id }).then((res) => {
			console.log(res)
		})
	}
	const date2 = date
	return (
		<>
			<li key={_id}>
				<h2>{todo}</h2>
				<h3>{date2.slice(0, 10)}</h3>
				<h4>{finished}</h4>
				<button onClick={deleteTodo}>DELETE</button>
			</li>
		</>
	)
}

export default Todo
