import { useState } from 'react'
import Home from './Components/Home/Home'
import Signup from './Components/Signup/Signup'
import { Route, Routes } from 'react-router-dom'
import UserRoute from './routes/UserRoute'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/signup'
          element={
            <UserRoute>
              <Signup />
            </UserRoute>
          } />
      </Routes>

    </>
  )
}

export default App
