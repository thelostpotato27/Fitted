import './Home.css'
import viteLogo from '/vite.svg'
import Item from '../components/item-window'
import "@fontsource/noto-sans/800.css";
import React, { useEffect, useState } from "react";
import ReviewPopulator from '../components/auto-populator.jsx'
import {ReviewGlobalProvider} from '../components/global_context.jsx'

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
      <ReviewGlobalProvider>
        <ReviewPopulator/>
      </ReviewGlobalProvider>
      
    </>
  )
}

export default Home;