import './item-preview.css'
import { useState, useEffect } from 'react';

function Item_preview(vars){
  const [imageData, setimageData] = useState(null)

  useEffect(() => {
    console.log("in item preview vars: ", vars)
    setimageData(vars.data)
  })
  
  if(imageData != null){
    return (
      <>
        <div className='preview-background'>
          {imageData ? <img src={imageData.image} alt="item image" /> : <p>Loading...</p>}
          <div className='line-margin'>
            <h3>{imageData.name}</h3>
            <p>{imageData.company}</p>
            <p>{imageData.ethnicity}</p>
            <p>{imageData.gender}</p>
          </div>
        </div>
      </>
    );
  }else{
    return(
      <></>
    )
  }
  
}

export default Item_preview