import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from "react-router";
import fetchClothingData from '../components/clothingData';

function ReviewsPage(inputVars) {
    let params = useParams()
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      fetchClothingData(params.pageName).then((fetched) => {
        setData(fetched)
      })
    }, []);


    return (
        <div>
            <h2>Customer Reviews</h2>
            <ul>
                {reviews.map(review => (
                    <li key={review.id}>{review.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewsPage;
