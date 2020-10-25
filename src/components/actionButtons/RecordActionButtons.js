import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/buttonStyles.scss'
import { fetchRecord, enableRecordEdit } from '../../actions/recordActions'

const RecordActionButtons = () => {
  
  const currentRec = useSelector(state => state.currentRec)
  const { loading, recordCount, readOnly, recordType, record } = currentRec
  // const { jobnumber } = record
  const lastRec = recordCount - 1

  // Component state
  const [currentRecordNumber, setCurrentRecordNumber] = useState(lastRec)
  console.log('Initial value of currentRecordNumber:', currentRecordNumber)

  const [buttonBoard, setButtonBoard] = useState('main')

  useEffect(() => {
  // set currentRecordNumber value to the last record only on first load
  // (when finished loading and it's NaN and not 0)
  if (!loading && !currentRecordNumber && currentRecordNumber !== 0 ) {
    setCurrentRecordNumber(lastRec)
  }
},[loading, currentRecordNumber, lastRec])

  console.log('recordCount is:', recordCount, 'lastRec is:', lastRec, 'currentRecordNumber is:', currentRecordNumber)
  
  const dispatch = useDispatch()

  const nextRecord = (direction) => {
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
      }

      dispatch(fetchRecord('nextrec', next)) // pass in the record index number here
    }
  }

  const deleteRecord = async () => {
    const job = record.jobnumber
    console.log('job:', job)
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
        setButtonBoard('newRecord')
        dispatch(enableRecordEdit(false))
        break
      case 'editRecord':
        setButtonBoard('editRecord')
        dispatch(enableRecordEdit(false))
        break
      case 'deleteRecord':
        setButtonBoard('deleteRecord')
        break
      case 'save':
        switch (buttonBoard) {
          case 'deleteRecord':
            deleteRecord()
            break
          default:
            console.log('nope')
            setButtonBoard('main')
            dispatch(enableRecordEdit(true))
        }
        break
      case 'cancel':
        setButtonBoard('main')
        dispatch(enableRecordEdit(true))
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
      :
        <>
          <button className='record-button' name='save' onClick={(e) => handleClick(e.target)}>Save</button>
          <button className='record-button' name='cancel' onClick={(e) => handleClick(e.target)}>Cancel</button>
        </>
      }
    </div>
  )
}

export default RecordActionButtons