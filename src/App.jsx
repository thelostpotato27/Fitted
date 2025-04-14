import { useState, createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import "@fontsource/noto-sans"
import {app} from "./firebaseConfig"
import Header from './components/header'
import Home from './pages/home'
import About from './pages/About'
import Input_page from './pages/Input'
import Reviews from './pages/Reviews'
import ReviewsPage from './pages/AutogenReviewpage'
import LoginPage from './pages/Login'
import EmailLoginPage from './pages/EmailLogin'
import EmailSignupPage from './pages/EmailSignup'
import UserPage from './pages/User'
import ProfileCreationPage from './pages/profile-creation.jsx'
import {GlobalProvider} from "./components/global_context";


function App() {
  const [count, setCount] = useState(0)

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="Reviews" element={<Reviews />} />
            <Route path="Reviews/:pageName" element={<ReviewsPage/>}/>
            <Route path="Input" element={<Input_page />} />
            <Route path="About" element={<About />} />
            <Route path="Login" element={<LoginPage />} />
            <Route path="Login/email" element={<EmailLoginPage />} />
            <Route path="Login/signupemail" element={<EmailSignupPage />} />
            <Route path="User" element={<UserPage/>} />
            <Route path="Usersetup" element={<ProfileCreationPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
