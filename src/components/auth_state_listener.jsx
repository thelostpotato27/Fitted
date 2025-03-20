import {app} from "./firebaseConfig"
import { getAuth } from "firebase/auth";

const auth = getAuth(app);
const user = auth.currentUser;

if (user) {
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/auth.user
  // ...
  return user
} else {
  // No user is signed in.
  return null
}