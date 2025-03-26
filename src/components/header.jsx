import './header.css'
import { Outlet, Link } from "react-router"
import React, { useEffect, useState, useRef } from 'react';
import userAuth from './auth_state_listener.jsx'
import {app, auth} from "../firebaseConfig"
import { getAuth, onAuthStateChanged } from "firebase/auth";


function Header(){  
  const [loginName,setloginName] = useState("Login")
  const [logindest,setlogindest] = useState("/login")
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const userOut = user.uid;
      console.log("header login recognized: ", user)
      setloginName("User")
      setlogindest("/user")
    } else {
      // User is signed out
      // ...
      console.log("User logged out, seen from header")
      setloginName("Login")
      setlogindest("/login")
    }
  });

  const temp = userAuth()
  console.log("auth state listener out: ", temp)

  return (
    <>
      <nav className="header">
        <div className="header-left">
          <Link to="/" > Home </Link>
        </div>
        <div className="header-right">
          <Link to="/Reviews" > Reviews </Link>
          <Link to="/Input" > Input </Link>
          <Link to="/about" > About </Link>
          <Link to={logindest} > {loginName} </Link>
        </div>
      </nav>
      <Outlet />
    </>
  )
}

export default Header