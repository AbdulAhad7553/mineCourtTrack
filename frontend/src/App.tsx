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
import StartNewMatch from './pages/StartNewMatch.tsx';
import MatchStats from './pages/MatchStats.tsx';
import ViewPlayerStats from './pages/ViewPlayerStats.tsx';
import Leaderboard from './pages/Leaderboard.tsx';
import ViewTeam from './pages/ViewTeams.tsx';
import GetMatchHistory from './pages/GetMatchHistory.tsx';
import RemoveTeams from './pages/RemoveTeams.tsx';
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
        <Route path="/start-new-match" element={<StartNewMatch/>}/>
        <Route path='/match/:gameId' element={<MatchStats/>}/>
        <Route path='/view-player-stats' element={<ViewPlayerStats/>}/>
        <Route path='/leaderboard' element={<Leaderboard/>}/>
        <Route path='/view-teams' element={<ViewTeam/>}/>
        <Route path='/get-match-history' element={<GetMatchHistory/>}/>
        <Route path='/remove-teams/' element={<RemoveTeams/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
