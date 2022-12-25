import React from 'react'
import { useLocation } from 'react-router'

const Dashboard = () => {
	const location = useLocation()
	const email = location.state.email
	return <div>{email}</div>
}

export default Dashboard
