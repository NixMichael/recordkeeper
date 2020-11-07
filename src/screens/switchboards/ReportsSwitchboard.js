import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { chooseRoute } from '../../actions/routeActions'
import { fetchReport } from '../../actions/recordActions'
import '../../styles/switchboardStyles.scss'

const AdminSwitchboard = () => {

  const dispatch = useDispatch()

  const [list, setList] = useState([])
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const loadReportList = async () => {
    const { data } = await axios({
      method: 'get',
      url: 'http://localhost:3004/fetchreports',
      headers: { 'Content-Type': 'application/json' }
    })
    const reportList = data.map(report => report.name)
    setList(reportList)
  }

  useEffect(() => {
    if (list.length === 0) {
      loadReportList()
    }
  })

  const [selectedReport, setSelectedReport] = useState('--Please Select--')

  const handleChooseRoute = (route) => {
      dispatch(chooseRoute(route))
  }

  const loadReport = async () => {
    if (selectedReport === '--Please Select--') {
      alert('Please select a report')
    } else {
      let dateA = dateFrom
      let dateB = dateTo

      if (!dateFrom) {
        dateA = '01-01-2000' // Set default from date
      }

      if (!dateTo) {
        let year = new Date().getFullYear().toString();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();

        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
        let curDate = `${day}-${month}-${year}`
        
        dateB = curDate
      }
      await dispatch(fetchReport(selectedReport, dateA, dateB))
      // await dispatch(loadSearchResults(reportCriteria))
      dispatch(chooseRoute('report'))
    }
  }

  return (
    <div className='switchboard'>
      <div>
        <h2>Reports</h2>
        {/* <button className='menu-button' value='reportPrivate' onClick={(e) => handleChooseRoute(e.target.value)}>Private Charging</button>
        <button className='menu-button' value='reportTech' onClick={(e) => handleChooseRoute(e.target.value)}>Tech Charging</button> */}
        <select className='record-input selectBoxSize' value={selectedReport} onChange={(e) => setSelectedReport(e.target.value)}>
          <option>--Please Select--</option>
          {
            list.map(reportTitle => {
              return (
                <option value={reportTitle} key={reportTitle}>{reportTitle}</option>
              )
            })
          }
        </select>
        {selectedReport === '--Please Select--' && <Alert>Please choose a report</Alert>}
        <div>
          <input type='text' value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} placeholder='date from' />
          <input type='text' value={dateTo} onChange={(e) => setDateTo(e.target.value)} placeholder='date to' />
        </div>
        <button className='menu-button' onClick={loadReport}>View Report</button>
        <button className='menu-button' value='switchboard' onClick={(e) => handleChooseRoute(e.target.value)}>Main Menu</button>
        {/* <button className='menu-button' value='editDepartments' onClick={(e) => handleChooseRoute(e.target.value)}>Departments</button>
        <button className='menu-button' value='editCategories' onClick={(e) => handleChooseRoute(e.target.value)}>Categories</button>
        <button className='menu-button' value='switchboard' onClick={(e) => handleChooseRoute(e.target.value)}>Main Menu</button> */}
      </div>
    </div>
  )
}

export default AdminSwitchboard