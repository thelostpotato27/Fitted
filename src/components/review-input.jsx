import React, { useEffect, useState, useRef } from 'react';
import setCanvasPreview from "./crop_preview.js";
import ReactStars from "react-rating-stars-component"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import {imgDB, txtDB } from "../firebaseConfig"
import { useParams } from "react-router";
import ReactCrop, {convertToPixelCrop} from 'react-image-crop'
import { collection, doc, setDoc, query, limit, getDocs, where, updateDoc } from "firebase/firestore"
import { v4 } from "uuid"


function Input_review(){
  const [stars,setStars] = useState(3)
  const [review,setReview] = useState('')
  const [img,setimg] = useState(null)
  const [src,setsrc] = useState('')
  const [cropfile, setcropfile] = useState(null)
  const previewCanvasRef = useRef(null)
  const imgRef = useRef(null)
  const [crop, setCrop] = useState({
    unit: 'px', // Can be 'px' or '%'
    x: 0,
    y: 0,
    width: 75,
    height: 100
  })
  let params = useParams()

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

  const ratingChanged = (newRating) => {
    setStars(newRating)
  };

  const img_upload = async (e) => {
    console.log("img uploader running")
    e.preventDefault();

    if(review == '' || src == '' || stars == '' || cropfile == null){
      console.log("return for some reason")
      return
    }
    const imgID = v4()
    const imgs = ref(imgDB, `Imgs/${imgID}`)
    uploadBytes(imgs, cropfile).then(data=>{
      console.log(data,"imgs")
    })

    const collectionRef = collection(txtDB, "Clothing-item");
    const q = query(collectionRef, where("name", "==", `${params.page_name}`));
    const querySnapshot = await getDocs(q);
    console.log("query snapshot: ", querySnapshot)
    console.log("params page name: ", params.pageName)
    querySnapshot.forEach((doc) => {
      console.log("query snapshot doc: ",doc)
      const docRef = doc(txtDB, "Clothing-item", doc.id, "reviews")
      updateDoc(docRef, {
        review: review,
        image: imgID,
        rating: stars,
        timestamp: Date.now()
      })
    })
    
    setReview('')
    setsrc('')
    setStars(3)
    setcropfile(null)
    setCrop({
      unit: 'px',
      x: 0,
      y: 0,
      width: 75,
      height: 100
      })
    console.log("img uploader fin")
  }

  return(
    <div>
      <h3>Item Review</h3>
      <input value={review} onChange={(e)=>setReview(e.target.value)} />
      <div className='centered-div'>
        <ReactStars
          count={5}
          value={0}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
        />
      </div>
      <h3>Image</h3>
      <div className='centered-div'>
        <input type="file" onChange={(e)=>prepUpload(e)} />
        {src && (
          <ReactCrop 
            src={src}
            crop={crop} 
            onComplete={displayCrop} 
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            aspect={.75}
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
      <button onClick={img_upload}> 
        Submit 
      </button>
    </div>
  )
}

export default Input_review;