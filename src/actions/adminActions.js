import axios from 'axios'
import { NEW_CATEGORY, NEW_DEPARTMENT, NEW_REFERRER, NEW_USER, UPDATE_CATEGORIES_LIST, UPDATE_DEPARTMENTS_LIST, UPDATE_REFERRERS_LIST, UPDATE_USERS_LIST, UPDATE_REPORTS_LIST } from '../CONSTANTS/RECORD_CONSTANTS'

export const deleteItem = (screenRoute, arr) => async (dispatch) => {

  console.log(screenRoute)

  let adminType = ''
  let dispatchType = ''
  switch (screenRoute) {
    case 'editUsers':
      adminType = 'deleteuser'
      dispatchType = UPDATE_USERS_LIST
      break
    case 'editDepartments':
      adminType = 'deletedepartment'
      dispatchType = UPDATE_DEPARTMENTS_LIST
      break
    case 'editReferrers':
      adminType = 'deletereferrer'
      dispatchType = UPDATE_REFERRERS_LIST
      break
    case 'editCategories':
      adminType = 'deletecategory'
      dispatchType = UPDATE_CATEGORIES_LIST
      break
    case 'editReports':
      adminType = 'deletereport'
      dispatchType = UPDATE_REPORTS_LIST
      break
    default:
      adminType = ''
  }

  const { data } = await axios({
    method: 'delete',
    url: `http://localhost:3004/${adminType}`,
    headers: { 'Content-Type': 'application/json'},
    data: {
      toDelete: arr
    }
  })

  dispatch({
    type: dispatchType,
    payload: data
  })
}

export const addUser = (screenRoute, { role, initials, name, departmentName, categoryName, cost }) => async (dispatch) => {

  let adminType = ''
  let dispatchType = ''
  switch (screenRoute) {
    case 'editUsers':
      adminType = 'newuser'
      dispatchType = NEW_USER
      break
    case 'editDepartments':
      adminType = 'newdepartment'
      dispatchType = NEW_DEPARTMENT
      break
    case 'editReferrers':
      adminType = 'newreferrer'
      dispatchType = NEW_REFERRER
      break
    case 'editCategories':
      adminType = 'newcategory'
      dispatchType = NEW_CATEGORY
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