import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SearchUserForm = () => {
	const [user, setUser] = useState()
	const [closed, setClosed] = useState(false)
	const [email, setEmail] = useState('')
	async function fetchUser(e) {
		e.preventDefault()

		axios.get(`/api/user/${email}`).then((res) => {
			setUser(res.data)
		})
		setClosed(false)
	}
	function handleChange(e) {
		setEmail(e.target.value)
	}
	let userProfile

	if (user) {
		if (closed) {
			userProfile = <></>
		} else {
			userProfile = (
				<section className=" m-auto card bg-slate-300 mt-8 p-12  relative">
					<h2 className="text-6xl mb-8 text-slate-900">
						Todos for {user.email}
					</h2>
					<FontAwesomeIcon
						icon={faCircleXmark}
						className="text-red-900 text-3xl absolute top-8 right-8 cursor-pointer font-bold"
						onClick={() => setClosed(true)}
					/>

					<ul className="grid grid-cols-3 gap-4">
						{user.todos.map((entry) => {
							return (
								<section class="card bg-slate-700 p-4">
									<Link to={`/todo/${entry._id}`}>
										<h3 className="text-2xl text-center mb-4 underline">
											{entry.todo}
										</h3>
									</Link>
									<h4>Finished? {entry.finished ? 'Yes' : 'No'}</h4>
									<h4>ID Number: {entry._id}</h4>
								</section>
							)
						})}
					</ul>
				</section>
			)
		}
	}
	return (
		<>
			<form
				className="w-96 flex gap-2 bg-slate-300 card p-8"
				onSubmit={fetchUser}>
				<span className="text-slate-900">Find a User:</span>
				<label htmlFor="user"></label>
				<input
					className={'p-2'}
					type="text"
					name="user"
					id="user"
					placeholder="Enter email"
					onChange={handleChange}
				/>
				<input className="btn" type="submit" value="Search" />
			</form>
			{userProfile}
		</>
	)
}

export default SearchUserForm
