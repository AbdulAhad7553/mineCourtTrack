// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './index.css'

// Pages
import LandingPage from './pages/LandingPage.tsx'
import Signup from './pages/Signup.tsx'
import HomePage from './pages/HomePage.tsx';
//import CreateTeam from './pages/CreateTeam.tsx';
import CreateTeams from './pages/CreateTeams.tsx';
import AddPlayers from './pages/AddPlayers.tsx';
import EditTeams from './pages/EditTeams.tsx';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<HomePage/>}/>
        <Route path="/create-team" element={<CreateTeams/>}/>
        <Route path="/addplayers" element={<AddPlayers/>}/>
        <Route path="/edit-teams" element={<EditTeams/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
