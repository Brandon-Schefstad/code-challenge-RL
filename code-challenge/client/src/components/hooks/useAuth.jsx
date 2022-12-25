const useAuth = (action, User) => {
	if (action === 'get') {
		return window.localStorage.getItem('User')
	}
	if (action === 'set') {
		window.localStorage.setItem('User', User)
		return true
	}
	if (action === 'remove') {
		window.localStorage.removeItem('User')
	}
}

export default useAuth
