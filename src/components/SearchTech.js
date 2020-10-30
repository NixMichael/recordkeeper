import axios from 'axios'
import React, { useState } from 'react'
import '../styles/searchScreenStyles.scss'

const SearchTech = () => {
  
  const [ searchResult, setSearchResult] = useState([])
  const [ searchReturned, setSearchReturned ] = useState(false)
  
  const [searchCriteria, setSearchCriteria] = useState({ 
    category: '',
    user: '',
    referrer: '',
    department: '',
    description: '', 
    dateFrom: '', 
    dateTo: '',
    returned: false,
    dates: []
  })
  
  const search = async () => {

    const { department, user, category, referrer, description, dateFrom, dateTo } = searchCriteria

    let dateA = dateFrom
    let dateB = dateTo

    if (!searchCriteria.dateFrom) {
      dateA = '01-01-2000'
    }

    if (!searchCriteria.dateTo) {
      let year = new Date().getFullYear().toString();
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();

      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;
      let curDate = `${day}-${month}-${year}`
      
      dateB = curDate
    }


    const searchQueries = {
      type: 't',
      department: department,
      designer: user,
      category: category,
      referrer: referrer,
      description: description,
      dateFrom: dateA,
      dateTo: dateB
    }

    const result = await axios({
        method: 'post',
        url: 'http://localhost:3004/searchrecs',
        headers: {'Content-Type': 'application/json'},
        data: searchQueries
    })

    setSearchResult(result.data)
    setSearchReturned(true)
  }

  const reset = () => {
      setSearchCriteria({
        category: '',
        user: '',
        referrer: '',
        department: '',
        description: '',
        dateFrom: '',
        dateTo: '',
        returned: false,
        dates: []
      })
      setSearchReturned(false)
  }

  const handleChange = (event) => {
      const { name, value } = event

      setSearchCriteria({
        ...searchCriteria,
        [name]: value
      })

      if (event.keyCode === '13') {
          this.search()
      }
  }

  return (
    <div className="searchChoice__form">
    <div className="searchCriteria">
        <div className="searchBoxes">
            <label>Designer: <input className="shortInput" type="text" id="designer" value={searchCriteria.user} name="user" onChange={(e) => handleChange(e.target)}/></label>
            <label>Department: <input className="midInput" type="text" id="department" name="department" value={searchCriteria.department} onChange={(e) => handleChange(e.target)}/></label>
            <label>Category: <input className="selectBoxSize" type="text" id="category" name="category" value={searchCriteria.category} onChange={(e) => handleChange(e.target)} /></label>
            <label>Referrer: <input className="shortInput" type="text" id="referrer" name="referrer" value={searchCriteria.referrer} onChange={(e) => handleChange(e.target)}/></label>
        </div>
        <div className="searchBoxes">
            <label>Description: <input className="longInput" type="text" id="desc" name="description" value={searchCriteria.description} onChange={(e) => handleChange(e.target)}/></label>
            <label>Date Range: <input className="shortInput" type="text" id="dateFrom" name="dateFrom" placeholder="DD-MM-YYYY" value={searchCriteria.dateFrom} onChange={(e) => handleChange(e.target)}/>
                <span> to </span>
                <input className="shortInput" type="text" id="dateTo" name="dateTo" placeholder="DD-MM-YYYY" value={searchCriteria.dateTo} onChange={(e) => handleChange(e.target)}/>
                </label>
            <div className="search__buttons">
                <button className="record-button search-button" onClick={search}>Search</button>
                <button className="record-button search-button" onClick={reset}>Reset</button>
            </div>
        </div>
    </div>
    <div className="returnedResults">
        <div className="resultTitles">
            <p className="techResult shorterResultTech">JOB NO</p>
            <p className="techResult shortResultTech">REFERRER</p>
            <p className="techResult longResultTech">DEPTARTMENT</p>
            <p className="techResult shortResultTech">CATEGORY</p>
            <p className="techResult longerResultTech">DESCRIPTION</p>
            <p className="techResult shortResultTech">DESIGNER</p>
            <p className="techResult shortResultTech">DATE</p>
        </div>  
        <div className="resultContent">
        {(searchReturned) ?
            searchResult.map(record => {

                return (
                    <div className="resultRows" key={record.id}>
                        <p className="techResult shorterResultTech">{record.jobnumber}</p>
                        <p className="techResult shortResultTech">{record.requestedby}</p>
                        <p className="techResult longResultTech">{record.department}</p>
                        <p className="techResult shortResultTech">{record.category}</p>
                        <p className="techResult longerResultTech">{record.description}</p>
                        <p className="techResult shortResultTech">{record.designer}</p>
                        <p className="techResult shortResultTech">{record.to_char}</p>
                    </div>
                        )
                    })
                    :    
                    <p className="search-noResults">Results display here...</p>
                }
                </div>
    </div>
</div>
  )
}

export default SearchTech