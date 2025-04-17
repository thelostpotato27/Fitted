import {useGlobalContext} from "../components/global_context";
import { collection, doc, setDoc, query, limit, getDoc  } from "firebase/firestore"
import {imgDB, txtDB } from "../firebaseConfig"
import userSetup from "../components/check_user"
import "./profile-creation.css"
import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from "react-router";

function ProfileCreationPage(){
  const { globalVariable, setGlobalVariable } = useGlobalContext();
  const [username, setusername] = useState('');
  const [nameexists, setnameexists] = useState(true);
  const [isflashing, setisflashing] = useState(false);
  const navigate = useNavigate()

  function calluserSetup(){
    if(nameexists){
      setisflashing(true)
      setTimeout(() => {
        setisflashing(false)
      }, 1000)
    }else{
      userSetup(globalVariable, username).then(() => {
        navigate("/user")
      })
    }
    
  }

  useEffect(() => {
    const userdoc = doc(txtDB, "Usernames", "Usernames");
    const userdocquery = query(userdoc)
    getDoc(userdocquery).then(data => {
      console.log("profile creation: ", data.data());
      if(data.data()[`${username}`]){
        setnameexists(true)
      }else{
        setnameexists(false)
      }
    })
  }, [username]);

  function displayAvailability(input){
    if(input){
      return(
        <span className={isflashing ? "flash-text unavailable-name" : "unavailable-name"}>Name already exists</span>
      )
    }else{
      return(
        <span className="available-name">Good to Go!</span>
      )
    }
  }


  if(globalVariable == null){
    return(
      <h2>Please wait for your data to load.</h2>
    )
  }else{
    return(
      <div className="input-style">
        <h1>Profile Creation</h1>
        <div className="horizontal-profile-create">
          <div className="usersetup-user-input">
            <h3>Username:</h3>
            <input value={username} onChange={(e)=>setusername(e.target.value)} placeholder="Username"/>
          </div>
          <div className="name-availability-orginization">{displayAvailability(nameexists)}</div>
        </div>
        

        <div className="usersetup-form-orginizer">
          <div className="input-name">
            <h3>Weight:</h3>
            <input type="number" placeholder="Enter your weight"/>
          </div>
          <div className="input-name-right">
            <h3>Height:</h3>
            <input type="number" placeholder="Enter your height"/>
          </div>
        </div>

        <div className="usersetup-form-orginizer">
          <div className="input-name">
            <h3>Shoulder:</h3>
            <input type="number" placeholder="Enter your Shoulder Width"/>
          </div>
          <div className="input-name-right">
            <h3>Chest:</h3>
            <input type="number" placeholder="Enter your Chest size"/>
          </div>
        </div>

        <div className="usersetup-form-orginizer">
          <div className="input-name">
            <h3>Waist:</h3>
            <input type="number" placeholder="Enter your Waist"/>
          </div>
          <div className="input-name-right">
            <h3>Hips:</h3>
            <input type="number" placeholder="Enter your Hips"/>
          </div>
        </div>
        
        <button onClick={calluserSetup}>Create your Profile</button>
      </div>
    )
  }
}

export default ProfileCreationPage