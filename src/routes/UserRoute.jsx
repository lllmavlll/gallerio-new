import React from 'react'
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../auth/JWTAuthContext';

const UserRoute = ({ children }) => {
  const { user } = UserAuth()
  // const user = 'mahesh'
  if (user) {
    return <Navigate to='/' replace={true} />
  }
  return children;

}

export default UserRoute