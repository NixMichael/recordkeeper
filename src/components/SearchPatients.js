import axios from 'axios'
import React, { useState } from 'react'
import '../styles/searchScreenStyles.scss'

const SearchPatients = () => {

  
  const [ searchResult, setSearchResult] = useState([])
  
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

    let curDate

    if (!searchCriteria.dateFrom) {
      console.log('no date here')
      await setSearchCriteria({...searchCriteria, [searchCriteria.dateFrom]: '01-01-2000'})
    }

    if (!searchCriteria.dateTo) {
      console.log('no date here')
      let year = new Date().getFullYear().toString();
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();

      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;
      curDate = `${day}-${month}-${year}`

      await setSearchCriteria({...searchCriteria, [searchCriteria.dateTo]: curDate})
    }

    const { department, user, permission, hospitalNumber, patientForename, patientSurname, referrer, description, dateFrom, dateTo } = searchCriteria

    console.log(searchCriteria)

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
      dateFrom: '01-01-2000',
      dateTo: curDate
    }

    const result = await axios({
        method: 'post',
        url: 'http://localhost:3004/searchrecs',
        headers: {'Content-Type': 'application/json'},
        data: searchQueries
    })
      console.log(result.data)
      setSearchResult(result.data)
        // setSearchCriteria(true)
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
  }

  const handleChange = (event) => {
      const { name, value } = event

      setSearchCriteria({
        ...searchCriteria,
        [name]: value
      })

      if (event.keyCode === '13') {
          this.search('p')
      }
  }

  return (
    <div className="searchChoice__form">
    <div className="searchCriteria">
        <div className="searchBoxes">
            <label>Photographer: <input className="shortInput" type="text" id="photographer" value={searchCriteria.user} name="user" onChange={(e) => handleChange(e.target)}/></label>
            <label>Department: <input className="midInput" type="text" id="department" name="department" value={searchCriteria.department} onChange={(e) => handleChange(e.target)}/></label>
            <label>Permission: <select className="selectBoxSize" id="permission" name="permission" value={searchCriteria.permission} onChange={(e) => handleChange(e.target)}>
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
                <span>-</span>
                <input className="shortInput" type="text" id="dateTo" name="dateTo" placeholder="DD-MM-YYYY" value={searchCriteria.dateTo} onChange={(e) => handleChange(e.target)}/>
                </label>
            <div className="search__buttons">
                <button className="button search-button feature-button" onClick={search}>Search</button>
                <button className="button search-button feature-button" onClick={reset}>Reset</button>
            </div>
        </div>
    </div>
    <div className="returnedResultsPatient">
        <div className="resultTitles">
            <p className="shorterResult">JOB NO</p>
            <p className="shortResult">REFERRER</p>
            <p className="longResult">DEPTARTMENT</p>
            <p className="shortResult">PERMISSION</p>
            <p className="shorterResult">RBV</p>
            <p className="shortResult">SURNAME</p>
            <p className="shortResult">FORENAME</p>
            <p className="longResult">DESCRIPTION</p>
            <p className="shortResult">PHOTOGRAPHER</p>
            <p className="shortResult">DATE</p>
        </div>  
        <div className="resultContent">
        {(!searchResult.returned) ?
            searchResult.map(record => {

                return (
                    <div className="resultRows" key={record.id}>
                        <p className="shorterResult">{record.jobnumber}</p>
                        <p className="shortResult">{record.requestedby}</p>
                        <p className="longResult">{record.department}</p>
                        <p className="shortResult">{record.permission}</p>
                        <p className="shorterResult">{record.hospitalnumber}</p>
                        <p className="shortResult">{record.patientsurname}</p>
                        <p className="shortResult">{record.patientforename}</p>
                        <p className="longResult">{record.description}</p>
                        <p className="shortResult">{record.photographer}</p>
                        <p className="shortResult">{record.to_char}</p>
                    </div>
                        )
                    })
                    :    
                    <p className="techResults">Results display here...</p>
                }
                </div>
    </div>
</div>
  )
}

export default SearchPatients