import axios from 'axios'
import React, { useState } from 'react'
import { usePrompt } from './hooks/usePrompt'
const AddNewToDoForm = ({
	query,
	setQuery,
	checkBox,
	setCheckBox,
	setTodos,
	user,
}) => {
	const [placeholder, setPlaceholder] = useState(usePrompt())

	async function getTodo() {
		await axios.get(`/api/todo/getTodo/${user}`).then((res) => {
			setTodos(res.data)
		})
	}
	async function postTodo(e) {
		e.preventDefault()
		await axios
			.post('/api/todo/postTodo', {
				todo: document.getElementById('todo').value,
				finished: checkBox,
				user: user,
				date: Date.now(),
			})
			.then((res) => {
				setTodos(res.data)
				getTodo()
				setQuery('')
				setPlaceholder(usePrompt())
			})
	}

	return (
		<form
			className="card flex flex-cols gap-2 w-[34rem] mt-8 bg-slate-600 py-8 px-16"
			onSubmit={postTodo}>
			<h2 className="text-3xl">Add a new ToDo</h2>
			<label htmlFor="todo"></label>
			<input
				className="p-2 mt-2"
				type="text"
				name="todo"
				id="todo"
				placeholder={placeholder ? placeholder : 'Good Luck!'}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<section className="grid grid-cols-2">
				<label className="text-center mt-4 text-2xl" htmlFor="finished">
					Finished?
				</label>
				<input
					className="mt-4"
					type="checkbox"
					name="finished"
					id="finished"
					onClick={() => {
						setCheckBox(!checkBox)
						console.log(checkBox)
					}}
				/>
			</section>
			<input
				className="btn bg-green-400 hover:text-green-400 text-slate-900 w-[50%] m-auto mt-4"
				type="submit"
				value="Add Todo"
			/>
		</form>
	)
}

export default AddNewToDoForm
