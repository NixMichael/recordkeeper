import axios from 'axios'

export const deleteUsers = (arr) => async (dispatch) => {
  const { data } = await axios({
    method: 'delete',
    url: 'http://localhost:3004/deleteuser',
    headers: { 'Content-Type': 'application/json'},
    data: {
      toDelete: arr
    }
  })

  dispatch({
    type: 'UPDATED_USERS_LIST',
    payload: data
  })
}

export const addUser = (arr) => async (dispatch) => {
  const { data } = await axios({
    method: 'post',
    url: 'http://localhost:3004/newuser',
    headers: { 'Content-Type': 'application/json'},
    data: {
      usertype: arr[0],
      initials: arr[1],
      name: arr[2]
    }
  })

  dispatch({
    type: 'NEW_USER',
    payload: data
  })
}