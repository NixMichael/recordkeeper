import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateRecordField } from '../actions/recordActions'

const TechRecordMid = () => {

  const dispatch = useDispatch()

  const fieldData = useSelector(state => state.fieldData)
  const { referrers, departments, techTypes } = fieldData

  const currentRec = useSelector(state => state.currentRec)
  const { record, readOnly } = currentRec

  let category, referrer, department

  if (record) {
    category = record.category
    referrer = record.referrer
    department = record.department
  }

  const handleChange = ({ name, value }) => {
    dispatch(updateRecordField(name, value))
  }

  return (
    <div className='tech-record-component record-mid'>
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
                <option value={department.name} key={department.id}>{department.name}</option>
              )
            })}
        </select>
      </div>
      <div>
        <label>Category: </label>
        <select className='record-input' name='category' disabled={readOnly} value={category} onChange={(e) => handleChange(e.target)}>
          <option value="--Please Select--">--Please Select--</option>
            {techTypes.map(category => {
              return (
                <option value={category.type} key={category.id}>{category.type}</option>
              )
            })}
        </select>
      </div>
    </div>
  )
}

export default TechRecordMid