import {app, auth} from "../firebaseConfig"
import React, { useEffect, useState, useRef } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function UserPage(){
  const user = auth.currentUser;
  console.log("user page current user: ", user)
  if (user) {
    return(
      <div>
        <img src={user.photoURL.replace(/['"]/g,'')}></img>
        <p>Hello temp for now please and thank you</p>
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