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

  // function reviewsGrabbed() {
  //   console.log("array from Populator: ", data)
  //   console.log(data.at(1))
  //   reviewItem = data.map((singleReview) =>
  //     <li>
  //       <Autopopwindow reviewData = {singleReview.image}></Autopopwindow>
  //       <p>{singleReview.image}</p>
  //     </li>
  //   )
  //   return reviewItem
  // }


  const dataOut = fetchqueryData()


    // .then((dataArray) => {
    //   setData(dataArray);
    //   setLoading(false);
    //   console.log("data populated full: ", dataArray);
    //   const entry = dataArray.at(0);

    //   console.log("data populated at 0: ", entry);
    //   console.log("data after setData: ", data);
    // }).then(() => {
    //   // reviewsGrabbed();
    // })

    
  // const reviewItem = PopulatevisibleReviews()
  
  if(dataOut.length === undefined) {
    console.log("currently loading")
    return(
      <div>
        <p>Loading...</p>
      </div>
    )
  }else{
    console.log("current data: ",dataOut)
    console.log("do we have something here: ",dataOut.length)
    return(
      <>
        <ul>
          <p> placeholder</p>
          <p> {dataOut[0]}</p>
        </ul>
      </>
    )
  }

  
}

export default ReviewPopulator;