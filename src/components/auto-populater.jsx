'use client';
import './item-window.css'
import Autopopwindow from './auto-populate-window.jsx'
import fetchqueryData from './fetchqueryData.jsx'
import {imgDB, txtDB } from "../firebaseConfig"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { collection, doc, setDoc, query, limit, getDocs  } from "firebase/firestore"
import { useState, useEffect } from 'react';



function ReviewPopulator(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  fetchqueryData(setData, [], 5)


  useEffect(() => {
    if (data != []){
      console.log("data changed: ", data)
      setLoading(false)

      for (stuff of data){
        console.log(stuff)
      }
    }else{
      // console.log("data contents: ", data)
      // console.log("data didnt change, length == ", data.length)
    }
  }, [data])
  
  
  if(loading) {
    console.log("currently loading")
    return(
      <div>
        <p>Loading...</p>
      </div>
    )
  }else{
    console.log("current data: ",data)
    console.log("do we have something here: ",data.length)
    return(
      <>
        <ul>
          <p> placeholder</p>
          <p> {data[0]}</p>
        </ul>
      </>
    )
  }

  
}

export default ReviewPopulator;