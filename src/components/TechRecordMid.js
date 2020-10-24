import React from 'react'
import { useSelector } from 'react-redux'

const TechRecordMid = () => {

  const fieldData = useSelector(state => state.fieldData)
  const { fieldContent } = fieldData

  const currentRec = useSelector(state => state.currentRec)
  const { record, department, referrer, readOnly } = currentRec

  let referrers = []
  let departments = []
  let categories = []

  if (!fieldData.loading) {
    referrers = fieldContent[0]
    departments = fieldContent[3]
    categories = fieldContent[2]
  }

  let category = ''
  let requestedBy = ''
  let dept = ''

  if (!currentRec.loading) {
    category = record.category
    requestedBy = referrer
    dept = department
  }

  const handleChange = (name) => {
    console.log('change')
  }

  return (
    <div className='tech-record-component record-mid'>
      <div>
        <label>Requested By: </label>
        <select name='referrer' disabled={readOnly} value={requestedBy} onChange={(e) => handleChange(e.target.name)}>
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
        <select name='department' disabled={readOnly} value={dept} onChange={(e) => handleChange(e.target.name)}>
          <option value="--Please Select--">--Please Select--</option>
          {departments.map(department => {
              return (
                <option value={department.departmentname} key={department.id}>{department.departmentname}</option>
              )
            })}
        </select>
      </div>
      <div>
        <label>Category: </label>
        <select name='category' disabled={readOnly} value={category} onChange={(e) => handleChange(e.target.name)}>
          <option value="--Please Select--">--Please Select--</option>
            {categories.map(category => {
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