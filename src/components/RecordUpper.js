import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/recordStyles.scss'
import { updateRecordField, fetchRecordByJobNumber } from '../actions/recordActions'

const PatientUpper = () => {

  const dispatch = useDispatch()

  const currentRec = useSelector(state => state.currentRec)
  const { record, jobNumber, recordType, readOnly } = currentRec

  const fieldData = useSelector(state => state.fieldData)
  const { users } = fieldData

  // let users = []

  // if (!fieldData.loading) {
  //   users = fieldContent[1]
  // }

  const handleJobNumberChange = async ({ name, value }) => {
    dispatch(updateRecordField(name, value))
    if (value.length === 8) {
      dispatch(fetchRecordByJobNumber(value))
    }
  }

  const handleChange = ({ name, value }) => {
    dispatch(updateRecordField(name, value))
  }

  return (
    <div className='patient-record-component record-upper'>
      <div>
        <label>Job Number: </label>
        <input type='text' name='jobnumber' disabled={!readOnly} className='record-input input-text-number' value={jobNumber} onChange={(e) => handleJobNumberChange(e.target)}/>
      </div>
      <div>
        <label>{recordType === 'p' ? 'Photographer' : 'Designer'}: </label>
        <select className='record-input' name='user' disabled={readOnly} value={record.user} onChange={(e) => handleChange(e.target)}>
          <option disabled value='--Please Select--'>--Please Select--</option>
          {
            users.map(user => {
              return (
              <option value={user.name} key={user.id}>{user.name}</option>
              )
            })
          }
        </select>
      </div>
    </div>
  )
}

export default PatientUpper