// import Navbar from './navBar_componets/Navbar'; // Adjust the path as needed
// import { Link, useNavigate } from 'react-router-dom';

// // import store from '../redux/store.js'

// const Dashboard = () => {
// //   console.log(store.getState())
//   const navigate = useNavigate();
//   const handleEditTeams = () => {
//     navigate('/edit-teams');
//   };

//   const handleStartNewMatch = () =>{
//     navigate('/start-new-match');
//   };

//   const handleViewPlayerStats = () =>{
//     navigate('/view-player-stats');
//   };

//   const handleViewTeams = () => {
//     navigate('/view-teams');
//   };

//   const handleMatchHistory = () => {
//     navigate('/get-match-history');
//   };

//   const handleDeleteTeam = () => {
//     navigate('/remove-teams');
//   };
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="relative w-4/5 h-4/5 bg-neutral-100 shadow-lg rounded-lg">
//           <Navbar pageIndex={1} />
//           <div className="flex p-8 h-full"> {/* Adjusted for full height and flex layout */}
//             <div className="flex flex-col flex-1 mr-6"> {/* 60% width for the left section, use flex-col for vertical layout */}
//                 <h1 className="text-2xl font-bold mb-4">Dashboard Content</h1>
//                 <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mb-4 w-full" onClick={handleStartNewMatch}>
//                 Start New Match
//                 </button>
//                 <div className="grid grid-cols-2 gap-4"> {/* Grid layout for buttons */}
//                 <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded" onClick={handleViewTeams}>View Teams</button>
//                 <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded" onClick={handleMatchHistory}>View Match History</button>
//                 <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded" onClick={handleEditTeams}>Edit Teams</button>
//                 <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded" onClick={handleViewPlayerStats}>View Player Stats</button>
//                 <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded">
//                     <Link to="/create-team" className="block w-full h-full text-center">
//                         Add Teams
//                     </Link>
//                 </button>
//                 <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded" onClick={handleDeleteTeam}>Remove Teams</button>

//                 </div>
//             </div>
//             <div className="flex flex-col flex-1"> {/* 40% width for the right section */}
//                 <h1 className="text-xl font-bold mb-4">Live Games</h1>
//                 <p>Here you can place additional widgets or information relevant to the user.</p>
//             </div>
//             </div>
//         </div>
//       </div>
//     );
//   };

// export default Dashboard;

// import Sidebar from './Sidebar';
// import VsCard from './VsCard';
// import Navbar from './navBar_componets/Navbar'; // Adjust the path as needed
// import { Link, useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const handleEditTeams = () => {
//     navigate('/edit-teams');
//   };

//   const handleStartNewMatch = () =>{
//     navigate('/start-new-match');
//   };

//   const handleViewPlayerStats = () =>{
//     navigate('/view-player-stats');
//   };

//   const handleViewTeams = () => {
//     navigate('/view-teams');
//   };

//   const handleMatchHistory = () => {
//     navigate('/get-match-history');
//   };
//   const handleLeaderboards = () => {
//     navigate('/leaderboard');
//   };

//   const handleDashboard = () => {
//     navigate('/dashboard');
//   };

//   const handleDeleteTeam = () => {
//     navigate('/remove-teams');
//   };

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import GameCard from "./game_components/GameCard";
import { API_BASE_URL } from "../config/config";
import TeamNumberCard from "./TeamNumberCard";
import PlayerNumberCard from "./PlayerNumberCard";
import NewMatchLogo from "../assets/NewMatchLogo.svg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [mostRecentGame, setMostRecentGame] = useState(null);
  const [teamCount, setTeamCount] = useState(0); // State to store the number of teams
  const [playerCount, setPlayerCount] = useState(0);
  useEffect(() => {
    const fetchMostRecentGame = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/most-recent-game`);
        const data = await response.json();
        setMostRecentGame(data);
      } catch (error) {
        console.error("Error fetching the most recent game:", error);
      }
    };

    const fetchTeamCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/teams-count`);
        const data = await response.json();
        setTeamCount(data.count); // Assuming the response contains a count field
      } catch (error) {
        console.error("Error fetching the team count:", error);
      }
    };

    const fetchPlayerCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/players-count`);
        const data = await response.json();
        setPlayerCount(data.count); // Assuming the response contains a count field
      } catch (error) {
        console.error("Error fetching the team count:", error);
      }
    };

    fetchMostRecentGame();
    fetchTeamCount();
    fetchPlayerCount();
  }, []);

  const handleEditTeams = () => {
    navigate("/edit-teams");
  };

  const handleStartNewMatch = () => {
    navigate("/start-new-match");
  };

  const handleViewPlayerStats = () => {
    navigate("/view-player-stats");
  };

  const handleViewTeams = () => {
    navigate("/view-teams");
  };

  const handleMatchHistory = () => {
    navigate("/get-match-history");
  };

  const handleLeaderboards = () => {
    navigate("/leaderboard");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleDeleteTeam = () => {
    navigate("/remove-teams");
  };

  return (
    <div className="flex">
      <div className="w-screen h-screen fixed right-0 top-0 overflow-hidden">
        <Navbar />
        <Sidebar />
        <div className="mt-20">
          {mostRecentGame && <GameCard game={mostRecentGame} />}
        </div>

        <div className="fixed right-40 top-0 mt-40 mr-60">
          <TeamNumberCard count={teamCount} />{" "}
          {/* Display the TeamsCard component */}
        </div>
        <div className="fixed right-40 top-40  ">
          <PlayerNumberCard count={playerCount} />{" "}
          {/* Display the TeamsCard component */}
        </div>
        

        <button
          className="fixed right-40 top-[80%] text-white font-bold py-2 px-2 rounded-full transition duration-250 ease-in-out transform hover:scale-105"
          onClick={handleStartNewMatch}
        >
          <img src={NewMatchLogo} alt="New Match" className="w-20 h-20" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
