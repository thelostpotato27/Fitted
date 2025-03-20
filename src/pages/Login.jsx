import {app} from "../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Google_Login from "../components/user_management/google/auth_google_provider_create"

function LoginPage(){
  // const auth = getAuth(app);

  // createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed up 
  //     const user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //   });


  // signInWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in 
  //     const user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //   });

  return(
    <div>
      <button onClick={Google_Login}>Google Login</button>
    </div>
  )
}

export default LoginPage