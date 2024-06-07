import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import PlayerStatsGraph from "../components/PlayerStatsGraph/PlayerStatsGraph"; // Assume you have a component for displaying graphs
import Navbar from "../components/navBar_componets/Navbar";


interface Player {
  _id: string;
  name: string;
  jerseyNumber: number;
  position: string;
  age: number;
  affiliation: string;
  phoneNumber: string;
  playerPhotoURL: string;
}

interface Team {
  _id: string;
  name: string;
  primaryColor: string;
  // Define other properties if necessary
}


const ViewPlayerStats = () => {
  const [teams, setTeams] = useState<Team []>([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();
  const [playerStats, setPlayerStats] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/get-teams`);
        setTeams(response.data.teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const handleTeamSelect = async (teamId: string) => {
    setSelectedTeam(teamId);
    try {
      const response = await axios.get(`${API_BASE_URL}/get-players/${teamId}`);
      setPlayers(response.data.players);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handlePlayerSelect = async (playerId: string) => {
    const player = players.find((p) => p._id === playerId);
    setSelectedPlayer(player);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/get-player-stats/${playerId}`
      );
      console.log("Response.data.stats: ", response.data.stats);
      setPlayerStats(response.data.stats);
    } catch (error) {
      console.error("Error fetching player stats:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar pageIndex={2} />
      <div className="flex flex-col items-center justify-center h-auto bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">View Player Stats</h2>
          <button
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-full mb-4"
            onClick={() => navigate("/leaderboard")}
          >
            Go to Leaderboard
          </button>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Select Team:
            </label>
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => handleTeamSelect(e.target.value)}
            >
              <option value="">Select a Team</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          {selectedTeam && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Select Player:
              </label>
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => handlePlayerSelect(e.target.value)}
              >
                <option value="">Select a Player</option>
                {players.map((player) => (
                  <option key={player._id} value={player._id}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {playerStats && selectedPlayer && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                {selectedPlayer.name}'s Stats
              </h3>
              <PlayerStatsGraph stats={playerStats} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPlayerStats;
