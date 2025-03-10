import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import {app} from "./firebaseConfig"
import Header from './components/header'
import Home from './pages/home'
import About from './pages/About'
import Input_page from './pages/Input'
import Reviews from './pages/Reviews'
import ReviewsPage from './pages/AutogenReviewpage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="Reviews" element={<Reviews />} />
            <Route path="Reviews/:pageName" element={<ReviewsPage/>}/>
            <Route path="Input" element={<Input_page />} />
            <Route path="About" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
