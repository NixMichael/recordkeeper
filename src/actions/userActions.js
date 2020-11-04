export const loginUser = (username, password) => {
  return {
    type: 'LOGIN_USER',
    payload: {username, password}
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER'
  }
}