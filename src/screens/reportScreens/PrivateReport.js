import React, { useState } from 'react'

const PrivateReport = () => {

  // const [ searchResult, setSearchResult] = useState([])
  
  const [searchCriteria, setSearchCriteria] = useState({ 
    dateFrom: '', 
    dateTo: ''
  })

  const handleChange = ({name, value}) => {
    setSearchCriteria({ ...searchCriteria, [name]: value })
  }

  return (
    <div className="searchChoice__form">
    <div className="searchCriteria">
        <div className="searchBoxes">
            <label>Date Range: <input className="shortInput" type="text" id="dateFrom" name="dateFrom" placeholder="DD-MM-YYYY" value={searchCriteria.dateFrom} onChange={(e) => handleChange(e.target)}/>
                <span> to </span>
                <input className="shortInput" type="text" id="dateTo" name="dateTo" placeholder="DD-MM-YYYY" value={searchCriteria.dateTo} onChange={(e) => handleChange(e.target)}/>
                </label>
            {/* <div className="search__buttons">
                <button className="record-button search-button" onClick={search}>Search</button>
                <button className="record-button search-button" onClick={reset}>Reset</button>
            </div> */}
        </div>
    </div>
    </div>
  )
}

export default PrivateReport