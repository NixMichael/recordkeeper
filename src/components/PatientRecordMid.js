import React from 'react'
import { useSelector } from 'react-redux'

const PatientRecordMid = () => {

  const fieldData = useSelector(state => state.fieldData)
  const { fieldContent } = fieldData

  const currentRec = useSelector(state => state.currentRec)
  const { record, department, referrer, readOnly } = currentRec

  let referrers = []
  let departments = []

  if (!fieldData.loading) {
    referrers = fieldContent[0]
    departments = fieldContent[3]
  }

  let permission
  let requestedBy
  let dept
  let hospitalNumber
  let firstName
  let lastName

  if (!currentRec.loading) {
    permission = record.permission
    requestedBy = referrer
    dept = department
    hospitalNumber = record.hospitalnumber
    firstName = record.patientforename
    lastName = record.patientsurname
  }

  const handleChange = ({ name, value }) => {
    console.log('change')
  }

  return (
    <>
    <div className='patient-record-component record-mid'>
      <div>
        <label>Requested By: </label>
        <select name='referrer' disabled={readOnly} value={requestedBy} onChange={(e) => handleChange(e.target)}>
          <option value="--Please Select--">--Please Select--</option>
          {referrers.map(referrer => {
            return (
              <option value={referrer.name} key={referrer.id}>{referrer.name}</option>
            )
          })}
        </select>
      </div>
      <div>
        <label>Department: </label>
        <select name='department' disabled={readOnly} value={dept} onChange={(e) => handleChange(e.target)}>
          <option value="--Please Select--">--Please Select--</option>
          {departments.map(department => {
              return (
                <option value={department.departmentname} key={department.id}>{department.departmentname}</option>
              )
            })}
        </select>
      </div>
      <div>
        <label>Permission for: </label>
        <select name='permission' disabled={readOnly} value={permission} onChange={(e) => handleChange(e.target)}>
          <option value="Records">Records</option>
          <option value="Teaching">Teaching</option>
          <option value="Publication">Publication</option>
        </select>
      </div>
    </div>
    <div className='patient-record-component record-mid'>
      <div>
        <label>Hospital Number: </label>
        <input type='text' name='hospitalnumber' className='input-text-number' disabled={readOnly} value={hospitalNumber} onChange={(e) => handleChange(e.target)} />
      </div>
      <div>
        <label>Patient's surname: </label>
        <input type='text' name='lastname' disabled={readOnly} value={lastName} onChange={(e) => handleChange(e.target)} />
      </div>
      <div>
        <label>Patient's forename: </label>
        <input type='text' name='firstname' disabled={readOnly} value={firstName} onChange={(e) => handleChange(e.target)} />
      </div>
    </div>
    </>
  )
}

export default PatientRecordMid