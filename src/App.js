import React from 'react';
import { useSelector } from 'react-redux'
import LoginScreen from './screens/LoginScreen'
import RecordKeeper from './screens/RecordKeeper'

function App() {

  const login = useSelector(state => state.login)
  const { loggedIn } = login

  return (
    <>
    {!loggedIn ? 
      <LoginScreen />
      :
      <RecordKeeper />
    }
    </>
  );
}

export default App;
