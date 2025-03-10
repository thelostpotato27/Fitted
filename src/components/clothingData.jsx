import {imgDB, txtDB } from "../firebaseConfig"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { collection, doc, setDoc, query, limit, getDocs, where  } from "firebase/firestore"
import React, { useState, useEffect } from 'react';


async function fetchClothingData(page_name) {
  const collectionRef = collection(txtDB, "Clothing-item");
  const q = query(collectionRef, where("name", "==", `${page_name}`));
  var getReviewarr = [];
  var QsnapshottoDoc = [];
  var results;
  var results2;
  var finalresults = [];
  var headerData = [];


  async function getReviewdata(querySnapshot){
    querySnapshot.forEach((doc) => {
      const allreviewscollection = collection(txtDB, "Clothing-item", doc.id, "reviews");
      const allreviews = query(allreviewscollection);
      getReviewarr = [...getReviewarr, {generalData: doc.data(), allreviews: allreviews}];
    })
  }

  async function parseReviewdata(reviews){
    const promises = reviews.map((review) =>
      getDocs(review.allreviews)
    )
    results = await Promise.all(promises);
    results[0].forEach((doc1) => {
      QsnapshottoDoc = [...QsnapshottoDoc, doc1.data()]
    })
    const promises2 = QsnapshottoDoc.map((reviewSnapshot) => getDownloadURL(ref(imgDB, `Imgs/${reviewSnapshot.image}`)))
    results2 = await Promise.all(promises2);
  }

  const querySnapshot = await getDocs(q);
  await getReviewdata(querySnapshot);
  await parseReviewdata(getReviewarr);
  
  const tempArray = QsnapshottoDoc.map(({image, ...data}) => data);
  finalresults = tempArray.map((data, index) =>
    ({...data, image: results2[index]})
  );

  return [finalresults, getReviewarr[0].generalData];
}

export default fetchClothingData;