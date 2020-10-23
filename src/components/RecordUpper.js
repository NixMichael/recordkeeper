import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/recordStyles.scss'
import { updateRecordField, fetchRecordByJobNumber } from '../actions/recordActions'

const PatientUpper = () => {

  const dispatch = useDispatch()

  const currentRec = useSelector(state => state.currentRec)
  const { record, recordType, readOnly } = currentRec

  const fieldData = useSelector(state => state.fieldData)
  const { fieldContent } = fieldData

  let photographers = []

  if (!fieldData.loading) {
    photographers = fieldContent[1]
  }

  let jobnumber = 0
  let photographer = '--Please Select--'

  if (!currentRec.loading) {
    jobnumber = record.jobnumber
    photographer = record.photographer
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
        <input type='text' name='jobnumber' value={record.jobnumber} onChange={(e) => handleJobNumberChange(e.target)}/>
      </div>
      <div>
        <label>{recordType === 'p' ? 'Photographer' : 'Designer'}: </label>
        <select name='photographer' disabled={readOnly} value={photographer} onChange={(e) => handleChange(e.target)}>
          <option disabled value='--Please Select--'>--Please Select--</option>
          {
            photographers.map(user => {
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