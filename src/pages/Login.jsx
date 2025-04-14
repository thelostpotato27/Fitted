import {app, auth} from "../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword, signOut  } from "firebase/auth";
import Google_Login from "../components/user_management/google/auth_google_provider_create"
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from "react-router";
import userSetup from "../components/check_user"
import {useGlobalContext} from "../components/global_context";
import { useEffect } from "react";
import { collection, doc, setDoc, query, limit, getDoc } from "firebase/firestore"
import {imgDB, txtDB } from "../firebaseConfig.jsx"

function LoginPage(){
  const { globalVariable, setGlobalVariable } = useGlobalContext();
  const navigate = useNavigate()
  function callSignout(){
    signOut(auth).then(() => {
      console.log("sign out successful")
    }).catch((error) => {
      console.log("sign out unsuccessful: ", error)
    });
  }
  function callGooglesignin(){
    Google_Login().catch((error) => {
      console.log("google login failure: ", error)
    }).finally(() => {
      console.log("cleanup happening")
    })
  }
  function calluserSetup(){
    userSetup(globalVariable)
  }

  useEffect(() => {
    if(globalVariable != null){
      getDoc(doc(txtDB, "User-data", globalVariable.uid, "my-data", "my-data")).then((userdata) => {
        console.log("this is the userdata gotten: ", userdata.data())
        if (userdata.data() == null){
          navigate("/usersetup")
        }else{
          navigate("/user")
        }
      })
    }
  }, [globalVariable])

  console.log("printing global var in login page: ", globalVariable)

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