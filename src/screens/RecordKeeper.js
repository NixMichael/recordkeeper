import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/mainAppStyles.scss'
import '../styles/recordKeeperStyles.scss'
import Switchboard from './Switchboard'
import MainApp from './MainApp'


const RecordKeeper = () => {

  const screenRoute = useSelector(state => state.screenRoute)

  return (
    <div className='record-keeper-container'>
    {screenRoute === 'switchboard' ? 
    <Switchboard />
    :
    <MainApp />
    }
    </div>
  )
}

export default RecordKeeper