import './Home.css'
import viteLogo from '/vite.svg'
import Item from '../components/item-window'
// import {app} from "../firebaseConfig.jsx"
import React, { useEffect, useState } from "react";

// import {imgDB, txtDB } from "../firebaseConfig";

import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { getStorage } from 'firebase/storage'
import { getFirestore } from "firebase/firestore"



function Home(){

  return(
    <>
      <div className='main'>
        <div className='intro'>
          <div className='intro-left'>
            <h1>Intro Home Page</h1>
            <p>Some info on Fitted</p>
          </div>
          <div className='intro-right'>
            <img src={viteLogo} alt="placeholder image" />
          </div>
        </div>
      </div>

      <div className='grid-container'>
        <div className='grid-item' ><Item num="1"/></div>
        <div className='grid-item' ><Item num="2"/></div>
        <div className='grid-item' ><Item num="3"/></div>
        <div className='grid-item' ><Item num="4"/></div>
        <div className='grid-item' ><Item num="5"/></div>
        <div className='grid-item' ><Item num="6"/></div>
        <div className='grid-item' ><Item num="7"/></div>
      </div>
    </>
  )
}

export default Home;