import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";

const UserContext = createContext();

export const AUthContextProvider = ({ children }) => {
  const [isloading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  //signup
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //signout
  const logout = () => {
    return signOut(auth);
  };

  //signin
  const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //forgot password
  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(true);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <UserContext.Provider
      value={{
        user,
        createUser,
        userLogin,
        logout,
        forgotPassword,
      }}
    >
      {isloading ? (
        children
      ) : (
        <div className="d-flex justify-content-between">
          {/* <Spinner animation="border" variant="primary" /> */}
          <div>Loadingggg...</div>
        </div>
      )}
    </UserContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(UserContext);
};