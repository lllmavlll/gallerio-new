import React ,{ createContext, useContext, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth'
import { jwtDecode } from "jwt-decode";
import {auth} from "src/firebase/config";

const UserContext = createContext()

export const AUthContextProvider =({children})=>{
  const [isloading,setIsLoading] = useState(false)
  const [user, setUser] = useState({})
  const [ tokenData, setTOkenData] = useState({})
  
  //signup
  const createUser=(email, password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
  }

  //signout
  const logout=()=>{
    return signOut(auth)
  }
  
  //signin
  const userLogin=(email, password)=>{
    return signInWithEmailAndPassword(auth,email,password)
  }
  
  //forgot password
  const forgotPassword=(email)=>{
    return sendPasswordResetEmail(auth,email)
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{

      try {
        const token = currentUser.accessToken
        const decodedToken = jwtDecode(token)
        setTOkenData(decodedToken)
        setIsLoading(true)
        setUser(currentUser)
        
      } catch (error) {
        setUser(currentUser)
        setIsLoading(true)
      }
    })
    return ()=>{
      unsubscribe()
    }
  },[])

  return(
    <UserContext.Provider value={{
      user,
      tokenData,
      createUser,
      userLogin,
      logout,
      forgotPassword,
      }}
    >
    {isloading?(
      children
    ):(
      <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
      </div>
    )}
    </UserContext.Provider>
  )
}
export const UserAuth = ()=>{
  return useContext(UserContext)
}


