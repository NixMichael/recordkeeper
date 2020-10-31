import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PatientRecord from './PatientRecord'
import TechRecord from './TechRecord'
import RecordActionButtons from '../components/actionButtons/RecordActionButtons'
import { fetchFieldData, fetchRecord } from '../actions/recordActions'

const BrowseRecords = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFieldData())
    dispatch(fetchRecord('lastRec'))
  }, [dispatch])

  const currentRec = useSelector(state => state.currentRec)
  const { recordType } = currentRec

  return (
    <>
      {/* <div className='record-title'>{recordType === 'p' ? 'Patient Record' : 'Tech Record'}</div> */}
      {recordType === 'p' ?
        <PatientRecord />
      :
        <TechRecord />
      }
      <RecordActionButtons />
    </>
  )
}

export default BrowseRecords