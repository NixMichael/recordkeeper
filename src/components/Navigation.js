import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../actions/userActions'
import { chooseRoute } from '../actions/routeActions'
import '../styles/CONSTANTS.scss'
import '../styles/navigationStyles.scss'

const Navigation = () => {

  const dispatch = useDispatch()
  const currentRec = useSelector(state => state.currentRec)
  const { recordType } = currentRec

  const handleClick = (value) => {
    dispatch(chooseRoute('switchboard'))

    if (value === 'logout') {
      dispatch(logoutUser())
    }
  }

  return (
    <div className='navigation'>
      <div className='record-title'>{recordType === 'p' ? 'Patient Record' : 'Tech Record'}</div>
      <div>
        <div className='button-div' name='switchboard' onClick={(e) => handleClick(e.target.name)}>Switchboard</  div>
        <div className='button-div' name='logout' onClick={(e) => handleClick(e.target.name)}>Logout</div>
      </div>
    </div>
  )
}

export default Navigation