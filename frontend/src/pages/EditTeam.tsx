import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import EnterTeamDetail from "../components/addTeams_componets/EnterTeamDetail";
import PlayerCard from "../components/addTeams_componets/PlayerCard";
import { API_BASE_URL } from "../config/config";
import { Image } from "cloudinary-react";

interface Player {
  _id: string;
  name: string;
  jerseyNumber: number;
  position: string;
  age: number;
  affiliation: string;
  phoneNumber: string;
  playerPhotoURL: string;
  teamId: string;
}

const EditTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Team States
  const [teamName, setTeamName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#FFFFFF");
  const [secondaryColor, setSecondaryColor] = useState("#000000");
  const [coach, setCoach] = useState("");
  const [teamManager, setTeamManager] = useState("");
  const [teamImage, setTeamImage] = useState<File>();
  const [imageData, setImageData] = useState<any>(null);
  const [currentImageId, setCurrentImageId] = useState("");

  // Player States
  const [players, setPlayers] = useState<Player[]>([]);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [playerImage, setPlayerImage] = useState<File>();
  const [playerImageData, setPlayerImageData] = useState<any>(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [playerPositions] = useState([
    "Point Guard (PG)",
    "Shooting Guard (SG)",
    "Small Forward (SF)",
    "Power Forward (PF)",
    "Center (C)",
  ]);

  // Fetch team and player data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch team data
        const teamResponse = await axios.get(`${API_BASE_URL}/get-team-detail/${id}`);
        const teamData = teamResponse.data;
        
        setTeamName(teamData.name);
        setPrimaryColor(teamData.primaryColor);
        setSecondaryColor(teamData.secondaryColor);
        setCoach(teamData.coach);
        setTeamManager(teamData.teamManager);
        setCurrentImageId(teamData.teamPhotoURL);

        // Fetch players data
        const playersResponse = await axios.get(`${API_BASE_URL}/get-players/${id}`);
        setPlayers(playersResponse.data.players);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error loading team data");
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", teamImage as Blob);
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

  const handleUpdateTeam = async (event: React.FormEvent) => {
    event.preventDefault();
    const updatedTeam = {
      name: teamName,
      primaryColor,
      secondaryColor,
      coach,
      teamManager,
      teamPhotoURL: imageData ? imageData.public_id : currentImageId,
    };

    try {
      const response = await axios.put(
        `${API_BASE_URL}/updateteam/${id}`,
        updatedTeam
      );
      if (response.status === 200) {
        alert("Team updated successfully");
        navigate("/edit-teams");
      } else {
        throw new Error("Error updating team");
      }
    } catch (error) {
      console.error("EditTeam Error:", error);
      alert("Error updating team");
    }
  };

  const handleEditPlayer = (player: Player) => {
    setEditingPlayer(player);
    setShowEditForm(true);
    setPlayerImageData(null); // Reset image data when editing new player
  };

  const handlePlayerImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPlayerImage(file);
    }
  };

  const uploadPlayerImage = () => {
    if (!playerImage) return;

    const formData = new FormData();
    formData.append("file", playerImage);
    formData.append("upload_preset", "vt1zjl7d");

    const postImage = async () => {
      try {
        const imgresponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dm56xy1oj/image/upload",
          formData
        );
        setPlayerImageData(imgresponse.data);
      } catch (error) {
        console.error(error);
        alert("Error uploading player image");
      }
    };

    postImage();
  };

  const handleUpdatePlayer = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingPlayer) return;

    const updatedPlayer = {
      ...editingPlayer,
      playerPhotoURL: playerImageData ? playerImageData.public_id : editingPlayer.playerPhotoURL
    };

    try {
      const response = await axios.put(
        `${API_BASE_URL}/update-player/${id}/${editingPlayer._id}`,
        updatedPlayer
      );
      if (response.status === 200) {
        setPlayers(players.map(p => 
          p._id === editingPlayer._id ? updatedPlayer : p
        ));
        setShowEditForm(false);
        setEditingPlayer(null);
        setPlayerImageData(null);
        alert("Player updated successfully");
      }
    } catch (error) {
      console.error("Error updating player:", error);
      alert("Error updating player");
    }
  };

  const handleRemovePlayer = async (playerId: string) => {
    if (!window.confirm("Are you sure you want to remove this player from the team?")) {
      return;
    }

    try {
      const response = await axios.delete(`${API_BASE_URL}/remove-player/${id}/${playerId}`);
      if (response.status === 200) {
        setPlayers(players.filter(p => p._id !== playerId));
        alert("Player removed successfully");
      }
    } catch (error) {
      console.error("Error removing player:", error);
      alert("Error removing player");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="bg-neutral-200 flex-1 p-6 ml-64">
          <div className="rounded-lg mt-20 p-6 w-full">
            {/* Team Details Section */}
            <h2 className="text-2xl font-bold text-center mb-6">
              Edit Team
            </h2>
            <EnterTeamDetail
              teamName={teamName}
              setTeamName={setTeamName}
              primaryColor={primaryColor}
              setPrimaryColor={setPrimaryColor}
              secondaryColor={secondaryColor}
              setSecondaryColor={setSecondaryColor}
              coach={coach}
              setCoach={setCoach}
              teamManager={teamManager}
              setTeamManager={setTeamManager}
            />
            <div className="mt-5 mb-5 text-center">
              *Upload a new image only if you want to change the current team
              photo
            </div>
            <div className="flex flex-col items-center mt-5">
              {currentImageId && !imageData && (
                <div className="mb-4">
                  <h3 className="text-center mb-2">Current Team Image</h3>
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      cloudName="dm56xy1oj"
                      publicId={currentImageId}
                      width="300"
                      crop="scale"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-4 mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border p-2"
                />
                <button 
                  className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg" 
                  onClick={uploadImage}
                >
                  Upload New Image
                </button>
              </div>

              {imageData && (
                <div className="mb-4">
                  <h3 className="text-center mb-2">New Team Image</h3>
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      cloudName="dm56xy1oj"
                      publicId={imageData.public_id}
                      width="300"
                      crop="scale"
                    />
                  </div>
                </div>
              )}

              <button
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg mt-4"
                onClick={handleUpdateTeam}
              >
                Update Team
              </button>
            </div>

            {/* Players Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Team Players</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {players.map((player) => (
                  <div key={player._id} className="relative">
                    <PlayerCard
                      player={player}
                      teamColor={primaryColor}
                      isSelected={selectedPlayerId === player._id}
                      onSelect={() => setSelectedPlayerId(player._id === selectedPlayerId ? null : player._id)}
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditPlayer(player);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemovePlayer(player._id);
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Player Edit Form Modal */}
            {showEditForm && editingPlayer && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto">
                  <h3 className="text-xl font-bold mb-4">Edit Player</h3>
                  <form onSubmit={handleUpdatePlayer} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input
                        type="text"
                        value={editingPlayer.name}
                        onChange={e => setEditingPlayer({...editingPlayer, name: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Jersey Number</label>
                      <input
                        type="number"
                        value={editingPlayer.jerseyNumber}
                        onChange={e => setEditingPlayer({...editingPlayer, jerseyNumber: parseInt(e.target.value)})}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Position</label>
                      <select
                        value={editingPlayer.position}
                        onChange={e => setEditingPlayer({...editingPlayer, position: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                      >
                        {playerPositions.map(pos => (
                          <option key={pos} value={pos}>{pos}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Age</label>
                      <input
                        type="number"
                        value={editingPlayer.age}
                        onChange={e => setEditingPlayer({...editingPlayer, age: parseInt(e.target.value)})}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={editingPlayer.phoneNumber}
                        onChange={e => setEditingPlayer({...editingPlayer, phoneNumber: e.target.value})}
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    {/* Player Photo Section */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium mb-1">Player Photo</label>
                      {editingPlayer.playerPhotoURL && !playerImageData && (
                        <div className="mb-2">
                          <p className="text-sm text-gray-600 mb-2">Current Photo:</p>
                          <div className="rounded-lg overflow-hidden w-32 h-32">
                            <div className="w-full h-full">
                              <Image
                                cloudName="dm56xy1oj"
                                publicId={editingPlayer.playerPhotoURL}
                                width="128"
                                crop="fill"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2 items-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePlayerImageChange}
                          className="border p-2"
                        />
                        <button
                          type="button"
                          onClick={uploadPlayerImage}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Upload Photo
                        </button>
                      </div>
                      {playerImageData && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 mb-2">New Photo Preview:</p>
                          <div className="rounded-lg overflow-hidden w-32 h-32">
                            <div className="w-full h-full">
                              <Image
                                cloudName="dm56xy1oj"
                                publicId={playerImageData.public_id}
                                width="128"
                                crop="fill"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowEditForm(false);
                          setEditingPlayer(null);
                          setPlayerImageData(null);
                        }}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTeam;
