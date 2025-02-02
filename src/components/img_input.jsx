import './img_input.css'
import {imgDB, txtDB } from "../firebaseConfig"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { collection, doc, setDoc, getDoc } from "firebase/firestore"
import React, { useState, useEffect, useRef } from 'react'
import { v4 } from "uuid"
import ReactStars from "react-rating-stars-component"
import ReactCrop, {convertToPixelCrop} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import setCanvasPreview from "./crop_preview.js";


function Img_input(){
  const [name,setName] = useState('')
  const [stars,setStars] = useState(3)
  const [url,setUrl] = useState('')
  const [review,setReview] = useState('')
  const [company,setCompany] = useState('')
  const [src,setsrc] = useState('')
  const [img,setimg] = useState(null)
  const [showPopup, setShowPopup] = useState(false);

  const imgRef = useRef(null)
  const previewCanvasRef = useRef(null)

  const [cropfile, setcropfile] = useState(null)
  const [crop, setCrop] = useState({
    unit: 'px', // Can be 'px' or '%'
    x: 100,
    y: 100,
    width: 100,
    height: 100
    })

  const prepUpload = (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      reader.addEventListener('load', () => setsrc(reader.result));
      setsrc(reader.result); 
    }; 

    reader.onerror = (error) => { console.error("Error reading file:", error); };
    
    if (file) { 
      reader.readAsDataURL(file); 
      console.log("File uploaded:", file.name);
    }
  }

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const img_upload = async (e) => {
    console.log("img uploader running")
    e.preventDefault();

    if(name == '' || url == '' || review == '' || company == '' || src == '' || stars == '' || cropfile == null){
      console.log("return for some reason")
      return
    }
    const imgID = v4()
    const imgs = ref(imgDB, `Imgs/${imgID}`)
    uploadBytes(imgs, cropfile).then(data=>{
      console.log(data,"imgs")
    })
    const clothingID = v4()
    setDoc(doc(txtDB, "Clothing-item", clothingID), {
      name: name,
      company: company,
      url: url,
      ethnicity: "TBD"

    });
    const reviewID = v4()
    setDoc(doc(txtDB, "Clothing-item", clothingID, "reviews", reviewID), {
      review: review,
      image: imgID,
      rating: stars,
      timestamp: Date.now()
    });
    setShowPopup(1)
    setName('')
    setUrl('')
    setReview('')
    setCompany('')
    setsrc('')
    setStars(3)
    setcropfile(null)
    console.log("img uploader fin")
  }

  const ratingChanged = (newRating) => {
    setStars(newRating)
  };

  const displayCrop = () => { 
    console.log("display crop runs")
    setCanvasPreview(
      imgRef.current, // HTMLImageElement
      previewCanvasRef.current, // HTMLCanvasElement
      convertToPixelCrop(
        crop,
        imgRef.current.width,
        imgRef.current.height
      )
    )
    
    previewCanvasRef.current.toBlob((blob) => {
      const file = new File([blob], 'canvasImage.png', { type: 'image/png' })
      setcropfile(file)
    }, 'image/png')
  };

  return(
    <div >
      <h3>Item Name</h3>
      <input value={name} onChange={(e)=>setName(e.target.value)} />

      <h3>Company</h3>
      <input value={company} onChange={(e)=>setCompany(e.target.value)} />

      <h3>Item Review</h3>
      <input value={review} onChange={(e)=>setReview(e.target.value)} />
      <div className='centered-div'>
        <ReactStars
          count={5}
          value={3}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          
        />
      </div>

      <h3>Item Link</h3>
      <input value={url} onChange={(e)=>setUrl(e.target.value)} />

      <h3>Image</h3>
      <div className='centered-div'>
        <input type="file" onChange={(e)=>prepUpload(e)} />
        {src && (
          <ReactCrop 
            src={src}
            crop={crop} 
            // onImageLoad={setimg} 
            onComplete={displayCrop} 
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            // aspect={1}
          >
            <img ref={imgRef} src={src} onLoad={setimg} style={{ height: '40vh' }}/>
          </ReactCrop>
        )}
      </div>
      <div>
        {crop && (
          <canvas 
            ref={previewCanvasRef}
            style={{
              display: "none",
              border: "1px solid black",
              objectFit: "contain",
              width: 150,
              height: 150,
            }}
        />
      )}
      </div>
      <h3></h3>
      <button onClick={img_upload}> 
        Submit 
        {/* {showPopup ? 'Close Pop-up' : 'Open Pop-up'} */}
      </button>
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Pop-up Content</h2>
            <p>This is a simple pop-up example.</p>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default Img_input;