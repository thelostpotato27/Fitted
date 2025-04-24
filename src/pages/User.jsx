import {app, auth} from "../firebaseConfig"
import React, { useEffect, useState, useRef } from 'react';
import {useGlobalContext} from "../components/global_context";
import { getAuth, createUserWithEmailAndPassword, signOut  } from "firebase/auth";
import { collection, doc, setDoc, query, limit, getDoc, getDocs, updateDoc, deleteField } from "firebase/firestore"
import {imgDB, txtDB } from "../firebaseConfig"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import './User.css'
import FetchUserData from "../components/user-data-fetch";
import { BsThreeDotsVertical } from "react-icons/bs";
import UserReviewDisplay from "../components/user-review-display";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from "react-router";


function UserPage(){
  const { globalVariable, setGlobalVariable } = useGlobalContext();
  const [userimg, setuserimg] = useState(null)
  const [username, setusername] = useState(null)
  const [userreviews, setuserreviews] = useState([])
  const [userDisplay, setuserDisplay] = useState([])
  const [imgsLoading, setimgsLoading] = useState(true)
  const [imgs, setimgs] = useState(null)
  const navigate = useNavigate()

  function updatepersonalData(){
    navigate('/usersetup')
  }
  
  function callSignout(){
    signOut(auth).then(() => {
      console.log("sign out successful")
    }).catch((error) => {
      console.log("sign out unsuccessful: ", error)
    });
  }

  useEffect(() => {
    if(globalVariable != null){
      FetchUserData(globalVariable).then((dataOut) => {
        setuserDisplay(dataOut)
      })
    }
  }, [globalVariable])
  

  useEffect(() => {
    setimgsLoading(false)
  }, [userDisplay])

  function displayUserReviews(){
    if(!imgsLoading){
      return(
        <div className="User-Reviews">
          <ResponsiveMasonry columnsCountBreakPoints={{ 400: 1, 1000: 2, 1100: 3, 1400: 4}}>
            <Masonry gutter="20px">
              {userDisplay[1].map((review, index) => (
                <UserReviewDisplay review={review}/>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      )
    }else{
      return(
        <p>Your Reviews are Loading</p>
      )
    }
    
  }


  if (globalVariable && userDisplay.length != 0) {
    return(
      <div className="User-page">
        <div>
          <img src={userDisplay[0][1]}></img>
          <p>Hello {userDisplay[0][0]}</p>
          <button onClick={callSignout}>Sign Out</button>
          <button onClick={updatepersonalData}>Update Personal Data</button>
        </div>
        {displayUserReviews()}
      </div>
    )
  } else {
    return(
      <>
        <p>No user data</p>
      </>
    )
  }

  
}

export default UserPage