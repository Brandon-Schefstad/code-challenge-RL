import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const Index = () => {
	axios.get('/').then((res) => console.log(res.data))
	const authButton = window.localStorage.getItem('_id') ? (
		<>
			{' '}
			<Link to="/logout">
				<button className="btn ">Logout</button>
			</Link>
		</>
	) : (
		<>
			<Link to="/login">
				<button className="btn">Login</button>
			</Link>
		</>
	)
	return (
		<div className="grid">
			<section className="grid grid-cols-2 text-3xl w-80 gap-4 m-auto mt-20">
				<Link to="/signup">
					<button className="btn">Sign Up</button>
				</Link>
				{authButton}
			</section>
		</div>
	)
}

export default Index
