import {imgDB, txtDB } from "../firebaseConfig"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { collection, doc, setDoc, query, limit, getDocs, getDoc, where  } from "firebase/firestore"
import React, { useState, useEffect } from 'react';


async function fetchClothingData(page_name) {
  const docRef = doc(txtDB, "Clothing-item", page_name);
  const q = query(docRef);
  var getReviewarr = {};
  var QsnapshottoDoc = [];
  var results;
  var results2;
  var finalresults = [];
  var headerData = [];

  
  async function getReviewdata(querySnapshot){
    const allreviewscollection = collection(txtDB, "Clothing-item", page_name, "reviews");
    const allreviews = query(allreviewscollection);
    getReviewarr = {generalData: querySnapshot.data(), allreviews: allreviews};
  }

  async function parseReviewdata(reviews){
    results = await getDocs(reviews.allreviews)
    results.forEach((doc1) => {
      QsnapshottoDoc = [...QsnapshottoDoc, doc1.data()]
    })
    const promises2 = QsnapshottoDoc.map((reviewSnapshot) => getDownloadURL(ref(imgDB, `Imgs/${reviewSnapshot.image}`)))
    results2 = await Promise.all(promises2);
  }
  const querySnapshot = await getDoc(q);
  await getReviewdata(querySnapshot);
  await parseReviewdata(getReviewarr);
  
  const tempArray = QsnapshottoDoc.map(({image, ...data}) => data);
  finalresults = tempArray.map((data, index) =>
    ({...data, image: results2[index]})
  );

  return [finalresults, getReviewarr.generalData];
}

export default fetchClothingData;