import Item from '../components/item-window'



function Reviews(){

  return(
    <>
      <div className='grid-container'>
        <div className='grid-item' ><Item num="1"/></div>
        <div className='grid-item' ><Item num="2"/></div>
        <div className='grid-item' ><Item num="3"/></div>
        <div className='grid-item' ><Item num="4"/></div>
        <div className='grid-item' ><Item num="5"/></div>
        <div className='grid-item' ><Item num="6"/></div>
        <div className='grid-item' ><Item num="7"/></div>
        <div className='grid-item' ><Item num="8"/></div>
      </div>
    </>
  )
}

export default Reviews;