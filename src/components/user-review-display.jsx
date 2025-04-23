import { BsThreeDotsVertical } from "react-icons/bs";
import "./user-review-display.css"
import React, { useEffect, useState, useRef } from 'react';
import { collection, doc, setDoc, query, limit, getDoc, getDocs, updateDoc, deleteField, deleteDoc } from "firebase/firestore"
import { txtDB } from "../firebaseConfig";
import { updatePassword } from "firebase/auth";



function UserReviewDisplay({review}){
  const [showPopup, setShowPopup] = useState(false)
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [Deleted, setDeleted] = useState(false)
  const popupRef = useRef(null)
  const deletepopupRef = useRef(null)

  const handleClickOutsideOption = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)){
      setShowPopup(false)
    }
  }

  useEffect(() => {
    if (showPopup) {
      document.addEventListener("click", handleClickOutsideOption)
    } else{
      document.removeEventListener("click", handleClickOutsideOption)
    }
  }, [showPopup])


  const handleClickOutsideDeleteWarning = (event) => {
    if (deletepopupRef.current && !deletepopupRef.current.contains(event.target)){
      setShowDeletePopup(false)
    }
  }

  useEffect(() => {
    if (showDeletePopup) {
      document.addEventListener("click", handleClickOutsideDeleteWarning)
    } else{
      document.removeEventListener("click", handleClickOutsideDeleteWarning)
    }
  }, [showDeletePopup])


  async function DeletePost() {
    const clothingItemRef = doc(txtDB, "Clothing-item", review.clothingID)
    const clothingItemSnapshot = await getDoc(clothingItemRef)
    const clothingItemData = clothingItemSnapshot.data()
    var newstarAvg
    if(clothingItemData.reviewnum == 1){
      newstarAvg = 0
    }else{
      newstarAvg = ((clothingItemData.reviewnum * clothingItemData.staravg) - review.rating) / (clothingItemData.reviewnum - 1)
    }
    
    await setDoc(clothingItemRef, {likes: clothingItemData.likes - review.likes, staravg: newstarAvg, reviewnum: clothingItemData.reviewnum - 1}, {merge: true})

    await deleteDoc(doc(txtDB, "Clothing-item", review.clothingID, "reviews", review.reviewID))

    
    await updateDoc(doc(txtDB, "User-data", review.user, "Likes", review.clothingID), {
      [review.reviewID]: deleteField()
    })

    await deleteDoc(doc(txtDB, "User-data", review.user, "my-reviews", review.reviewID))
    setDeleted(true)
  }

  // console.log("review data passed in: ", review)

  if(!Deleted){
    return(
      <div className='user-autogen-item'>
        <button className="user-review-options" onClick={() => {event.stopPropagation(); setShowPopup(prev => !prev);}}><BsThreeDotsVertical className="user-review-options-icon"/></button>

        {showPopup && (
          <div ref={popupRef} className="options-popup" >
            <button>Edit</button>
            <button onClick={() => {event.stopPropagation(); setShowPopup(prev => !prev); setShowDeletePopup(prev => !prev);}}>Delete</button>
          </div>
        )}

        {showDeletePopup && (
          <div ref={deletepopupRef} className="delete-popup">
            <p>Are you sure you want to delete your post?</p>
            <div className="delete-popup-button-div">
              <button className="delete-button" onClick={() => DeletePost()}>Delete</button>
              <button className="exit-button" onClick={() => setShowDeletePopup(prev => !prev)}>Exit</button>
            </div>
          </div>
        )}

        {review ? <p>{review.reviewheader}</p> : <p>Loading...</p>}
        {review ? <p>{review.review}</p> : <p>Loading...</p>}
        {review ? <img src={review.imgurl} alt="item image" /> : <p>Loading...</p>}
        <div className='horizontal'>
          {review ? <p>{review.rating} / 5</p> : <p>Loading...</p>}
          <div className='like-orginize'>
            <p>{review.likes}</p>
          </div> 
        </div>
      </div>
    )
  }else{
    return(<></>)
  }
  
}

export default UserReviewDisplay