import './item-preview-homepage.css'
import { useState, useEffect } from 'react';

function Item_preview_homepage(vars){
  const [imageData, setimageData] = useState(vars.data)
  const expected_types = ["name", "company", "ethnicity", "image"]
  // await setimageData(vars.data)

  expected_types.forEach(element => {
    if (!(element in imageData)){
      setimageData({element:"temp", ...imageData})
    }
  });
  
  return (
    <>
      <div className='preview-background-homepage'>
        {imageData ? <img src={imageData.image} alt="item image" /> : <p>Loading...</p>}
        <div className='line-margin-homepage'>
          <h3>{imageData.name}</h3>
          <p>{imageData.company}</p>
          <p>{imageData.ethnicity}</p>
        </div>
      </div>
    </>
  );
}

export default Item_preview_homepage