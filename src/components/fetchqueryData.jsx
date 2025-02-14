import {imgDB, txtDB } from "../firebaseConfig"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { collection, doc, setDoc, query, limit, getDocs  } from "firebase/firestore"
import React, { useState, useEffect } from 'react';


async function fetchqueryData(setData, reset_vars, num_fetch) {
  const collectionRef = collection(txtDB, "Clothing-item");
  const q = query(collectionRef, limit(num_fetch));
  var items = new Array();
  useEffect(() => {
    try {
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const allreviews = collection(txtDB, "Clothing-item", doc.id, "reviews")
          const firstreview = query(allreviews)
          getDocs(firstreview).then((reviewSnapshot) => {
            reviewSnapshot.forEach((doc2) => {
              const imgref = ref(imgDB, `Imgs/${doc2.data().image}`);
              getDownloadURL(imgref).then(val => {
                console.log(items.push({image: val, review: doc2.data(), header: doc.data()}))
                console.log(items.length)
              }).catch(error => {
                console.error("Error getting download URL:", error);
              });
            })
          })
        })
        
        
      }).then(() => {
        
        
      })
    } catch (error) {
      console.log("Database Fetch Fail")
      console.log({error})
    }
  }, reset_vars);


  useEffect(() => {
    if (items.length == 10){
      console.log("type of item: ", (typeof items))
      console.log("This is what returns: ", items.length)
      setData(items)
    }else{
      console.log("return failed, length is ", items.length)
    }
  }, [items])

  
  
}

export default fetchqueryData;