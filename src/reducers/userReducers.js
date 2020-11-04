export const logInReducer = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      if (action.payload.username === 'bob' && action.payload.password === 'bob') {
        return true
      } else {
        alert('nope')
        return state
      }
    case 'LOGOUT_USER':
      return false
    default:
      return state
  }
}