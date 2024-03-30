import { useState } from 'react'
import Home from './Components/Home/Home'
import Signup from './Components/Signup/Signup'
import { Route, Routes } from 'react-router-dom'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>

    </>
  )
}

export default App
