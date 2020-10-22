import React from 'react'
import PatientRecord from './PatientRecord'
import TechRecord from './TechRecord'
import RecordActionButtons from '../components/actionButtons/RecordActionButtons'

const BrowseRecords = () => {

  const recordType = 'patient'

  return (
    <>
      {recordType === 'patient' ?
        <PatientRecord />
      :
        <TechRecord />
      }
      <RecordActionButtons />
    </>
  )
}

export default BrowseRecords