// import './About.css'
import Item from '../components/item-window'
// import {app} from "../firebaseConfig.jsx"
import React, { useEffect, useState } from "react";

import GetImg from "../components/getImg"
import Img_input from "../components/img_input"

import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { getStorage } from 'firebase/storage'
import { getFirestore } from "firebase/firestore"



function About(){
  return(
    <>
      <div> 
        <Img_input />
      </div>
    </>
  )
}

export default About;