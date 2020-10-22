import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PatientUpper from '../components/patientRecord/PatientUpper'
import PatientMid from '../components/patientRecord/PatientMid'
import RecordLower from '../components/RecordLower'
import Loader from '../components/Loader'
import { fetchLastRec } from '../actions/recordActions'

const PatientRecord = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchLastRec())
  }, [dispatch])

  const lastRec = useSelector(state => state.lastRec)
  const { loading, recordType } = lastRec

  let recordtype = 'Record'

  if (!loading) {
    recordtype = recordType === 'p' ? 'Patient Record' : 'Tech Record'
  }

  return (
    <div>
      {loading ? <Loader /> :
      <>
      <div className='record-title'>{recordtype}</div>
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