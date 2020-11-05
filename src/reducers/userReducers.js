export const logInReducer = (state = false, action) => {
  // console.log('defined:', action.type)
  switch (action.type) {
    case 'LOGIN_USER':
        return true
    case 'LOGOUT_USER':
      return false
    default:
      return state
  }
}