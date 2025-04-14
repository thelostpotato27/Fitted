import React, { useEffect, useState } from "react";
import "./About.css"


function About(){
  return(
    <>
      <div className="main-description"> 
        <h3>This site is for meant to help people make more informed decisions about online clothing shopping. </h3>
        <p>Online shopping has made accessing international clothing easier than ever, but it comes with it's own set of problems. Customer support is hit-or-miss, the shipping is costly and time consuming, and it's hard to find accurate data on both quality and size. And if you don't like what you bought, chances are good that you can't even return it, or will need to pay international shipping costs. When it comes down to it, online clothing shopping is either done by the experienced, or not done at all.</p>
        <p>This site is meant to change that. By creating a review board that focuses on clothing acquired internationally, I hope to make it easier for online shoppers to find high-quality products that fit their sizing and quality standards. The goal is to provide as much information as a physical trip to the store would, completely online</p>
        <h2>Happy Shopping!</h2>
      </div>
    </>
  )
}

export default About;