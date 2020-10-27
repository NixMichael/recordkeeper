import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../styles/issuesStyles.scss'

const Issues = () => {

  const currentRec = useSelector(state => state.currentRec)
  const { readOnly, jobNumber, record } = currentRec
  const { issues } = record

  const [issueList, setIssueList] = useState(issues)

  const addIssue = async ({name}) => {
    const note = prompt('Add a note:')
    const quantity = prompt('Quantity:')

    const newIssueList = await axios({
      method: 'post',
      url: 'http://localhost:3004/addissued',
      headers: { 'Content-Type': 'application/json' },
      data: {
        jobnumber: jobNumber,
        type: name,
        date: new Date().getDate(),
        notes: note,
        qty: quantity,
        cost: '12'
      }
    })

    console.log(newIssueList.data)
    setIssueList(newIssueList.data)
  }

  const deleteIssue = async (id, jobnumber) => {
    const newIssueList = await axios({
      method: 'delete',
      url: 'http://localhost:3004/deleteissued',
      headers: { 'Content-Type': 'application/json'},
      data: { id, jobnumber }
    })

    setIssueList(newIssueList.data)
    
  }

  return (
    <div className="issued">
      <div>
        <h5>Add New Issue:</h5>
        <div>
          <button className="issued-button" name='PACS' disabled={readOnly} onClick={(e) => addIssue(e.target)}>PACS</button>
          
          <button className="issued-button" id="printDelivered" name="PRTD" disabled={readOnly} onClick={(e) => addIssue(e.target)}>Delivered</button>
          
          <button className="issued-button" id="printCollected" name="PRTC" disabled={readOnly} onClick={(e) => addIssue(e.target)}>Collected</button>

          <button className="issued-button" id="other" name="OTHR" disabled={readOnly} onClick={(e) => addIssue(e.target)}>Other</button>
        </div>

      </div>

      <div className="issued-events">
      { issues.length === 0 ?
        <p>NO PREVIOUS ISSUES</p>
      :
      <>
      {
        issueList.map(issue => {
          let fullType = issue.type === 'PACS' ? 'PACS' : issue.type === 'PRTD' ? 'Print Delivered' : issue.type === 'PRTC' ? 'Print Collected' : 'Other'
          return (
            <div key={issue.id}>
              <p>{fullType}</p>
              <p>{issue.date}</p>
              <p>{issue.notes}</p>
              <p>{issue.qty}</p>
              <p>{issue.cost}</p>
              <div className='delete-issue-button' onClick={(e) => !readOnly && deleteIssue(issue.id, issue.jobnumber)}><i className="fas fa-times-circle"></i></div>
            </div>
          )
        })
      }
      </>
      }
      </div>
    </div>
  )
}

export default Issues