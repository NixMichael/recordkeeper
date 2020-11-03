import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateRecordField } from '../actions/recordActions'

const PatientRecordMid = () => {

  const dispatch = useDispatch()

  const fieldData = useSelector(state => state.fieldData)
  const { referrers, departments } = fieldData

  const currentRec = useSelector(state => state.currentRec)
  const { record, readOnly } = currentRec
  const { permission, referrer, department, hospitalnumber, patientsurname, patientforename } = record

  const handleChange = ({ name, value }) => {
    dispatch(updateRecordField(name, value))
  }

  return (
    <div className='record-mid'>
    <div className='patient-record-component'>
      <div>
        <label>Requested By: </label>
        <select className='record-input' name='referrer' disabled={readOnly} value={referrer} onChange={(e) => handleChange(e.target)}>
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
        <select className='record-input' name='department' disabled={readOnly} value={department} onChange={(e) => handleChange(e.target)}>
          <option value="--Please Select--">--Please Select--</option>
          {departments.map(department => {
              return (
                <option value={department.department} key={department.id}>{department.name}</option>
              )
            })}
        </select>
      </div>
      <div>
        <label>Permission for: </label>
        <select className='record-input' name='permission' disabled={readOnly} value={permission} onChange={(e) => handleChange(e.target)}>
          <option value="Records">Records</option>
          <option value="Teaching">Teaching</option>
          <option value="Publication">Publication</option>
        </select>
      </div>
    </div>
    <div className='patient-record-component'>
      <div>
        <label>Hospital Number: </label>
        <input type='text' name='hospitalnumber' className='input-text-number' disabled={readOnly} value={hospitalnumber} onChange={(e) => handleChange(e.target)} />
      </div>
      <div>
        <label>Patient's surname: </label>
        <input type='text' name='patientsurname' disabled={readOnly} value={patientsurname} onChange={(e) => handleChange(e.target)} />
      </div>
      <div>
        <label>Patient's forename: </label>
        <input type='text' name='patientforename' disabled={readOnly} value={patientforename} onChange={(e) => handleChange(e.target)} />
      </div>
    </div>
    </div>
  )
}

export default PatientRecordMid