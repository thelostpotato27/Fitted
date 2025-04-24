import {useGlobalContext} from "../components/global_context";
import { collection, doc, setDoc, query, limit, getDoc  } from "firebase/firestore"
import {imgDB, txtDB } from "../firebaseConfig"
import userSetup from "../components/check_user"
import "./profile-creation.css"
import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from "react-router";
import { BsAsterisk } from "react-icons/bs";


function ProfileCreationPage(){
  const { globalVariable, setGlobalVariable } = useGlobalContext();
  const [username, setusername] = useState('');
  const [nameexists, setnameexists] = useState(true);
  const [isflashing, setisflashing] = useState(false);
  const [selectedHeight, setSelectedHeight] = useState("");
  const [weight, setweight] = useState("");
  const [shoulder, setshoulder] = useState("");
  const [chest, setchest] = useState("");
  const [waist, setwaist] = useState("");
  const [hip, sethip] = useState("");
  const navigate = useNavigate()

  function calluserSetup(){
    if(!globalVariable.username && (nameexists || selectedHeight == "" || weight == "")){
      console.log("This was rejected")
      console.log("username: ", username)
      console.log("weight: ", weight)
      console.log("height: ", selectedHeight)
      console.log("Shoulder: ", shoulder)
      console.log("Chest: ", chest)
      console.log("waist: ", waist)
      console.log("Hips: ", hip)
      setisflashing(true)
      setTimeout(() => {
        setisflashing(false)
      }, 1000)
    }else{
      console.log("This was accepted")
      console.log("username: ", username)
      console.log("weight: ", weight)
      console.log("height: ", selectedHeight)
      console.log("Shoulder: ", shoulder)
      console.log("Chest: ", chest)
      console.log("waist: ", waist)
      console.log("Hips: ", hip)
      userSetup(globalVariable, username, selectedHeight, weight, shoulder, chest, waist, hip).then(() => {
        navigate("/user")
      })
    }
    
  }

  const heightOptions = [];
  for (let feet = 3; feet <= 7; feet++) {
    for (let inches = 0; inches <= 11; inches++) {
      heightOptions.push(`${feet}'${inches}"`);
    }
  }

  useEffect(() => {
    if(username == ""){
      setnameexists(true)
    }else{
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
    }
  }, [username]);

  function displayAvailability(input){
    if(username == "" && globalVariable.username){
    }else if(username == ""){
      return(
        <span className={isflashing ? "flash-text unavailable-name" : "unavailable-name"}>Set your Name</span>
      )
    }else if(input){
      return(
        <span className={isflashing ? "flash-text unavailable-name" : "unavailable-name"}>Name already exists</span>
      )
    }else{
      return(
        <span className="available-name">Good to Go!</span>
      )
    }
  }

  function usersetupHeader(){
    if ("username" in globalVariable){
      return(
        <>
          <h1>Profile Update</h1>
        </>
      )
    }else{
      return(
        <>
          <h1>Profile Creation</h1>
          <div className="asterisk-legend">
            <BsAsterisk className="asterisk-in-legend"/>
            <h3>
              ={`>`} Necessary Inputs
            </h3>
          </div>
        </>
      )
    }
  }

  function usersetupupdateButton(){
    if ("username" in globalVariable){
      <button onClick={calluserSetup}>Update your Profile</button>
    }else{
      <button onClick={calluserSetup}>Create your Profile</button>
    }
    
  }

  if(globalVariable == null){
    return(
      <h2>Please wait for your data to load.</h2>
    )
  }else{
    return(
      <div className="input-style">
        {usersetupHeader()}
        <div className="horizontal-profile-create">
          <div className="usersetup-user-input">
            <h3>Username:</h3>
            <input value={username} onChange={(e)=>setusername(e.target.value)} placeholder="Username"/>
            {globalVariable.username == null && (<BsAsterisk className="necessary-asterisk-username"/>)}
          </div>
          <div className="name-availability-orginization">{displayAvailability(nameexists)}</div>
        </div>
        

        <div className="usersetup-form-orginizer">
          <div className="input-name">
            <h3>Weight:</h3>
            <input value={weight} onChange={(e)=>setweight(e.target.value)} type="number" placeholder="Enter your weight (lbs)"/>
            {globalVariable.username == null && (<BsAsterisk className="necessary-asterisk-weight"/>)}
          </div>
          <div className="input-name-right">
            <h3>Height:</h3>
            <select className="height-selector" onChange={(e) => setSelectedHeight(e.target.value)}>
              <option value="">Select height</option>
              {heightOptions.map((height, index) => (
                <option key={index} value={height}>{height}</option>
              ))}
            </select>
            {globalVariable.username == null && (<BsAsterisk className="necessary-asterisk-height"/>)}
          </div>
        </div>

        <div className="usersetup-form-orginizer">
          <div className="input-name">
            <h3>Shoulder:</h3>
            <input value={shoulder} onChange={(e)=>setshoulder(e.target.value)} type="number" placeholder="Enter your Shoulder size (in)"/>
          </div>
          <div className="input-name-right">
            <h3>Chest:</h3>
            <input value={chest} onChange={(e)=>setchest(e.target.value)} type="number" placeholder="Enter your Chest size (in)"/>
          </div>
        </div>

        <div className="usersetup-form-orginizer">
          <div className="input-name">
            <h3>Waist:</h3>
            <input value={waist} onChange={(e)=>setwaist(e.target.value)} type="number" placeholder="Enter your Waist size (in)"/>
          </div>
          <div className="input-name-right">
            <h3>Hips:</h3>
            <input value={hip} onChange={(e)=>sethip(e.target.value)} type="number" placeholder="Enter your Hip size (in)"/>
          </div>
        </div>
        
        <button onClick={calluserSetup}>Create your Profile</button>
      </div>
    )
  }
}

export default ProfileCreationPage