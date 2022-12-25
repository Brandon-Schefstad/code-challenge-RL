const useAuth = (action, User) => {
	return window.localStorage.getItem('User')
}
export default useAuth
