import * as React from 'react'
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'

import AllTodos from './components/AllTodos'
import Dashboard from './components/Dashboard'
import Index from './components/Index'
import Login from './components/Login'
import Logout from './components/Logout'
import SignUp from './components/SignUp'
import SingleTodo from './components/SingleTodo'

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Index />}></Route>
			<Route path="/login" element={<Login />}></Route>
			<Route path="/logout" element={<Logout />}></Route>
			<Route path="/signup" element={<SignUp />}></Route>
			<Route path="/dashboard" element={<Dashboard />}></Route>
			<Route path="/allTodos" element={<AllTodos />}></Route>
			<Route path="/todo/:_id" element={<SingleTodo />}></Route>
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
