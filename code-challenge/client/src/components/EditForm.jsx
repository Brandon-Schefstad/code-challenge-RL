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
			await axios.put(`/api/todo/editTodo/${_id}`, todo).then((res) => {
				setTodoObject(todo)
				setEdit(!edit)
				getTodo()
			})
		} catch {}
	}

	return (
		<li
			key={todo_id}
			className="card bg-gray-200 text-white p-4 flex flex-col ">
			<form onSubmit={editTodoReq}>
				<label htmlFor="todo"></label>
				<input
					className="p-2 m-auto w-[75%] block text input input-bordered input-success w-full max-w-xs"
					type="text"
					name="todo"
					id="todoEdit"
					placeholder={todo}
				/>

				<section className="mt-4 mb-4 m-auto p-2 py-3 bg-black input input-bordered input-success w-full max-w-xs  grid grid-cols-2 text-center">
					<label className="" htmlFor="finished">
						Finished?
					</label>
					<input
						type="checkbox"
						name="finished"
						id="finished"
						onClick={() => {
							setCheckBox(!checkBox)
						}}
					/>
				</section>
				<input
					className="btn bg-green-400 hover:text-green-400 text-slate-900 w-[50%] block mt-4 m-auto"
					type="submit"
					value="Submit Edit"
				/>
			</form>
		</li>
	)
}

export default EditForm
