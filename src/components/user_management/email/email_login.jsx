import {app} from "../../../firebaseConfig"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function email_Login(){
  const auth = getAuth(app);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("email signed in")
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export default email_Login