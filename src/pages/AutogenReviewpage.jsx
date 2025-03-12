import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from "react-router";
import fetchClothingData from '../components/clothingData';
import './AutogenReviewpage.css'
import Input_review from '../components/review-input'

function ReviewsPage(inputVars) {
    let params = useParams()
    const [reviews, setReviews] = useState([]);
    const [headerData, setheaderData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchClothingData(params.pageName).then((reviewData) => {
        setReviews(reviewData[0])
        setheaderData(reviewData[1])
      })
    }, []);

    useEffect(() => {
      if (headerData != null){
        setLoading(false)
      }
    })

    console.log("in autogen reviews: ",reviews)
    console.log("in autogen header: ",headerData)

    if (!loading){
      return (
        <div className='autogen-page-layout'>
          <h2>Customer Reviews</h2>
          <div className='autogen-layout'>
            <ul>
              {reviews.map(review => (
                <div className='autogen-item'>
                  {review ? <img src={review.image} alt="item image" /> : <p>Loading...</p>}
                  {review ? <p>{review.rating} / 5</p> : <p>Loading...</p>}
                  {review ? <p>{review.review}</p> : <p>Loading...</p>}
                </div>
              ))}
              
            </ul>
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
