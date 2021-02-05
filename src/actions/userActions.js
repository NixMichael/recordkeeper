export const loginUser = (email, password) => async(dispatch) => {

  const accepted = await axios({
    method: 'post',
    url: 'https://morning-basin-38652.herokuapp.com/signin',
    headers: {'Content-Type': 'application/json'},
    data: {
      email, password
    }
  })

  return {
    type: 'LOGIN_USER',
    payload: accepted
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER'
  }
}