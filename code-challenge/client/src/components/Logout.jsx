import { Navigate } from 'react-router-dom'
const Logout = () => {
	window.localStorage.removeItem('User')
	return <Navigate to={'/'} />
}

export default Logout
