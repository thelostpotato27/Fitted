import './item-window.css'
import {imgDB, txtDB } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, setDoc, getDoc } from "firebase/firestore"
import { useState, useEffect } from 'react';

function Autopopwindow(props) {
  const [imageURL, setImageURL] = useState(null);
  const [data_retrieval, setData] = useState("Loading");
  
  useEffect(() => {
    console.log("autopopulator window effect")
    setImageURL(props.reviewData[0]);
    setData(props.reviewData[1]);
    console.log(props.reviewData[1])
  }, [props.reviewData]);
  
  // useEffect(() => {
  //   fetchData();
  //   const intervalId = setInterval(fetchData, 10000);
  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <>
      <div className='img-background'>
        {imageURL ? <img src={imageURL} alt="item image" /> : <p>Loading...</p>}
      </div>
      <div className='line-margin'>
        <h3>{data_retrieval.name}</h3>
        <p>{data_retrieval.company}</p>
      </div>
      <p>Autopop is returning corectly</p>
    </>
  );
}


export default Autopopwindow
