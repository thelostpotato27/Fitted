import {imgDB, txtDB } from "../firebaseConfig"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { collection, doc, setDoc, query, limit, getDocs  } from "firebase/firestore"
import React, { useState, useEffect } from 'react';


async function fetchClothingData(page_name) {
  const collectionRef = collection(txtDB, "Clothing-item");
  const q = query(collectionRef, where("name", "==", {page_name}));
  var getReviewarr = [];
  var QsnapshottoDoc = [];
  var results;
  var results2;
  var finalresults = [];

  async function getReviewdata(querySnapshot){
    querySnapshot.forEach((doc) => {
      const allreviews = collection(txtDB, "Clothing-item", doc.id, "reviews");
      const firstReview = query(allreviews);
      getReviewarr = [...getReviewarr, {reviewdata: doc.data(), firstreview: firstReview}];
    })
  }

  async function parseReviewdata(reviews){
    const promises = reviews.map((review) =>
      getDocs(review.firstreview)
    )
    results = await Promise.all(promises);
    results.forEach((doc1) => {
      doc1.forEach((doc2) => {
        QsnapshottoDoc = [...QsnapshottoDoc, doc2.data()]
      })
    })
    const promises2 = QsnapshottoDoc.map((reviewSnapshot) => getDownloadURL(ref(imgDB, `Imgs/${reviewSnapshot.image}`)))
    results2 = await Promise.all(promises2);
  }

  const querySnapshot = await getDocs(q);
  await getReviewdata(querySnapshot);
  await parseReviewdata(getReviewarr);
  
  finalresults = getReviewarr.map((data, index) => 
    ({...data.reviewdata, image: results2[index]})
  );

  return finalresults;
}

export default fetchClothingData;