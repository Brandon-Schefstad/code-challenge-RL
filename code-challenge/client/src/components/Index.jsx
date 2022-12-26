import React from 'react'
import { Link } from 'react-router-dom'

const Index = () => {
	const authButton = window.localStorage.getItem('_id') ? (
		<>
			{' '}
			<button className="btn ">
				<Link to="/logout">Logout</Link>
			</button>
		</>
	) : (
		<>
			{' '}
			<button className="btn">
				<Link to="/login">Login</Link>
			</button>
		</>
	)
	return (
		<div className="grid">
			<section className="grid grid-cols-2 text-3xl w-80 gap-4 m-auto mt-20">
				<button className="btn">
					<Link to="/signup">Sign Up</Link>
				</button>
				{authButton}
			</section>
		</div>
	)
}

export default Index
