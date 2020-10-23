import React from 'react'
import '../styles/issuesStyles.scss'

const Issues = () => {
  return (
    <div className="issued">
      <div>
          <h5>Add New Issue:</h5>
          <button>PACS</button>
          
          <button>Delivered</button>
          
          <button>Collected</button>

          <button>Other</button>

      </div>

    {/* { issueResults.length === 0 ?
    <div>
        <div className="prevIssuesTitle">PREVIOUS ISSUES:</div>
        <div className="noIssuedEvents"><p>NO PREVIOUS ISSUES</p></div>
    </div>
    :
    <div>
        <div className="prevIssuesTitle">PREVIOUS ISSUES:</div>
        <div className="issuedEvents">
            {issuedItems}
        </div>
    </div>
    
    } */}

    </div>
  )
}

export default Issues