import React from 'react'
import '../styles/recordStyles.scss'
import Issues from './Issues'

const RecordLower = () => {
  return (
    <div className='patient-record-component record-lower'>
      <div id='description'>
          <label>Description: </label>
          <textarea id="description" name="description" />
      </div>
      <div className="issuedSection">
          <Issues />
      </div>
    </div>
  )
}

export default RecordLower