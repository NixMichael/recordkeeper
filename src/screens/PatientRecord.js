import React from 'react'
import { useSelector } from 'react-redux'
import RecordUpper from '../components/RecordUpper'
import PatientRecordMid from '../components/PatientRecordMid'
import RecordLower from '../components/RecordLower'
import Loader from '../components/Loader'

const PatientRecord = () => {

  const currentRec = useSelector(state => state.currentRec)
  const { loading } = currentRec

  return (
    <div className='record-fields-background'>
      {loading ? <Loader /> :
        <>
        <div className='record-fields-container'>
          <RecordUpper />
          <PatientRecordMid />
          <RecordLower />
        </div>
        </>
      }
    </div>
  )
}

export default PatientRecord