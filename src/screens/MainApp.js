import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navigation from '../components/Navigation'
import BrowseRecords from './BrowseRecords'
import SearchScreen from './SearchScreen'
import UsersAdmin from './adminScreens/UsersAdmin'
import ReferrersAdmin from './adminScreens/ReferrersAdmin'
import DepartmentsAdmin from './adminScreens/DepartmentsAdmin'
import CategoriesAdmin from './adminScreens/CategoriesAdmin'
import PrivateReport from './reportScreens/PrivateReport'
import TechReport from './reportScreens/TechReport'
import Reports from './Reports'
import { fetchRecord } from '../actions/recordActions'

const MainApp = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRecord('lastRec'))
  }, [dispatch])

  const screenRoute = useSelector(state => state.screenRoute)

  return (
    <>
      <Navigation />
      <div className='body-content'>
      {
        screenRoute === 'browseRecords' ?
        <BrowseRecords />
        : screenRoute === 'editUsers' ?
        <UsersAdmin />
        : screenRoute === 'editReferrers' ?
        <ReferrersAdmin />
        : screenRoute === 'editDepartments' ?
        <DepartmentsAdmin />
        : screenRoute === 'editCategories' ?
        <CategoriesAdmin />
        : screenRoute === 'reportPrivate' ?
        <PrivateReport />
        : screenRoute === 'reportTech' ?
        <TechReport />
        : screenRoute === 'patientSearch' || screenRoute === 'techSearch' ?
        <SearchScreen />
        :
        <Reports />
      }
      </div>
    </>
  )
}

export default MainApp