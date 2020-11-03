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

export const addUser = (screenRoute, { role, initials, name, departmentName, categoryName, cost }) => async (dispatch) => {

  console.log('sR:', screenRoute)
  let adminType = ''
  let dispatchType = ''
  switch (screenRoute) {
    case 'editUsers':
      adminType = 'newuser'
      dispatchType = 'NEW_USER'
      break
    case 'editDepartments':
      adminType = 'newdepartment'
      dispatchType = 'NEW_DEPARTMENT'
      break
    case 'editReferrers':
      adminType = 'newreferrer'
      dispatchType = 'NEW_REFERRER'
      break
    case 'editCategory':
      adminType = 'newcategory'
      dispatchType = 'NEW_CATEGORY'
      break
    default:
      adminType = ''
  }

  const { data } = await axios({
    method: 'post',
    url: `http://localhost:3004/${adminType}`,
    headers: { 'Content-Type': 'application/json'},
    data: {
      usertype: role,
      initials: initials,
      name: name,
      department: departmentName,
      category: categoryName,
      cost: cost
    }
  })

  dispatch({
    type: dispatchType,
    payload: data
  })
}