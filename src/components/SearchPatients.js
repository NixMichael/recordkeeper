import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/searchScreenStyles.scss'
import { fetchRecordByJobNumber, searchRecords } from '../actions/recordActions'
import { chooseRoute } from '../actions/routeActions'

const SearchPatients = () => {

  const dispatch = useDispatch()

  // const [ searchResult, setSearchResult] = useState([])
  const [ searchReturned, setSearchReturned ] = useState(false)

  const searchResult = useSelector(state => state.searchResult)
  
  const [searchCriteria, setSearchCriteria] = useState({ 
    permission: '', 
    hospitalNumber: '', 
    patientForename: '', 
    patientSurname: '', 
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

    const { department, user, permission, hospitalNumber, patientForename, patientSurname, referrer, description, dateFrom, dateTo } = searchCriteria

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
      type: 'p',
      department: department,
      photographer: user,
      permission: permission,
      hospitalNumber: hospitalNumber,
      patientForename: patientForename,
      patientSurname: patientSurname,
      referrer: referrer,
      description: description,
      dateFrom: dateA,
      dateTo: dateB
    }

    await dispatch(searchRecords(searchQueries))

    // const result = await axios({
    //     method: 'post',
    //     url: 'http://localhost:3004/searchrecs',
    //     headers: {'Content-Type': 'application/json'},
    //     data: searchQueries
    // })

    // setSearchResult(result.data)
    setSearchReturned(true)
  }

  const reset = () => {
      setSearchCriteria({
        permission: '', 
        hospitalNumber: '', 
        patientForename: '', 
        patientSurname: '', 
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

  const jumpToRecord = async (jobnumber) => {
    await dispatch(fetchRecordByJobNumber(jobnumber))
    dispatch(chooseRoute('browseRecords'))
  }

  return (
    <div className="searchChoice__form">
    <div className="searchCriteria">
        <div className="searchBoxes">
            <label>Photographer: <input className="shortInput" type="text" id="photographer" value={searchCriteria.user} name="user" onChange={(e) => handleChange(e.target)}/></label>
            <label>Department: <input className="midInput" type="text" id="department" name="department" value={searchCriteria.department} onChange={(e) => handleChange(e.target)}/></label>
            <label>Permission: <select className="record-input selectBoxSize" id="permission" name="permission" value={searchCriteria.permission} onChange={(e) => handleChange(e.target)}>
                <option value=""></option>
                <option value="Records">Records</option>
                <option value="Teaching">Teaching</option>
                <option value="Publication">Publication</option>
                </select></label>
            <label>Referrer: <input className="shortInput" type="text" id="referrer" name="referrer" value={searchCriteria.referrer} onChange={(e) => handleChange(e.target)}/></label>
        </div>
        <div className="searchBoxes">
            <label>Hospital No: <input className="shorterInput" type="text" id="hospital-numer" name="hospitalNumber" value={searchCriteria.hospitalNumber} onChange={(e) => handleChange(e.target)}/></label>

            <label>Patient's Surname: <input className="midInput" type="text" id="patientSurname" name="patientSurname" value={searchCriteria.patientSurname} onChange={(e) => handleChange(e.target)}/></label>

            <label>Patient's Forename: <input className="midInput" type="text" id="patientForename" name="patientForename" value={searchCriteria.patientForename} onChange={(e) => handleChange(e.target)}/></label>
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
            <p className="patientResult shorterResult">JOB NO</p>
            <p className="patientResult shortResult">REFERRER</p>
            <p className="patientResult longResult">DEPARTMENT</p>
            <p className="patientResult shortResult">PERMISSION</p>
            <p className="patientResult shortResult">RBV</p>
            <p className="patientResult shortResult">SURNAME</p>
            <p className="patientResult shortResult">FORENAME</p>
            <p className="patientResult longerResult">DESCRIPTION</p>
            <p className="patientResult shortResult">PHOTOGRAPHER</p>
            <p className="patientResult shortResult">DATE</p>
        </div>  
        <div className="resultContent">
        {(searchReturned) ?
            searchResult.map(record => {

                return (
                    <div className="resultRows" key={record.id} onClick={() => jumpToRecord(record.jobnumber)}>
                        <p className="patientResult shorterResult">{record.jobnumber}</p>
                        <p className="patientResult shortResult">{record.requestedby}</p>
                        <p className="patientResult longResult">{record.department}</p>
                        <p className="patientResult shortResult">{record.permission}</p>
                        <p className="patientResult shortResult">{record.hospitalnumber}</p>
                        <p className="patientResult shortResult">{record.patientsurname}</p>
                        <p className="patientResult shortResult">{record.patientforename}</p>
                        <p className="patientResult longerResult">{record.description}</p>
                        <p className="patientResult shortResult">{record.photographer}</p>
                        <p className="patientResult shortResult">{record.to_char}</p>
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

export default SearchPatients