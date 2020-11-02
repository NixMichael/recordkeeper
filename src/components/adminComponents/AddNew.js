import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../actions/adminActions'

const AddNew = () => {

  const dispatch = useDispatch()

  const [role, setRole] = useState('--Please Select--')
  const [initials, setInitials] = useState('')
  const [name, setName] = useState('')

  const screenRoute = useSelector(state => state.screenRoute)

  let currentTitle = screenRoute === 'editUsers' ? 'User' : screenRoute === 'editDepartments' ? 'Department' : screenRoute === 'editReferrers' ? 'Referrer' : 'Tech Category'

  const typeSelection = 'users'

  const handleChange = () => {
    console.log('blah')
  }

  const addNew = () => {
    const arr = [role, initials, name]
    dispatch(addUser(arr))

    setRole('--Please Select--')
    setInitials('')
    setName('')
  }

  return (

    <div className="admin-components">
      <h3>Add a new {currentTitle}</h3>
      <div className="new_user_boxes">
      {
      screenRoute === 'editUsers' ?
      <>
        <label>Role: <select className='record-input' id="typeSelection" name="typeSelection" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="--Please Select--">--Please Select--</option>
          <option value='Photographer' key='1'>Photographer</option>
          <option value='Designer' key='2'>Designer</option>
        </select>
        </label>
        <label>Initials: <input id="initials" type="text" name="newUserInitials" value={initials} onChange={(e) => setInitials(e.target.value)}/>
        </label>
        <label>Name: <input id="name" type="text" name="newUserName" value={name} onChange={(e) => setName(e.target.value)}/>
        </label>
      </>
      : screenRoute === 'editDepartments' ?
      <>
          <label>New department name:</label><input id="departmentName" type="text" name="department" />
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