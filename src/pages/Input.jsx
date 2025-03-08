import './input.css'
import Item from '../components/item-window'
import React, { useEffect, useState } from "react";

import Img_input from "../components/img_input.jsx"

function Input_page(){
  return(
    <>
      <div className='input-items'> 
        <Img_input />
      </div>
    </>
  )
}

export default Input_page;