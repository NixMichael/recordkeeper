import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../actions/userActions'
import { chooseRoute } from '../actions/routeActions'
import '../styles/CONSTANTS.scss'
import '../styles/navigationStyles.scss'

const Navigation = () => {

  const dispatch = useDispatch()

  const handleClick = (value) => {
    dispatch(chooseRoute('switchboard'))

    if (value === 'logout') {
      dispatch(logoutUser())
    }
  }

  return (
    <div className='navigation'>
      <button value='switchboard' onClick={(e) => handleClick(e.target.value)}>Switchboard</button>
      <button value='logout' onClick={(e) => handleClick(e.target.value)}>Logout</button>
    </div>
  )
}

export default Navigation