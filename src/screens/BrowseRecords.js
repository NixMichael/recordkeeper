import React from 'react'
import { useSelector } from 'react-redux'
import PatientRecord from './PatientRecord'
import TechRecord from './TechRecord'
import RecordActionButtons from '../components/actionButtons/RecordActionButtons'

const BrowseRecords = () => {

  const currentRec = useSelector(state => state.currentRec)
  const { recordType } = currentRec

  return (
    <>
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