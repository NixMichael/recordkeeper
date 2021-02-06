export const logInReducer = (state = [false, false], action) => {
  switch (action.type) {
    case 'LOGIN_USER':
        return action.payload
    case 'LOGOUT_USER':
      return [false, false]
    default:
      return state
  }
}