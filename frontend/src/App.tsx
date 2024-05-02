// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './index.css'

// Pages
import LandingPage from './pages/LandingPage.tsx'
import Signup from './pages/Signup.tsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
