import Item from '../components/item-window'
import ReviewSidebar from '../components/reviewSidebar'
import ReviewPopulator from '../components/auto-populator.jsx'
import '../components/reviewSidebar.css'
import React from 'react';
import './Reviews.css'
import {ReviewGlobalProvider} from '../components/global_context.jsx'


function Reviews(){

  return(
    <div className="review-content">
      <ReviewGlobalProvider>
        <div className="sidebarsize">
          <ReviewSidebar/>
        </div>
        <div className="Populator">
          <ReviewPopulator/>
        </div>
        
      </ReviewGlobalProvider>
    </div>
  )
}

export default Reviews;