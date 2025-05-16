import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import Navbar from "../components/Navbar";
import TeamCard from "../components/editTeams_components/TeamCard";
import Sidebar from "../components/Sidebar";
interface Team {
  _id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  coach: string;
  teamManager: string;
  players: Player[];
  teamPhotoURL: string;
}

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

const RemoveTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/get-teams`);
        console.log("Fetched teams:", response.data);
        setTeams(response.data.teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(team);
  };

  const handleRemoveTeam = async () => {
    if (!selectedTeam) return;

    try {
      const response = await axios.delete(
        `${API_BASE_URL}/delete-team/${selectedTeam._id}`
      );
      if (response.status === 200) {
        alert("Team removed successfully");
        setTeams(teams.filter((team) => team._id !== selectedTeam._id));
        setSelectedTeam(null);
      } else {
        throw new Error("Error removing team");
      }
    } catch (error) {
      console.error("RemoveTeam Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-auto bg-zinc-700">
      <div className="relative w-4/5 h-full bg-neutral-100 shadow-lg rounded-lg">
        <Navbar />
        <Sidebar />
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-3">Remove Teams</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {teams.map((team) => (
              <TeamCard
                key={team._id}
                team={team}
                onClick={() => handleTeamClick(team)}
              />
            ))}
          </div>
          {selectedTeam && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Remove Team</h2>
              <div>
                <p>Are you sure you want to remove the team <strong>{selectedTeam.name}</strong>?</p>
                <button
                  className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 mt-4 rounded-full transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
                  onClick={handleRemoveTeam}
                >
                  Remove Team
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveTeams;
