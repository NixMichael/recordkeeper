export const login = (state = { loggedIn: false }, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return { loggedIn: true }
    case 'LOGOUT_USER':
      return { loggedIn: false }
    default:
      return state
  }
}