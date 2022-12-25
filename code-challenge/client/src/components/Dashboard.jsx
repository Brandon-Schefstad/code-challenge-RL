import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import useAuth from './hooks/useAuth'

const Dashboard = () => {
	const user = useAuth()
	if (!user) {
		return <Navigate to="/" replace="true" />
	}
	return (
		<>
			<div>{user}</div>
			<button onClick={() => useAuth('remove')}>
				<Link to="/">Logout</Link>
			</button>
		</>
	)
}

export default Dashboard
