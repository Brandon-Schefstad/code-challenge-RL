import { useParams } from 'react-router-dom'

import axios from 'axios'
import { useEffect, useState } from 'react'

const SingleTodo = ({}) => {
	const [singleTodo, setSingleTodo] = useState()
	let { _id } = useParams()
	async function getSingleTodo() {
		await axios.get(`/api/todo/${_id}`).then((res) => {
			setSingleTodo(res.data)
		})
	}
	useEffect(() => {
		getSingleTodo()
	}, [])
	if (singleTodo) {
		return (
			<section className="p-8">
				<h1>To Do #{singleTodo._id}</h1>
				<h3>user_id: {singleTodo.user}</h3>
				<h3>text: {singleTodo.todo}</h3>
				<h3>date: {singleTodo.date}</h3>
				<h3>completed: {JSON.stringify(singleTodo.finished)}</h3>
			</section>
		)
	}
}

export default SingleTodo
