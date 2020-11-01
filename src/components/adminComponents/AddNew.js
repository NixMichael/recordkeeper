import React from 'react'
import { useSelector } from 'react-redux'

const AddNew = () => {

  const screenRoute = useSelector(state => state.screenRoute)

  let currentTitle = screenRoute === 'editUsers' ? 'User' : screenRoute === 'editDepartments' ? 'Department' : screenRoute === 'editReferrers' ? 'Referrer' : 'Tech Category'

  const typeSelection = 'users'

  const handleChange = () => {
    console.log('blah')
  }

  const addNew = () => {
    console.log('add new')
  }

  return (

    <div className="addNew">
      <h3 className="centerMe">Add a new {currentTitle}</h3>
      <div className="newUser__Boxes">
      {
      screenRoute === 'editUsers' ?
      <>
        <label>Role: <select className='record-input' id="typeSelection" name="typeSelection" value={typeSelection}>
          <option value="--Please Select--">--Please Select--</option>
          <option value='Photographer' key='1'>Photographer</option>
          <option value='Designer' key='2'>Designer</option>
        </select>
        </label>
        <label>Initials: <input id="initials" type="text" name="newUserInitials" />
        </label>
        <label>Name: <input id="name" type="text" name="newUserName" />
        </label>
      </>
      : screenRoute === 'editDepartments' ?
      <>
          <input id="departmentName" type="text" name="department" />
      </>
      : screenRoute === 'editReferrers' ?
      <>
        <label>Initials: <input id="initials" type="text" name="newUserInitials" />
        </label>
        <label>Name: <input id="name" type="text" name="newUserName" />
        </label>
      </>
      :
        <>
          <label>Category: <input id="category" type="text" name="category" /></label>
          <label>Cost (0.00): <input id="cost" type="text" name="cost" /></label>
        </>
      }
      </div>
      <button className="record-button" onClick={() => {addNew('listType')}}>Add</button>
    </div>
  )
}

export default AddNew