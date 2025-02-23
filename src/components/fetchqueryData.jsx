import {imgDB, txtDB } from "../firebaseConfig"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { collection, doc, setDoc, query, limit, getDocs  } from "firebase/firestore"
import React, { useState, useEffect } from 'react';


async function fetchqueryData(num_fetch, setData, data) {
  const collectionRef = collection(txtDB, "Clothing-item");
  const q = query(collectionRef, limit(num_fetch));
  // const [getR, setR] = useState([]);
  var getReviewarr = [];
  var parseReviewarr = [];

  async function getReviewdata(querySnapshot){
    querySnapshot.forEach((doc) => {
      const allreviews = collection(txtDB, "Clothing-item", doc.id, "reviews");
      const firstReview = query(allreviews);
      getReviewarr.push({reviewdata: doc.data(), firstreview: firstReview});
      // getReviewarr = [...getReviewarr, {reviewdata: doc.data(), firstreview: firstReview}];
    })
  }

  async function parseReviewdata(reviews){
    reviews.forEach((review) => {
      getDocs(review.firstreview).then((reviewSnapshot) => {
        reviewSnapshot.forEach((doc2) => {
          const imgref = ref(imgDB, `Imgs/${doc2.data().image}`);
          getDownloadURL(imgref).then(val => {
            parseReviewarr.push({image: val, review: doc2.data(), header: review.reviewdata})

            // parseReviewarr = [...parseReviewarr, {image: val, review: doc2.data(), header: review.reviewdata}]
          }).catch(error => {
            console.error("Error getting download URL:", error);
          });
        })
      })
    })
  }

  async function stateConvert(reviews){
    // console.log("state conversion start")
    reviews.forEach((review) => {
      // console.log("converting item: ", review);
      // setData( data => [...getR, review]);
    })
  }

  const querySnapshot = await getDocs(q);
  await getReviewdata(querySnapshot);
  await parseReviewdata(getReviewarr);
  await stateConvert(parseReviewarr);

  console.log("fetch query returned: ",parseReviewarr)

  setData([1,2,3,4,5])
  console.log("data sest directly: ", data)

  return parseReviewarr;

  
  
}

export default fetchqueryData;