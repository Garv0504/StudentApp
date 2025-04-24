import React from 'react'
import Registration from './components/Registration.jsx'
import Login from './components/Login.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from './components/Welcome.jsx'
import Dashboard from './components/Dashboard.jsx'

const App = () => {
  return (
        <Routes>
          <Route path='/' element={<Welcome/>}/>
          <Route path='/register' element={<Registration/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
  )
}

export default App