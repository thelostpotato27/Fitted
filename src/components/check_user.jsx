import {useGlobalContext} from "./global_context";
import { collection, doc, setDoc, query, limit, getDoc, updateDoc, deleteField } from "firebase/firestore"
import {imgDB, txtDB } from "../firebaseConfig"


async function userSetup(userdata, username, height, weight, shoulder, chest, waist, hip) {
  const docref = doc(txtDB, "User-data", userdata.uid)
  const docsnap = await getDoc(docref)
  const allusersdocref = doc(txtDB, "Usernames", "Usernames")

  if(docsnap.exists() && docsnap.data().hasOwnProperty("username")){
    const prev_name = docsnap.data()["username"]

    await updateDoc(allusersdocref, {
      [prev_name]: deleteField(),
      [username]: true
    });
  }else{
    await updateDoc(allusersdocref, {
      [username]: true
    });
  }

  let dataObj = {}
  if (username != "" && username != null){
    dataObj = {...dataObj, username: username}
  }
  if (height != "" && height != null){
    dataObj = {...dataObj, height: height.slice(0, -1)}
  }
  if (weight != "" && weight != null){
    dataObj = {...dataObj, weight: weight}
  }
  if (shoulder != "" && shoulder != null){
    dataObj = {...dataObj, shoulder: shoulder}
  }
  if (chest != "" && chest != null){
    dataObj = {...dataObj, chest: chest}
  }
  if (waist != "" && waist != null){
    dataObj = {...dataObj, waist: waist}
  }
  if (hip != "" && hip != null){
    dataObj = {...dataObj, hip: hip}
  }
  console.log("Data object being added: ", dataObj)

  setDoc(docref, dataObj, {merge: true})
}

export default userSetup