import {app, auth} from "../firebaseConfig"
import { useState, createContext, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useGlobalContext} from "./global_context";
import {imgDB, txtDB } from "../firebaseConfig"
import { collection, doc, setDoc, query, limit, getDoc, updateDoc, deleteField } from "firebase/firestore"
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from "react-router";


async function userAuth(){
  const [user,setuser] = useState(null)
  const { globalVariable, setGlobalVariable } = useGlobalContext();
  const navigate = useNavigate()

  useEffect(() => {
    console.log("user auth use Effect pop")
    if(user != null && "uid" in user){
      const docref = doc(txtDB, "User-data", user.uid)
      getDoc(docref).then((data) => {
        console.log("useEffect in auth state: ", data.data())
        const userData = data.data()
        if ("username" in userData){
          // console.log("Userdata before put in global var: ", userData)
          setGlobalVariable({...globalVariable, ...userData})
          console.log("global variable after data set: ", globalVariable.username)
        }else{
          navigate('/usersetup')
        }
        
      })
    }
  }, user)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userOut = user.uid;
      setGlobalVariable(user)
      setuser(user)

      // return user
    } else {
      // User is signed out
      // ...
      // console.log("User logged out, seen from auth state listener")
      setGlobalVariable(null)
      console.log("auth state listener global store after logout: ",globalVariable)
      // return null
    }
  });
  // return user
}

export default userAuth