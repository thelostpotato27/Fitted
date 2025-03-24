import {app} from "../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Google_Login from "../components/user_management/google/auth_google_provider_create"
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from "react-router";


function EmailSignupPage(){
  const [email,setemail] = useState("")
  const [password,setpassword] = useState("")
  const auth = getAuth(app);
  const navigate = useNavigate()

  function email_Signup(){
    console.log("email signup triggered: ", email, ", ", password)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("email signed up")
        const user = userCredential.user;
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)

        // ..
      });
  }

  return(
    <div>
      <input value={email} placeholder="Enter your email" onChange={(e)=>setemail(e.target.value)} />
      <input value={password} placeholder="Enter your password" onChange={(e)=>setpassword(e.target.value)} />
      <button onClick={email_Signup}>Sign up</button>

    </div>
  )
}

export default EmailSignupPage