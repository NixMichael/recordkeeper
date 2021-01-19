import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/recordStyles.scss'
import Issues from './Issues'
import { updateRecordField } from '../actions/recordActions'

const RecordLower = () => {

  const dispatch = useDispatch()

  const currentRec = useSelector(state => state.currentRec)
  const { record, readOnly } = currentRec

  let description = ''

  if (record) {
    description = record.description
  }

  const handleChange = ({ name, value }) => {
    dispatch(updateRecordField(name, value))
  }

  return (
    <div className='patient-record-component record-lower'>
      <div class='description'>
          <label>Description: </label>
          <textarea id="description" name="description" disabled={readOnly} value={description} onChange={(e) => handleChange(e.target)}/>
      </div>
      <div className="issued-section">
          <Issues />
      </div>
    </div>
  )
}

export default RecordLower