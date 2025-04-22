import {app, auth} from "../firebaseConfig"
import React, { useEffect, useState, useRef } from 'react';
import {useGlobalContext} from "../components/global_context";
import { getAuth, createUserWithEmailAndPassword, signOut  } from "firebase/auth";
import { collection, doc, setDoc, query, limit, getDoc, getDocs, updateDoc, deleteField } from "firebase/firestore"
import {imgDB, txtDB } from "../firebaseConfig"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import './User.css'


function UserPage(){
  const { globalVariable, setGlobalVariable } = useGlobalContext();
  const [userimg, setuserimg] = useState(null)
  const [username, setusername] = useState(null)
  const [userreviews, setuserreviews] = useState([])
  const [userDisplay, setuserDisplay] = useState([])
  const [imgsLoading, setimgsLoading] = useState(true)
  const [imgs, setimgs] = useState(null)

  function callSignout(){
    signOut(auth).then(() => {
      console.log("sign out successful")
    }).catch((error) => {
      console.log("sign out unsuccessful: ", error)
    });
  }

  useEffect(() => {
    if(globalVariable != null){
      setuserimg(globalVariable.photoURL.replace(/['"]/g,''))
      const docref = doc(txtDB, "User-data", globalVariable.uid)
      getDoc(docref).then((data) => {
        setusername(data.data()["username"])
      })
      if(userreviews.length === 0){
        const collectionref = collection(txtDB, "User-data", globalVariable.uid, "my-reviews")
        getDocs(collectionref).then((reviewDocs) => {
          reviewDocs.forEach((doc) => {
            const docData = doc.data()
            if(!("timestamp" in docData)){
              docData.timestamp = 1
            }
            setuserreviews((prevItems) => [...prevItems, docData])
          })
        })
        // setuserreviews((prevItems) => [...prevItems].sort((a, b) => a.timestamp - b.timestamp))
      }
    }
  }, [globalVariable])

  

  useEffect(() => {
    if(userreviews.length != 0){
      console.log("user review data: ", userreviews)
      userreviews.forEach((item) => {
        const docref = doc(txtDB, "Clothing-item", item.clothingID, "reviews", item.reviewID)
        getDoc(docref).then((reviewObject) => {
          const reviewObjectData = reviewObject.data()
          reviewObjectData.imgurl = getDownloadURL(ref(imgDB, `Imgs/${reviewObjectData.image}`))
          setuserDisplay((prevItems) => [...prevItems, reviewObjectData])
        })
      })

    }
  }, [userreviews])

  

  useEffect(() => {
    if(userDisplay.length != 0){
      Promise.all(userDisplay.map((item) => item.imgurl)).then((results) => {
        console.log("promise resolved: ", results)
        setimgs(results)
        setimgsLoading(false)
        console.log("userdisplay right after promise is run: ", userDisplay)
      }).catch((error) => {
        console.error("Promise fail")
      })
    }
  }, [userDisplay])

  function displayUserReviews(){
    if(!imgsLoading && imgs != null){
      return(
        <div className="User-Reviews">
          <ResponsiveMasonry columnsCountBreakPoints={{ 400: 1, 1000: 2, 1100: 3, 1400: 4}}>
            <Masonry gutter="20px">
              {userDisplay.map((review, index) => (
                <div className='user-autogen-item'>
                  {review ? <p>{review.reviewheader}</p> : <p>Loading...</p>}
                  {review ? <p>{review.review}</p> : <p>Loading...</p>}
                  {/* {console.log("This is the review that should be displaying: ",review.imgurl)} */}
                  {/* {!imgsLoading && review ? <img src={review.imgurl} alt="item image" /> : <p>Loading...</p>} */}
                  {review ? <img src={imgs[index]} alt="item image" /> : <p>Loading...</p>}
                  <div className='horizontal'>
                    {review ? <p>{review.rating} / 5</p> : <p>Loading...</p>}
                    <div className='like-orginize'>
                      <p>{review.likes}</p>
                    </div> 
                  </div>
                </div>
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


  if (globalVariable) {
    return(
      <div className="User-page">
        <div>
          <img src={userimg}></img>
          <p>Hello {username}</p>
          <button onClick={callSignout}>Sign Out</button>
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