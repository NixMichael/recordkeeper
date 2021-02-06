import axios from 'axios'
export const loginUser = (email, password) => async(dispatch) => {

  let accepted = false

  try {
    const response = await axios({
      method: 'post',
      url: 'https://morning-basin-38652.herokuapp.com/signin',
      headers: {'Content-Type': 'application/json'},
      data: {
        email, password
      }
    })

    accepted = response.data
    
    if (accepted && password === '') {
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

        alert('Thank you. Your password has been set.')

      } else {
        alert('Passwords do not match')
        accepted = false
      }
    } else if (!accepted) {
      alert('Incorrect login details')
    }

    dispatch({
      type: 'LOGIN_USER',
      payload: accepted
    })

  } catch (error) {
    alert('Please try again')
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