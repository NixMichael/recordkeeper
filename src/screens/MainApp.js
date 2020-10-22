import React from 'react'
import { useSelector } from 'react-redux'
import Navigation from '../components/Navigation'
import BrowseRecords from './BrowseRecords'
import Admin from './Admin'
import Reports from './Reports'

const MainApp = () => {

  const screenRoute = useSelector(state => state.screenRoute)

  return (
    <>
      <Navigation />
      {
        screenRoute === 'browseRecords' ?
        <BrowseRecords />
        : screenRoute === 'admin' ?
        <Admin />
        :
        <Reports />
      }
    </>
  )
}

export default MainApp