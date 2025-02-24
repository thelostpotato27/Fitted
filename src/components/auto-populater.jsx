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

  useEffect(() => {
    fetchqueryData(5,setData,data).then((fetched) => {
      // fetched.forEach((review) => {
      //   console.log("each item in review: ", review)
      //   setData([...data, review])
      // })
      setData([fetched])
      setLoading(false)
      console.log("current data out")
      // console.log(data)
      console.log("first item in data")
    })
  }, []);


  
  // console.log("data first item")
  // const temp_img = data[0].image
  // console.log(temp_img)
  
  
  if(loading) {
    console.log("currently loading")
    return(
      <div>
        <p>Loading...</p>
      </div>
    )
  }else{
    // console.log("current data: ",data)
    // console.log("do we have something here: ",data.length)
    return(
      <>
        <ul>
          <p> placeholder</p>
          {/* <div className='img-background'>
            {data ? <img src={data[0].image} alt="item image" /> : <p>Loading...</p>}
          </div> */}
        </ul>
      </>
    )
  }

  
}

export default ReviewPopulator;