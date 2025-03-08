import Item from '../components/item-window'
import ReviewSidebar from '../components/reviewSidebar'
import ReviewPopulator from '../components/auto-populator.jsx'
import '../components/reviewSidebar.css'
import React from 'react';
import './Reviews.css'


function Reviews(){

  return(
    <>
      {/* <ReviewSidebar className="sidebar"/> */}
      <div className="review-content">
        <ReviewSidebar>
        </ReviewSidebar>
        <ReviewPopulator></ReviewPopulator>
        

      </div>
      
    </>
  )
}

export default Reviews;