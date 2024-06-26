import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCMBaT8SyVovXnNRZyhXMsbqnicLrUIUmY",
  authDomain: "gallerio-9b61c.firebaseapp.com",
  projectId: "gallerio-9b61c",
  storageBucket: "gallerio-9b61c.appspot.com",
  messagingSenderId: "617686326304",
  appId: "1:617686326304:web:380c04377132b93708f045"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const auth = getAuth(app)
export const db = getFirestore(app);