import React, { useEffect, useState } from 'react';

function ReviewsPage(inputVars) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('/api/reviews')
            .then(response => response.json())
            .then(data => setReviews(data));
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
