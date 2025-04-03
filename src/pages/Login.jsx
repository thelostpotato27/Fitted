import {app, auth} from "../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword, signOut  } from "firebase/auth";
import Google_Login from "../components/user_management/google/auth_google_provider_create"
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router";
import userSetup from "../components/check_user"
import {useGlobalContext} from "../components/global_context";




function LoginPage(){
  const { globalVariable, setGlobalVariable } = useGlobalContext();
  function callSignout(){
    signOut(auth).then(() => {
      console.log("sign out successful")
    }).catch((error) => {
      console.log("sign out unsuccessful: ", error)
    });
  }
  function callGooglesignin(){
    Google_Login().then(() => {
      console.log("google signin successful")
      
    }).catch((error) => {
      console.log("google login failure: ", error)
    })
  }
  function calluserSetup(){
    userSetup(globalVariable)
  }
  return(
    <div>
      <button onClick={callGooglesignin}>Google Login</button>
      <div>
        <Link to= {'/login/email'}>
          <p>Email Login</p>
        </Link>
      </div>
      <button onClick={callSignout}>Sign Out</button>
      <button onClick={calluserSetup}>testing user data setup</button>
    </div>
  )
}

export default LoginPage