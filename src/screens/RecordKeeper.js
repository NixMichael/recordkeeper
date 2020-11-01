import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/mainAppStyles.scss'
import '../styles/recordKeeperStyles.scss'
import Switchboard from './Switchboard'
import AdminSwitchboard from './AdminSwitchboard'
import MainApp from './MainApp'
import { fetchFieldData } from '../actions/recordActions'

const RecordKeeper = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFieldData())
  }, [dispatch])

  const screenRoute = useSelector(state => state.screenRoute)

  return (
    <div className='record-keeper-container'>
    {screenRoute === 'switchboard' ? 
    <Switchboard />
    :
    screenRoute === 'admin' ?
    <AdminSwitchboard />
    :
    <MainApp />
    }
    </div>
  )
}

export default RecordKeeper