'use client';
import './home-display.css'
import fetchqueryData from './fetchqueryData.jsx'
import Item_preview_homepage from './item-preview-homepage.jsx'
import {imgDB, txtDB } from "../firebaseConfig.jsx"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { collection, doc, setDoc, query, limit, getDocs  } from "firebase/firestore"
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router";
import {useReviewGlobalContext} from './global_context.jsx'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";

function HomePopulator(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { globalVariable, setGlobalVariable } = useReviewGlobalContext();

  useEffect(() => {
    setLoading(false);
  }, [data]);


  useEffect(() => {
    // console.log("global var update calls fetchquery again")
    fetchqueryData(10, globalVariable).then((fetched) => {
      setData(fetched)
    })
  }, [globalVariable]);

  function combineURL(urlName) {
    // console.log("urlname output: ", urlName)
    return `/Reviews/${urlName.company}-${urlName.name}`
  }
  
  if(!loading && (data[0] != undefined)) {
    return(
      <div className="scroll-container relative flex h-full bg-black">
        <div className="scroll-content container max-w-screen-xl mx-auto relative z-20 overflow-x-hidden">
          <Splide
            options={{
                type: "loop", // Loop back to the beginning when reaching the end
                autoScroll: {
                    pauseOnHover: false, // Do not pause scrolling when hovering over the carousel
                    pauseOnFocus: false, // Do not pause scrolling when the carousel is focused
                    rewind: true, // Rewind to start when the end is reached
                    speed: 1 // Scrolling speed
                },
                arrows: false, // Hide navigation arrows
                pagination: false, // Hide pagination dots
                fixedWidth: '290px', // Fixed width for each slide
                gap: '12px', // Gap between slides
            }}
            extensions={{ AutoScroll }} // Use the AutoScroll extension
          >
              {data.map((element) => (
                <SplideSlide>
                  <Link to= {combineURL(element)}>
                    <Item_preview_homepage data = {element}/>
                  </Link>
                </SplideSlide>
              ))}
          </Splide>
        </div>
      </div>
    )
  }else{
    console.log("currently loading")
    return(
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  
}

export default HomePopulator;