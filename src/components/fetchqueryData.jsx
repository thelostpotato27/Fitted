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
  var QsnapshottoDoc = [];
  var results;
  var finalresults;
  

  async function getReviewdata(querySnapshot){
    querySnapshot.forEach((doc) => {
      const allreviews = collection(txtDB, "Clothing-item", doc.id, "reviews");
      const firstReview = query(allreviews);
      getReviewarr = [...getReviewarr, {reviewdata: doc.data(), firstreview: firstReview}];
    })
  }

  async function parseReviewdata(reviews){
    // console.log("size: ", reviews.length)
    const promises = reviews.map((review) =>
      getDocs(review.firstreview)
      // .then((reviewSnapshot) => {
      //   reviewSnapshot.forEach((doc2) => {
      //     const imgref = ref(imgDB, `Imgs/${doc2.data().image}`);
      //     // parseReviewarr = [...parseReviewarr, {imgref: imgref, review: doc2.data(), header: review.reviewdata}]
      //     return getDownloadURL(imgref)
      //   })
      // })
    )
    results = await Promise.all(promises);
    // results.forEach((result, index) => {
    //   console.log(`result for query ${index + 1}: `,result)
    // })

    // console.log("before process: ",results)

    results.forEach((doc1) => {
      doc1.forEach((doc2) => {
        QsnapshottoDoc = [...QsnapshottoDoc, doc2.data()]
      })
      
    })

    // console.log("intermediate step: ",QsnapshottoDoc)

    const promises2 = QsnapshottoDoc.map((reviewSnapshot) => getDownloadURL(ref(imgDB, `Imgs/${reviewSnapshot.image}`)))

    finalresults = await Promise.all(promises2);
    // console.log("images")
    // finalresults.forEach((result, index) => {
    //   console.log(`result for query ${index + 1}: `,result)
    // })
  }


  const querySnapshot = await getDocs(q);
  await getReviewdata(querySnapshot);
  await parseReviewdata(getReviewarr);

  return finalresults;
  
  
  
}

export default fetchqueryData;