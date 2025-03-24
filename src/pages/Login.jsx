import {app} from "../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Google_Login from "../components/user_management/google/auth_google_provider_create"
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router";



function LoginPage(){
  return(
    <div>
      <button onClick={Google_Login}>Google Login</button>
      {/* <button onClick={email_Login}>Email Login</button> */}
      <div>
        <Link to= {'/login/email'}>
          <p>Email Login</p>
        </Link>
      </div>
    </div>
  )
}

export default LoginPage