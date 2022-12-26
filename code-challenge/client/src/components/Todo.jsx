import axios from 'axios'
import React, { useState } from 'react'
import EditForm from './EditForm'

const Todo = ({ todo, date, finished, _id, getTodo, user }) => {
	const [todoObject, setTodoObject] = useState({
		todo: todo,
		date: date,
		finished,
		_id: _id,
		user: user,
	})
	const [snooze, setSnooze] = useState(false)
	const [edit, setEdit] = useState(false)

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
	function toggleEdit() {
		setEdit(!edit)
	}

	if (user_idMatches) {
		if (snooze) {
			return <></>
		}
		if (edit) {
			return (
				<EditForm
					todo_id={todoObject._id}
					todo={todoObject.todo}
					user={todoObject.user}
					setEdit={setEdit}
					setTodoObject={setTodoObject}
					edit={edit}
					getTodo={getTodo}
				/>
			)
		}
		console.log(todoObject.finished)
		return (
			<>
				<li key={todoObject._id}>
					<h2>{todoObject.todo}</h2>
					<h3>{date.slice(0, 10)}</h3>
					<h4>{JSON.stringify(todoObject.finished)}</h4>
					<button onClick={deleteTodo}>DELETE</button>
					<button onClick={snoozeTodo}>SNOOZE</button>
					<button onClick={toggleEdit}>EDIT</button>
				</li>
			</>
		)
	}
}

export default Todo
