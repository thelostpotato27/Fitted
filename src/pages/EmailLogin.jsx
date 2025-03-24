import {app} from "../firebaseConfig"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Google_Login from "../components/user_management/google/auth_google_provider_create"
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from "react-router";


function EmailLoginPage(){
  const [email,setemail] = useState("")
  const [password,setpassword] = useState("")
  const auth = getAuth(app);
  const navigate = useNavigate()

  function email_Login(){  
    console.log("email signin triggered: ", email, ", ", password)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("email signed in")
        const user = userCredential.user;
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return(
    <div>
      <input value={email} placeholder="Enter your email" onChange={(e)=>setemail(e.target.value)} />
      <input value={password} placeholder="Enter your password" onChange={(e)=>setpassword(e.target.value)} />
      <button onClick={email_Login}>Login</button>
      <Link to= {'/login/signupemail'}>
        <p>No account? Sign in</p>
      </Link>
      
      {/* <button onClick={email_Signup}>Email Signup</button> */}
    </div>
  )
}

export default EmailLoginPage