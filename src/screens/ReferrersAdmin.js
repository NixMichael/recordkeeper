import React from 'react'
import CurrentList from '../components/adminComponents/CurrentList'
import AddNew from '../components/adminComponents/AddNew'

const ReferrersAdmin = () => {
  return (
    <div className="adminMain">
    <div className="editorContainer">

      <CurrentList />

      <AddNew />

    </div>         
  </div>
  )
}

export default ReferrersAdmin