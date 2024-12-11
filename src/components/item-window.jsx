import './item-window.css'
import viteLogo from '/vite.svg'

function Item(){
  return(
    <>
      <div class='img-background'>
        {/* <p>Testing</p> */}
        <img src={viteLogo} alt="placeholder image"/>
      </div>
      <div class='line-margin'>
        <h3>Name of item</h3>
        <p>Company</p>
      </div>
      
    </>

  )
}


export default Item