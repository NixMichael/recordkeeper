import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../actions/userActions'
import { chooseRoute } from '../actions/routeActions'
import '../styles/CONSTANTS.scss'
import '../styles/navigationStyles.scss'


const Navigation = () => {
  
  const dispatch = useDispatch()

  const screenRoute = useSelector(state => state.screenRoute)
  const reportCriteria = useSelector(state => state.reportCriteria)

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
    case 'editCategories':
      title = 'Editing Tech Categories'
      break
    case 'editTechTypes':
      title = 'Editing Tech Categories'
      break
    case 'patientSearch':
      title = 'Search Patient Records'
      break
    case 'techSearch':
      title = 'Search Tech Records'
      break
    case 'report':
      title = `Report: ${reportCriteria[1]}`
      break
    default:
      title = ''
  }

  const handleClick = (route) => {
    dispatch(chooseRoute('switchboard'))
    route === 'logout' && dispatch(logoutUser())
  }

  return (
    <div className='navigation'>
      {/* <div className='record-title'>{screenRoute === 'browseRecords' ? (recordType === 'p' ? 'Patient Record' : 'Tech Record') : screenRoute === 'report' ? 'Report' : 'Admin'}</div> */}
      <div className='record-title'>{title}</div>
      <div>
        <button className='nav-button' value='switchboard' onClick={(e) => handleClick(e.target.value)}>Switchboard</button>
        <button className='nav-button' value='logout' onClick={(e) => handleClick(e.target.value)}>Logout</button>
      </div>
    </div>
  )
}

export default Navigation