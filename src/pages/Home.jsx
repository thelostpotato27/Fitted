import './Home.css'
import viteLogo from '/vite.svg'
import Item from '../components/item-window'

function Home(){
  return(
    <>
      <div class='main'>
        <div class='intro'>
          <div class='intro-left'>
            <h1>Intro Home Page</h1>
            <p>Some info on Fitted</p>
          </div>
          <div class='intro-right'>
            <img src={viteLogo} alt="placeholder image" />
          </div>
        </div>
      </div>
      
      <div class='grid-container'>
        <div class='grid-item' ><Item/></div>
        <div class='grid-item' ><Item/></div>
        <div class='grid-item' ><Item/></div>
        <div class='grid-item' ><Item/></div>
        <div class='grid-item' ><Item/></div>
        <div class='grid-item' ><Item/></div>
        <div class='grid-item' ><Item/></div>
      </div>
    </>
  )
}

export default Home;