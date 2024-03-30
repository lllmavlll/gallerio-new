import React from 'react'
import { UserAuth } from '../../auth/JWTAuthContext'

const Home = () => {
  const { user } = UserAuth()
  console.log(user);
  return (
    <div>homepage</div>
  )
}

export default Home