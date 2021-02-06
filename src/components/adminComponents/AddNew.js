import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAdminEntry } from '../../actions/adminActions'

const AddNew = () => {

  const dispatch = useDispatch()

  const [role, setRole] = useState('--Please Select--')
  const [initials, setInitials] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [departmentName, setDepartmentName] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [cost, setCost] = useState(null)

  const screenRoute = useSelector(state => state.screenRoute)

  let currentTitle = screenRoute === 'editUsers' ? 'User' : screenRoute === 'editDepartments' ? 'Department' : screenRoute === 'editReferrers' ? 'Referrer' : 'Category'

  const submitNewListItem = async (data) => {
    await dispatch(addNewAdminEntry(screenRoute, data))

    setRole('--Please Select--')
    setInitials('')
    setName('')
    setEmail('')
    setIsAdmin(false)
    setDepartmentName('')
    setCategoryName('')
    setCost(0)
  }

  const addNew = () => {

    const newDetails = {
      role: role,
      initials: initials,
      name: name,
      email: email,
      isAdmin: isAdmin,
      departmentName: departmentName,
      categoryName: categoryName,
      cost: cost
    }

    if (screenRoute === 'editUsers' & (role === '--Please Select--' || initials === '' || name === '')) {
      alert('Please enter a value for all fields')
    } else if (screenRoute === 'editDepartments' && departmentName === '') {
      alert('Please enter a value for all fields')
    } else if (screenRoute === 'editReferrers' && (initials === '' || name === '')) {
      alert('Please enter a value for all fields')
    } else if (screenRoute === 'editCategories' && (categoryName === '' || cost === '')) {
      alert('Please enter a value for all fields')
    } else {
      submitNewListItem(newDetails)
    }
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
        <label>Email: <input id="email" type="text" name="newEmail" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>Administrator?: <input id="isAdmin" type="checkbox" name="isAdmin" value={isAdmin} onChange={(e) => setIsAdmin(e.target.value)}/>
        </label>
      </>
      : screenRoute === 'editDepartments' ?
      <>
          <label>New department name:</label><input id="departmentName" type="text" name="department" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)}/>
      </>
      : screenRoute === 'editReferrers' ?
      <>
        <label>Initials: <input id="initials" type="text" name="newUserInitials" value={initials} onChange={(e) => setInitials(e.target.value)}/>
        </label>
        <label>Name: <input id="name" type="text" name="newUserName" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </>
      :
        <>
          <label>Category: <input id="category" type="text" name="category" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} /></label>
          <label>Cost (0.00): <input id="cost" type="text" name="cost" value={cost} onChange={(e) => setCost(e.target.value)} /></label>
        </>
      }
      </div>
      <button className="record-button" onClick={() => {addNew('listType')}}>Add</button>
    </div>
  )
}

export default AddNew