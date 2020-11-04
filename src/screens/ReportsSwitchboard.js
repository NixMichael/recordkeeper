import React from 'react'
import { useDispatch } from 'react-redux'
import { chooseRoute } from '../actions/routeActions'
import '../styles/switchboardStyles.scss'

const AdminSwitchboard = () => {

  const dispatch = useDispatch()

  const handleChooseRoute = (route) => {
      dispatch(chooseRoute(route))
  }

  return (
    <div className='switchboard'>
      <div>
        <h2>Switchboard</h2>
        <button className='menu-button' value='reportPrivate' onClick={(e) => handleChooseRoute(e.target.value)}>Private Charging</button>
        <button className='menu-button' value='reportTech' onClick={(e) => handleChooseRoute(e.target.value)}>Tech Charging</button>
        {/* <button className='menu-button' value='editDepartments' onClick={(e) => handleChooseRoute(e.target.value)}>Departments</button>
        <button className='menu-button' value='editCategories' onClick={(e) => handleChooseRoute(e.target.value)}>Categories</button>
        <button className='menu-button' value='switchboard' onClick={(e) => handleChooseRoute(e.target.value)}>Main Menu</button> */}
      </div>
    </div>
  )
}

export default AdminSwitchboard