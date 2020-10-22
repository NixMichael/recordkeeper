import React from 'react'
import { useDispatch } from 'react-redux'
import '../../styles/buttonStyles.scss'
import { fetchRecord } from '../../actions/recordActions'

const RecordActionButtons = () => {

  const dispatch = useDispatch()

  const handleClick = (name) => {
    console.log(name)
    switch (name) {
      case 'firstRecord':
        dispatch(fetchRecord('firstRec'))
        break
      case 'lastRecord':
        dispatch(fetchRecord('lastRec'))
        break
      case 'previousRecord':
        dispatch(fetchRecord('nextRec', 2)) // pass in the record index number here
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