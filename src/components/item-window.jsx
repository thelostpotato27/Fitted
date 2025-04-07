import './item-window.css'
import {imgDB, txtDB } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, setDoc, getDoc } from "firebase/firestore"
import { useState, useEffect } from 'react';

function Item(props) {
  const [imageURL, setImageURL] = useState(null);
  const [data_retrieval, setData] = useState("Loading");
  
  useEffect(() => {
    const imgref = ref(imgDB, `intro_display/${props.num}.jpg`);
    getDownloadURL(imgref).then(val => {
      setImageURL(val);
    }).catch(error => {
      console.error("Error getting download URL:", error);
    });

  }, [props.num]);

  const fetchData = async () => {
    try {
      const docRef = doc(txtDB, "intro_display", "1"); 
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        setData(data)

        const company = data.company;
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };
  
  
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className='img-background'>
        {imageURL ? <img src={imageURL} className='home-img' alt="item image" /> : <p>Loading...</p>}
      </div>
      <div className='line-margin'>
        <h3>{data_retrieval.name}</h3>
        <p>{data_retrieval.company}</p>
      </div>
    </>
  );
}


export default Item
