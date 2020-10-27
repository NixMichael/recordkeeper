import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/buttonStyles.scss'
import { fetchRecord, enableRecordEdit, newRecord, newRecordSubmitted, previousRecord } from '../../actions/recordActions'

const RecordActionButtons = () => {
  
  const currentRec = useSelector(state => state.currentRec)
  const { loading, recordCount, recordType, sequenceNumber, jobNumber, record } = currentRec
  const { permission, description, referrer, hospitalnumber, patientsurname, patientforename, department, category, user } = record
  const lastRec = recordCount - 1

  // if (record) {
  //   var { permission, description, referrer, hospitalnumber, patientsurname, patientforename, department, category, user } = record
  // }

  // ******** Component state ********

  const [currentRecordNumber, setCurrentRecordNumber] = useState(lastRec)

  const [buttonBoard, setButtonBoard] = useState('main')

  const [temporaryRecordState, setTemporaryRecordState] = useState([currentRec])

  //  ********************************

  useEffect(() => {
  // set currentRecordNumber value to the last record only on first load
  // (when finished loading and it's NaN and not 0)
  console.log('refresh:', lastRec)

  // if (!loading && !currentRecordNumber && currentRecordNumber !== 0 ) {
  if (currentRecordNumber === -1) {
    setCurrentRecordNumber(lastRec)
    // setTemporaryRecordState(currentRec)
  } else {
    console.log('currentRecordNumber now:', currentRecordNumber)
  }

},[loading, currentRecordNumber, lastRec, record])
  
  const dispatch = useDispatch()

  const nextRecord = (direction) => {

    console.log('currentRecordNumber on clicking back:', currentRecordNumber, 'and recordCount: ', recordCount)
  
    let next = 0

    if (recordCount > 0) {
      if (direction === 'forward') {
        if (currentRecordNumber < lastRec) {
          next = currentRecordNumber + 1
          setCurrentRecordNumber(currentRecordNumber + 1)
        } else if (currentRecordNumber === lastRec) {
          next = lastRec
          setCurrentRecordNumber(lastRec)
        }
      }

      if (direction === 'back') {
        if (currentRecordNumber > 0) {
          next = currentRecordNumber - 1
          setCurrentRecordNumber(currentRecordNumber - 1)
        } else if ( currentRecordNumber === 0) {
          next = 0
          setCurrentRecordNumber(0)
        }
        console.log('new next', next)
      }

      dispatch(fetchRecord('nextrec', next)) // pass in the record index number here
      console.log(currentRecordNumber)
    }
  }

  const createNewRecord = async (recordType) => {

    const { data } = await axios.get(`http://localhost:3004/lastrec/0`)

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

    // this.setState({
    //     jobNumReadOnly: true,
    //     job: newJob
    // })
  }

  const submitNewRecord = async () => {
    const newRecordCount = await axios({
      method: 'post',
      url: 'http://localhost:3004/',
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
      // }
      // readOnly: true
      
    })
    console.log('What is currentRecordNumber? A', currentRecordNumber)
    await dispatch(newRecordSubmitted(newRecordCount.data))
    await setCurrentRecordNumber(newRecordCount.data - 1)
    console.log('What is currentRecordNumber? B', currentRecordNumber)
  }

  const editRecord = () => {
    axios({
      method: 'put',
      url: 'http://localhost:3004/editrecord',
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
        issues: [],
        type: recordType
      }
    })
  }

  const deleteRecord = async () => {
    const job = jobNumber
    await axios({
      method: 'delete',
      url: 'http://localhost:3004/deleterecord',
      headers: {'Content-Type': 'application/json'},
      data: {
        job, recordType
      }
    })

    if (recordCount > 1) {
      // setCurrentRecordNumber(currentRecordNumber - 1)
      nextRecord('back')
    }

    setButtonBoard('main')
  }

  const handleClick = ({name}) => {

    switch (name) {
      case 'firstRecord':
        setCurrentRecordNumber(0)
        dispatch(fetchRecord('firstrec'))
        break
      case 'lastRecord':
        setCurrentRecordNumber(lastRec)
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
        console.log('CURRENT RECORD:', currentRec)
        setTemporaryRecordState(currentRec)
        setButtonBoard('editRecord')
        dispatch(enableRecordEdit(false))
        break
      case 'deleteRecord':
        setTemporaryRecordState(currentRec)
        setButtonBoard('deleteRecord')
        break
      case 'save':
        console.log('buttonBoard is:', buttonBoard)
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
        dispatch(enableRecordEdit(true))
        dispatch(previousRecord(temporaryRecordState))
        break
      default:
        alert('error: record action button dispatch not triggered')
    }
  }

  return (
    <div className='record-buttons'>
    {buttonBoard === 'main' ?
      <>
        <button className='record-button' name='firstRecord' onClick={(e) => handleClick(e.target)}>{`|<`}</button>
        <button className='record-button' name='previousRecord' onClick={(e) => handleClick(e.target)}>{`<`}</button>
        <button className='record-button' name='newRecord' onClick={(e) => handleClick(e.target)}>New</button>
        <button className='record-button' name='editRecord' onClick={(e) => handleClick(e.target)}>Edit</button>
        <button className='record-button' name='deleteRecord' onClick={(e) => handleClick(e.target)}>Delete</button>
        <button className='record-button' name='search' onClick={(e) => handleClick(e.target)}>Search</button>
        <button className='record-button' name='nextRecord' onClick={(e) => handleClick(e.target)}>{`>`}</button>
        <button className='record-button' name='lastRecord' onClick={(e) => handleClick(e.target)}>{`>|`}</button>
      </>
    : buttonBoard === 'newRecordChoice' ?
      <>
        <button className='record-button' name='createPatientRecord' onClick={(e) => handleClick(e.target)}>Patient</button>
        <button className='record-button' name='createTechRecord' onClick={(e) => handleClick(e.target)}>Tech</button>
        <button className='record-button' name='cancel' onClick={(e) => handleClick(e.target)}>Cancel</button>
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