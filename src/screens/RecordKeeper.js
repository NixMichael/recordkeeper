import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/mainAppStyles.scss'
import '../styles/recordKeeperStyles.scss'
import Switchboard from './switchboards/Switchboard'
import AdminSwitchboard from './switchboards/AdminSwitchboard'
import ReportsSwitchboard from './switchboards/ReportsSwitchboard'
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
    screenRoute === 'reports' ?
    <ReportsSwitchboard />
    :
    <MainApp />
    }
    </div>
  )
}

export default RecordKeeper