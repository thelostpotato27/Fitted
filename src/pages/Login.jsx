import {app} from "../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Google_Login from "../components/user_management/google/auth_google_provider_create"
import email_Login from "../components/user_management/email/email_login"
import email_Signup from "../components/user_management/email/email_signup"


function LoginPage(){
  return(
    <div>
      <button onClick={Google_Login}>Google Login</button>
      <button onClick={email_Login}>Email Login</button>
      <button onClick={email_Signup}>Email Signup</button>
    </div>
  )
}

export default LoginPage