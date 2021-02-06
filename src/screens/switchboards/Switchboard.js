import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../actions/userActions'
import { chooseRoute } from '../../actions/routeActions'
import '../../styles/switchboardStyles.scss'

const Switchboard = () => {

  const dispatch = useDispatch()

  const adminRights = useSelector(state => state.loggedIn[1])

  const handleChooseRoute = (route) => {

    route === 'logout' ?
      dispatch(logoutUser())
    : dispatch(chooseRoute(route))
  }

  return (
    <div className='switchboard'>
      <div>
        <h2>Switchboard</h2>
        <button className='menu-button' value='browseRecords' onClick={(e) => handleChooseRoute(e.target.value)}>Browse Records</button>
        <button className='menu-button' value='admin' disabled={!adminRights} onClick={(e) => handleChooseRoute(e.target.value)}>Admin</button>
        <button className='menu-button' value='reports' onClick={(e) => handleChooseRoute(e.target.value)}>Reports</button>
        <button className='menu-button' value='logout' onClick={(e) => handleChooseRoute(e.target.value)}>Logout</button>
      </div>
    </div>
  )
}

export default Switchboard