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

    
    if (password === '') {
      let newPassword = prompt('Set a password')
      let confirmPassword = prompt('Confirm password')

      if (newPassword === confirmPassword) {
        await axios({
          method: 'post',
          url: 'https://morning-basin-38652.herokuapp.com/register',
          headers: {'Content-Type': 'application/json'},
          data: {
            email, newPassword
          }
        })
      } else {
        alert('Passwords do not match')
        dispatch({
          type: 'LOGIN_FAILED',
          payload: false
        })
      }


      alert('Thank you. Your password has been set.')
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