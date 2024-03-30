import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, storage } from "../firebase/config";
// for storage
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

const UserContext = createContext();

export const AUthContextProvider = ({ children }) => {
  const [isloading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)

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

  // image storage

  const startUpload = (file) => {
    if (!file) {
      return;
    }
    console.log(file);

    const fileId = uuidv4()
    const storageRef = ref(storage, `images/${fileId}.jpeg`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress)
      },
      (error) => {
        setError(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL)
        });
      }
    );
  }

  const imageObject = {
    url,
    progress,
    error,
  }

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
        startUpload,
        imageObject,
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