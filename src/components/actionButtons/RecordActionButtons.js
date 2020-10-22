import React from 'react'
import '../../styles/buttonStyles.scss'

const RecordActionButtons = () => {

  const handleClick = (name) => {

    console.log(name)

    // switch (name) {
    //   case firstRecord:
    //     // dispatch action
    //   default:
    //     // dispatch action
    // }
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