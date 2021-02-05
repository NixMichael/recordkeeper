export const logInReducer = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
        console.log(`Accepted in reducer: ${action.payload}`)
        return action.payload
    case 'LOGIN_FAILED':
        console.log(`incorrect credentials: ${action.payload}`)
        return false
    case 'LOGOUT_USER':
      return false
    default:
      return state
  }
}