import axios from 'axios'
export const loginUser = (email, password) => async(dispatch) => {

  console.log(email, password)
  const accepted = await axios({
    method: 'post',
    url: 'https://morning-basin-38652.herokuapp.com/signin',
    headers: {'Content-Type': 'application/json'},
    data: {
      email, password
    }
  })

  console.log('Accepted:', accepted.data)

  return {
    type: 'LOGIN_USER',
    payload: accepted.data
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER'
  }
}