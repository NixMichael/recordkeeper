import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/buttonStyles.scss'
import { fetchRecord, recordCountUpdate } from '../../actions/recordActions'

const RecordActionButtons = () => {

  const currentRec = useSelector(state => state.currentRec)
  const { recordCount, currentRecordIndex } = currentRec
  const lastRec = recordCount - 1

  const dispatch = useDispatch()

  const updateRecordCount = (newRecordIndex) => {
    dispatch(recordCountUpdate(newRecordIndex))
  }

  const nextRecord = (direction) => {
    let next = 0

    if (recordCount > 0) {
      if (direction === 'forward') {
        if (currentRecordIndex < lastRec) {
          next = currentRecordIndex + 1
          updateRecordCount(next)
        } else if (currentRecordIndex === lastRec) {
          next = lastRec
          updateRecordCount(lastRec)
        }
      }

      if (direction === 'back') {
        if (currentRecordIndex > 0) {
          next = currentRecordIndex - 1
          updateRecordCount(next)
        } else if ( currentRecordIndex === 0) {
          next = 0
          updateRecordCount(0)
        }
      }

      dispatch(fetchRecord('nextRec', next)) // pass in the record index number here
    }
  }

  const handleClick = (name) => {
    console.log(name, recordCount)
    switch (name) {
      case 'firstRecord':
        dispatch(fetchRecord('firstRec'))
        break
      case 'lastRecord':
        dispatch(fetchRecord('lastRec'))
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