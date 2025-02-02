import './item-window.css'
import Autopopwindow from './auto-populate-window'
import {imgDB, txtDB } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, setDoc, query, limit, getDocs  } from "firebase/firestore"
import { useState, useEffect } from 'react';


function ReviewPopulator(){
  const collectionRef = collection(txtDB, "Clothing-item");
  const q = query(collectionRef, limit(5));
  const items = [];
  var reviewItem;
  
  getDocs(q).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const allreviews = collection(txtDB, "Clothing-item", doc.id, "reviews")
      const firstreview = query(allreviews)
      getDocs(firstreview).then((reviewSnapshot) => {
        reviewSnapshot.forEach((doc2) => {
          const imgref = ref(imgDB, `Imgs/${doc2.data().image}`);
          getDownloadURL(imgref).then(val => {
            items.push([val, doc2.data(), doc.data()]);
          }).catch(error => {
            console.error("Error getting download URL:", error);
          });
        })
        // console.log("image refs: ", items)
      })
    });
  
    console.log("First 5 items:", items);
  }).catch((error) => {
    console.error("Error getting items:", error);
  })

  reviewItem = items.map((singleReview) =>
    <li>
      <Autopopwindow reviewData = {singleReview}></Autopopwindow>
      <p>Review item map</p>
    </li>
      
  )
  // const imageContainer = document.getElementById('reviewContainer');

  return(
    <>
      {reviewItem &&
        (
          // <p>review item exists</p>
          <ul>{reviewItem}</ul>
        )
      }
      
      {items &&
        (
          <ul>
          {items.map((singleReview) =>
            <li>
              <Autopopwindow reviewData = {singleReview}></Autopopwindow>
              <p>Review item map</p>
            </li>
              
          )}
          </ul>
        )
      }
      
      <p>Hello this is a test</p>
    </>
  )
}

export default ReviewPopulator;