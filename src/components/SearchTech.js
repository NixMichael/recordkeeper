import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import '../styles/searchScreenStyles.scss'
import { fetchRecordByJobNumber } from '../actions/recordActions'
import { chooseRoute } from '../actions/routeActions'

const SearchTech = () => {

  const dispatch = useDispatch()

  const [ searchResult, setSearchResult] = useState([])
  const [ searchReturned, setSearchReturned ] = useState(false)
  
  const [searchCriteria, setSearchCriteria] = useState({ 
    category: '',
    designer: '',
    referrer: '',
    department: '',
    description: '', 
    dateFrom: '', 
    dateTo: '',
    onlyIssued: false,
    returned: false,
    dates: []
  })
  
  const search = async () => {

    const { department, designer, category, referrer, description, dateFrom, dateTo, onlyIssued } = searchCriteria

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
      designer: designer,
      category: category,
      referrer: referrer,
      description: description,
      onlyIssued: onlyIssued,
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

  const jumpToRecord = async (jobnumber) => {
    await dispatch(fetchRecordByJobNumber(jobnumber))
    dispatch(chooseRoute('browseRecords'))
  }

  const reset = () => {
      setSearchCriteria({
        category: '',
        designer: '',
        referrer: '',
        department: '',
        description: '',
        dateFrom: '',
        dateTo: '',
        onlyIssued: false,
        returned: false,
        dates: []
      })
      setSearchReturned(false)
  }

  const save = async () => {
    const reportName = prompt('Give the report a name:')

    await axios({
      method: 'post',
      url: 'http://localhost:3004/addreport',
      headers: { 'Content-Type': 'application/json' },
      data: [
        reportName,
        searchCriteria,
        't'
      ]
    })

    alert('Report saved. Make use of this report in the Reports section from the main switchboard')
  }

  const handleChange = (event) => {
      const { name, value } = event

      if (event.type === 'checkbox') {
        setSearchCriteria({
          ...searchCriteria, [name]: !searchCriteria.onlyIssued
        })
      } else {
        setSearchCriteria({
          ...searchCriteria,
          [name]: value
        })
      }

      if (event.keyCode === '13') {
          this.search()
      }
  }

  return (
    <div className="searchChoice-form">
    <div className="searchCriteria">
        <div className="searchBoxes">
            <label>Designer: <input className="shortInput" type="text" id="designer" value={searchCriteria.designer} name="designer" onChange={(e) => handleChange(e.target)}/></label>
            <label>Department: <input className="midInput" type="text" id="department" name="department" value={searchCriteria.department} onChange={(e) => handleChange(e.target)}/></label>
            <label>Category: <input className="shortInput" type="text" id="category" name="category" value={searchCriteria.category} onChange={(e) => handleChange(e.target)} /></label>
            <label>Referrer: <input className="shortInput" type="text" id="referrer" name="referrer" value={searchCriteria.referrer} onChange={(e) => handleChange(e.target)}/></label>
            <label>Only Issued: <input type='checkbox' id='onlyIssued' name='onlyIssued' value={searchCriteria.onlyIssued} onChange={(e) => handleChange(e.target)} /></label>
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
                <button className="record-button search-button" onClick={save}>Save As Report</button>
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
            <div className="resultRows" key={record.id} onClick={() => jumpToRecord(record.jobnumber)}>
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
    <div className='search-result-info'>{searchReturned ? searchResult.length : 0} results</div>
  </div>
</div>
  )
}

export default SearchTech