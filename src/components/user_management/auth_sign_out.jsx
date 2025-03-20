import { getAuth, signOut } from "firebase/auth";

function Sign_out(){
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

export default Sign_out