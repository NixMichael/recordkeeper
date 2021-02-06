export const logInReducer = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
        return action.payload
    case 'LOGIN_FAILED':
        return false
    case 'LOGOUT_USER':
      return false
    default:
      return state
  }
}