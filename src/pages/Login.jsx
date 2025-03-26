import {app, auth} from "../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword, signOut  } from "firebase/auth";
import Google_Login from "../components/user_management/google/auth_google_provider_create"
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router";



function LoginPage(){
  function callSignout(){
    signOut(auth).then(() => {
      console.log("sign out successful")
    }).catch((error) => {
      console.log("sign out unsuccessful: ", error)
    });
  }
  return(
    <div>
      <button onClick={Google_Login}>Google Login</button>
      {/* <button onClick={email_Login}>Email Login</button> */}
      <div>
        <Link to= {'/login/email'}>
          <p>Email Login</p>
        </Link>
      </div>
      <button onClick={callSignout}>Sign Out</button>
    </div>
  )
}

export default LoginPage