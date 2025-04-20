import React, { useEffect, useState, useRef } from 'react';
import setCanvasPreview from "./crop_preview.js";
import './review-input.css'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import {imgDB, txtDB, auth } from "../firebaseConfig"
import { useParams } from "react-router";
import ReactCrop, {convertToPixelCrop} from 'react-image-crop'
import { collection, doc, setDoc, query, limit, getDocs, where, updateDoc, addDoc, getDoc } from "firebase/firestore"
import { v4 } from "uuid"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import {useGlobalContext} from './global_context'


function Input_review(){
  const { globalVariable, setGlobalVariable } = useGlobalContext();
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
    height: 80
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


  // where all my star related stuff goes
  const [stars,setStars] = useState(2)
  const [hover, setHover] = useState(-1);

  const labels = {
    0.5: 'Useless   ',
    1: 'Useless+  ',
    1.5: 'Poor      ',
    2: 'Poor+     ',
    2.5: 'Ok        ',
    3: 'Ok+       ',
    3.5: 'Good      ',
    4: 'Good+     ',
    4.5: 'Excellent ',
    5: 'Excellent+',
  };

  function getLabelText(stars) {
    return `${stars} Star${stars !== 1 ? 's' : ''}, ${labels[stars]}`;
  }

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

    const collectionRef = collection(txtDB, "Clothing-item", `${params.pageName}`, "reviews")
    const docRef = await addDoc(collectionRef, {
      review: review,
      image: imgID,
      rating: stars,
      timestamp: Date.now(),
      user: globalVariable.uid,
      likes: 1
    })

    const clothingdocRef = doc(txtDB, "Clothing-item",`${params.pageName}`)
    const clothingdocsnap = await getDoc(clothingdocRef)
    const docData = clothingdocsnap.data()
    const newstarAvg = ((docData.staravg * docData.reviewnum) + stars) / (docData.reviewnum + 1)
    const newreviewnum = docData.reviewnum + 1
    await updateDoc(clothingdocRef, {
      staravg: newstarAvg,
      reviewnum: newreviewnum
    })


    setDoc(doc(txtDB, "User-data", globalVariable.uid, "my-reviews", docRef.id), {
      clothingID: `${params.pageName}`,
      reviewID: docRef.id
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
      height: 80
      })
    console.log("img uploader fin")
  }
  if(globalVariable != null){
    return(
      <div className='centered-div-autogen-review'>
        <h3>Item Review</h3>
        <input value={review} onChange={(e)=>setReview(e.target.value)} className='input-class-autogen-review'/>
        <h3></h3>
        <div>
          <Rating
            name="hover-feedback"
            stars={stars}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setStars(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          {stars !== null &&(
            <div>{labels[hover !== -1 ? hover : stars]}</div>
          )}
        </div>
        <h3>Image</h3>
        <div>
          <input type="file" onChange={(e)=>prepUpload(e)} />
          {src && (
            <ReactCrop 
              src={src}
              crop={crop} 
              onComplete={displayCrop} 
              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
              aspect={0.9375}
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
  }else{
    return(
      <></>
    )
  }
  
}

export default Input_review;