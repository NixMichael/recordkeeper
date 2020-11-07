import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/reportStyles.scss'

const Report = () => {

  const reportCriteria = useSelector(state => state.reportCriteria)

  return (
    <div className='report-screen'>
      <div className='report-results'>
      {
        reportCriteria.map((returned, index) => {
          return (
            
            <div key={returned.id}>
              <div>{index + 1}</div>
              <div>{returned.jobnumber}</div>
              <div>{returned.requestedby}</div>
              <div>{returned.to_char}</div>
              <div>£25.00</div>
            </div>
          )
        })
      }
      </div>
      <div className='report-figures'>
        <div>Total Jobs: 1</div>
        <div>Total Cost: £{reportCriteria.length * 25}</div>
      </div>
    </div>
  )
}

export default Report