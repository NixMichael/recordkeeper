import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../actions/userActions'
import { chooseRoute } from '../actions/routeActions'
import '../styles/switchboardStyles.scss'

const Switchboard = () => {

  const dispatch = useDispatch()

  const handleChooseRoute = (route) => {
    route === 'logout' ?
      dispatch(logoutUser())
    :
      dispatch(chooseRoute(route))
  }

  return (
    <div className='switchboard'>
    <h2>Switchboard</h2>
    <button value='browseRecords' onClick={(e) => handleChooseRoute(e.target.value)}>Browse Records</button>
    <button value='admin' onClick={(e) => handleChooseRoute(e.target.value)}>Admin</button>
    <button value='reports' onClick={(e) => handleChooseRoute(e.target.value)}>Reports</button>
    <button value='logout' onClick={(e) => handleChooseRoute(e.target.value)}>Logout</button>
    </div>
  )
}

export default Switchboard