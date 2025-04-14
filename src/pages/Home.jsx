import './Home.css'
import viteLogo from '/vite.svg'
import Item from '../components/item-window'
import "@fontsource/noto-sans/800.css";
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
            <h1 className='left-text'>DISCOVER <span className='green-highlight'>CLOTHING</span> THAT FITS YOU <span className='green-highlight'>PERFECTLY</span></h1>
            <p className='left-text'>Powered by real reviews from real people. Our community-driven platform focuses on Japanese fashion, helping you find the best fit based on shared body sizes and honest feedback.</p>
          </div>
          <img src={viteLogo} alt="placeholder image" className='intro-right'/>
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