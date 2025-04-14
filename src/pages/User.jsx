import {app, auth} from "../firebaseConfig"
import React, { useEffect, useState, useRef } from 'react';
import {useGlobalContext} from "../components/global_context";
import { getAuth, createUserWithEmailAndPassword, signOut  } from "firebase/auth";
import { collection, doc, setDoc, query, limit, getDoc, updateDoc, deleteField } from "firebase/firestore"
import {imgDB, txtDB } from "../firebaseConfig"


function UserPage(){
  const { globalVariable, setGlobalVariable } = useGlobalContext();
  const [userimg, setuserimg] = useState(null)
  const [username, setusername] = useState(null)

  console.log("user page current user: ", globalVariable)
  function callSignout(){
    signOut(auth).then(() => {
      console.log("sign out successful")
    }).catch((error) => {
      console.log("sign out unsuccessful: ", error)
    });
  }

  useEffect(() => {
    if(globalVariable != null){
      setuserimg(globalVariable.photoURL.replace(/['"]/g,''))
      const docref = doc(txtDB, "User-data", globalVariable.uid)
      getDoc(docref).then((data) => {
        setusername(data.data()["username"])
      })
    }
  }, [globalVariable])


  if (globalVariable) {
    return(
      <div>
        <img src={userimg}></img>
        <p>Hello {username}</p>
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