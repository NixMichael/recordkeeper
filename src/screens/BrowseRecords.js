import React from 'react'
import { useSelector } from 'react-redux'
import PatientRecord from './PatientRecord'
import TechRecord from './TechRecord'
import RecordActionButtons from '../components/actionButtons/RecordActionButtons'

const BrowseRecords = () => {

  const currentRec = useSelector(state => state.currentRec)
  const { recordType } = currentRec

  return (
    <div class="browse-records">
      {recordType === 'p' ?
        <PatientRecord />
      :
        <TechRecord />
      }
      <RecordActionButtons />
    </div>
  )
}

export default BrowseRecords