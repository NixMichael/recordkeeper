import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../actions/userActions'
import { chooseRoute } from '../actions/routeActions'
import '../styles/CONSTANTS.scss'
import '../styles/navigationStyles.scss'


const Navigation = () => {
  
  const dispatch = useDispatch()

  const screenRoute = useSelector(state => state.screenRoute)

  const currentRec = useSelector(state => state.currentRec)
  const { recordType } = currentRec

  let title = ''

  switch (screenRoute) {
    case 'browseRecords':
      const recordTitle = recordType === 'p' ? 'Patient Record' : 'Tech Record'
      title = recordTitle
      break
    case 'editUsers':
      title = 'Editing Users'
      break
    case 'editDepartments':
      title = 'Editing Departments'
      break
    case 'editReferrers':
      title = 'Editing Referrers'
      break
    case 'editTechTypes':
      title = 'Editing Tech Categories'
      break
    case 'reports':
      title = 'Reports'
      break
    default:
      title = ''
  }

  const handleClick = (value) => {
    dispatch(chooseRoute('switchboard'))

    if (value === 'logout') {
      dispatch(logoutUser())
    }
  }

  return (
    <div className='navigation'>
      {/* <div className='record-title'>{screenRoute === 'browseRecords' ? (recordType === 'p' ? 'Patient Record' : 'Tech Record') : screenRoute === 'report' ? 'Report' : 'Admin'}</div> */}
      <div className='record-title'>{title}</div>
      <div>
        <div className='button-div' name='switchboard' onClick={(e) => handleClick(e.target.name)}>Switchboard</  div>
        <div className='button-div' name='logout' onClick={(e) => handleClick(e.target.name)}>Logout</div>
      </div>
    </div>
  )
}

export default Navigation