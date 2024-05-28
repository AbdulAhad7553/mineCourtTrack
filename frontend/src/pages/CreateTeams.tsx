// GPT WALI FILEE




import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/navBar_componets/Navbar";
import EnterTeamDetail from "../components/addTeams_componets/EnterTeamDetail";
import { API_BASE_URL } from "../config/config";

const CreateTeams = () => {
  const [teamName, setTeamName] = useState("");
  const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
  const [secondaryColor, setSecondaryColor] = useState('#000000');
  const [coach, setCoach] = useState("");
  const [teamManager, setTeamManager] = useState("");
  const [teamId, setTeamId] = useState(null);
  const navigate = useNavigate();

  const handleCreateTeam = async (event: React.FormEvent) => {
    event.preventDefault();
    const newTeam = {
      name: teamName,
      primaryColor,
      secondaryColor,
      coach,
      teamManager
    };

    try {
      console.log("Sending team data to the backend -- ", newTeam);
      const response = await axios.post(`${API_BASE_URL}/addteam-req`, newTeam);
      if (response.status === 201) {
        alert("Team created successfully");
        const teamData = response.data.teamData;
        console.log("teamData jo backend se mangwaya hai :  ", teamData);
        setTeamId(response.data._id); // Save the team ID
        navigate('/addplayers', { state: {teamData}});
      } else {
        throw new Error("Error creating team");
      }
    } catch (error) {
      console.error("CreateTeam Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-700">
      <div className="relative w-4/5 h-full bg-neutral-100 shadow-lg rounded-lg">
        <Navbar pageIndex={2}/>
        <EnterTeamDetail 
          teamName={teamName}
          setTeamName={setTeamName}
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
          secondaryColor={secondaryColor}
          setSecondaryColor={setSecondaryColor}
          coach = {coach}
          setCoach = {setCoach}
          teamManager = {teamManager}
          setTeamManager = {setTeamManager}
        />
        <div className="flex justify-center mt-5">
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white mb-2 font-bold py-2 px-4 rounded-full transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
            onClick={handleCreateTeam}
          >
            Create Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeams;
