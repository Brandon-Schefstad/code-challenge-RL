import { useParams } from 'react-router-dom'

import axios from 'axios'
import { useEffect, useState } from 'react'

const SingleTod = ({}) => {
	const [singleTodo, setSingleTodo] = useState()
	let { _id } = useParams()
	async function getSingleTodo() {
		await axios.get(`/todo/${_id}`).then((res) => {
			setSingleTodo(res.data)
		})
	}
	useEffect(() => {
		getSingleTodo()
	}, [])
	if (singleTodo) {
		console.log(singleTodo.finished)
		return (
			<>
				<h1>_id: {singleTodo._id}</h1>
				<h1>user_id: {singleTodo.user}</h1>
				<h1>text: {singleTodo.todo}</h1>
				<h1>date: {singleTodo.date}</h1>
				<h1>completed: {JSON.stringify(singleTodo.finished)}</h1>
			</>
		)
	}
}

export default SingleTod
