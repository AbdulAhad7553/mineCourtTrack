// import React, { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
// import { API_BASE_URL } from "../config/config";
// import Navbar from "../components/navBar_componets/Navbar";
// import TeamCard from "../components/editTeams_components/TeamCard";
// import PlayerCard from "../components/addTeams_componets/PlayerCard";
// //import AddPlayers from "./AddPlayers"; // Adjust the path as necessary
// import {Image} from "cloudinary-react";
// import Sidebar from "../components/Sidebar";
// interface Team {
//   _id: string;
//   name: string;
//   primaryColor: string;
//   secondaryColor: string;
//   coach: string;
//   teamManager: string;
//   players: Player[];
//   teamPhotoURL: string;
// }

// interface Player {
//   _id: string;
//   name: string;
//   jerseyNumber: number;
//   position: string;
//   age: number;
//   affiliation: string;
//   phoneNumber: string;
//   playerPhotoURL: string;
// }


// const EditTeams = () => {
//   const [teams, setTeams] = useState<Team[]>([]);
//   const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
//   const [view, setView] = useState<'edit' | 'add' | 'remove'>('edit');
//   const [teamImage, setTeamImage] = useState<File | null>(null);
//   const [imageData, setImageData] = useState<any>(null);

//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/get-teams`);
//         console.log("Fetched teams:", response.data);
//         setTeams(response.data.teams);
//       } catch (error) {
//         console.error("Error fetching teams:", error);
//       }
//     };

//     fetchTeams();
//   }, []);

//   const uploadImage = () => {
//     if (!teamImage) return;
  
//     const formData = new FormData();
//     formData.append("file", teamImage);
//     formData.append("upload_preset", "vt1zjl7d");
  
//     const postImage = async () => {
//       try {
//         const imgresponse = await axios.post(
//           "https://api.cloudinary.com/v1_1/dm56xy1oj/image/upload",
//           formData
//         );
//         setImageData(imgresponse.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     postImage();
//   };

//   const handleAddTeam = () =>{
//     navigate('/create-team');
//   };
//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setTeamImage(file);
//     }
//   };
  
  
//   const handleTeamClick = (team: Team) => {
//     console.log("handelTeamClicked")
//     setSelectedTeam(team);
//     // setView('edit'); // Reset view to edit when a new team is selected
//   };


//   const handleSaveChanges = async () => {
//     if (!selectedTeam) return;
  
//     const updatedTeamData = {
//       ...selectedTeam,
//       teamPhotoURL: imageData ? imageData.public_id : selectedTeam.teamPhotoURL
//     };
  
//     try {
//       const response = await axios.put(
//         `${API_BASE_URL}/updateteam/${selectedTeam._id}`,
//         updatedTeamData
//       );
//       if (response.status === 200) {
//         alert("Team updated successfully");
//         const updatedTeam = response.data;
//         setTeams(
//           teams.map((team) =>
//             team._id === updatedTeam._id ? updatedTeam : team
//           )
//         );
//         setSelectedTeam(updatedTeam);
//         window.location.reload();
//       } else {
//         throw new Error("Error updating team");
//       }
//     } catch (error) {
//       console.error("UpdateTeam Error:", error);
//     }
//   };
  
//   const handleAddPlayerClick = (team : Team) => {
//     navigate('/addplayers', { state: { teamData: team } });
//   };

//   const handleToggleView = (view: 'edit' | 'add' | 'remove') => {
//     if (view === 'add' && selectedTeam) {
//       handleAddPlayerClick(selectedTeam);
//     } else {
//       setView(view);
//     }
//   };


//   const handleRemovePlayer = async (teamId: string, playerId: string) => {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/remove-player/${teamId}/${playerId}`);
//       if (response.status === 200) {
//         alert("Player removed successfully");
//         window.location.reload();
//         const updatedTeam = response.data.team;
//         setSelectedTeam(updatedTeam);
//         setTeams(teams.map(team => team._id === updatedTeam._id ? updatedTeam : team));
//       } else {
//         throw new Error("Error removing player");
//       }
//     } catch (error) {
//       console.error("RemovePlayer Error:", error);
//     }
//   };

//   return (
//     <div className='flex'>
//       <div className='w-screen h-screen fixed right-0 top-0 overflow-hidden'>
//             <div className="w-full h-screen fixed right-0 top-0 overflow-hidden flex items-center justify-center bg-custom-gray" >
//             </div>
//       <nav className="fixed top-0 z-50 w-screen bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
//         <div className="px-3 py-3 lg:px-5 lg:pl-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center justify-start rtl:justify-end">
//               <a  className="flex ms-2 md:me-24 ">
//                 {/* SVG code */}
//                 <span className="self-center text-xl font-semibold ml-5 sm:text-2xl whitespace-nowrap dark:text-white">CourtTrack</span>
//               </a>
//             </div>
//             <div className="flex items-center">
//               <div className="flex items-center ms-3">
//                 <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
    
                  
//             </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <Sidebar />

//       <div className="flex flex-col w-3/4 ml-80"> {/* Adjust margin as needed */}
//         <button onClick={handleAddTeam} className=" w-full relative mt-40 border-2 border-dashed border-customBlue p-4 w-3/4 rounded-lg mx-auto flex items-center justify-center transition-all duration-300 hover:scale-105">
//           {/* SVG code */}
//           <span className="ml-2 md:font-bold text-customBlue text-4xl">ADD TEAM</span>
//         </button>

//         <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 mt-8 z-9999">
//           {teams.map((team) => (
//             <TeamCard
//               key={team._id}
//               team={team}
//               onClick={() => handleTeamClick(team)}
//             />
//           ))}
//         </div>
//         {selectedTeam && (
//           <div className="mt-6">
//             <h2 className="text-xl font-semibold mb-3">Players</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {selectedTeam.players.map((player) => (
//                 <PlayerCard key={player._id} player={player} teamColor={selectedTeam.primaryColor} isSelected={false} onSelect={()=>""}/>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//     </div>
//   );

// };

// export default EditTeams;
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import Navbar from "../components/Navbar";
import TeamCard from "../components/editTeams_components/TeamCard";
import PlayerCard from "../components/addTeams_componets/PlayerCard";
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

  const handleAddTeam = () => {
    navigate('/create-team');
  };
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTeamImage(file);
    }
  };
  
  const handleTeamClick = (team: Team) => {
    console.log("Team clicked:", team.name);
    setSelectedTeam(team);
  };

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
  
  const handleAddPlayerClick = (team: Team) => {
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
    <div className='flex'>
      <Navbar />

      <Sidebar />

      <div className="flex flex-col w-3/4 ml-80 relative z-20"> {/* Added z-20 to bring it above the overlay */}
        <button onClick={handleAddTeam} className="w-full relative mt-40 border-2 border-dashed border-customBlue p-4 rounded-lg mx-auto flex items-center justify-center transition-all duration-300 hover:scale-105">
          {/* SVG code */}
          <span className="ml-2 md:font-bold text-customBlue text-4xl">ADD TEAM</span>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 mt-8">
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
                <PlayerCard key={player._id} player={player} teamColor={selectedTeam.primaryColor} isSelected={false} onSelect={() => {}} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full h-screen fixed right-0 top-0 overflow-hidden flex items-center justify-center bg-custom-gray z-10">
        {/* Overlay content */}
      </div>
    </div>
  );
};

export default EditTeams;