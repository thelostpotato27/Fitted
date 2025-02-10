import Item from '../components/item-window'
import ReviewSidebar from '../components/reviewSidebar'
import ReviewPopulator from '../components/auto-populater.jsx'
import '../components/reviewSidebar.css'
import React from 'react';
import './Reviews.css'


function Reviews(){

  return(
    <>
      {/* <ReviewSidebar className="sidebar"/> */}
      <div className="review-sidebar-org">
        <ReviewSidebar>
        </ReviewSidebar>
        <ReviewPopulator></ReviewPopulator>

      </div>
      
    </>
  )
}

export default Reviews;