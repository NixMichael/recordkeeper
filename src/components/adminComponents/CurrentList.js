import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/adminStyles.scss'
// import { fetchFieldData } from '../../actions/recordActions'

const CurrentList = () => {

  let x = 0
  // const dispatch = useDispatch()

  // useEffect(async () => {
  //   await dispatch(fetchFieldData())
  // }, [dispatch])

  const screenRoute = useSelector(state => state.screenRoute)

  const [selected, setSelected] = useState([])

  let currentTitle = screenRoute === 'editUsers' ? 'Users' : screenRoute === 'editDepartments' ? 'Departments' : screenRoute === 'editReferrers' ? 'Referrers' : 'Tech Categories'

  const fieldData = useSelector(state => state.fieldData)
  const { users, departments, referrers, techTypes } = fieldData

  const handleChange = (index) => {
    const newArr = [...selected]
    if (newArr[index] !== true) {
      newArr[index] = true
    } else {
      newArr[index] = false
    }
    console.log('newArr with update:', newArr)

    setSelected(newArr)
  }

  const deleteUser = () => {
    
  }

  return (
    <div className="editLists">
      <h3>Current {currentTitle}</h3>
      <div className="adminButtons">
        <button onClick={() => {deleteUser(screenRoute)}}>X</button>
      </div>
      <ul>
        {
        screenRoute === 'editUsers' ?
        users.map((user, index) => {
          return (
          <div key={user.id}>
            <li>{user.name}<br/>({user.usertype})[{index})</li>
            <input type='checkbox' id={user.name} name={index} checked={selected[index] || false} onChange={() => handleChange(index)}/>
          </div>
          )
        })
        :
        screenRoute === 'editDepartments' ?
        departments.map((dept, index) => {
          return (
            <div className="editDepartments" key={dept.id}>
              <li>{dept.departmentname}</li>
              <li></li>
              <input className="adminCheckbox" id={dept.departmentname} name={index} checked={selected[index] || false} type="checkbox" onChange={handleChange}/>
            </div>
          )
        })
        :
        screenRoute === 'editReferrers' ?
        referrers.map((referrer, index) => {
          return (
            <div key={referrer.id}>
              <li>{referrer.name}</li>
              <li></li>
              <input className="adminCheckbox" id={referrer.name} name={index} checked={selected[index] || false} type="checkbox" onChange={handleChange}/>
            </div>
          )
        })
        :
        techTypes.map((category, index) => {
          return (
            <div key={category.id}>
              <li>{category.type}</li>
              <li></li>
              <input className="adminCheckbox" id={category.type} name={index} checked={selected[index] || false} type="checkbox" onChange={handleChange}/>
            </div>
          )
        })
        }
    </ul>
  </div>
  )
}

export default CurrentList