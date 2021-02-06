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

    let passwordA = ''
    // let passwordB = ''

    if (password === '') {
      passwordA = prompt('Set a password')
      // passwordB = prompt('Confirm password')

      await axios({
        method: 'post',
        url: 'https://morning-basin-38652.herokuapp.com/register',
        headers: {'Content-Type': 'application/json'},
        data: {
          email, passwordA
        }
      })
    }

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