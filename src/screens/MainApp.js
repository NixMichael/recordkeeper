import React from 'react'
import { useSelector } from 'react-redux'
import Navigation from '../components/Navigation'
import BrowseRecords from './BrowseRecords'
import SearchScreen from './SearchScreen'
import UsersAdmin from './UsersAdmin'
import ReferrersAdmin from './ReferrersAdmin'
import DepartmentsAdmin from './DepartmentsAdmin'
import Reports from './Reports'

const MainApp = () => {

  const screenRoute = useSelector(state => state.screenRoute)

  return (
    <>
      <Navigation />
      {
        screenRoute === 'browseRecords' ?
        <BrowseRecords />
        : screenRoute === 'editUsers' ?
        <UsersAdmin />
        : screenRoute === 'editReferrers' ?
        <ReferrersAdmin />
        : screenRoute === 'editDepartments' ?
        <DepartmentsAdmin />
        : screenRoute === 'patientSearch' || screenRoute === 'techSearch' ?
        <SearchScreen />
        :
        <Reports />
      }
    </>
  )
}

export default MainApp