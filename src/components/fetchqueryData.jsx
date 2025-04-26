import {imgDB, txtDB } from "../firebaseConfig"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { collection, doc, setDoc, query, limit, getDocs, orderBy, where  } from "firebase/firestore"
import React, { useState, useEffect } from 'react';


async function fetchqueryData(num_fetch, searchParams) {
  console.log("search params item type: ",searchParams)
  const collectionRef = collection(txtDB, "Clothing-item");
  var q
  const query_mod = []

  if ("gender" in searchParams && searchParams.gender != null){
    query_mod.push({field: "gender", operator: "==", value: searchParams.gender})
  }
  if ("company" in searchParams && searchParams.company != null){
    query_mod.push({field: "company", operator: "==", value: searchParams.company})
  }
  if ("article-type" in searchParams && searchParams.article-type != null){
    query_mod.push({field: "article-type", operator: "==", value: searchParams.article-type})
  }
  if ("origin" in searchParams && searchParams.origin != null){
    query_mod.push({field: "origin", operator: "==", value: searchParams.origin})
  }

  if(query_mod.length == 0){
    q = query(collectionRef, limit(num_fetch));
  }else{
    // console.log("query mod before getting data: ", query_mod)
    q = query(collectionRef, limit(num_fetch), ...query_mod.map((item) => where(item.field, item.operator, item.value),));
  }
  
  var getReviewarr = [];
  var QsnapshottoDoc = [];
  var results;
  var results2;
  var finalresults = [];

  async function getReviewdata(querySnapshot){
    querySnapshot.forEach((doc) => {
      const allreviews = collection(txtDB, "Clothing-item", doc.id, "reviews");
      const firstReview = query(allreviews, orderBy("likes"), orderBy("rating", "desc"),  limit(1));
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
  querySnapshot.forEach((item) => {
    // console.log("query snapshot data: ", item.data())
  })
  await getReviewdata(querySnapshot);
  
  await parseReviewdata(getReviewarr);
  
  finalresults = getReviewarr.map((data, index) => 
    ({...data.reviewdata, image: results2[index]})
 );
  // console.log("final results out: ", finalresults)
  return finalresults;
}

export default fetchqueryData;