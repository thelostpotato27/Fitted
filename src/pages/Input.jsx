import './input.css'
import React, { useEffect, useState } from "react";
import {useGlobalContext} from '../components/global_context'
import Img_input from "../components/img_input.jsx"

function Input_page(){
  const { globalVariable, setGlobalVariable } = useGlobalContext();

  if (globalVariable != null){
    return(
      <>
        <div className='input-items'> 
          <Img_input />
        </div>
      </>
    )
  }else{
    return(
      <div>
        <h3>Please Login before writing reviews</h3>
      </div>
    )
    
  }
  
}

export default Input_page;