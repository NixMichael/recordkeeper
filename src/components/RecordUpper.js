import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/recordStyles.scss'

const PatientUpper = () => {

  const currentRec = useSelector(state => state.currentRec)
  const { record, recordType } = currentRec

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

  const handleChange = (e) => {
    console.log('Change')
  }

  return (
    <div className='patient-record-component patient-record-upper'>
      <div>
        <label>Job Number: </label>
        <input type='text' name='jobnumber' value={jobnumber} onChange={(e) => handleChange(e.target.name)}/>
      </div>
      <div>
        <label>{recordType === 'p' ? 'Photographer' : 'Designer'}: </label>
        <select name='photographer' value={photographer} onChange={(e) => handleChange(e.target.name)}>
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