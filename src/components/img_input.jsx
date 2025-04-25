import './img_input.css'
import {imgDB, txtDB } from "../firebaseConfig"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { collection, doc, setDoc, getDoc } from "firebase/firestore"
import React, { useState, useEffect, useRef } from 'react'
import { v4 } from "uuid"
import ReactCrop, {convertToPixelCrop} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import setCanvasPreview from "./crop_preview.js";
import {useGlobalContext} from './global_context'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';


function Img_input(){
  const { globalVariable, setGlobalVariable } = useGlobalContext();
  const [name,setName] = useState('')
  const [url,setUrl] = useState('')
  const [review,setReview] = useState('')
  const [reviewheader,setReviewheader] = useState('')
  const [company,setCompany] = useState('')
  const [src,setsrc] = useState('')
  const [img,setimg] = useState(null)
  const [gender, setgender] = useState(null)
  const [articleType, setarticleType] = useState(null)
  const [origin, setorigin] = useState(null)
  const [showPopup, setShowPopup] = useState(false);
  const [isflashing, setisflashing] = useState(false);
  const submitRef = useRef(null)

  const imgRef = useRef(null)
  const previewCanvasRef = useRef(null)

  const [cropfile, setcropfile] = useState(null)
  const [crop, setCrop] = useState({
    unit: 'px', // Can be 'px' or '%'
    x: 0,
    y: 0,
    width: 75,
    height: 80
    })

  // useEffect(() => {
  //   if (isflashing && submitRef.current){
  //     submitRef.current.
  //   }
  // })

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

    if(name == '' || url == '' || reviewheader == '' || review == '' || company == '' || src == '' || stars == '' || cropfile == null || gender == null || gender == "" || articleType == "" || articleType == null || origin == null || origin == ""){
      setisflashing(true)
      setTimeout(() => {
        setisflashing(false)
      }, 1000)
      return
    }
    const imgID = v4()
    const imgs = ref(imgDB, `Imgs/${imgID}`)
    uploadBytes(imgs, cropfile).then(data=>{
      console.log(data,"imgs")
    })
    const clothingID = company +"-"+ name
    setDoc(doc(txtDB, "Clothing-item", clothingID), {
      name: name,
      company: company,
      url: url,
      ethnicity: origin,
      staravg: stars,
      reviewnum: 1,
      articleType: articleType,
      gender: gender

    });
    const reviewID = v4()
    let sizingData = {}
    if ("weight" in globalVariable){sizingData = {...sizingData, weight: globalVariable.weight}}
    if ("height" in globalVariable){sizingData = {...sizingData, weight: globalVariable.weight}}
    if ("shoulder" in globalVariable){sizingData = {...sizingData, weight: globalVariable.weight}}
    if ("chest" in globalVariable){sizingData = {...sizingData, weight: globalVariable.weight}}
    if ("waist" in globalVariable){sizingData = {...sizingData, weight: globalVariable.weight}}
    if ("hip" in globalVariable){sizingData = {...sizingData, weight: globalVariable.weight}}

    setDoc(doc(txtDB, "Clothing-item", clothingID, "reviews", reviewID), {
      ...sizingData,
      reviewheader: reviewheader,
      review: review,
      image: imgID,
      rating: stars,
      timestamp: Date.now(),
      user: globalVariable.uid,
      likes: 1
    });

    setDoc(doc(txtDB, "User-data", globalVariable.uid, "my-reviews", reviewID), {
      clothingID: clothingID,
      reviewID: reviewID
    })

    setShowPopup(1)
    setName('')
    setUrl('')
    setReview('')
    setReviewheader('')
    setCompany('')
    setsrc('')
    setStars(3)
    setHover(3)
    setcropfile(null)
    setgender("")
    setarticleType("")
    setorigin("")
    setCrop({
      unit: 'px',
      x: 0,
      y: 0,
      width: 75,
      height: 80
      })
    console.log("img uploader fin")
  }

  // all my star ratings code

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

  function clothingType(){
    if(gender == null || gender == ""){
      return(
        <p>Please select the Intended Audience</p>
      )
    }else if(gender == "M"){
      return(
        <select id="mens-clothing" value={articleType} onChange={(e) => setarticleType(e.target.value)}>
          <option value="">--Select--</option>
          <optgroup label="Tops">
            <option value="dress-shirt">Dress Shirt</option>
            <option value="hawaiian shirt">Hawaiian shirt</option>
            <option value="henley">Henley</option>
            <option value="polo-shirt">Polo Shirt</option>
            <option value="sweatshirt">Sweatshirt</option>
            <option value="t-shirt">T-Shirt</option>
            <option value="tank-top">Tank Top</option>
          </optgroup>
          <optgroup label="Bottoms">
            <option value="chinos">Chinos</option>
            <option value="jeans">Jeans</option>
            <option value="joggers">Joggers</option>
            <option value="shorts">Shorts</option>
            <option value="sweatpants">Sweatpants</option>
            <option value="trousers">Trousers</option>
          </optgroup>
          <optgroup label="Outerwear">
            <option value="bomber-jacket">Bomber Jacket</option>
            <option value="cardigan">Cardigan</option>
            <option value="coat">Coat</option>
            <option value="hoodie">Hoodie</option>
            <option value="leather-jacket">Leather Jacket</option>
            <option value="pea-coat">Pea Coat</option>
          </optgroup>
          <optgroup label="Footwear">
            <option value="boots">Boots</option>
            <option value="dress-shoes">Dress Shoes</option>
            <option value="flip-flops">Flip-Flops</option>
            <option value="sneakers">Sneakers</option>
            <option value="sandals">Sandals</option>
          </optgroup>
        </select>
      )
    }else if(gender == "W"){
      return(
        <select id="womens-clothing" value={articleType} onChange={(e) => setarticleType(e.target.value)}>
          <option value="">--Select--</option>
          <optgroup label="Tops">
            <option value="blouse">Blouse</option>
            <option value="crop-top">Crop Top</option>
            <option value="dress-shirt">Dress Shirt</option>
            <option value="henley">Henley</option>
            <option value="polo-shirt">Polo Shirt</option>
            <option value="sweatshirt">Sweatshirt</option>
            <option value="tank-top">Tank Top</option>
            <option value="t-shirt">T-Shirt</option>
            <option value="tube top">Tube Top</option>
          </optgroup>
          <optgroup label="Bottoms">
            <option value="chinos">Chinos</option>
            <option value="jeans">Jeans</option>
            <option value="joggers">Joggers</option>
            <option value="leggings">Leggings</option>
            <option value="shorts">Shorts</option>
            <option value="skirt">Skirt</option>
            <option value="sweatpants">Sweatpants</option>
            <option value="trousers">Trousers</option>
          </optgroup>
          <optgroup label="Dresses & Jumpsuits">
            <option value="cocktail-dress">Cocktail Dress</option>
            <option value="evening-gown">Evening Gown</option>
            <option value="jumpsuit">Jumpsuit</option>
            <option value="maxi-dress">Maxi Dress</option>
            <option value="midi-dress">Maxi Dress</option>
            <option value="mini-dress">Maxi Dress</option>
            <option value="sundress">Sundress</option>
            <option value="wrap-dress">Wrap Dress</option>
          </optgroup>
          <optgroup label="Outerwear">
            <option value="cardigan">Cardigan</option>
            <option value="coat">Coat</option>
            <option value="denim-jacket">Denim Jacket</option>
            <option value="hoodie">Hoodie</option>
            <option value="leather-jacket">Leather Jacket</option>
            <option value="pea-coat">Pea Coat</option>
            <option value="puffer-jacket">Puffer Jacket</option>
          </optgroup>
          <optgroup label="Footwear">
            <option value="ankle-boots">Ankle Boots</option>
            <option value="ballet-flats">Ballet Flats</option>
            <option value="heels">Heels</option>
            <option value="sandals">Sandals</option>
            <option value="sneakers">Sneakers</option>
          </optgroup>
        </select>
      )
    }
  }

  if(globalVariable != null){
    return(
      <div className='background-color'>
        <h2 className='title-color'>Review Input Form</h2>
        <div className='horizontal-items notCrop'>
          <div>
            <h3>Item Name</h3>
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder='Item Name'/>
          </div>
          <div>
            <h3>Company</h3>
            <input value={company} onChange={(e)=>setCompany(e.target.value)} placeholder='Company Name'/>
          </div>
        </div>

        <div className='horizontal-items notCrop'>
          <div>
            <h3>Intended Audience</h3>
            <select id="gender" value={gender} onChange={(e) => setgender(e.target.value)}>
              <option value="">--Select--</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div>
            <h3>Article Type</h3>
            {clothingType()}
          </div>
        </div>

        <div className='horizontal-items notCrop'>
          <div>
            <h3>Origin</h3>
            <select id="origin-country" value={origin} onChange={(e) => setorigin(e.target.value)}>
              <option value="">--Select--</option>
              <option value="korea">Korea</option>
              <option value="japan">Japan</option>
              <option value="china">China</option>
              <option value="singapore">Singapore</option>
            </select>
          </div>
          <div className='star-rating-position'>
            <h3>Star Rating</h3>
            <div className='star-organize'>
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

          </div>
        </div>

        <div className='horizontal-items'>
          <div className='aligning-top item-link-sizing'>
            <h3>Item Link</h3>
            <input className='item-link-sizing' value={url} onChange={(e)=>setUrl(e.target.value)} placeholder='Item Link'/>
            <h3></h3>
            
          </div>
          <div className='aligning-top'>
            <h3>Image</h3>
            <div className='centered-div'>
              <input type="file" onChange={(e)=>prepUpload(e)}/>
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
          </div>
        </div>

        <h2>Item Review</h2>
        <input value={reviewheader} onChange={(e)=>setReviewheader(e.target.value)} className="review-header" placeholder='Review Title'/>
        <h3></h3>
        <textarea value={review} onChange={(e)=>setReview(e.target.value)} className="textbox" placeholder='Review'/>

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
        <button onClick={img_upload} className={isflashing ? "flash-submit" : "nothing"}> 
          Submit 
          {/* {showPopup ? 'Close Pop-up' : 'Open Pop-up'} */}
        </button>
        {showPopup && (
          <div className="popup">
            <div className="popup-inner">
              <h2>Thank you for reviewing!</h2>
              {/* <p>This is a simple pop-up example.</p> */}
              <button onClick={togglePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    )
  }else{
    <div>
      <p>Please login before submitting a review</p>
    </div>
  }
  
}
export default Img_input;