import axios from 'axios'
import React, { useState } from 'react'

const Todo = ({ todo, date, finished, _id, getTodo, user }) => {
	const [snooze, setSnooze] = useState(false)
	const [edit, setEdit] = useState(false)
	const [checkBox, setCheckBox] = useState(false)
	const user_id = window.localStorage.getItem('_id')
	const user_idMatches = user_id === user

	async function deleteTodo() {
		await axios.delete(`/todo/deleteTodo/${_id}`).then((res) => {
			snoozeTodo()
		})
	}
	async function snoozeTodo() {
		setSnooze(true)
	}
	function editTodo() {
		console.log(edit)
		setEdit(!edit)
	}

	async function editTodoReq() {
		axios.put('/todos/editTodo')
	}
	if (user_idMatches) {
		if (snooze) {
			return <></>
		}
		if (edit) {
			return (
				<li key={_id}>
					<form onSubmit={editTodoReq}>
						<label htmlFor="todo"></label>
						<input type="text" name="todo" id="todo" value={todo} />
						<label htmlFor="finished"></label>
						<input
							type="checkbox"
							name="finished"
							id="finished"
							onClick={() => {
								setCheckBox(!checkBox)
								console.log(checkBox)
							}}
							value={checkBox}
						/>
						<input type="submit" value="Add Todo" />
					</form>
				</li>
			)
		}
		return (
			<>
				<li key={_id}>
					<h2>{todo}</h2>
					{/* <h3>{date.slice(0, 10)}</h3> */}
					<h4>{finished}</h4>
					<button onClick={deleteTodo}>DELETE</button>
					<button onClick={snoozeTodo}>SNOOZE</button>
					<button onClick={editTodo}>EDIT</button>
				</li>
			</>
		)
	}
}

export default Todo
