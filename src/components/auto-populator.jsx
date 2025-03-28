'use client';
import './auto-populator.css'
import fetchqueryData from './fetchqueryData.jsx'
import Item_preview from './item-preview.jsx'
import {imgDB, txtDB } from "../firebaseConfig.jsx"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { collection, doc, setDoc, query, limit, getDocs  } from "firebase/firestore"
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router";



function ReviewPopulator(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [data]);


  useEffect(() => {
    fetchqueryData(5).then((fetched) => {
      setData(fetched)
    })
  }, []);

  function combineURL(urlName) {
    return `/Reviews/${urlName.company}-${urlName.name}`
  }
  
  if(!loading && (data[0] != undefined)) {
    return(
      <>
        <div className='preview-img'>
          {data.map((element) => (
            <Link to= {combineURL(element)}>
              <Item_preview data = {element}/>
            </Link>
            
          ))}
        </div>
      </>
    )
  }else{
    console.log("currently loading")
    return(
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  
}

export default ReviewPopulator;