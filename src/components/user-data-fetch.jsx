import {app, auth} from "../firebaseConfig"
import React, { useEffect, useState, useRef } from 'react';
import {useGlobalContext} from "../components/global_context";
import { getAuth, createUserWithEmailAndPassword, signOut  } from "firebase/auth";
import { collection, doc, setDoc, query, limit, getDoc, getDocs, updateDoc, deleteField } from "firebase/firestore"
import {imgDB, txtDB } from "../firebaseConfig"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"


async function FetchUserData(userData){
  const collectionref = collection(txtDB, "User-data", userData.uid, "my-reviews")
  var userimg, username
  var userReviews = []
  var userDisplay = []

  userimg = userData.photoURL.replace(/['"]/g,'')
  const docref = doc(txtDB, "User-data", userData.uid)

  const userNameSnapshot = await getDoc(docref)
  username = userNameSnapshot.data()["username"]

  const userReviewSnapshot = await getDocs(collectionref)
  userReviewSnapshot.forEach((doc) => {
    const docData = doc.data()
    userReviews.push(docData)
  })

  // console.log("username after promise: ", username)
  // console.log("Userreviews after promise: ", userReviews)

  const clothingsnapshotMap = userReviews.map((item) => getDoc(doc(txtDB, "Clothing-item", item.clothingID, "reviews", item.reviewID)))
  const clothingsnapshotPromise =  await Promise.all(clothingsnapshotMap)
  // console.log("Clothing data after promise: ", clothingsnapshotPromise)

  const clothingimgMap = clothingsnapshotPromise.map((item) => getDownloadURL(ref(imgDB, `Imgs/${item.data().image}`)))
  const clothingimgPromise =  await Promise.all(clothingimgMap)
  // console.log("Clothing data after promise: ", clothingimgPromise)

  clothingsnapshotPromise.forEach((item, index) => {
    const clothingData = item.data()
    clothingData.imgurl = clothingimgPromise[index]
    clothingData.clothingID = userReviews[index].clothingID
    clothingData.reviewID = userReviews[index].reviewID
    userDisplay.push(clothingData)
  })

  await userDisplay.sort((a,b) => b.timestamp - a.timestamp )

  // console.log("display data out: ", userDisplay)

  const output = [[username, userimg], userDisplay]
  // console.log("output: ", output)

  return output
}

export default FetchUserData