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
      setData(fetched)
      
      // console.log("current data out")
      // console.log(data)
      // console.log("first item in data")

    })
  }, []);

  useEffect(() => {
    console.log("data has been updated: ",data[0]);
    if (data != []){
      const firstItem = data[0]
      console.log(firstItem)
    }
    
    setLoading(false);
    console.log("data items: ",data[0])
  }, [data]);

  console.log("data here: ",data)
  
  if(!loading && (data != [])) {
    return(
      <>
        <ul>
          <p> placeholder</p>
          {/* <div className='img-background'>
            {data ? <img src={data[0].image} alt="item image" /> : <p>Loading...</p>}
          </div> */}
          {/* <p>{data[0].image}</p> */}
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
      </div>
    )
  }

  
}

export default ReviewPopulator;