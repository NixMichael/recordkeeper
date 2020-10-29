import React from 'react'
import { useSelector } from 'react-redux'
import RecordActionButtons from '../components/actionButtons/RecordActionButtons'
import SearchPatients from '../components/SearchPatients'
import SearchTech from '../components/SearchTech'

const SearchScreen = () => {

  const screenRoute = useSelector(state => state.screenRoute)

  return (
    <>
      <div className='record-title'>Search</div>
      <div className='record-fields-background'>
        {
          screenRoute === 'patientSearch' ?
              <SearchPatients />
          :
          screenRoute === 'techSearch' ?
              <SearchTech />
          :
          <div className="searchChoice">
              <h2>Choose a record type to search...</h2>
          </div>
        }
      </div>
      <RecordActionButtons />
    </>
  )
}

export default SearchScreen