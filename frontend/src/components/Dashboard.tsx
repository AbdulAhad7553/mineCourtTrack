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

        {/* <button
          className="fixed right-40 top-[80%] text-white font-bold py-2 px-2 rounded-full transition duration-250 ease-in-out transform hover:scale-105"
          onClick={handleStartNewMatch}
        >
          <img src={NewMatchLogo} alt="New Match" className="w-20 h-20" />
        </button> */}
        <button
          onClick={handleStartNewMatch}
          className="fixed right-40 top-[80%] flex items-center text-white font-bold py-2 px-4 rounded-full transition duration-250 ease-in-out transform hover:scale-105 group"
        >
          {/* Text appears on hover */}
          <span className="opacity-0 group-hover:opacity-100 text-xl bg-neutral-300 p-3 rounded-lg text-black mr-2 transition-opacity duration-300">
            Start a New Match
          </span>

          {/* Logo spins once on hover */}
          <img
            src={NewMatchLogo}
            alt="New Match"
            className="w-20 h-20 group-hover:animate-spin transition-transform duration-500"
          />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
