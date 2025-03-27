import {app, auth} from "../firebaseConfig"
import React, { useEffect, useState, useRef } from 'react';
import {useGlobalContext} from "../components/global_context";
import { getAuth, createUserWithEmailAndPassword, signOut  } from "firebase/auth";


function UserPage(){
  const { globalVariable, setGlobalVariable } = useGlobalContext();
  console.log("user page current user: ", globalVariable)
  function callSignout(){
    signOut(auth).then(() => {
      console.log("sign out successful")
    }).catch((error) => {
      console.log("sign out unsuccessful: ", error)
    });
  }
  console.log("img data: ",globalVariable)

  if (globalVariable) {
    return(
      <div>
        <img src={globalVariable.photoURL.replace(/['"]/g,'')}></img>
        <p>Hello temp for now please and thank you</p>
        <button onClick={callSignout}>Sign Out</button>
      </div>
    )
  } else {
    return(
      <>
      <p>No user data</p>
      </>
    )
  }

  
}

export default UserPage