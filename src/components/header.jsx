import './header.css'
import { Outlet, Link } from "react-router"
import React, { useEffect, useState, useRef } from 'react';
import userAuth from './auth_state_listener.jsx'
import {app, auth} from "../firebaseConfig"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useGlobalContext} from "./global_context";
// Supports weights 200-900
import '@fontsource-variable/mulish';


function Header(){  
  const [loginName,setloginName] = useState("Login")
  const [logindest,setlogindest] = useState("/login")
  const { globalVariable, setGlobalVariable } = useGlobalContext();
  
  userAuth()
  useEffect(() => {
    if(globalVariable == null){
      setloginName("Login")
      setlogindest("/login")
    }else{
      setloginName("User")
      setlogindest("/user")
    }
  }, [globalVariable])
  

  return (
    <>
      <nav className="header">
        <div className="header-left">
          <Link to="/" className='home-logo'> <span className='green-header-highlight'>Fitted</span> </Link>
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