import {app, auth} from "../firebaseConfig"
import { useState, createContext } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";


async function userAuth(){
  const [user,setuser] = useState(null)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const userOut = user.uid;
      console.log("auth state listener login recognized: ", user)
      setuser(user)
      return user
    } else {
      // User is signed out
      // ...
      console.log("User logged out, seen from auth state listener")
      setuser(null)
      return null
    }
  });
  // return user
}

export default userAuth