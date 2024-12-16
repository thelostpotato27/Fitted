import './Home.css'
import viteLogo from '/vite.svg'
import Item from '../components/item-window'
import app from "../firebaseConfig.jsx"
import React, { useEffect, useState } from "react";

// import getImg from "../components/getImg"
// import {imgDB, txtDB } from "../firebaseConfig";

import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { getStorage } from 'firebase/storage'
import { getFirestore } from "firebase/firestore"



function Home(){

  const [txt,setTxt] = useState("")
  const [img,setImg] = useState("")
  const imgDB = getStorage(app);
  const txtDB = getFirestore(app);

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
    <>
      <div class='main'>
        <div class='intro'>
          <div class='intro-left'>
            <h1>Intro Home Page</h1>
            <p>Some info on Fitted</p>
          </div>
          <div class='intro-right'>
            <img src={viteLogo} alt="placeholder image" />
          </div>
        </div>
      </div>

      {/* <getImg/> */}
      <div>
        <input onChange={(e)=>setTxt(e.target.value)} />
        <input type="file" onChange={(e)=>handleUpload(e)} />
      </div>

      <div class='grid-container'>
        <div class='grid-item' ><Item/></div>
        <div class='grid-item' ><Item/></div>
        <div class='grid-item' ><Item/></div>
        <div class='grid-item' ><Item/></div>
        <div class='grid-item' ><Item/></div>
        <div class='grid-item' ><Item/></div>
        <div class='grid-item' ><Item/></div>
      </div>
    </>
  )
}

export default Home;