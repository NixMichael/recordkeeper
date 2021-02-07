import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/buttonStyles.scss'
import { fetchRecord, updateRecordNumber, enableRecordEdit, newRecord, newRecordSubmitted, previousRecord } from '../../actions/recordActions'
import { chooseRoute } from '../../actions/routeActions'

const RecordActionButtons = ({buttonOption}) => {
  
  const currentRec = useSelector(state => state.currentRec)
  
  const {recordCount, currentRecordNumber, recordType, sequenceNumber, jobNumber, record, newIssues, record: {permission, description, referrer, hospitalnumber, patientsurname, patientforename, department, category, user} = {}} = currentRec

  const lastRec = recordCount - 1

  const dispatch = useDispatch()

  // ******** Component state ********
  const [buttonBoard, setButtonBoard] = useState('main')
  const [temporaryRecordState, setTemporaryRecordState] = useState([currentRec])

  const nextRecord = async (direction) => {
  
    let next = 0

    if (recordCount > 0) {
      if (direction === 'forward') {
        if (currentRecordNumber < lastRec) {
          next = currentRecordNumber + 1
        } else if (currentRecordNumber === lastRec) {
          next = lastRec
        }
      }

      if (direction === 'back') {
        if (currentRecordNumber > 0) {
          next = currentRecordNumber - 1
        }
      }
      dispatch(fetchRecord('nextrec', next)) // pass in the record index number here
      dispatch(updateRecordNumber(next))
    }
  }

  const createNewRecord = async (recordType) => {

    const { data } = await axios.get(`https://morning-basin-38652.herokuapp.com/lastrec/0`)

    let seqNumber = 1

    if (data[5] > 0) {
      const today = new Date().getDate()
      seqNumber = data[7] === today ? data[6] + 1 : 1
    }

    let year = new Date().getFullYear().toString().substr(-2);
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    let count = seqNumber < 10 ? `0${seqNumber}` : seqNumber

    let newJob = `${year}${month}${day}${count}`;

    dispatch(newRecord(newJob, recordType, seqNumber))
  }

  const submitNewRecord = async () => {
    const newRecordCount = await axios({
      method: 'post',
      url: 'https://morning-basin-38652.herokuapp.com/',
      headers: {'Content-Type': 'application/json'},
      data: {
        seqNum: sequenceNumber,
        day: new Date().getDate(),
        job: jobNumber,
        permission: permission,
        requestedBy: referrer,
        department: department,
        hospitalNumber: hospitalnumber,
        patientSurname: patientsurname,
        patientForename: patientforename,
        description: description,
        category: category,
        user: user,
        issues: [],
        type: recordType
      }
    })
    await dispatch(newRecordSubmitted(newRecordCount.data))
    await dispatch(updateRecordNumber(newRecordCount.data - 1))
  }

  const editRecord = async () => {
    await axios({
      method: 'put',
      url: 'https://morning-basin-38652.herokuapp.com/editrecord',
      headers: { 'Content-Type': 'application/json'},
      data: {
        job: jobNumber,
        permission: permission,
        requestedBy: referrer,
        department: department,
        hospitalNumber: hospitalnumber,
        patientSurname: patientsurname,
        patientForename: patientforename,
        description: description,
        category: category,
        photographer: user,
        designer: user,
        type: recordType
      }
    })
  }

  const deleteRecord = async () => {
    const job = jobNumber
    await axios({
      method: 'delete',
      url: 'https://morning-basin-38652.herokuapp.com/deleterecord',
      headers: {'Content-Type': 'application/json'},
      data: {
        job, recordType
      }
    })

    if (recordCount > 1) {
      nextRecord('back')
    }

    setButtonBoard('main')
  }

  const updateIssuedDb = async () => {
    const jobnumber = jobNumber
    const count = newIssues
      await axios({
        method: 'delete',
        url: 'https://morning-basin-38652.herokuapp.com/deletenewissues',
        headers: { 'Content-Type': 'application/json'},
        data: { jobnumber, count }
      })
  }

  const handleClick = async ({name}) => {

    switch (name) {
      case 'firstRecord':
        dispatch(fetchRecord('firstrec'))
        dispatch(updateRecordNumber(0))
        break
      case 'lastRecord':
        dispatch(updateRecordNumber(lastRec))
        dispatch(fetchRecord('lastrec'))
        break
      case 'previousRecord':
        nextRecord('back')
        break
      case 'nextRecord':
        nextRecord('forward')
        break
      case 'newRecord':
        setTemporaryRecordState(currentRec)
        setButtonBoard('newRecordChoice')
        dispatch(enableRecordEdit(false))
        break
      case 'editRecord':
        setTemporaryRecordState(currentRec)
        setButtonBoard('editRecord')
        dispatch(enableRecordEdit(false))
        break
      case 'deleteRecord':
        setTemporaryRecordState(currentRec)
        setButtonBoard('deleteRecord')
        break
      case 'search':
        setButtonBoard('search')
        break
      case 'save':
        switch (buttonBoard) {
          case 'submitNewRecord':
            submitNewRecord()
            dispatch(enableRecordEdit(true))
            break
          case 'editRecord':
            editRecord()
            dispatch(enableRecordEdit(true))
            break
          case 'deleteRecord':
            deleteRecord()
            break
          default:
            dispatch(enableRecordEdit(true))
        }
        setButtonBoard('main')
        break
      case 'createPatientRecord':
        createNewRecord('p')
        setButtonBoard('submitNewRecord')
        dispatch(enableRecordEdit(false))
        break
      case 'createTechRecord':
        createNewRecord('t')
        setButtonBoard('submitNewRecord')
        dispatch(enableRecordEdit(false))
        break
      case 'cancel':
        setButtonBoard('main')
        updateIssuedDb()
        dispatch(enableRecordEdit(true))
        dispatch(previousRecord(temporaryRecordState)) // revert back to most recently viewed record
        break
      case 'cancelSearch':
        dispatch(chooseRoute('browseRecords'))
        setButtonBoard('main')
        break
      case 'patientSearch':
        dispatch(chooseRoute('patientSearch'))
        break
      case 'techSearch':
        dispatch(chooseRoute('techSearch'))
        break
      default:
        alert('error: record action button dispatch not triggered')
    }
  }

  return (
    <div className='record-buttons'>
    {
    buttonOption === 'return' ?
      <>
        <button className='record-button' name='cancelSearch' onClick={(e) => handleClick(e.target)}>Back to Records</button>
      </>
      :
    buttonBoard === 'main' ?
      <div>
        <button className='record-button' name='firstRecord' onClick={(e) => handleClick(e.target)}>{`|<`}</button>
        <button className='record-button' name='previousRecord' onClick={(e) => handleClick(e.target)}>{`<`}</button>
        <button className='record-button' name='newRecord' onClick={(e) => handleClick(e.target)}>New</button>
        <button className='record-button' name='editRecord' onClick={(e) => handleClick(e.target)}>Edit</button>
        <button className='record-button' name='deleteRecord' onClick={(e) => handleClick(e.target)}>Delete</button>
        <button className='record-button' name='search' onClick={(e) => handleClick(e.target)}>Search</button>
        <button className='record-button' name='nextRecord' onClick={(e) => handleClick(e.target)}>{`>`}</button>
        <button className='record-button' name='lastRecord' onClick={(e) => handleClick(e.target)}>{`>|`}</button>
      </div>
    : buttonBoard === 'newRecordChoice' ?
      <>
        <button className='record-button' name='createPatientRecord' onClick={(e) => handleClick(e.target)}>Patient</button>
        <button className='record-button' name='createTechRecord' onClick={(e) => handleClick(e.target)}>Tech</button>
        <button className='record-button' name='cancel' onClick={(e) => handleClick(e.target)}>Cancel</button>
      </>
    : buttonBoard === 'search' ?
      <>
        <button className='record-button' name='patientSearch' onClick={(e) => handleClick(e.target)}>Search Patient Jobs</button>
        <button className='record-button' name='techSearch' onClick={(e) => handleClick(e.target)}>Search Tech Jobs</button>
        <button className='record-button' name='cancelSearch' onClick={(e) => handleClick(e.target)}>Cancel</button>
      </>
    :
      <>
        <button className='record-button' name='save' onClick={(e) => handleClick(e.target)}>{buttonBoard === 'deleteRecord' ? 'Delete' : 'Save'}</button>
        <button className='record-button' name='cancel' onClick={(e) => handleClick(e.target)}>Cancel</button>
      </>
    }
    </div>
  )
}

export default RecordActionButtons