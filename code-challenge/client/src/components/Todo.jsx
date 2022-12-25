import React from 'react'

const Todo = ({ todo, date, finished, _id }) => {
	return (
		<>
			<li key={_id}>
				<h2>{todo}</h2>
				<h3>{date}</h3>
				<h4>{finished}</h4>
				<span>DELETE</span>
			</li>
		</>
	)
}

export default Todo
