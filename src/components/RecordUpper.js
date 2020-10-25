import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/recordStyles.scss'
import { updateRecordField, fetchRecordByJobNumber } from '../actions/recordActions'

const PatientUpper = () => {

  const dispatch = useDispatch()

  const currentRec = useSelector(state => state.currentRec)
  const { record, jobNumber, recordType, readOnly } = currentRec

  const fieldData = useSelector(state => state.fieldData)
  const { fieldContent } = fieldData

  let users = []

  if (!fieldData.loading) {
    users = fieldContent[1]
  }

  let jobnumber = 0
  let user = '--Please Select--'

  if (!currentRec.loading) {
    // jobnumber = record.jobnumber
    user = recordType === 'p' ? record.photographer : record.designer
  }

  const handleJobNumberChange = async ({ name, value }) => {
    dispatch(updateRecordField(name, value))
    if (value.length === 8) {
      dispatch(fetchRecordByJobNumber(value))
    }
  }

  const handleChange = ({ name, value }) => {
    console.log('update field')
  }

  return (
    <div className='patient-record-component patient-record-upper'>
      <div>
        <label>Job Number: </label>
        <input type='text' name='jobnumber' className='input-text-number' value={jobNumber} onChange={(e) => handleJobNumberChange(e.target)}/>
      </div>
      <div>
        <label>{recordType === 'p' ? 'Photographer' : 'Designer'}: </label>
        <select name='user' disabled={readOnly} value={user} onChange={(e) => handleChange(e.target)}>
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