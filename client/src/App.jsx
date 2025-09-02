import {  Routes, Route } from 'react-router-dom'
import React from 'react'
import './App.css'
import Start from './pages/Start'
import UserSignup from './pages/UserSignup'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/signup' element={<UserSignup />} />
      </Routes>
      

      <ToastContainer
  position="top-right"
  autoClose={2000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
/>
    </>
  )
}

export default App
