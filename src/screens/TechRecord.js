import React from 'react'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import PatientUpper from '../components/patientRecord/PatientUpper'
import RecordLower from '../components/RecordLower'

const TechRecord = () => {

  const currentRec = useSelector(state => state.currentRec)
  const { loading } = currentRec

  return (
    <div>
      {loading ? <Loader /> :
        <>
        <div className='record-fields-container'>
          <PatientUpper />
          <RecordLower />
        </div>
        </>
      }
    </div>
  )
}

export default TechRecord