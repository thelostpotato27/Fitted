import {useGlobalContext} from "./global_context";
import { collection, doc, setDoc, query, limit, getDoc, updateDoc, deleteField } from "firebase/firestore"
import {imgDB, txtDB } from "../firebaseConfig"


async function userSetup(userdata, username) {
  const docref = doc(txtDB, "User-data", userdata.uid)
  const docsnap = await getDoc(docref)
  const allusersdocref = doc(txtDB, "Usernames", "Usernames")
  let prev_name = ""

  if(docsnap.exists() && docsnap.data().hasOwnProperty("username")){
    prev_name = docsnap.data()["username"]

    await updateDoc(allusersdocref, {
      [prev_name]: deleteField(),
      [username]: true
    });
  }else{
    await updateDoc(allusersdocref, {
      [username]: true
    });
  }

  setDoc(docref, {
      username: username
  }, {merge: true})
}

export default userSetup