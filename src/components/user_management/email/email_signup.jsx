import {app} from "../../../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function email_Signup(){
  const auth = getAuth(app);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("email login")
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export default email_Signup