import React from 'react'
import { Link } from 'react-router-dom'

const Index = () => {
	return (
		<>
			<section>
				<button>
					<Link to="/signup">Sign Up</Link>
				</button>
				<button>
					<Link to="/login">Login</Link>
				</button>
			</section>
		</>
	)
}

export default Index
