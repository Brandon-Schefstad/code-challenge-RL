import * as React from 'react'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'

import Dashboard from './components/Dashboard'
import Index from './components/Index'
import Login from './components/Login'
import SignUp from './components/SignUp'

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Index />}></Route>
			<Route path="login" element={<Login />}></Route>
			<Route path="signup" element={<SignUp />}></Route>
			<Route path="dashboard" element={<Dashboard />}></Route>
		</>
	)
)

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}

export default App
