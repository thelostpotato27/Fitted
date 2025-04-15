'use client';
import './home-display.css'
import fetchqueryData from './fetchqueryData.jsx'
import Item_preview from './item-preview.jsx'
import {imgDB, txtDB } from "../firebaseConfig.jsx"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { collection, doc, setDoc, query, limit, getDocs  } from "firebase/firestore"
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router";
import {useReviewGlobalContext} from './global_context.jsx'

function HomePopulator(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { globalVariable, setGlobalVariable } = useReviewGlobalContext();

  useEffect(() => {
    setLoading(false);
  }, [data]);


  useEffect(() => {
    console.log("global var update calls fetchquery again")
    fetchqueryData(6, globalVariable).then((fetched) => {
      setData(fetched)
    })
  }, [globalVariable]);

  function combineURL(urlName) {
    console.log("urlname output: ", urlName)
    return `/Reviews/${urlName.company}-${urlName.name}`
  }
  
  if(!loading && (data[0] != undefined)) {
    return(
      <div className='preview-img-container-home'>
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

export default HomePopulator;