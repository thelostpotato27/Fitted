import './img_input.css'
import {imgDB, txtDB } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, setDoc, getDoc } from "firebase/firestore"
import { useState, useEffect } from 'react';
import { v4 } from "uuid";


function Img_input(){
  const [name,setName] = useState('')
  const [txt,setTxt] = useState('')
  const [url,setUrl] = useState('')
  const [review,setReview] = useState('')
  const [company,setCompany] = useState('')
  const [img,setImg] = useState('')

  const prepUpload = (e) =>{
    setImg(e.target.files[0])
    
  }

  const img_upload = async (e) => {
    e.preventDefault();

    if(name == '' || url == '' || review == '' || company == '' || img == ''){
      return
    }
    const imgID = v4()
    const imgs = ref(imgDB, `Imgs/${imgID}`)
    uploadBytes(imgs, img).then(data=>{
      console.log(data,"imgs")
      // getDownloadURL(data.ref).then(val=>{
      //   console.log(val)
      // })
    })
    const reviewID = v4()
    setDoc(doc(txtDB, "reviews", reviewID), {
      name: name,
      company: company,
      review: review,
      url: url,
      image: imgID
    });

    setName('')
    setUrl('')
    setReview('')
    setCompany('')
    setImg('')
  }

  return(
    <div >
      <h3>Item Name</h3>
      <input value={name} onChange={(e)=>setName(e.target.value)} />

      <h3>Company</h3>
      <input value={company} onChange={(e)=>setCompany(e.target.value)} />

      <h3>Item Review</h3>
      <input value={review} onChange={(e)=>setReview(e.target.value)} />

      <h3>Item Link</h3>
      <input value={url} onChange={(e)=>setUrl(e.target.value)} />

      <h3>Image</h3>
      <input type="file" onChange={(e)=>prepUpload(e)} />

      <h3></h3>
      <button onClick={img_upload}> Submit </button>
    </div>
  )
}
export default Img_input;