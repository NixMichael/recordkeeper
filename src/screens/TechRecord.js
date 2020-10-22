import React from 'react'
import { useSelector } from 'react-redux'
import RecordUpper from '../components/RecordUpper'
import TechRecordMid from '../components/TechRecordMid'
import RecordLower from '../components/RecordLower'
import Loader from '../components/Loader'

const TechRecord = () => {

  const currentRec = useSelector(state => state.currentRec)
  const { loading } = currentRec

  return (
    <div className='record-fields-background'>
      {loading ? <Loader /> :
        <>
        <div className='record-fields-container'>
          <RecordUpper />
          <TechRecordMid />
          <RecordLower />
        </div>
        </>
      }
    </div>
  )
}

export default TechRecord