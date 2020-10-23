import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/buttonStyles.scss'
import { fetchRecord } from '../../actions/recordActions'

const RecordActionButtons = () => {
  
  
  const currentRec = useSelector(state => state.currentRec)
  const { loading, recordCount } = currentRec
  const lastRec = recordCount - 1

  const [currentRecordNumber, setCurrentRecordNumber] = useState(lastRec)
  console.log('Initial value of currentRecordNumber:', currentRecordNumber)

  useEffect(() => {
  // set currentRecordNumber value to the last record only on first load
  // (when finished loading and it's NaN and not 0)
  if (!loading && !currentRecordNumber && currentRecordNumber !== 0 ) {
    setCurrentRecordNumber(lastRec)
  }
},[loading])

  console.log('recordCount is:', recordCount, 'lastRec is:', lastRec, 'currentRecordNumber is:', currentRecordNumber)
  
  const dispatch = useDispatch()

  const nextRecord = (direction) => {
    let next = 0

    if (recordCount > 0) {
      console.log('currentRecordNumber once loaded:', currentRecordNumber)
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

      console.log('Record to fetch:', next, 'Current record number:', currentRecordNumber)
      dispatch(fetchRecord('nextrec', next)) // pass in the record index number here
    }
  }

  const handleClick = (name) => {
    console.log(name, recordCount)
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
      default:
        alert('error: record action button dispatch not triggered')
    }
  }

  return (
    <div className='record-buttons'>
      <button className='record-button' name='firstRecord' onClick={(e) => handleClick(e.target.name)}>{`|<`}</button>
      <button className='record-button' name='previousRecord' onClick={(e) => handleClick(e.target.name)}>{`<`}</button>
      <button className='record-button' name='newRecord' onClick={(e) => handleClick(e.target.name)}>New</button>
      <button className='record-button' name='edit' onClick={(e) => handleClick(e.target.name)}>Edit</button>
      <button className='record-button' name='delete' onClick={(e) => handleClick(e.target.name)}>Delete</button>
      <button className='record-button' name='search' onClick={(e) => handleClick(e.target.name)}>Search</button>
      <button className='record-button' name='nextRecord' onClick={(e) => handleClick(e.target.name)}>{`>`}</button>
      <button className='record-button' name='lastRecord' onClick={(e) => handleClick(e.target.name)}>{`>|`}</button>
    </div>
  )
}

export default RecordActionButtons