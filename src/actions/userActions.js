import axios from 'axios'
export const loginUser = (email, password) => async(dispatch) => {

  try {
    const accepted = await axios({
      method: 'post',
      url: 'https://morning-basin-38652.herokuapp.com/signin',
      headers: {'Content-Type': 'application/json'},
      data: {
        email, password
      }
    })

    // if (password === '') {
    //   console.log('ask for a password')
    //   const setPassword = prompt('Choose a password:')
    //   await axios({
    //     method: 'post',
    //     url: 'https://morning-basin-38652.herokuapp.com/register',
    //     headers: {'Content-Type': 'application/json'},
    //     data: {
    //       email, setPassword
    //     }
    //   })
    // }

    dispatch({
      type: 'LOGIN_USER',
      payload: accepted.data
    })
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILED',
      payload: error.message
    })
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER'
  }
}

export const registerUser = (email, password) => async(dispatch) => {
  try {
    const result = axios({
      method: 'post',
      url: 'https://morning-basin-38652.herokuapp.com/register',
      headers: {'Content-Type': 'application/json'},
      data: {
        email, password
      }
    })

    dispatch({
      type: 'PASSWORD_ACCEPTED',
      payload: result.data
    })
  } catch (error) {
    dispatch({
      type: 'PASSWORD_DECLINED',
      payload: error.message
    })
  }
}