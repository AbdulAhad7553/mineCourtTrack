import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import Navbar from "../components/navBar_componets/Navbar";
import TeamCard from "../components/editTeams_components/TeamCard";
import PlayerCard from "../components/addTeams_componets/PlayerCard";
//import AddPlayers from "./AddPlayers"; // Adjust the path as necessary
import {Image} from "cloudinary-react";
interface Team {
  _id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  coach: string;
  teamManager: string;
  players: Player[];
}

interface Player {
  _id: string;
  name: string;
  jerseyNumber: number;
  position: string;
  age: number;
  affiliation: string;
  phoneNumber: string;
}


const EditTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [view, setView] = useState<'edit' | 'add' | 'remove'>('edit');
  const [teamImage, setTeamImage] = useState<File | null>(null);
  const [imageData, setImageData] = useState<any>(null);

  const navigate = useNavigate();
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

  const uploadImage = () => {
    if (!teamImage) return;
  
    const formData = new FormData();
    formData.append("file", teamImage);
    formData.append("upload_preset", "vt1zjl7d");
  
    const postImage = async () => {
      try {
        const imgresponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dm56xy1oj/image/upload",
          formData
        );
        setImageData(imgresponse.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    postImage();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTeamImage(file);
    }
  };
  
  
  const handleTeamClick = (team: Team) => {
    setSelectedTeam(team);
    setView('edit'); // Reset view to edit when a new team is selected
  };

  // const handleSaveChanges = async () => {
  //   if (!selectedTeam) return;

  //   try {
  //     const response = await axios.put(
  //       `${API_BASE_URL}/updateteam/${selectedTeam._id}`,
  //       selectedTeam
  //     );
  //     if (response.status === 200) {
  //       alert("Team updated successfully");
  //       const updatedTeam = response.data;
  //       setTeams(
  //         teams.map((team) =>
  //           team._id === updatedTeam._id ? updatedTeam : team
  //         )
  //       );
  //       setSelectedTeam(updatedTeam);
  //       window.location.reload();
  //     } else {
  //       throw new Error("Error updating team");
  //     }
  //   } catch (error) {
  //     console.error("UpdateTeam Error:", error);
  //   }
  // };

  const handleSaveChanges = async () => {
    if (!selectedTeam) return;
  
    const updatedTeamData = {
      ...selectedTeam,
      teamPhotoURL: imageData ? imageData.public_id : selectedTeam.teamPhotoURL
    };
  
    try {
      const response = await axios.put(
        `${API_BASE_URL}/updateteam/${selectedTeam._id}`,
        updatedTeamData
      );
      if (response.status === 200) {
        alert("Team updated successfully");
        const updatedTeam = response.data;
        setTeams(
          teams.map((team) =>
            team._id === updatedTeam._id ? updatedTeam : team
          )
        );
        setSelectedTeam(updatedTeam);
        window.location.reload();
      } else {
        throw new Error("Error updating team");
      }
    } catch (error) {
      console.error("UpdateTeam Error:", error);
    }
  };
  
  const handleAddPlayerClick = (team) => {
    navigate('/addplayers', { state: { teamData: team } });
  };

  const handleToggleView = (view: 'edit' | 'add' | 'remove') => {
    if (view === 'add' && selectedTeam) {
      handleAddPlayerClick(selectedTeam);
    } else {
      setView(view);
    }
  };

  const handleRemovePlayer = async (teamId: string, playerId: string) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/remove-player/${teamId}/${playerId}`);
      if (response.status === 200) {
        alert("Player removed successfully");
        window.location.reload();
        const updatedTeam = response.data.team;
        setSelectedTeam(updatedTeam);
        setTeams(teams.map(team => team._id === updatedTeam._id ? updatedTeam : team));
      } else {
        throw new Error("Error removing player");
      }
    } catch (error) {
      console.error("RemovePlayer Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-auto bg-zinc-700">
      <div className="relative w-4/5 h-full bg-neutral-100 shadow-lg rounded-lg">
        <Navbar pageIndex={2} />
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-3">Edit Teams</h2>
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
              <h2 className="text-xl font-semibold mb-3">Edit Team Details</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveChanges();
                }}
              >
                <div>
                  <label className="block text-sm font-medium mb-1">
                    New Team Name
                  </label>
                  <input
                    className="rounded px-1 py-1"
                    type="text"
                    value={selectedTeam.name}
                    onChange={(e) =>
                      setSelectedTeam({ ...selectedTeam, name: e.target.value })
                    }
                    placeholder="Enter Team Name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Primary Kit Colour
                  </label>
                  <input
                    className="w-12 h-12 rounded-full cursor-pointer"
                    type="color"
                    value={selectedTeam.primaryColor}
                    onChange={(e) =>
                      setSelectedTeam({
                        ...selectedTeam,
                        primaryColor: e.target.value,
                      })
                    }
                    placeholder="Primary Color"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Secondary Kit Colour
                  </label>
                  <input
                    className="w-12 h-12 rounded-full cursor-pointer"
                    type="color"
                    value={selectedTeam.secondaryColor}
                    onChange={(e) =>
                      setSelectedTeam({
                        ...selectedTeam,
                        secondaryColor: e.target.value,
                      })
                    }
                    placeholder="Secondary Color"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Coach
                  </label>
                  <input
                    className="rounded px-1 py-1"
                    type="text"
                    value={selectedTeam.coach}
                    onChange={(e) =>
                      setSelectedTeam({
                        ...selectedTeam,
                        coach: e.target.value,
                      })
                    }
                    placeholder="Coach"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Team Manager
                  </label>
                  <input
                    className="rounded px-1 py-1"
                    type="text"
                    value={selectedTeam.teamManager}
                    onChange={(e) =>
                      setSelectedTeam({
                        ...selectedTeam,
                        teamManager: e.target.value,
                      })
                    }
                    placeholder="Team Manager"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Team Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <button
                    type="button"
                    onClick={uploadImage}
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
                  >
                    Upload Image
                  </button>
                </div>
              {imageData && (
                <div className="mt-4">
                  <Image
                    cloudName="dm56xy1oj"
                    publicId={imageData.public_id}
                    width="300"
                    crop="scale"
                  />
                </div>
              )}


                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-800 text-white mb-2 mt-8 font-bold py-2 px-4 rounded-full transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </form>
              <div className="mt-6">
                <button
                  className={`mr-2 py-2 px-4 rounded-full font-bold transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg ${
                    view === 'add' ? 'bg-blue-600 hover:bg-blue-800 text-white' : 'bg-gray-300 hover:bg-gray-400 text-black'
                  }`}
                  onClick={() => handleToggleView('add')}
                >
                  Add Player
                </button>
                <button
                  className={`py-2 px-4 rounded-full font-bold transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg ${
                    view === 'remove' ? 'bg-red-600 hover:bg-red-800 text-white' : 'bg-gray-300 hover:bg-gray-400 text-black'
                  }`}
                  onClick={() => handleToggleView('remove')}
                >
                  Remove Player
                </button>
              </div>
              <div className="mt-6">
                {view === 'edit' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Players</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedTeam.players.map((player) => (
                        <PlayerCard
                          key={player._id}
                          player={player}
                          teamColor={selectedTeam.primaryColor} // Pass teamColor prop
                          onClick={() => console.log('Player clicked', player)}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {/* {view === 'add' && <AddPlayers teamData={selectedTeam} setSelectedTeam={setSelectedTeam} />}
                {console.log("SelectedTeam: ", selectedTeam)} */}
                {view === 'remove' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Remove Players</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedTeam.players.map((player) => (
                        <div key={player._id} className="flex items-center">
                          <div className="flex-1">
                            <PlayerCard
                              player={player}
                              teamColor={selectedTeam.primaryColor} // Pass teamColor prop
                              onClick={() => console.log('Player clicked', player)}
                            />
                          </div>
                          <button
                            className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 ml-4 rounded-full transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg"
                            onClick={() => handleRemovePlayer(selectedTeam._id, player._id)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTeams;