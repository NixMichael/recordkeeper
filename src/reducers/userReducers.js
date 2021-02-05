export const logInReducer = (state = false, action) => {
  console.log(`Accepted in reducer: ${action.payload}`)
  switch (action.type) {
    case 'LOGIN_USER':
        return action.payload
    case 'LOGOUT_USER':
      return false
    default:
      return state
  }
}