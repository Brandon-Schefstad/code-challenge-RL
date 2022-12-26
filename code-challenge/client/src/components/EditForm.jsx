import axios from 'axios'
import React, { useState } from 'react'

const EditForm = ({
	_id,
	todo,
	user,
	todo_id,
	setEdit,
	edit,
	setTodoObject,
	getTodo,
}) => {
	console.log(_id)
	const [checkBox, setCheckBox] = useState(false)
	async function editTodoReq(e) {
		e.preventDefault()
		try {
			const todo = {
				todo: document.querySelector('#todoEdit').value,
				finished: checkBox,
				user: window.localStorage.getItem('_id'),
				_id: todo_id,
			}
			await axios.put(`/todo/editTodo/${_id}`, todo).then((res) => {
				setTodoObject(todo)
				setEdit(!edit)
				getTodo()
			})
		} catch {}
	}

	return (
		<li key={todo_id}>
			<form onSubmit={editTodoReq}>
				<label htmlFor="todo"></label>
				<input type="text" name="todo" id="todoEdit" placeholder={todo} />
				<label htmlFor="finished"></label>
				<input
					type="checkbox"
					name="finished"
					id="finished"
					onClick={() => {
						setCheckBox(!checkBox)
					}}
				/>
				<input type="submit" value="Edit Todo" />
			</form>
		</li>
	)
}

export default EditForm
