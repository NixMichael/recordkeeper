import React from 'react'
import { useSelector } from 'react-redux'

const Report = () => {

  const reportCriteria = useSelector(state => state.reportCriteria)

  return (
    <div>
      Reports
      {
        reportCriteria.map(returned => {
          return (
            <div key={returned.id}>
              <h4>{returned.jobnumber}</h4>
              <h4>{returned.photographer || returned.designer}</h4>
              <h4>{returned.requestedby}</h4>
            </div>
          )
        })
      }
    </div>
  )
}

export default Report