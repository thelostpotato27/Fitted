import Item from '../components/item-window'
import ReviewSidebar from '../components/reviewSidebar'
import ReviewPopulator from '../components/auto-populater'
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
        {/* <div className='grid-container'>
          <div className='grid-item' ><Item num="1"/></div>
          <div className='grid-item' ><Item num="2"/></div>
          <div className='grid-item' ><Item num="3"/></div>
          <div className='grid-item' ><Item num="4"/></div>
          <div className='grid-item' ><Item num="5"/></div>
          <div className='grid-item' ><Item num="6"/></div>
          <div className='grid-item' ><Item num="7"/></div>
          <div className='grid-item' ><Item num="8"/></div>
          <div className='grid-item' ><Item num="1"/></div>
          <div className='grid-item' ><Item num="2"/></div>
          <div className='grid-item' ><Item num="3"/></div>
          <div className='grid-item' ><Item num="4"/></div>
          <div className='grid-item' ><Item num="5"/></div>
          <div className='grid-item' ><Item num="6"/></div>
          <div className='grid-item' ><Item num="7"/></div>
          <div className='grid-item' ><Item num="8"/></div>
          <div className='grid-item' ><Item num="1"/></div>
          <div className='grid-item' ><Item num="2"/></div>
          <div className='grid-item' ><Item num="3"/></div>
          <div className='grid-item' ><Item num="4"/></div>
          <div className='grid-item' ><Item num="5"/></div>
          <div className='grid-item' ><Item num="6"/></div>
          <div className='grid-item' ><Item num="7"/></div>
          <div className='grid-item' ><Item num="8"/></div>
        </div> */}
      </div>
      
    </>
  )
}

export default Reviews;