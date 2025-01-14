import './img_input.css'
import {imgDB, txtDB } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, setDoc, getDoc } from "firebase/firestore"
import React, { useState, useEffect } from 'react';
import { v4 } from "uuid";
import ReactStars from "react-rating-stars-component";
import ReactCrop from 'react-image-crop'; 
import 'react-image-crop/dist/ReactCrop.css';



function Img_input(){
  const [name,setName] = useState('')
  const [stars,setStars] = useState('')
  const [url,setUrl] = useState('')
  const [review,setReview] = useState('')
  const [company,setCompany] = useState('')
  const [imgSet,setImg] = useState('')

  const [crop, setCrop] = useState({ aspect: 1 }); 
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [imageRef, setImageRef] = useState(null);

  const prepUpload = (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      reader.addEventListener('load', () => setImg(reader.result));
      // setImg(reader.result); 
    }; 

    reader.onerror = (error) => { console.error("Error reading file:", error); };
    
    if (file) { 
      reader.readAsDataURL(file); 
      console.log("File uploaded:", file.name);
    }
  }

  const img_upload = async (e) => {
    e.preventDefault();

    if(name == '' || url == '' || review == '' || company == '' || imgSet == '' || stars == ''){
      return
    }
    const imgID = v4()
    const imgs = ref(imgDB, `Imgs/${imgID}`)
    uploadBytes(imgs, imgSet).then(data=>{
      console.log(data,"imgs")
      // getDownloadURL(data.ref).then(val=>{
      //   console.log(val)
      // })
    })
    const clothingID = v4()
    setDoc(doc(txtDB, "Clothing-item", clothingID), {
      name: name,
      company: company,
      url: url,
      image: imgID
    });

    const reviewID = v4()
    setDoc(doc(txtDB, "Clothing-item", clothingID, "reviews", reviewID), {
      review: review,
      rating: stars
    });

    setName('')
    setUrl('')
    setReview('')
    setCompany('')
    setImg('')
    setStars('')
  }

  const onImageLoaded = (image) => { 
    console.log("image ref loaded")
    setImageRef(image); 
    return false;
  };

  const ratingChanged = (newRating) => {
    setStars(newRating)
  };

  const onCropComplete = () => { 
    if (imageRef && crop.width && crop.height) { 
      console.log("Creating cropped image.");
      const canvas = document.createElement('canvas'); 
      const scaleX = imageRef.naturalWidth / imageRef.width; 
      const scaleY = imageRef.naturalHeight / imageRef.height; 
      canvas.width = crop.width; 
      canvas.height = crop.height; 
      const ctx = canvas.getContext('2d'); 
      ctx.drawImage( 
        imageRef, 
        crop.x * scaleX, 
        crop.y * scaleY, 
        crop.width * scaleX, 
        crop.height * scaleY, 
        0, 
        0, 
        crop.width, 
        crop.height 
      ); 
      canvas.toBlob((blob) => { 
        if (!blob) { console.error("Canvas is empty."); return; }
        else{
          console.log("blob success")
        }

        const croppedImageUrl = URL.createObjectURL(blob); 
        setCroppedImageUrl(croppedImageUrl); 
      }); 
    } 
  };

  const onCropChange = (newCrop) => { 
    console.log("Crop changed:", newCrop);
    setCrop(newCrop); 
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
        {imgSet && (
          <ReactCrop 
            src={imgSet} 
            crop={crop} 
            onImageLoaded={onImageLoaded} 
            onComplete={onCropComplete} 
            onChange={onCropChange} 
          />
        )}

        {croppedImageUrl && ( 
          <div> 
            <img src={croppedImageUrl} alt="Cropped" /> 
          </div> 
        )}
      </div>
      

      {/* <h3></h3> */}


      <h3></h3>
      <button onClick={img_upload}> Submit </button>
    </div>
  )
}
export default Img_input;