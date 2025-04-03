import {useGlobalContext} from "./global_context";
import { collection, doc, setDoc, query, limit, getDoc  } from "firebase/firestore"
import {imgDB, txtDB } from "../firebaseConfig"


async function userSetup(userdata) {
  if(userdata != null){
    
  }
  const userdoc = doc(txtDB, "User-data", "temp_name")
  const userdocquery = query(userdoc)
  const querysnapshot = await getDoc(userdocquery)
  console.log("running user setup almost done")
  console.log("user info query: ",querysnapshot.data())
  if(querysnapshot.data() == null){
    console.log("user data doesn't exist, setting up")
    setDoc(doc(txtDB, "User-data", userdata.uid), {
        
    })
  }
}

export default userSetup