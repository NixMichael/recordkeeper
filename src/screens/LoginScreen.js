import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../actions/userActions'

const LoginScreen = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = () => {
    console.log('clicked')
    dispatch(loginUser())
  }

  return (
    <div className='loginScreen'>
      <h2>Sign In</h2>
      <div>
      <label>Username: </label>
      <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div>
      <label>Password: </label>
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <button onClick={handleClick}>Log In</button>
    </div>
  )
}

export default LoginScreen