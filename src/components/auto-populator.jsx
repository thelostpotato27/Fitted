'use client';
import './auto-populator.css'
import fetchqueryData from './fetchqueryData.jsx'
import Item_preview from './item-preview.jsx'
import {imgDB, txtDB } from "../firebaseConfig.jsx"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { collection, doc, setDoc, query, limit, getDocs  } from "firebase/firestore"
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router";
import {useReviewGlobalContext} from './global_context'

function ReviewPopulator(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { globalVariable, setGlobalVariable } = useReviewGlobalContext();

  useEffect(() => {
    setLoading(false);
    // console.log("data got from fetchquery: ", data)
  }, [data]);


  useEffect(() => {
    // console.log("global var update calls fetchquery again")
    fetchqueryData(10, globalVariable).then((fetched) => {
      setData(fetched)
    })
  }, [globalVariable]);

  function combineURL(urlName) {
    // console.log("urlname output: ", urlName)
    return `/Reviews/${urlName.company}-${urlName.name}`
  }
  
  if(!loading && (data[0] != undefined)) {
    return(
      <div className='preview-img-container'>
        {data.map((element) => (
          <Link to= {combineURL(element)}>
            <Item_preview data = {element}/>
          </Link>
        ))}
      </div>
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