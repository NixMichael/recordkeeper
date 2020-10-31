import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/issuesStyles.scss'
import { updateIssueList } from '../actions/recordActions'

const Issues = () => {

  
  const dispatch = useDispatch()
  
  const currentRec = useSelector(state => state.currentRec)
  const { readOnly, jobNumber, recordType, record } = currentRec
  const { issues, category } = record

  const addIssue = async ({name}) => {
    if (recordType === 't' && category === '--Please Select--') {
      alert('Please choose a category')
    } else {

      let note = name !== 'PACS' ? prompt('Enter a note for this issue:') : 'Patient Record'
      let quantity = 1
      let totalCost = 25
      let curDate = ''
  
      let year = new Date().getFullYear().toString();
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();        
        
      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;
        
      curDate = `${day}-${month}-${year}`;
  
      if (recordType === 't') {
        quantity = Number(prompt('Quantity:'))
        if (quantity === 0 || quantity === '') { quantity = 1 }
  
        const costResult = await axios.get(`http://localhost:3004/gettechcost/${category}`)
        totalCost = costResult.data * quantity
      }
  
      const newIssueList = await axios({
        method: 'post',
        url: 'http://localhost:3004/addissued',
        headers: { 'Content-Type': 'application/json' },
        data: {
          jobnumber: jobNumber,
          type: name,
          date: curDate,
          notes: note,
          qty: quantity,
          cost: totalCost
        }
      })
  
      await dispatch(updateIssueList(newIssueList.data))
    }
  }

  const deleteIssue = async (id, jobnumber) => {
    const newIssueList = await axios({
      method: 'delete',
      url: 'http://localhost:3004/deleteissued',
      headers: { 'Content-Type': 'application/json'},
      data: { id, jobnumber }
    })

    dispatch(updateIssueList(newIssueList.data))
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
        issues.map(issue => {
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