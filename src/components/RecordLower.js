import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/recordStyles.scss'
import Issues from './Issues'

const RecordLower = () => {

  const currentRec = useSelector(state => state.currentRec)
  const { record, readOnly } = currentRec

  let description = ''

  if (!currentRec.loading) {
    description = record.description
  }

  const handleChange = (e) => {
    console.log('Record Lower - textarea')
  }

  return (
    <div className='patient-record-component record-lower'>
      <div id='description'>
          <label>Description: </label>
          <textarea id="description" name="description" disabled={readOnly} value={description} onChange={(e) => handleChange(e.target.name)}/>
      </div>
      <div className="issued-section">
          <Issues />
      </div>
    </div>
  )
}

export default RecordLower