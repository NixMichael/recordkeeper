import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/issuesStyles.scss'

const Issues = () => {

  const currentRec = useSelector(state => state.currentRec)
  const { readOnly } = currentRec

  const issueResults = [
    {
      id: 1,
      jobnumber: '20100210',
      type: 'pacs',
      date: '02-10-2020',
      notes: 'no notes',
      qty: 2,
      cost: 3.50
    },
    {
      id: 2,
      jobnumber: '20100211',
      type: 'pacs',
      date: '03-10-2020',
      notes: 'note note note',
      qty: 1,
      cost: 3.50
    },
    {
      id: 3,
      jobnumber: '20100210',
      type: 'pacs',
      date: '02-10-2020',
      notes: 'no notes',
      qty: 2,
      cost: 3.50
    }
  ]

  const handleClick = ({ name, value }) => {
    console.log('handled')
  }

  const deleteIssue = (e, id, jobnumber) => {
    console.log('delete issue')
  }

  return (
    <div className="issued">
      <div>
        <h5>Add New Issue:</h5>
        <div>
          <button className="issued-button" name='pacs' disabled={readOnly} onClick={(e) => handleClick(e.target)}>PACS</button>
          
          <button className="issued-button" id="printDelivered" name="printDelivered" disabled={readOnly} onClick={(e) => handleClick(e.target)}>Delivered</button>
          
          <button className="issued-button" id="printCollected" name="printCollected" disabled={readOnly} onClick={(e) => handleClick(e.target)}>Collected</button>

          <button className="issued-button" id="other" name="other" disabled={readOnly} onClick={(e) => handleClick(e.target)}>Other</button>
        </div>

      </div>

      { issueResults.length === 0 ?
          /* <div className="prevIssuesTitle">PREVIOUS ISSUES:</div> */
        <div className="noIssuedEvents"><p>NO PREVIOUS ISSUES</p></div>
      :
      <div>
        {/* <div className="prevIssuesTitle">PREVIOUS ISSUES:</div> */}
        <div className="issued-events">
          {
            issueResults.map(issue => {
              let fullType = issue.type === 'PACS' ? 'PACS' : issue.type === 'PRTD' ? 'Print Delivered' : issue.type === 'PRTC' ? 'Print Collected' : 'Other'
              return (
                <div key={issue.id}>
                  <p>{fullType}</p>
                  <p>{issue.date}</p>
                  <p>{issue.notes}</p>
                  <p>{issue.qty}</p>
                  <p>{issue.cost}</p>
                  <button className="delete-issue-button" disabled={readOnly} onClick={(e) => deleteIssue(e.target, issue.id, issue.jobnumber)}>x</button>
                </div>
              )
            })
          }
        </div>
      </div>
      
      }
    </div>
  )
}

export default Issues