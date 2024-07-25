import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home, Login, Signup } from './components'

function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
    </Routes>
    </>
  )
}

export default App
