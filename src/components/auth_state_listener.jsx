import {app, auth} from "../firebaseConfig"
import { useState, createContext } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useGlobalContext} from "./global_context";



async function userAuth(){
  const [user,setuser] = useState(null)
  const { globalVariable, setGlobalVariable } = useGlobalContext();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const userOut = user.uid;
      // console.log("auth state listener login recognized: ", user)
      setGlobalVariable(user)
      console.log("auth state listener global store: ",globalVariable)
      
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