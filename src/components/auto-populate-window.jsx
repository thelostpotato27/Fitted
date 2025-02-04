import './item-window.css'
import {imgDB, txtDB } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, setDoc, getDoc } from "firebase/firestore"
import { useState, useEffect } from 'react';

async function Autopopwindow(props) {
  const [imageURL, setImageURL] = useState('');
  const [data_retrieval, setData] = useState("Loading");
  console.log("autopopulator start")
  useEffect(() => {
    console.log("autopopulator window effect")
    try{
      console.log(props)
      setImageURL(props.reviewData[0]);
      setData(props.reviewData[1]);
      console.log(props.reviewData[1])
    } catch (err){
      console.log(err.message)
    }
    
  }, [props.reviewData]);
  

  return (
    <>
      <div className='img-background'>
        {imageURL ? <img src={imageURL} alt="item image" /> : <p>Loading...</p>}
      </div>
      {data_retrieval && 
        (
          <div className='line-margin'>
            <h3>{data_retrieval.name}</h3>
            <p>{data_retrieval.company}</p>
            <p>test for autopop window</p>
          </div>
        )

      }
      
    </>
  );
}


export default Autopopwindow
