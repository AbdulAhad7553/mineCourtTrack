import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import TeamCard from "../components/editTeams_components/TeamCard";
import PlayerCard from "../components/addTeams_componets/PlayerCard";
import Navbar from "../components/navBar_componets/Navbar"; // Import Navbar component

interface Team {
  _id: string;
  name: string;
  teamPhotoURL: string;
  players: Player[];
}

interface Player {
  _id: string;
  name: string;
}

const ViewTeam: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

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

  const handleTeamClick = (team: Team) => {
    console.log("Team Selected");
    setSelectedTeam(team);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar component */}
      <Navbar pageIndex={2} />
      
      <div className="container mx-auto pt-12">
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
            <h2 className="text-xl font-semibold mb-3">Players</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {selectedTeam.players.map((player) => (
                <PlayerCard key={player._id} player={player} teamColor={selectedTeam.primaryColor}/>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTeam;
