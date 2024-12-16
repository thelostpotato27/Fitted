import React from "react";
import {imgDB, txtDB } from "../firebaseConfig";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function getImg(){
  const [txt,setTxt] = useState('')
  const [img,setImg] = useState('')

  const handleUpload = (e) =>{
    console.log(e.target.files[0])
    const imgs = ref(imgDB, `Imgs/${v4()}`)
    uploadBytes(imgs, e.target.files[0]).then(data=>{
      console.log(data,"imgs")
      getDownloadURL(data.ref).then(val=>{
        console.log(val)
      })
    })
  }

  return(
    <div>
      <input onChange={(e)=>setTxt(e.target.value)} />
      <input type="file" onChange={(e)=>handleUpload(e)} />
    </div>
  )
}
export default getImg;