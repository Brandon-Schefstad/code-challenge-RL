import { Navigate } from 'react-router-dom'
const Logout = () => {
	window.localStorage.removeItem('User')
	window.localStorage.removeItem('_id')
	return <Navigate to={'/'} />
}

export default Logout
