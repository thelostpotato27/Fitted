import React, { useEffect, useState, useRef } from 'react';
import {imgDB, txtDB, auth } from "../firebaseConfig"
import { BrowserRouter, Routes, Route, useParams } from "react-router";
import fetchClothingData from '../components/clothingData';
import './AutogenReviewpage.css'
import Input_review from '../components/review-input'
import { BsHandThumbsUpFill } from "react-icons/bs";
import {useGlobalContext} from '../components/global_context'
import { collection, doc, setDoc, query, limit, getDocs, where, updateDoc, addDoc, getDoc } from "firebase/firestore"


function ReviewsPage(inputVars) {
    let params = useParams()
    const [reviews, setReviews] = useState([]);
    const [headerData, setheaderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [likes, setlikes] = useState({});
    const [userlikes, setuserlikes] = useState(null);
    const { globalVariable, setGlobalVariable } = useGlobalContext();

    // console.log("global var in autogen",globalVariable)
    

    useEffect(() => {
      fetchClothingData(params.pageName).then((reviewData) => {
        setReviews(reviewData[0])
        setheaderData(reviewData[1])
      })
    }, []);

    useEffect(() => {
      if (headerData != null){
        reviews.forEach(element => {
          if(!likes[element.docID]){
            setlikes(prevState => ({
              ... prevState,
              [element.docID]: false
            }))
          }
        });
        setLoading(false)
      }
    },[headerData])

    useEffect(() => {
      if (globalVariable != null){
        const clothingdocRef = doc(txtDB, "User-data", `${globalVariable.uid}`,`${params.pageName}`, "Likes")
        getDoc(clothingdocRef).then((clothingData) => {
          setuserlikes(clothingData.data())
          console.log("set userlikes ran: ", clothingData.data())
          console.log("params pagename: ", params.pageName)
        })
        console.log("what is clothingdocRef here: ", clothingdocRef)
      }
    },[globalVariable])

    useEffect(() => {
      console.log("userlikes pop")
      if(userlikes != null){
        console.log("userlikes data: ", userlikes)
        for (const key in userlikes){
          console.log("userlikes key: ",userlikes[key])
          setlikes(prevState => ({... prevState, [key]:userlikes[key]}))
        }
        
        console.log("likes just got updated: ", likes)
      }
    },[userlikes])

    const Genderset = (liked) => {
      if (liked){
        return (<BsHandThumbsUpFill className='clicked-thumb'/>)
      }
      return (<BsHandThumbsUpFill/>)
    }

    const setMap = (key) => {
      const boolflip = !likes[key]
      setlikes(prevState => ({
        ... prevState,
        [key]:boolflip
      }))
      setDoc(doc(txtDB, "User-data", `${globalVariable.uid}`,`${params.pageName}`, "Likes"), {[key]: boolflip}, {merge: true})
    }

    if (!loading){
      return (
        <div className='autogen-page-layout'>
          <h2>Customer Reviews</h2>
          <div className='autogen-layout'>
            {reviews.map(review => (
              <div className='autogen-item'>
                {review ? <img src={review.image} alt="item image" /> : <p>Loading...</p>}
                {review ? <p>{review.rating} / 5</p> : <p>Loading...</p>}
                {review ? <p>{review.review}</p> : <p>Loading...</p>}
                <button onClick={() => setMap(review.docID)}>{Genderset(likes[review.docID])}</button>
              </div>
            ))}
              
          </div>
          <div>
            <Input_review />
          </div>
        </div>
        
      );
    }else{
      return(
        <div>
          <p>Temp</p>
        </div>
      )
    }
    
};

export default ReviewsPage;
