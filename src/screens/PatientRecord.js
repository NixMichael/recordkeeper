import React from 'react'
import { useSelector } from 'react-redux'
import PatientUpper from '../components/patientRecord/PatientUpper'
import PatientMid from '../components/patientRecord/PatientMid'
import RecordLower from '../components/RecordLower'
import Loader from '../components/Loader'

const PatientRecord = () => {

  const currentRec = useSelector(state => state.currentRec)
  const { loading } = currentRec

  return (
    <div>
      {loading ? <Loader /> :
      <>
      <div className='record-fields-container'>
        <PatientUpper />
        <PatientMid />
        <RecordLower />
      </div>
      </>
      }
    </div>
  )
}

export default PatientRecord