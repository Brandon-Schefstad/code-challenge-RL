import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EditForm from './EditForm'

const Todo = ({ todo, finished, _id, getTodo, user }) => {
	const [todoObject, setTodoObject] = useState({
		todo: todo,
		finished,
		_id: _id,
		user: user,
	})
	const [snooze, setSnooze] = useState(false)
	const [edit, setEdit] = useState(false)

	const user_id = window.localStorage.getItem('_id')
	const user_idMatches = user_id === user
	console.log(user)
	console.log(user_id)
	async function deleteTodo() {
		await axios.delete(`/api/todo/deleteTodo/${_id}`).then((res) => {
			snoozeTodo()
		})
	}
	async function snoozeTodo() {
		setSnooze(!snooze)
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
		let finishedHeading = todoObject.finished === true ? 'Finished' : 'Not Yet'
		return (
			<div className="card bg-gray-400 text-slate-900 p-4 flex flex-col ">
				<section key={todoObject._id} className="">
					<Link to={`/todo/${todoObject._id}`}>
						<h3 className="text-2xl text-center mb-4">{todoObject.todo}</h3>
					</Link>

					<h4
						className={'card mb-4 mx-8 py-2 text-xl text-center bg-black '.concat(
							finishedHeading === 'Finished'
								? ' text-green-400'
								: ' text-red-400'
						)}>
						{finishedHeading}
					</h4>
					<section className="buttons w-[20rem] flex  justify-evenly m-auto">
						<button
							className="btn bg-red-400  hover:text-red-400 hover:border-1 hover:border-solid hover:border-red-400 text-slate-900"
							onClick={deleteTodo}>
							DELETE
						</button>
						<button
							className="btn bg-blue-400   hover:text-blue-400 hover:border-1 hover:border-solid hover:border-blue-400 text-slate-900"
							onClick={snoozeTodo}>
							SNOOZE
						</button>
						<button
							className="btn bg-yellow-400   hover:text-yellow-400 hover:border-1 hover:border-solid hover:border-yellow-400 text-slate-900"
							onClick={toggleEdit}>
							EDIT
						</button>
					</section>
					<span className="mt-4 ml-6 block">
						<Link to={`/todo/${todoObject._id}`}>Permalink</Link>
					</span>
				</section>
			</div>
		)
	} else {
		let finishedHeading = todoObject.finished === true ? 'Finished' : 'Not Yet'
		return (
			<div className="card bg-gray-400 text-slate-900 p-4 flex flex-col ">
				<section key={todoObject._id} className="">
					<h3 className="text-2xl text-center mb-4">{todoObject.todo}</h3>

					<h4
						className={'card mb-4 mx-8 py-2 text-xl text-center bg-black '.concat(
							finishedHeading === 'Finished'
								? ' text-green-400'
								: ' text-red-400'
						)}>
						{finishedHeading}
					</h4>
				</section>
				<Link to={`/todo/${todoObject._id}`}>
					<span className="mt-4 block">Permalink to {todoObject._id}</span>
				</Link>
			</div>
		)
	}
}

export default Todo
