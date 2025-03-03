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
  const [preprocess, setpreprocess] = useState([]);
  const [loading, setLoading] = useState(true);

 

  useEffect(() => {
    console.log("data has been updated: ",data[0]);
    setLoading(false);
  }, [data]);

  // useEffect(() => {
  //   try{
  //     preprocess.forEach((preimg) => {
  //       console.log("preimg out: ", preimg)
  //       console.log("preimg imgref out: ", preimg.imgref)
  //       getDownloadURL(preimg.imgref).then(val => {
  //         console.log("populated parseReviewArr: ", val)
  //         filled += 1;
  //         console.log("amount filled: ", filled)
  //       }).catch(error => {
  //         console.error("Error getting download URL:", error);
  //       });
  //     })
  //   }catch(e){
  //     console.log(e)
  //   }
  // }, [preprocess])


  useEffect(() => {
    fetchqueryData(5,setData,data).then((fetched) => {
      setData(fetched)
    })
  }, []);

  console.log("preprocessed outside: ",data)

  
  if(!loading && (data[0] != undefined)) {
    return(
      <>
        <ul>
          <p> placeholder</p>
          {/* <div className='img-background'>
            {data ? <img src={data[0].image} alt="item image" /> : <p>Loading...</p>}
          </div> */}
          <img src={data[0]}></img>
        </ul>
      </>
    )
  }else{
    // console.log("current data: ",data)
    // console.log("do we have something here: ",data.length)
    console.log("currently loading")
    return(
      <div>
        <p>Loading...</p>
        {/* <button onclick={setData(temp)}></button> */}
      </div>
    )
  }

  
}

export default ReviewPopulator;